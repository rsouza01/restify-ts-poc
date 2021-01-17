import { Request, Response, Next } from 'restify';
import { UseCaseResponse } from 'src/adapters/controllers/models';
import AbstractController from '../../abstractController';

enum HttpVerb {
	POST = "post",
	GET = "get",
	PATCH = "patch",
	PUT = "put",
	DELETE = "delete",
	NONE = ""
}

/**
 * Base class for Restify handlers
*/
abstract class ApiHandler {
	constructor(protected controller: AbstractController, public verb: HttpVerb, public endpoint: string) {
		this.verb = verb;
		this.endpoint = endpoint;
	}

	handler = async (req: Request, res: Response, next: Next): Promise<void> => {

		const result: UseCaseResponse = await this.execute(req, res, next);

		res.send(200, result);
		next();
	}

	protected abstract execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse>;
}

export { HttpVerb, ApiHandler }
