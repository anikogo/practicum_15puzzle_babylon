import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  external_id: number;
  avatar_path: string;
  display_name: string;
  email: string;
  hash: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  external_id: number;

  @Column(DataType.STRING)
  avatar_path: string;

  @Column(DataType.STRING)
  display_name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  hash: string;
}
