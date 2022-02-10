const validatUsername = username => {
  if (username.length < 1) {
    return {
      valid: false,
      message: 'this field is required'
    }
  } else if (!alphaNumericRegex(username)) {
    return {
      valid: false,
      message: 'username contains invalid characters'
    }
  } else {
    return {
      valid: true,
      message: ''
    }
  }
}

const alphaNumericRegex = param => {
  return /^[a-z0-9]+$/i.test(param)
}

const validatePassword = password => {
  if (password.length < 1) {
    return {
      valid: false,
      message: 'this field is required'
    }
  } else if (password.length < 5) {
    return {
      valid: false,
      message: 'password must contain at least 5 characters'
    }
  } else {
    return {
      valid: true,
      message: ''
    }
  }
}

export {
  validatUsername,
  validatePassword
};