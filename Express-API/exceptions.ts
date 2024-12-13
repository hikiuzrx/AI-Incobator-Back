export class BaseException extends Error {
     public statusCode: number;
     public details?: any;
   
     constructor(message: string, statusCode: number, details?: any) {
       super(message);
       this.statusCode = statusCode;
       this.details = details;
       Error.captureStackTrace(this, this.constructor);
     }
   }
   export class NotFoundException extends BaseException {
     constructor(resource: string, details?: any) {
       super(`${resource} not found.`, 404, details);
     }
   }
   export class ValidationException extends BaseException {
     constructor(errors: any) {
       super('Validation failed.', 400, errors);
     }
   }
   export class UnauthorizedException extends BaseException {
     constructor(details?: any) {
       super('Unauthorized access.', 401, details);
     }
   }
  export class ForbiddenException extends BaseException {
     constructor(details?: any) {
       super('Access forbidden.', 403, details);
     }
   }
   export class ConflictException extends BaseException {
     constructor(resource: string, details?: any) {
       super(`${resource} already exists.`, 409, details);
     }
   }
   export class EnvMissingException extends Error {
     public name: string;
   
     constructor(variableName: string) {
       super(`Environment variable missing: ${variableName}`);
       this.name = 'EnvMissingException';
       Error.captureStackTrace(this, this.constructor);
     }
   }
   export class TokenGenerationException extends Error {
     public originalError: any;
     public name: string;
   
     constructor(message: string, originalError: any) {
       super(message);
       this.name = 'TokenGenerationException';
       this.originalError = originalError;
       Error.captureStackTrace(this, this.constructor);
     }
   }