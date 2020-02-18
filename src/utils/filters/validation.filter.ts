import { ValidationException } from './validation.exception';
import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: any, host: import('@nestjs/common').ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(400).json({
            statusCode: 400,
            createdBy: 'ValidationFilter',
            validationErrors: exception.validationErrors,
        });
    }
}