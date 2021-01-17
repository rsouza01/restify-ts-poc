import { ApiHandler } from '../api-handler';
import GenericUseCaseHandler  from  './generic-use-case/genericUseCaseHandler';

const handlers: ApiHandler[] = [
	new GenericUseCaseHandler()
]

export { handlers };
