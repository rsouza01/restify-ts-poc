import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { SignupController } from './genericUseCaseController';

import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';

class GenericUseCaseHandler extends ApiHandler {
	constructor() {
		super(HttpVerb.POST, '/genericuc');
	}

	handler(req: Request, res: Response, next: Next): void {

		// res.send(await produtoService.list());

		// const controller = new SignupController({});
		// return controller.handler(event, context);

		console.debug(`>>>>>>>> CALLED <<<<<<<<<<<`);
		res.send({});
		next();
	}


	execute(req: Request, res: Response, next: Next): void {

		// res.send(await produtoService.list());

		// const controller = new SignupController({});
		// return controller.handler(event, context);

		console.debug(`>>>>>>>> CALLED <<<<<<<<<<<`);
		res.send({});
		next();
	}

}

const apiHandler: ApiHandler = new GenericUseCaseHandler();

export { apiHandler }
