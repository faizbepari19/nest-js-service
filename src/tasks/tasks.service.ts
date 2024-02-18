import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOperator } from 'typeorm';
import { Tasks } from './tasks.entity';

export class CreateTaskDto {
    title: string;
    description: string;
}

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) { }

    // get all tasks
    async findall(sort_by?: string, sort_order?: 'ASC' | 'DESC', filter_by?: string): Promise<Tasks[]> {
        const orderConfig: Record<string, 'ASC' | 'DESC'> = {};
        const whereConfig: Record<string, FindOperator<string>> = {}

        whereConfig[`deleted_at`] = null

        if (sort_by) {
            orderConfig[`${sort_by}`] = sort_order || 'ASC';
        }
        if(filter_by) {
            whereConfig[`title`] = Like(`%${filter_by}%`)
        }

        return this.tasksRepository.find({
            where: whereConfig,
            select: ['id', 'title', 'description', 'status', 'created_at'],
            order: orderConfig
        });
    }

    // get one task
    async findOne(id: number): Promise<Tasks> {
        return this.tasksRepository.findOne({
            where: { id, deleted_at: null },
            select: ['id', 'title', 'description', 'status', 'created_at']
        });
    }

    //create task
    async create(task: CreateTaskDto): Promise<Tasks> {
        const newTask = this.tasksRepository.create(task);
        return this.tasksRepository.save(newTask);
    }

    // update task
    async update(id: number, task: CreateTaskDto): Promise<Tasks> {
        await this.tasksRepository.update(id, task);
        return this.tasksRepository.findOne({
            where: { id },
            select: ['id', 'title', 'description', 'status', 'created_at']
        });
    }

    // complete task
    async complete(id: number): Promise<Tasks> {
        await this.tasksRepository.update(id, { status: true });
        return this.tasksRepository.findOne({
            where: { id },
            select: ['id', 'title', 'description', 'status', 'created_at']
        });
    }

    // delete task
    async delete(id: number): Promise<void> {
        await this.tasksRepository.update(id, { deleted_at: new Date() });
    }
}