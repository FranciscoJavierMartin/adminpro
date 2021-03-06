import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from 'models';
import {
  CreateUserRequestBody,
  UpdateUserRequestBody,
} from 'requests/user.request';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUsersResponse,
  UpdateUserReponse,
} from 'responses/user.response';
import { generateJWT } from 'helpers/jwt';

export async function getUsers(
  req: Request<{}, {}, {}, { from: number }>,
  res: Response<GetUsersResponse>
) {
  const from: number = req.query.from || 0;

  const [total, users] = await Promise.all([
    User.count(),
    User.find({}, 'name email role, google').skip(from).limit(5),
  ]);

  res.json({
    ok: true,
    message: 'Users list',
    users,
    total,
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
