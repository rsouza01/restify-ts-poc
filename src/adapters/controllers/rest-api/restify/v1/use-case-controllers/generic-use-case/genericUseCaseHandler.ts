import { GenericUseCaseController } from './genericUseCaseController';

import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';

import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';


class GenericUseCaseHandler extends ApiHandler {
	constructor() {
		super(new GenericUseCaseController({}), HttpVerb.POST, '/genericuc');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		console.debug(`>>>>>>>> CALLED GenericUseCaseHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {});

		return useCaseResponse;
	}
}

export default GenericUseCaseHandler;
