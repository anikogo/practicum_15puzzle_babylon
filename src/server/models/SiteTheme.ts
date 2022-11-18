import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface SiteThemeAttributes {
  id: number;
  theme: string;
  description: string;
}

export type SiteThemeCreationAttributes = Optional<SiteThemeAttributes, 'id'>;

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
  modelName: 'SiteTheme',
})

export default class SiteTheme extends Model<SiteTheme, SiteThemeAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
    theme!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
    description!: string;
}
