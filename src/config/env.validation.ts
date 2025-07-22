import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

// This has to align with how NODE_ENV is set elsewhere
export enum Environment {
  Development = 'dev',
  Production = 'prod',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  INTERNAL_HOST: string;
  @IsNumber()
  @Min(0)
  @Max(65535)
  INTERNAL_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  @IsOptional()
  DB_SSL?: string; // Optional DB_SSL configuration
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    // Collect error messages for further handling
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints || {}).join(', '),
    );

    throw new Error(JSON.stringify(errorMessages));
  }

  return { validatedConfig, errors: [] };
}
