import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from 'models';
import {
  GoogleSignInrRequestBody,
  LoginRequestBody,
} from 'requests/auth.request';
import {
  GoogleSignInResponse,
  LoginResponse,
  RenewTokenResponse,
} from 'responses/auth.response';
import { generateJWT } from 'helpers/jwt';
import { googleVerify } from 'helpers/google-verify';

export async function login(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response<LoginResponse>
) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const validPassword = bcrypt.compareSync(
        password,
        (user as any).password
      );

      if (validPassword) {
        const token = await generateJWT(user.id);
        res.status(200).json({
          ok: true,
          message: 'Login success',
          token,
        });
      } else {
        res.status(400).json({
          ok: false,
          message: 'Email or password invalid',
        });
      }
    } else {
      res.status(400).json({
        ok: false,
        message: 'Email or password invalid',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error: ${error.toString()}`,
    });
  }
}

export async function googleSignIn(
  req: Request<{}, {}, GoogleSignInrRequestBody>,
  res: Response<GoogleSignInResponse>
) {
  try {
    const { name, email, picture } = await googleVerify(req.body.token);

    const userFromDB = await User.findOne({ email });

    const user = userFromDB
      ? { ...userFromDB, google: true }
      : new User({
          name,
          email,
          password: '@@@',
          img: picture,
          google: true,
        });

    const userSaved = await (user as any).save();
    const token = await generateJWT(userSaved.id);

    res.json({
      ok: true,
      message: 'Google SignIn',
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }
}

export async function renewToken(
  req: Request,
  res: Response<RenewTokenResponse>
) {
  try {
    const id = (req as any).id;
    const token = await generateJWT((req as any).id);
    const user = await User.findById(id);
    res.json({
      ok: true,
      message: 'Renew token success',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Error on renew token ${error.toString()}`,
    });
  }
}
