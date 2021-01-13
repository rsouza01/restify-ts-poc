import { ErrorSeverity, BaseError } from '../infrastructure';
import { ExceptionCode } from './exceptionCode'

export default class UserNotFoundException extends BaseError {
  constructor(error: Error, data?: any) {
    super(
      {
        code: ExceptionCode.USER_NOT_FOUND,
        message: error.message ? error.message : 'user not found',
        severity: ErrorSeverity.ERROR,
        error,
      },
      data,
    );
  }
}
