/* eslint-disable import/no-cycle */
import { Optional } from 'sequelize';
import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import User from './User';
import Topic from './Topic';
import Like from './Like';

export interface CommentAttributes {
  id: number;
  content: string;
  userId: number;
  parentId?: number;
  topicId: number;
}
export type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'comments',
  modelName: 'Comment',
})

export default class Comment extends Model<
CommentAttributes,
CommentCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @Column(DataType.STRING)
    content!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    userId!: number;

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
    parentId!: number;

  // @BelongsTo(() => Comment)
  //   parent!: Comment;

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column
    topicId!: number;

  @BelongsTo(() => Topic)
    topic!: Topic;

  @HasMany(() => Like)
    likes!: Like[];
}
