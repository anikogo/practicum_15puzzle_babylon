const {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  HasMany,
  DataType,
} = require('sequelize-typescript');
import { Optional } from 'sequelize';

import Comment from './Comment';
import User from './User';

interface TopicAttributes {
  id: number;
  title: string;
  description: string;
  created_by: number;
}
export interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}
export type TopicCreationFN = (topicAttributes: TopicCreationAttributes) => void;

@Table({
  timestamps: true,
  tableName: 'topics',
  modelName: 'Topic',
})

export default class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  created_by: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
