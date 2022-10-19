export const getSchoolTypeValue = (value: number) => {
  switch (value) {
    case 1: {
      return [`public`, `private`, `religious`]
    }
    case 2: {
      return [`public`]
    }
    case 3: {
      return [`private`]
    }
    case 4: {
      return [`religious`]
    }
    default: {
      return []
    }
  }
}
