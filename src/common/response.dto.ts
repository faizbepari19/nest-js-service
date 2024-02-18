export class ResponseDto {
    status_code: number;
    message: string;
    data?: any;

    constructor({ statusCode, message, data }: { statusCode: number; message: string; data?: any }) {
        this.status_code = statusCode;
        this.message = message;
        this.data = data;
    }
}