import { randomUUID } from 'node:crypto';
import type { Role } from '../enum/roles.enum';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
}

export class User {
  private readonly _id: string;

  constructor(
    private readonly props: IUserProps,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
  }

  static create(props: IUserProps, id?: string) {
    return new User(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): Role {
    return this.props.role;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  set name(newName: string) {
    this.props.name = newName;
    this.update();
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
    this.update();
  }

  set role(newRole: Role) {
    this.props.role = newRole;
    this.update();
  }

  private update() {
    this.props.updatedAt = new Date();
  }
}
