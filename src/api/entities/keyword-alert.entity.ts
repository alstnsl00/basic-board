import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KeywordAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 100 })
  keyword: string;
}
