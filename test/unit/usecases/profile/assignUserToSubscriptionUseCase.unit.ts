
import assert from 'assert';
import sinon from 'sinon';
import * as chai from 'chai'

import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { isValidUUIDV4 } from 'is-valid-uuid-v4';

import { Subscription, User } from '../../../../src/core/domain';
import { AssignUserToSubscriptionUseCaseInput, AssignUserToSubscriptionUseCase } from '../../../../src/usecases/profile';


import { MockLogger, MockUserRepository, MockSubscriptionRepository } from './mockedRepositories'

import * as generateId from '../../../../src/lib/idGenerator';
import UserNotFoundException from '../../../../src/usecases/exceptions/userNotFoundException';

const mockId = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';

describe.only('AssignUserToSubscriptionUseCase', () => {
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
			const assignUserToSubscriptionUseCase = new AssignUserToSubscriptionUseCase(userRepository, subscriptionRepository, new MockLogger());
			chai.expect(assignUserToSubscriptionUseCase).to.be.instanceof(AssignUserToSubscriptionUseCase);
		});
	});

	describe('Execute', () => {

		it('Associates a User with an existing Subscription', async () => {

			const user: User = {
				id: mockId,
				name: 'User Name',
				email:'user@mail.com',
				owner: true,
				subscriptionId: mockId
			};

			const subscription: Subscription = {
        id: mockId,
        userIds: [user.id]
      };

			sandbox.stub(MockUserRepository.prototype, "findByKey").resolves(user);
			sandbox.stub(MockSubscriptionRepository.prototype, "findByKey").resolves(subscription);
			//     sandbox.stub(MockSubscriptionRepository.prototype, "add").resolves();

			const assignUserToSubscriptionUseCase =
				new AssignUserToSubscriptionUseCase(
					userRepository,
					subscriptionRepository,
					new MockLogger());

			const input: AssignUserToSubscriptionUseCaseInput = {
				userId: mockId,
				subscriptionId: mockId
			}

			return chai.expect(assignUserToSubscriptionUseCase.execute(input)).to.be.fulfilled;
		});

		//   it('Create subscription with given owner not existing', async () => {

		//     const ownerId: string = mockId;

		//     sandbox.stub(MockUserRepository.prototype, "findByKey").resolves(undefined);

		// 		const createSubscriptionUseCase =
		//       new CreateSubscriptionUseCase(userRepository, subscriptionRepository,
		//         new MockLogger());

		//     const input: CreateSubscriptionUseCaseInput = {
		//       ownerId
		//     };

		// 		await chai.expect(createSubscriptionUseCase.execute(input))
		// 			.to.be.rejectedWith(UserNotFoundException);
		//   });
	});
});
