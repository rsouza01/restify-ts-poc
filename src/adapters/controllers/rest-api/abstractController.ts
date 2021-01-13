import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '../../../usecases/ports/infrastructure';
import { Response, Session } from '../models';

export default abstract class AbstractController {
  protected abstract execute(event: any, context: any, session: Session, logger: Logger): Promise<Response>;

  async handler(request: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    return {
      statusCode: 200,
      body: 'AbstractController.handler',
    } as APIGatewayProxyResult;
  }
}
