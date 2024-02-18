import { Controller, Get, Post, Body, Param, Put, Patch, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { ResponseDto } from '../common/response.dto';
import { CreateTaskDto } from '../common/request.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    //create task
    @Post()
    async create(@Body() task: CreateTaskDto): Promise<ResponseDto> {
        const task_record = await this.tasksService.create(task);
        return new ResponseDto({
            statusCode: 200,
            message: 'Task created',
            data: task_record
        });
    }

    //get all tasks
    @Get()
    async findAll(): Promise<ResponseDto> {
        const task_record = await this.tasksService.findall();
        return new ResponseDto({
            statusCode: 200,
            message: 'Task lists',
            data: task_record
        });
    }

    //complete task
    @Put('complete/:id')
    async complete(@Param('id') id: number): Promise<ResponseDto> {
        //handle the error if task not found
        const valid_task = await this.tasksService.findOne(id);
        if (!valid_task) {
            throw new NotFoundException('Task not found');

        }
        const task_record = this.tasksService.complete(id);
        return new ResponseDto({
            statusCode: 200,
            message: 'Task completed',
            data: task_record
        });
    }

    //update task
    @Put(':id')
    async update(@Param('id') id: number, @Body() task: Tasks): Promise<ResponseDto> {
        //handle the error if task not found
        const valid_task = await this.tasksService.findOne(id);
        if (!valid_task) {
            throw new NotFoundException('Task not found');
        }
        if (valid_task.status) {
            throw new Error('Cannot edit a completed task');
        }
        const task_record = this.tasksService.update(id, task);
        return new ResponseDto({
            statusCode: 200,
            message: 'Task updated',
            data: task_record
        });
    }

    //delete user
    @Patch(':id')
    async delete(@Param('id') id: number): Promise<ResponseDto> {
        //handle the error if task not found
        const task = await this.tasksService.findOne(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.tasksService.delete(id);
        return new ResponseDto({
            statusCode: 200,
            message: 'Task deleted'
        });
    }
}
