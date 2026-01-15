import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class Transaction extends Model {
  @Column
  name: string;

  @Column
  type: string;

  @Column
  quantity: number;

  @Column
  pricePerUnit: number;

  @Column
  hasImage: boolean;
}
