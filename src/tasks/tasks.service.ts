import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    async findall(): Promise<Tasks[]> {
        return await this.tasksRepository.find({ where: { deleted_at: null } });
    }

    // get one task
    async findOne(id: number): Promise<Tasks> {
        return await this.tasksRepository.findOne({ where: { id, deleted_at: null } });
    }

    //create task
    async create(task: CreateTaskDto): Promise<Tasks> {
        const newTask = this.tasksRepository.create(task);
        return await this.tasksRepository.save(newTask);
    }

    // update task
    async update(id: number, task: CreateTaskDto): Promise<Tasks> {
        await this.tasksRepository.update(id, task);
        return await this.tasksRepository.findOne({ where: { id } });
    }

    // complete task
    async complete(id: number): Promise<Tasks> {
        await this.tasksRepository.update(id, { status: true });
        return await this.tasksRepository.findOne({ where: { id } });
    }

    // delete task
    async delete(id: number): Promise<void> {
        await this.tasksRepository.update(id, { deleted_at: new Date() });
    }
}