import jwt from 'jsonwebtoken';

export function generateJWT(id: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = {
      id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('JWT could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
}
