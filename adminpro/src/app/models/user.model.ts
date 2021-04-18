import { environment } from 'src/environments/environment';
import { UserRoles } from '../constants/roles';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: UserRoles,
    public id?: string
  ) {}

  get imageUrl(): string {
    const image = this.img ?? 'no-image.png';
    return `${environment.base_url}upload/users/${image}`;
  }
}
