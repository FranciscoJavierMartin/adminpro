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
  const doctors = await Doctor.find()
    .populate('user', {
      _id: 0,
      name: 1,
      email: 1,
    })
    .populate('hospital', { _id: 0, name: 1 });
  res.json({
    ok: true,
    message: 'Doctors list',
    doctors,
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
  const { id } = req.params;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: (req as any).id,
      },
      {
        new: true,
      }
    );

    if (updatedDoctor) {
      res.json({
        ok: true,
        message: 'Doctor updated',
        doctor: updatedDoctor,
      });
    } else {
      res.status(404).json({
        ok: false,
        message: 'Doctor not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error ${error.toString()}`,
    });
  }
}

export async function deleteDoctor(
  req: Request<{ id: string }>,
  res: Response<DeleteDoctorResponse>
) {
  const { id } = req.params;

  try {
    const doctorDeleted = await Doctor.findByIdAndDelete(id);

    if (doctorDeleted) {
      res.json({
        ok: true,
        message: 'Doctor deleted',
      });
    } else {
      res.status(404).json({
        ok: false,
        message: 'Doctor not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: `Unexpected error ${error.toString()}`,
    });
  }
}
