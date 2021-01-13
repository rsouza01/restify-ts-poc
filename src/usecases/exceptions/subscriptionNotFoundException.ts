import { ErrorSeverity, BaseError } from '../infrastructure';
import { ExceptionCode } from './exceptionCode'

export default class SubscriptionNotFoundException extends BaseError {
  constructor(error: Error, data?: any) {
    super(
      {
        code: ExceptionCode.SUBSCRIPTION_NOT_FOUND,
        message: error.message ? error.message : 'subscription not found',
        severity: ErrorSeverity.ERROR,
        error,
      },
      data,
    );
  }
}
