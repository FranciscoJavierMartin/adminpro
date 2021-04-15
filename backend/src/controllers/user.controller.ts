import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from 'models';
import {
  CreateUserRequestBody,
  LoginRequestBody,
  UpdateUserRequestBody,
} from 'requests/user.request';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUsersResponse,
  LoginResponse,
  UpdateUserReponse,
} from 'responses/user.response';
import { generateJWT } from 'helpers/jwt';

export async function getUsers(req: Request, res: Response<GetUsersResponse>) {
  const users = await User.find({}, 'name email role, google');
  res.json({
    ok: true,
    message: 'Users list',
    users,
  });
}

export async function createUser(
  req: Request<{}, {}, CreateUserRequestBody>,
  res: Response<CreateUserResponse>
) {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      res.status(400).json({
        ok: false,
        message: 'Email is already in use',
      });
    } else {
      const user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      (user as any).password = bcrypt.hashSync(req.body.password, salt);
      const userSaved = await user.save();

      const token = await generateJWT(userSaved.id);
      res.json({
        ok: true,
        message: 'User added',
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: `Something went wrong ${error.toString()}`,
    });
  }
}

export async function updateUser(
  req: Request<{ id: string }, {}, UpdateUserRequestBody>,
  res: Response<UpdateUserReponse>
) {
  const { id } = req.params;
  const { ...fields } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      if (fields.email !== (user as any).email) {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
          res.status(400).json({
            ok: false,
            message: 'Email is already taken',
          });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...fields },
        {
          new: true,
        }
      );

      res.json({ ok: true, message: 'User updated', user: updatedUser });
    } else {
      res.status(404).json({
        ok: false,
        message: 'User does not exist on database',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error ${error.toString()}`,
    });
  }
}

export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response<DeleteUserResponse>
) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      await User.findByIdAndDelete(id);
      res.json({
        ok: true,
        message: 'User deleted',
      });
    } else {
      res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error ${error.toString()}`,
    });
  }
}

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
