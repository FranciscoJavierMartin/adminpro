import { CommonResponse } from 'responses';

export interface GetHospitalsResponse extends CommonResponse {
  hospitals: any[];
}

export interface CreateHospitalResponse extends CommonResponse {
  hospital?: any;
}

export interface UpdateHospitalReponse extends CommonResponse {}

export interface DeleteHospitalResponse extends CommonResponse {}
