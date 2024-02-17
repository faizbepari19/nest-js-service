import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('user_tasks')
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    description: string;

    @Column({
        default: 0
    })
    status: boolean;

    // Establishing Many-to-One relationship with User entity
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' }) // name of the foreign key column in the Task table
    user: User;

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @DeleteDateColumn({
        nullable: true
    })
    deleted_at: Date; // Last updated date

}