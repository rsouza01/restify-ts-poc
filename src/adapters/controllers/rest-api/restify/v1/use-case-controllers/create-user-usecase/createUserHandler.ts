
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';
import { CreateUserController } from './createUserController';

class CreateUserHandler extends ApiHandler {
	constructor() {
		super(new CreateUserController({}), HttpVerb.POST, '/users');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		console.debug(`>>>>>>>> CALLED CreateUserHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {});

		return useCaseResponse;
	}
}

export default CreateUserHandler;
