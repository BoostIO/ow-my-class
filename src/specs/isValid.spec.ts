import test from 'ava'
import ow from 'ow'
import Omc, { isValid } from '..'

test('it returns true if valid', t => {
  class User {
    @Omc(ow.string.minLength(4))
    name!: string
  }

  const result = isValid(
    {
      name: 'yolo'
    },
    User
  )

  t.true(result)
})

test('it returns false if not valid', t => {
  class User {
    @Omc(ow.string.minLength(5))
    name!: string
  }

  const result = isValid(
    {
      name: 'yolo'
    },
    User
  )

  t.false(result)
})

test('it throws when no properties with Omc decorator', t => {
  class User {
    name?: string
  }

  t.throws(
    () => {
      isValid(
        {
          name: 'yolo'
        },
        User
      )
    },
    {
      name: 'ValidationError',
      message: 'Nothing to validate.'
    }
  )
})
