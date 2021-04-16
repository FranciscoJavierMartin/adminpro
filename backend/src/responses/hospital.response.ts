import { CommonResponse } from 'responses';

export interface GetHospitalsResponse extends CommonResponse {
  hospitals: any[];
}

export interface CreateHospitalResponse extends CommonResponse {
  hospital?: any;
}

export interface UpdateHospitalReponse extends CommonResponse {
  hospital?: any;
}

export interface DeleteHospitalResponse extends CommonResponse {}
