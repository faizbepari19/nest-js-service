import { Controller, Get, Post, Body, Param, Put, Patch, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';

export class CreateTaskDto {
    title: string;
    description: string;
}


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    //create task
    @Post()
    async create(@Body() task: CreateTaskDto): Promise<Tasks> {
        return await this.tasksService.create(task);
    }

    //get all tasks
    @Get()
    async findAll(): Promise<Tasks[]> {
        return await this.tasksService.findall();
    }

    //complete task
    @Put('complete/:id')
    async complete(@Param('id') id: number): Promise<Tasks> {
        //handle the error if task not found
        const valid_task = await this.tasksService.findOne(id);
        if (!valid_task) {
            throw new NotFoundException('Task not found');
            
        }
        return this.tasksService.complete(id);
    }

    //update task
    @Put(':id')
    async update(@Param('id') id: number, @Body() task: Tasks): Promise<Tasks> {
        //handle the error if task not found
        const valid_task = await this.tasksService.findOne(id);
        if (!valid_task) {
            throw new NotFoundException('Task not found');
        }
        if (valid_task.status) {
            throw new Error('Cannot edit a completed task');
        }
        return this.tasksService.update(id, task);
    }



    //delete user
    @Patch(':id')
    async delete(@Param('id') id: number) {
        //handle the error if task not found
        const task = await this.tasksService.findOne(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.tasksService.delete(id);
        return { message: 'Task deleted!' }
    }
}
