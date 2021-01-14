import { ApiHandler } from '../api-handler';
import GenericUseCaseHandler  from  './generic-use-case/postHandler';

const handlers: ApiHandler[] = [
	new GenericUseCaseHandler()
]

export { handlers };
