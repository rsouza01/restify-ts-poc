import {Request, Response, Next} from 'restify';

enum HttpVerb {
  POST = "post",
  GET = "get",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
	NONE = ""
}

abstract class ApiHandler {
		constructor(public verb: HttpVerb, public endpoint: string) {
			this.verb = verb;
			this.endpoint = endpoint;
		}

		execute(req: Request, res: Response, next: Next): void {
				console.debug(`>>>>>>>> handler CALLED <<<<<<<<<<<`);
				console.debug(`this: ${JSON.stringify(this, null, 2)}`);

				this.handler(req, res, next);
		}

		abstract handler(req: Request, res: Response, next: Next): void;
}

export {HttpVerb, ApiHandler}
