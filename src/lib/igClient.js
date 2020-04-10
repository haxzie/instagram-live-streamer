export async function loginToInstagram({ client, username, password }) {
  client.state.generateDevice(username);

  try {
    const profile = await client.account.login(username, password);

    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }
}