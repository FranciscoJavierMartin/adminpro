import { Request, Response } from 'express';
import { Doctor } from 'models';
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
  const id = (req as any).id;
  const doctor = new Doctor({
    user: id,
    ...req.body,
  });

  try {
    const doctorSaved = await doctor.save();
    res.json({
      ok: true,
      message: 'Doctor created',
      doctor: doctorSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error: ${error.toString()}`,
    });
  }
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
