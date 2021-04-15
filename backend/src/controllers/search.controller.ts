import { Request, Response } from 'express';
import { Doctor, Hospital, User } from 'models';
import {
  GetSearchByCollectionResponse,
  GetSearchResponse,
} from 'responses/search.response';

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
  res: Response<GetSearchByCollectionResponse>
) {
  let result = undefined;
  const regex = new RegExp(req.params.criteria, 'i');

  try {
    switch (req.params.collection) {
      case 'hospitals':
        result = await Hospital.find({ name: regex });
        break;
      case 'users':
        result = await User.find({ name: regex });
        break;
      case 'doctors':
        result = await Doctor.find({ name: regex });
        break;
      default:
        res.status(400).json({
          ok: false,
          message:
            'Collection should be one of "users", "hospitals" or "doctors".',
        });
    }

    if (result) {
      res.json({
        ok: true,
        message: `${req.params.collection} results with criteria ${req.params.criteria}`,
        result,
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      message: `Unexpected error: ${error.toString()}`,
    });
  }
}
