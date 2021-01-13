import generateId from '../../lib/idGenerator';

import { User, Subscription } from '../../core/domain';
import { UseCase } from '../infrastructure';
import UserAlreadyExistsException from '../exceptions/userAlreadyExistsException';

import { UserRepository, SubscriptionRepository } from '../ports/repository';
import { Logger } from '../ports/infrastructure';

interface CreateNewUserUseCaseInput {
  name: string;
  email: string;
  subscription?: Subscription;
}

class CreateNewUserUseCase extends UseCase {
  constructor(
    private userRepository: UserRepository,
    private subscriptionRepository: SubscriptionRepository,
    private logger: Logger,
  ) {
    super();
  }

  async execute(input: CreateNewUserUseCaseInput): Promise<User> {
    if (await this.userRepository.findByEmail(input.email)) {
      throw new UserAlreadyExistsException(new Error('User already registered'), 'User already registered');
    }

    const user: User = {
      id: generateId(),
      name: input.name,
      email: input.email,
      owner: false,
			subscriptionId: ''
    };

    await this.userRepository
      .add(user)
      .then(() => {
        if (!input.subscription) {
          user.owner = true;

          const subscription: Subscription = {
            id: generateId(),
            userIds: [user.id],
          };

          this.subscriptionRepository.add(subscription);
          return subscription;
        }
        user.owner = false;
        return this.subscriptionRepository.findByKey(input.subscription.id);
      })
      .then((subscription) => {
        if (subscription) user.subscriptionId = subscription.id;
      })
      .catch((error) => {
        this.logger.error(error);
      });

    return user;
  }
}

export { CreateNewUserUseCaseInput, CreateNewUserUseCase };
