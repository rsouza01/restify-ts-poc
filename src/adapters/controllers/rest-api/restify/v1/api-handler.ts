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
		// verb: HttpVerb = HttpVerb.NONE;
		// endpoint: string = '';

		constructor(public verb: HttpVerb, public endpoint: string) {
			this.verb = verb;
			this.endpoint = endpoint;
		}

		abstract handler(req: Request, res: Response, next?: Next): void;
}

export {HttpVerb, ApiHandler}
