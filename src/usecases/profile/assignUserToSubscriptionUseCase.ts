import { UseCase } from '../infrastructure';
import { Logger } from '../ports/infrastructure';

import { Subscription, User } from '../../core/domain';
import { UserRepository, SubscriptionRepository } from '../ports/repository';
import { SubscriptionNotFoundException, UserNotFoundException } from '../exceptions';

interface AssignUserToSubscriptionUseCaseInput {
	userId: string;
	subscriptionId: string;
}

class AssignUserToSubscriptionUseCase extends UseCase {
  constructor(
    private userRepository: UserRepository,
    private subscriptionRepository: SubscriptionRepository,
    private logger: Logger,
  ) {
    super();
  }

  async execute(input: AssignUserToSubscriptionUseCaseInput): Promise<void> {
    this.logger.info(input);

		const user = await this.userRepository.findByKey(input.userId);
		if (!user) {
			const error = new Error(`UserId ${input.userId} does not exist`);
			this.logger.error(error);
			throw new UserNotFoundException(error, 'User does not exist');
    }

		const subscription = await this.subscriptionRepository.findByKey(input.subscriptionId);
		if (!subscription) {
			const error = new Error(`SubscriptionId ${input.subscriptionId} does not exist`);
			this.logger.error(error);
      throw new SubscriptionNotFoundException(error, 'Subscription does not exist');
    }

		const isUserAssigned: boolean =
			subscription.userIds.filter(userId => userId === input.userId).length > 0;

		if(isUserAssigned) return;

		subscription.userIds.push(input.userId);

		await this.subscriptionRepository.update(subscription);

	}
}

export { AssignUserToSubscriptionUseCaseInput, AssignUserToSubscriptionUseCase };
