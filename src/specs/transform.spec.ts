import test from 'ava'
import ow from 'ow'
import Omc, { transform } from '..'

test('it transforms object into class instance', t => {
  class User {
    @Omc(ow.string.minLength(4))
    name!: string
  }

  const result = transform(
    {
      name: 'yolo'
    },
    User
  )
  t.true(result instanceof User)
  t.is(result.name, 'yolo')
})
