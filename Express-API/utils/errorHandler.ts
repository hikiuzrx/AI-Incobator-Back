import { 
     NotFoundException, 
     ValidationException, 
     UnauthorizedException, 
     ForbiddenException, 
     ConflictException, 
     EnvMissingException, 
     TokenGenerationException 
   } from '../exceptions'; // Adjust this import path if necessary
   
   import { Request, Response, NextFunction } from 'express';
   
   export const errorHandler = (err: Error, res: Response, next: NextFunction) => {
     if (res.headersSent) {
       return next(err); // Skip if headers are already sent
     }
   
     let statusCode = 500; // Default status code for server errors
     let message = 'An unexpected error occurred';
     let details: any = undefined;
   
     // Handle specific exceptions
     if (err instanceof NotFoundException) {
       statusCode = 404;
       message = err.message;
       details = err.details;
     } else if (err instanceof ValidationException) {
       statusCode = 400;
       message = err.message;
       details = err.details;
     } else if (err instanceof UnauthorizedException) {
       statusCode = 401;
       message = err.message;
       details = err.details;
     } else if (err instanceof ForbiddenException) {
       statusCode = 403;
       message = err.message;
       details = err.details;
     } else if (err instanceof ConflictException) {
       statusCode = 409;
       message = err.message;
       details = err.details;
     } else if (err instanceof EnvMissingException) {
       statusCode = 500;
       message = err.message;
       details = { variable: err.message.split(': ')[1] }; // Extract missing variable name
     } else if (err instanceof TokenGenerationException) {
       statusCode = 500;
       message = err.message;
       details = err.originalError;
     }
   
     // Send the response
     res.status(statusCode).json({
       status: 'error',
       message,
       details: details || undefined,
     });
   };
   
   export default errorHandler