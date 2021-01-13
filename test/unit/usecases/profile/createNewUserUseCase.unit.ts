
import assert from 'assert';
import sinon from 'sinon';
import * as chai from 'chai'

import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import * as generateId from '../../../../src/lib/idGenerator';
import UserAlreadyExistsException from '../../../../src/usecases/exceptions/userAlreadyExistsException';

import { Subscription, User } from '../../../../src/core/domain';
import { CreateNewUserUseCaseInput, CreateNewUserUseCase } from '../../../../src/usecases/profile';
import { MockLogger, MockUserRepository, MockSubscriptionRepository } from './mockedRepositories'

const mockId = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';

describe('CreateNewUserUseCase', () => {
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

      const createNewUserUseCase = new CreateNewUserUseCase(userRepository, subscriptionRepository, new MockLogger());
      chai.expect(createNewUserUseCase).to.be.instanceof(CreateNewUserUseCase);
    });
  });

  describe('Execute', () => {

    it('Create new user, no subscription attached', async () => {

      const expectedUser: User = {
        id: mockId,
        name: 'User Name',
        email: 'user@mail.com',
        owner: true,
        subscriptionId: mockId
      };

      sandbox.stub(MockUserRepository.prototype, "findByEmail").resolves(undefined);
      sandbox.stub(MockUserRepository.prototype, "add").resolves();
      sandbox.stub(MockSubscriptionRepository.prototype, "add").resolves();

      const createNewUserUseCase =
        new CreateNewUserUseCase(userRepository, subscriptionRepository, new MockLogger());
      const input: CreateNewUserUseCaseInput = {
        name: 'User Name',
        email: 'user@mail.com'
      };

      const resultUser = await createNewUserUseCase.execute(input);

      chai.expect(resultUser).not.to.be.null;
      chai.expect(resultUser).to.deep.equal(expectedUser);
    });

    it('Create new user, existing subscription attached', async () => {

      const expectedUser: User = {
        id: mockId,
        name: 'User Name',
        email: 'user@mail.com',
        owner: false,
        subscriptionId: mockId
      };

      const existingSubscription: Subscription = {
        id: mockId,
        userIds: []
      };

      sandbox.stub(MockUserRepository.prototype, "findByEmail").resolves(undefined);
      sandbox.stub(MockUserRepository.prototype, "add").resolves();
      sandbox.stub(MockSubscriptionRepository.prototype, "add").resolves();
      sandbox.stub(MockSubscriptionRepository.prototype, "findByKey").resolves(existingSubscription);

      const createNewUserUseCase =
        new CreateNewUserUseCase(userRepository, subscriptionRepository, new MockLogger());
      const input: CreateNewUserUseCaseInput = {
        name: 'User Name',
        email: 'user@mail.com',
        subscription: existingSubscription
      };

      const resultUser = await createNewUserUseCase.execute(input);

      chai.expect(resultUser).not.to.be.null;
      chai.expect(resultUser).to.deep.equal(expectedUser);
    });

    it('Create new user which already exists', async () => {

      const existingUser: User = {
        id: mockId,
        name: 'User Name',
        email: 'user@mail.com',
        owner: false,
        subscriptionId: mockId
      };

      sandbox.stub(MockUserRepository.prototype, "findByEmail").resolves(existingUser);

      const createNewUserUseCase =
        new CreateNewUserUseCase(userRepository, subscriptionRepository, new MockLogger());

      const input: CreateNewUserUseCaseInput = {
        name: 'User Name',
        email: 'user@mail.com'
      };

      await chai.expect(createNewUserUseCase.execute(input))
        .to.be.rejectedWith(UserAlreadyExistsException);
    });
  });
});
