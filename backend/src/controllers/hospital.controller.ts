import { Request, Response } from 'express';
import {
  CreateDoctorRequestBody,
  UpdateDoctorRequestBody,
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
  res.json({
    ok: true,
    message: 'Hospital list',
    hospitals: [],
  });
}

export async function createHospital(
  req: Request<{}, {}, CreateDoctorRequestBody>,
  res: Response<CreateHospitalResponse>
) {
  res.json({
    ok: true,
    message: 'Hospital created',
  });
}

export async function updateHospital(
  req: Request<{ id: string }, {}, UpdateDoctorRequestBody>,
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
