import { isValidationError, ValidationError } from '..'
import test from 'ava'

test('it returns true when value is ValidationError', t => {
  const result = isValidationError(new ValidationError())

  t.true(result)
})

test('it returns false when value is NOT ValidationError', t => {
  const result = isValidationError(new Error())

  t.false(result)
})
