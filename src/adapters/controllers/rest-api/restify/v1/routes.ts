import * as errors from 'restify-errors';
import { Server, Request, Response, Next, RouteOptions, RequestHandlerType, Route } from 'restify';

import { handlers } from './use-case-controllers'

const registerRoutes = (server: Server) => {

	const registers:{
		[index:string] : (opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]) => Route | boolean
	} = {
		'post': server.post,
		'get': server.get
	};

	handlers.forEach(apiHandler => {
		registers[apiHandler.verb](apiHandler.endpoint, apiHandler.handler);
	});
};

export { registerRoutes };
