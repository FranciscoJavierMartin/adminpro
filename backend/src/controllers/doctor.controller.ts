import { Request, Response } from 'express';
import {
  CreateDoctorRequestBody,
  UpdateDoctorRequestBody,
} from 'requests/doctor.request';
import {
  CreateDoctorResponse,
  DeleteDoctorResponse,
  GetDoctorsResponse,
  UpdateDoctorReponse,
} from 'responses/doctor.response';

export async function getDoctors(
  req: Request,
  res: Response<GetDoctorsResponse>
) {
  res.json({
    ok: true,
    message: 'Doctors list',
    doctors: [],
  });
}

export async function createDoctor(
  req: Request<{}, {}, CreateDoctorRequestBody>,
  res: Response<CreateDoctorResponse>
) {
  res.json({
    ok: true,
    message: 'Doctor created',
  });
}

export async function updateDoctor(
  req: Request<{ id: string }, {}, UpdateDoctorRequestBody>,
  res: Response<UpdateDoctorReponse>
) {
  res.json({
    ok: true,
    message: 'Doctor updated',
  });
}

export async function deleteDoctor(
  req: Request<{ id: string }>,
  res: Response<DeleteDoctorResponse>
) {
  res.json({
    ok: true,
    message: 'Doctor deleted',
  });
}
