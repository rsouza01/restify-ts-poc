import { Request, Response, Next } from 'restify';
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
	constructor(private controller: AbstractController, public verb: HttpVerb, public endpoint: string) {
		this.verb = verb;
		this.endpoint = endpoint;
	}

	handler = (req: Request, res: Response, next: Next): void => {
		this.execute(req, res, next);
	}

	protected abstract execute(req: Request, res: Response, next: Next): void;
}

export { HttpVerb, ApiHandler }
