import { Entity,PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Customers extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    mobilePhone: string;

    @Column()
    balance: number;
}
