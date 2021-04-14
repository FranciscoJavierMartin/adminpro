import { ValidationError } from 'express-validator';

export interface CommonResponse {
  ok: boolean;
  message: string;
  errors?: Record<string, ValidationError>; 
}