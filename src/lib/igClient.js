import { IgApiClient } from "instagram-private-api";
import Store from "electron-store";

const store = new Store();
const client = new IgApiClient();

async function saveSession() {
  const serialized = await client.state.serialize();
  delete serialized.constants;
  store.set("session", serialized);
  return client;
}

function isSessionAvailable() {
  return store.has("session");
}

async function loadSession() {
  if (isSessionAvailable()) {
    const session = store.get("session");
    await client.state.deserialize(session);
  }
}

function getClient() {
  return client;
}


async function removeSession() {
  store.delete('session');
}

export default client;
export {
  isSessionAvailable,
  loadSession,
  getClient,
  removeSession,
  saveSession
}