import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from 'models';
import { CreateUserRequestBody } from 'requests/users';
import { CreateUserResponse, GetUsersResponse } from 'responses/users';

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
      await user.save();

      res.json({
        ok: true,
        message: 'User added',
        user,
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
