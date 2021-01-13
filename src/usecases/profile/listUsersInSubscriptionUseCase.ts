import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

interface ListUsersInSubscriptionUseCaseInput {
  subscriptionId: string;
}

export default class ListUsersInSubscriptionUseCase extends UseCase {
  constructor(private logger: Logger) {
    super();
  }

  async execute(input: ListUsersInSubscriptionUseCaseInput): Promise<any> {
    this.logger.info(input);
    return {};
  }
}
