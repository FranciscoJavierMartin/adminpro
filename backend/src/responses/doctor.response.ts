import { CommonResponse } from 'responses';

export interface GetDoctorsResponse extends CommonResponse {
  doctors: any[];
}

export interface CreateDoctorResponse extends CommonResponse {}

export interface UpdateDoctorReponse extends CommonResponse {}

export interface DeleteDoctorResponse extends CommonResponse {}
