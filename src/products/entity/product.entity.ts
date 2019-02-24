import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: true })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ length: 200, nullable: true })
    location: string;

    @Column('text', { nullable: true })
    image: string;

    @Column({ nullable: true })
    date: Date;
    
    @Column({ nullable: true })
    count: number;

    @Column({ nullable: true })
    country: string;

    @Column('text', { nullable: true })
    comment: string;
}
