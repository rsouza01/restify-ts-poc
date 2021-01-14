import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GenericUseCaseController } from './genericUseCaseController';

import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';

class GenericUseCaseHandler extends ApiHandler {
	constructor() {
		super(new GenericUseCaseController({}), HttpVerb.POST, '/genericuc');
	}

	protected execute(req: Request, res: Response, next: Next): void {

		// res.send(await produtoService.list());

		// const controller = new SignupController({});
		// return controller.handler(event, context);

		console.debug(`>>>>>>>> CALLED GenericUseCaseHandler.execute <<<<<<<<<<<`);
		res.send({});
		next();
	}
}

export default GenericUseCaseHandler;
