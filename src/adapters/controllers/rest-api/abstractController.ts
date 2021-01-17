import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '../../../usecases/ports/infrastructure';
import { Session, UseCaseResponse } from '../models';

export default abstract class AbstractController {
  public  abstract execute(event: any, context: any, session: Session, logger?: Logger): Promise<UseCaseResponse>;
}
