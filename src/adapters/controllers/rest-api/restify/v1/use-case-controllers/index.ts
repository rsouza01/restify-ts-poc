import { ApiHandler } from '../api-handler';
import { apiHandler as  generic_use_case_handler}  from  './generic-use-case/postHandler';

const handlers: ApiHandler[] = [
	generic_use_case_handler
]

export { handlers };
