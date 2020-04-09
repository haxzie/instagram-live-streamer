import { IgApiClient } from "instagram-private-api";
const ig = new IgApiClient();

export async function loginToInstagram({ username, password }) {
  ig.state.generateDevice(username);

  try {
    const profile = await ig.account.login(username, password);
    
    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ig;