import { Optional } from 'sequelize';

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
import User from './User';
import SiteTheme from './SiteTheme';

export type UserThemeCreationAttributes = Optional<UserTheme, 'id'>;

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})

export default class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    themeId!: string;

  @Column(DataType.STRING)
    device!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
    ownerId!: string;
}
