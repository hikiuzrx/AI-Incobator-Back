import { Request, Response, NextFunction } from 'express';
import {
  BaseException,
  EnvMissingException,
  TokenGenerationException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  ValidationException,
  NotFoundException,
} from '../types'; // Adjust the path to your exceptions file

/**
 * Global error-handling middleware for Express
 */
export const errorHandler = (
  err: Error|BaseException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error] ${err.name}: ${err.message}`); // Log the error for debugging

  // Handle specific exception types
  if (err instanceof BaseException) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else if (err instanceof ValidationException) {
    res.status(400).json({
      success: false,
      message: err.message,
      errors: err.details || null, // Use `details` to store validation errors
    });
  } else if (err instanceof NotFoundException) {
    res.status(404).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else if (err instanceof ConflictException) {
    res.status(409).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else if (err instanceof ForbiddenException) {
    res.status(403).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else if (err instanceof UnauthorizedException) {
    res.status(401).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else if (err instanceof EnvMissingException) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } else if (err instanceof TokenGenerationException) {
    res.status(500).json({
      success: false,
      message: err.message,
      originalError: err.originalError || null,
    });
  } else {
    // Handle generic errors
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message || null,
    });
  }
};
