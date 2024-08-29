class CustomError extends Error {
  static messages = {
    notFound: 'not_found',
    invalidBody: 'check_body_infos',
    unauthorized: 'unauthorized',
    alreadyExist: 'already_exist_{param}'
  }

  constructor(messageKey, statusCode, placeHolders = {}) {
    let message = CustomError.messages[messageKey]  || 'an_generic_error_occurred';
    for(const [key, value] of Object.entries(placeHolders)) {
      message = message.replace(`{${key}}`, value);
    }
    super(message);
    this.statusCode = statusCode;
     // preventing the constructor call to appear in the stack trace
     Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
