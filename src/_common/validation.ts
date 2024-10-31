import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodIssue, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const parsed = this.schema.safeParse(value);
    if (parsed.success) return parsed.data;

    const errors = parsed.error.errors;
    console.error(`validation.ts:${/*LL*/ 15}`, { metadata, errors });
    throw new BadRequestException(errors);
  }
}

export const handleValidationErrorOnController = (errors: ZodIssue[]) => {
  console.error(`validation.ts:${/*LL*/ 15}`, { zodIssues: errors });
  throw new BadRequestException(errors);
};
