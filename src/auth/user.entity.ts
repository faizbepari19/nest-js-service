import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Tasks } from '../tasks/tasks.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
    })
    user_name: string;

    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: true,
    })
    reset_token: string;

    @Column({ type: "datetime", nullable: true })
    reset_token_expry;

    // Establishing a One-to-Many relationship with Task entity
    @OneToMany(() => Tasks, task => task.user)
    tasks: Tasks[];

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

}