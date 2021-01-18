import { ApiHandler } from '../api-handler';
import CreateUserHandler from './create-user-usecase/createUserHandler';
import GenericUseCaseHandler  from  './generic-use-case/genericUseCaseHandler';

const handlers: ApiHandler[] = [
	new GenericUseCaseHandler(),
	new CreateUserHandler()
]

export { handlers };
