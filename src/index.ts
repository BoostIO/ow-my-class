import ow, { BasePredicate } from 'ow'
import { ValidationError, isValidationError } from './ValidationError'
import { Class } from 'type-fest'

export type ClassType<T> = {
  new (...args: any[]): T
}

interface PropertyPredicate {
  propertyName: string
  predicate: BasePredicate<any>
}

const propertyPredicateListMap = new Map<any, PropertyPredicate[]>()

export function Omc(predicate: BasePredicate<any>) {
  return function validateDecorator(target: any, propertyName: string): void {
    const Constructor = target.constructor
    let propertyPredicateList = propertyPredicateListMap.get(Constructor)
    if (propertyPredicateList == null) {
      propertyPredicateList = []
      propertyPredicateListMap.set(Constructor, propertyPredicateList)
    }

    propertyPredicateList.push({
      propertyName,
      predicate
    })
  }
}

export default Omc

export interface ValidateOptions {
  bail?: boolean
}

export function validate<C extends {}>(
  value: object,
  Constructor: Class<C>,
  options: ValidateOptions = {}
): void {
  options = {
    bail: false,
    ...options
  }
  const propertyPredicateList = propertyPredicateListMap.get(Constructor)
  if (propertyPredicateList == null) {
    throw new ValidationError()
  }
  const errors: Error[] = []

  propertyPredicateList.map(({ propertyName, predicate }) => {
    const targetValue = (value as any)[propertyName]
    try {
      ow(targetValue, propertyName, predicate)
    } catch (error) {
      errors.push(error)
      if (options.bail) throw new ValidationError(errors)
    }
  })

  if (errors.length > 0) {
    throw new ValidationError(errors)
  }
}

export function isValid<C extends {}, K>(
  value: object,
  Constructor: Class<C>
): boolean {
  try {
    validate(value, Constructor, { bail: true })
  } catch (error) {
    if (!isValidationError(error) || error.errors.length === 0) {
      throw error
    }
    return false
  }
  return true
}

export function transform<C>(
  value: object,
  Constructor: Class<C>,
  options: ValidateOptions = {}
): C {
  validate(value, Constructor, options)

  const propertyPredicateList = propertyPredicateListMap.get(Constructor)!
  const propertyNameSet = propertyPredicateList.reduce(
    (set, propertyPredicate) => {
      set.add(propertyPredicate.propertyName)
      return set
    },
    new Set()
  )

  return [...propertyNameSet].reduce((dto, propertyName) => {
    dto[propertyName] = value[propertyName]
    return dto
  }, new Constructor())
}

export { ValidationError, isValidationError }
