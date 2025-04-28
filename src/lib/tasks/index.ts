import { google } from "googleapis";
import { getServerSession } from "../auth";

export async function getTaskClient() {
  const session = await getServerSession();
  const access_token = session?.access_token;

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token });

  return google.tasks({ version: "v1", auth });
}
