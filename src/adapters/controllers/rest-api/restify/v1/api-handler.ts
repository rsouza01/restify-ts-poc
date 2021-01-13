import {Request, Response, Next} from 'restify';

enum HttpVerb {
  POST = "post",
  GET = "get",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

interface ApiHandler {
		verb: HttpVerb,
		endpoint: string,
		handler: (req: Request, res: Response, next: Next) => void
}

export {HttpVerb, ApiHandler}
