const https = require("https");

const ALIAS = "abhishek-kumar-sharma-portfolio.vercel.app";
const TEAM_ID = "team_9nK3yAdUGtA9j5pxzQ4MOk40";

function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("Skipping alias update (not a production build)");
    return Promise.resolve();
  }

  const token = process.env.DEPLOY_ALIAS_TOKEN;
  const deploymentUrl = process.env.VERCEL_URL;

  if (!token || !deploymentUrl) {
    console.log("Missing DEPLOY_ALIAS_TOKEN or VERCEL_URL, skipping alias update");
    return Promise.resolve();
  }

  const body = JSON.stringify({ alias: ALIAS });
  const options = {
    hostname: "api.vercel.com",
    path: `/v2/deployments/${deploymentUrl}/aliases?teamId=${TEAM_ID}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log(`Alias update response (${res.statusCode}): ${data}`);
        resolve();
      });
    });
    req.on("error", (err) => {
      console.error("Alias update request failed:", err.message);
      resolve();
    });
    req.write(body);
    req.end();
  });
}

main();
