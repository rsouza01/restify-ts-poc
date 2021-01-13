import generateId from '../../lib/idGenerator';

import { User, Subscription } from '../../core/domain';
import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

import { UserRepository, SubscriptionRepository } from '../ports/repository';
import UserNotFoundException from '../exceptions/userNotFoundException';

interface CreateSubscriptionUseCaseInput {
  ownerId: string;
}

class CreateSubscriptionUseCase extends UseCase {
  constructor(
    private userRepository: UserRepository, private subscriptionRepository: SubscriptionRepository,
    private logger: Logger,
  ) {
    super();
  }

  async execute(input: CreateSubscriptionUseCaseInput): Promise<Subscription> {

    this.logger.info(input);

    if (!await this.userRepository.findByKey(input.ownerId)) {
      throw new UserNotFoundException(new Error('User does not exist'), 'User does not exist');
    }

		const subscription: Subscription = {
      id: generateId(),
      userIds: [input.ownerId]
    };

    await this.subscriptionRepository.add(subscription);

    return subscription;
  }
}

export { CreateSubscriptionUseCaseInput, CreateSubscriptionUseCase };
