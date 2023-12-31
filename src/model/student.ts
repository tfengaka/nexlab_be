import { Optional } from 'sequelize';
import { BelongsToMany, Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import Class from './class';
import Enrollment from './enrollment';
import OTPCode from './otp_code';

export interface IStudentAttributes {
  id: string;
  full_name: string;
  email: string;
  password: string;
  verified_at: Date;
  status: Status;
}
interface IStudentCreationAttributes extends Optional<IStudentAttributes, 'id' | 'status' | 'verified_at'> {}

@Table({ tableName: 'student' })
class Student extends Model<IStudentAttributes, IStudentCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address!',
      },
    },
  })
  email!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  verified_at!: Date;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @BelongsToMany(() => Class, () => Enrollment)
  class_enrollment!: Class[];

  @HasMany(() => OTPCode)
  otp_codes!: OTPCode[];
}

export default Student;
