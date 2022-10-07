/* eslint-disable import/no-cycle */
import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import User from './User';
import Comment from './Comment';

interface LikeAttributes {
  id: number;
  comment_id: number;
  user_id: number;
}

export type LikeCreationAttributes = Optional<LikeAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'likes',
  modelName: 'Like',
})
export default class Like extends Model<LikeAttributes, LikeCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    comment_id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    user_id!: number;
}
