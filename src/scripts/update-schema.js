import { exec } from "child_process";
import { config } from "dotenv";

config();

const projectId = process.env.SUPABASE_PROJECT_ID;

exec(
    `npx supabase gen types typescript --project-id ${projectId} > src/types/db.types.ts`,
    (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    if (stdout) {
        console.log(`stdout: ${stdout}`);
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
    }
);
