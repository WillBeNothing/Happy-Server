import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.json('A validation errors occured.');
  }

  console.log(error);

  return res.status(200).json({
    error: 'An internal error occured.',
  });
};

export default errorHandler;
