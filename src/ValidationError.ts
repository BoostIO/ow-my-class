export class ValidationError extends Error {
  errors: Error[]

  constructor(errors: Error[] = []) {
    super(
      errors.length > 1
        ? `${errors.length} ArgumentErrors are found.\n\n${errors
            .map(error => error.toString())
            .join('\n')}`
        : errors.length > 0
        ? `${errors.length} ArgumentError is found.\n\n${errors
            .map(error => error.toString())
            .join('\n')}`
        : 'Nothing to validate.'
    )

    this.errors = errors
    this.name = 'ValidationError'
  }
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}
