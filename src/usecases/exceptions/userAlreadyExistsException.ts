import { ErrorSeverity, BaseError } from '../infrastructure';
import { ExceptionCode } from './exceptionCode'

export default class UserAlreadyExistsException extends BaseError {
  constructor(error: Error, data?: any) {
    super(
      {
        code: ExceptionCode.USER_ALREADY_REGISTERED,
        message: error.message ? error.message : 'user already registered',
        severity: ErrorSeverity.ERROR,
        error,
      },
      data,
    );
  }
}
