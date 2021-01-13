import * as errors from 'restify-errors';
import { Server, Request, Response, Next, RouteOptions, RequestHandlerType, Route } from 'restify';

import { handlers } from './use-case-controllers'


function handler(req: Request, res: Response, next: Next): void {

	// res.send(await produtoService.list());

	// const controller = new SignupController({});
	// return controller.handler(event, context);
	res.send({});

	console.debug(`>>>>>>>> CALLED <<<<<<<<<<<`);

}

const registerRoutes = (server: Server) => {

	const registers:{
		[index:string] : (opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]) => Route | boolean
	} = {
		'post': server.post,
		'get': server.get
	};

	console.debug(`HANDLERS => ${JSON.stringify(handlers, null, 2)}`);
	console.debug(`RESULT => ${JSON.stringify(handlers[0].handler({} as Request, {} as Response), null, 2)}`);


	handlers.forEach(apiHandler => {
		// registers[apiHandler.verb](apiHandler.endpoint, apiHandler.handler);
		server.post(apiHandler.endpoint, apiHandler.handler);

		// console.debug(`registers[apiHandler.verb] => ${JSON.stringify(registers[apiHandler.verb], null, 2)}`);

	});
};

export { registerRoutes };
