import { CommonResponse } from 'responses';

export interface GetDoctorsResponse extends CommonResponse {
  doctors: any[];
}

export interface CreateDoctorResponse extends CommonResponse {
  doctor?: any;
}

export interface UpdateDoctorReponse extends CommonResponse {
  doctor?: any;
}

export interface DeleteDoctorResponse extends CommonResponse {}
