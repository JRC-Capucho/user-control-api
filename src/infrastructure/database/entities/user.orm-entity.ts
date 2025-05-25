import { IUserProps } from 'src/domain/entities/user.entity'
import { Role } from 'src/domain/enum/roles.enum'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class UserOrmEntity implements IUserProps {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column({ unique: true })
  email: string
  @Column()
  password: string
  @Column()
  role: Role
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt?: Date | undefined
}
