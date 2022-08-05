import type { Request, Response, NextFunction } from 'express';
import { ValidationError, AnyObjectSchema } from 'yup';
import type { ValidateOptions } from 'yup/lib/types';

const defaultOptions: ValidateOptions = {
  abortEarly: false,
  stripUnknown: true,
};

export const validateBody = (schema: AnyObjectSchema, options: ValidateOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const actualOptions = { ...defaultOptions, ...options };

    try {
      req.body = await schema.validate(req.body, actualOptions);
      next();
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }

      const publicErrors = error.inner.map(innerError => {
        return {
          value: innerError.value,
          path: innerError.path,
          errors: innerError.errors,
          params: innerError.params,
        };
      });

      res.status(400).json({
        errors: publicErrors,
      });
    }
  }
}
