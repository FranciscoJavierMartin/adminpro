import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_ID);

export async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });

  const payload = ticket.getPayload();
  const userId = payload['sub'];

  const { name, email, picture } = payload;

  return {
    name,
    email,
    picture,
  };
}
