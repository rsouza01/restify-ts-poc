/*
 * Module Dependencies
 */

import * as restify from 'restify';
import * as restifyPlugins from 'restify-plugins';
import config from './config';
import { registerRoutes } from './routes'


/**
 * Initialize Server
 */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
	* Middleware
	*/
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
	* Start Server, Connect to DB & Require Routes
	*/
server.listen(config.port, () => {
	registerRoutes(server);
	console.log(`Server is listening on port ${config.port}`);
});
