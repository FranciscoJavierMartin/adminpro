export interface CreateDoctorRequestBody {
  name: string;
  password: string;
  email: string;
}

export interface UpdateDoctorRequestBody {
  name: string;
  email: string;
}
