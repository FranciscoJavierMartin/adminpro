import { Request, Response } from 'express';
import { Doctor, Hospital, User } from 'models';
import { GetSearchResponse } from 'responses/search.response';

export async function getSearch(
  req: Request<{ criteria: string }>,
  res: Response<GetSearchResponse>
) {
  const regex = new RegExp(req.params.criteria, 'i');

  try {
    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);

    const total = (
      await Promise.all([
        User.count({ name: regex }),
        Doctor.count({ name: regex }),
        Hospital.count({ name: regex }),
      ])
    ).reduce((acc: number, val: number) => acc + val, 0);

    res.json({
      ok: true,
      message: `Search result. ${total} matches`,
      users,
      hospitals,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error. ${error.toString()}`,
    });
  }
}

export async function getSearchByCollection(
  req: Request<{ collection: string; criteria: string }>,
  res: Response<GetSearchResponse>
) {
  const regex = new RegExp(req.params.criteria, 'i');

  // switch(req.params.collection){
  //   case 'hospitals':
  //     break;
  //     case 'users':
  //       break;
  //       case 'doctors':
  //         break;
  //         default:
  // }
  // const [users, doctors, hospitals] = await Promise.all([
  //   User.find({ name: regex }),
  //   Doctor.find({ name: regex }),
  //   Hospital.find({ name: regex }),
  // ]);

  // res.json({
  //   ok: true,
  //   message: 'Users list',
  //   users,
  //   hospitals,
  //   doctors,
  // });
}
