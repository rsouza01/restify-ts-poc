
import assert from 'assert';
import sinon from 'sinon';
import * as chai from 'chai'

import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { isValidUUIDV4 } from 'is-valid-uuid-v4';

import { Subscription, User } from '../../../../src/core/domain';
import { CreateSubscriptionUseCaseInput, CreateSubscriptionUseCase } from '../../../../src/usecases/profile';
import { MockLogger, MockUserRepository, MockSubscriptionRepository } from './mockedRepositories'

import * as generateId from '../../../../src/lib/idGenerator';
import UserNotFoundException from '../../../../src/usecases/exceptions/userNotFoundException';

const mockId = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';

describe('CreateSubscriptionUseCase', () => {
	const sandbox = sinon.createSandbox();

	const userRepository = new MockUserRepository();
	const subscriptionRepository = new MockSubscriptionRepository();

	beforeEach(() => {
		sandbox.stub(generateId, 'default').returns(mockId);
	});

	afterEach(() => {
		sandbox.restore();
	});

  describe('Constructor', () => {

    it('Happy Path', () => {
      const userRepository = new MockUserRepository();
      const subscriptionRepository = new MockSubscriptionRepository();

      const createSubscriptionUseCase = new CreateSubscriptionUseCase(userRepository, subscriptionRepository, new MockLogger());
      chai.expect(createSubscriptionUseCase).to.be.instanceof(CreateSubscriptionUseCase);
    });
  });

  describe('Execute', () => {

    it('Create subscription with owner given', async () => {

			const owner: User = {
				id: mockId,
				name: 'User Name',
				email:'user@mail.com',
				owner: true,
				subscriptionId: mockId
			};

			const expectedSubscription: Subscription = {
        id: mockId,
        userIds: [owner.id]
      };

      sandbox.stub(MockUserRepository.prototype, "findByKey").resolves(owner);
      sandbox.stub(MockSubscriptionRepository.prototype, "add").resolves();

      const createSubscriptionUseCase =
        new CreateSubscriptionUseCase(userRepository,
          subscriptionRepository,
          new MockLogger());

      const input: CreateSubscriptionUseCaseInput = {
        ownerId: owner.id
      };

      const resultSubscription = await createSubscriptionUseCase.execute(input);

      chai.expect(resultSubscription).not.to.be.null;
      chai.expect(resultSubscription).to.deep.equal(expectedSubscription);
    });

    it('Create subscription with given owner not existing', async () => {

      const ownerId: string = mockId;

      sandbox.stub(MockUserRepository.prototype, "findByKey").resolves(undefined);

			const createSubscriptionUseCase =
        new CreateSubscriptionUseCase(userRepository, subscriptionRepository,
          new MockLogger());

      const input: CreateSubscriptionUseCaseInput = {
        ownerId
      };

			await chai.expect(createSubscriptionUseCase.execute(input))
				.to.be.rejectedWith(UserNotFoundException);
    });
	});
});
