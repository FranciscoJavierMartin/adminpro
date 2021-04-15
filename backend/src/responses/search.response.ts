import { CommonResponse } from 'responses';

export interface GetSearchResponse extends CommonResponse {
  users?: any[];
  doctors?: any[];
  hospitals?: any[];
}
