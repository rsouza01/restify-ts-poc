import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';
import { Response } from '../../../../../models';

class GenericUseCaseController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  protected async execute(event: any, context: any, session: Session, logger: Logger): Promise<Response> {
    return {
      statusCode: 200,
    } as Response;
  }
}

export { GenericUseCaseController };
