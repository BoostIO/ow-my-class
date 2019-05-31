# `ow-my-class`

Validate a plain object with a class and make it type-safe!

## Usage

```sh
npm i ow ow-my-class
```

```ts
import Omc from 'ow-my-class'
import ow from 'ow'

class User {
  @Omc(ow.string.minLength(5))
  name: string
}

// Return false
const result = Omc.isValid(
  {
    name: 'yolo'
  },
  User
)

// Throw ValidationError
Omc.validate(
  {
    name: 'yolo'
  },
  User
)

// Transform plain object into User instance
const user = Omc.validate(
  {
    name: 'yolo yolo'
  },
  User
)
```

## License

MIT
