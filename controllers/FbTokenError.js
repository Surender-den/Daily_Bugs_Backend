const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

const MAX_RETRIES = 5; // Maximum retry attempts

const FbTokenError = async () => {
  let client = null;
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      attempts++;
      console.log(`Attempt ${attempts} to process Fb Token Error stats...`);

      // Database connection setup
      const dbConfig = {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT),
        ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 20000, // 20 seconds
        query_timeout: 20000, // 20 seconds
      };

      client = new Client(dbConfig);
      await client.connect();

      // Step 1: Fetch orgid
      const validOrgQuery = `
        SELECT DISTINCT(org.orgId) AS org_id, org.channel
        FROM "fs-organisations-channels-db" AS org
        JOIN organisation AS i ON org.orgid = i.org_id 
        WHERE org.channel = 'Facebook-Ads'
          AND isSyncDisabled IS NOT TRUE 
          AND (isDisabled != TRUE OR isDisabled IS NULL)
          AND (isDisconnected != TRUE OR isDisconnected IS NULL);
      `;

      const validOrgQueryResult = await client.query(validOrgQuery);
      const validOrgQueryRows = validOrgQueryResult.rows;

      if (validOrgQueryRows.length === 0) {
        console.log('No valid orgIds found for Fb Token Error.');
        return;
      }

      const orgIds = validOrgQueryRows.map(row => row.org_id);

      // Step 2: Login Error Query
      const FbTokenErrorQuery = `
        SELECT requestid, orgid, channel, status, message, sources
        FROM "fs-sync-requests-db"
        WHERE 
          createdAt > (CURRENT_DATE - INTERVAL '1 day') + INTERVAL '18:30' 
          AND createdby='cron' 
          AND orgid = ANY($1)
          AND sources::text LIKE '%access token%'
        ORDER BY createdAt ASC;
      `;

      const FbTokenQueryResult = await client.query(FbTokenErrorQuery, [orgIds]);

      // Log results to the terminal
      console.log(`FbToken Error`);
      console.table(FbTokenQueryResult.rows.map(row => ({
        OrgId: row.orgid,
        Channel: 'Facebook-Ads'
      })));

      // If successful, break out of the loop
      break;

    } catch (error) {
      console.error(`Error occurred on attempt ${attempts}:`, error.message);

      if (attempts >= MAX_RETRIES) {
        console.error('Max retry attempts reached. Exiting process.');
        break;
      }

      console.log(`Retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying

    } finally {
      if (client) {
        await client.end();
      }
    }
  }
};

module.exports = FbTokenError;
