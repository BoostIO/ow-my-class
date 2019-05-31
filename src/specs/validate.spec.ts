import test from 'ava'
import ow from 'ow'
import Omc, { validate } from '..'

test('it validates a property', t => {
  class User {
    @Omc(ow.string.minLength(4))
    name!: string
  }

  validate(
    {
      name: 'yolo'
    },
    User
  )
  t.pass()
})

test('it validates multiple properties', t => {
  class User {
    @Omc(ow.string.minLength(4))
    name!: string

    @Omc(ow.number.integer.greaterThan(20))
    age!: number
  }

  validate(
    {
      name: 'yolo',
      age: 21
    },
    User
  )
  t.pass()
})

test('it throws when no properties to validate', t => {
  class User {
    name?: string
  }

  t.throws(
    () => {
      validate(
        {
          name: 'yolo'
        },
        User
      )
    },
    {
      name: 'ValidationError'
    }
  )
})

test('it throws if value is not valid', t => {
  class User {
    @Omc(ow.string.minLength(5))
    name!: string
  }

  t.throws(
    () => {
      validate(
        {
          name: 'yolo'
        },
        User
      )
    },
    {
      name: 'ValidationError'
    }
  )
})

test('it throws if there are any invalid properties', t => {
  class User {
    @Omc(ow.string.minLength(4))
    name!: string

    @Omc(ow.number.integer.greaterThan(20))
    age!: number
  }

  t.throws(
    () => {
      validate(
        {
          name: 'yolo',
          age: 1
        },
        User
      )
    },
    {
      name: 'ValidationError'
    }
  )
})

test('it handles multiple argument errors from ow', t => {
  class User {
    @Omc(ow.string.minLength(5))
    name!: string

    @Omc(ow.number.integer.greaterThan(20))
    age!: number
  }

  t.throws(
    () => {
      validate(
        {
          name: 'yolo',
          age: 1
        },
        User
      )
    },
    {
      name: 'ValidationError',
      message: /2 ArgumentErros are found/
    }
  )
})
