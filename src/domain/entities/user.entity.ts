import { randomUUID } from 'node:crypto'
import { Role } from '../enum/roles.enum'
import { ApiProperty } from '@nestjs/swagger'

export interface IUserProps {
  name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt?: Date
}

export class User {
  private _id: string

  constructor(
    private props: IUserProps,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
  }

  static create(props: IUserProps, id?: string) {
    return new User(props, id)
  }

  @ApiProperty()
  get name(): string {
    return this.props.name
  }

  @ApiProperty()
  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  @ApiProperty()
  get role(): Role {
    return this.props.role
  }

  @ApiProperty()
  get id(): string {
    return this._id
  }

  @ApiProperty()
  get createdAt(): Date {
    return this.props.createdAt
  }

  @ApiProperty()
  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }
  set createdAt(newCreatedAt: Date) {
    this.props.createdAt = newCreatedAt
  }

  set updatedAt(newUpdatedAt: Date | undefined) {
    this.props.updatedAt = newUpdatedAt
  }

  set id(id: string) {
    this._id = id
  }

  set name(newName: string) {
    this.props.name = newName
    this.update()
  }

  set email(newEmail: string) {
    this.props.email = newEmail
    this.update()
  }

  set role(newRole: Role) {
    this.props.role = newRole
    this.update()
  }

  private update() {
    this.props.updatedAt = new Date()
  }
}
