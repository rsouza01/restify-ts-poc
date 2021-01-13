import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { SignupController } from './genericUseCaseController';

import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';

function handler(req: Request, res: Response, next: Next): void {

	// res.send(await produtoService.list());

	// const controller = new SignupController({});
  // return controller.handler(event, context);
	res.send({});
}

const apiHandler: ApiHandler = {
	verb: HttpVerb.POST,
	endpoint: 'genericuc',
	handler
}

export { apiHandler }
