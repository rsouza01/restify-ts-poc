import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { SignupController } from './genericUseCaseController';

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const controller = new SignupController({});
  return controller.handler(event, context);
};
