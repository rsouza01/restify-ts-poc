import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { Session } from 'inspector';
import Logger from '../../../../../usecases/ports/infrastructure/logger';
import AbstractController from '../../../abstractController';
import { Response } from '../../../models';

class SignupController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  protected async execute(event: any, context: any, session: Session, logger: Logger): Promise<Response> {
    return {
      statusCode: 200,
    } as Response;
  }
}

export { SignupController };
