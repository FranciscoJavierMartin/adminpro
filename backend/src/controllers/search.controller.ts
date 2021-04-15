import { Request, Response } from 'express';
import { Doctor, Hospital, User } from 'models';
import { GetSearchResponse } from 'responses/search.response';

export async function getSearch(
  req: Request<{ criteria: string }>,
  res: Response<GetSearchResponse>
) {
  const regex = new RegExp(req.params.criteria, 'i');
  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    message: 'Users list',
    users,
    hospitals,
    doctors,
  });
}
