import { Request, Response } from 'express';
import { Hospital } from 'models';
import {
  CreateHospitalRequestBody,
  UpdateHospitalRequestBody,
} from 'requests/hospital.request';
import {
  CreateHospitalResponse,
  DeleteHospitalResponse,
  GetHospitalsResponse,
  UpdateHospitalReponse,
} from 'responses/hospital.response';

export async function getHospitals(
  req: Request,
  res: Response<GetHospitalsResponse>
) {
  const hospitals = await Hospital.find().populate('user', {
    _id: 0,
    name: 1,
    email: 1,
  });
  res.json({
    ok: true,
    message: 'Hospital list',
    hospitals,
  });
}

export async function createHospital(
  req: Request<{}, {}, CreateHospitalRequestBody>,
  res: Response<CreateHospitalResponse>
) {
  const id = (req as any).id;
  const hospital = new Hospital({
    user: id,
    ...req.body,
  });

  try {
    const hospitalSaved = await hospital.save();
    await res.json({
      ok: true,
      message: 'Hospital created',
      hospital: hospitalSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error: ${error.toString()}`,
    });
  }
}

export async function updateHospital(
  req: Request<{ id: string }, {}, UpdateHospitalRequestBody>,
  res: Response<UpdateHospitalReponse>
) {
  res.json({
    ok: true,
    message: 'Hospital updated',
  });
}

export async function deleteHospital(
  req: Request<{ id: string }>,
  res: Response<DeleteHospitalResponse>
) {
  res.json({
    ok: true,
    message: 'Hospital deleted',
  });
}
