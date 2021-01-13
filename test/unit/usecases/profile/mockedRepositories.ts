import { UserRepository, SubscriptionRepository } from '../../../../src/usecases/ports/repository';
import { Subscription, User } from '../../../../src/core/domain';
import { Logger } from '../../../../src/usecases/ports/infrastructure';

class MockLogger implements Logger {
  debug(message: any, data?: any): void { }
  info(message: any, data?: any): void { }
  warning(error: Error): void { }
  error(error: Error): void { }
  fatal(error: Error): void { }
}

class MockUserRepository implements UserRepository {
  findAll(): Promise<User[]> { throw new Error("Method not implemented."); }
  findByKey(key: string): Promise<User | undefined> { throw new Error("Method not implemented."); }
  add(entity: User): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: User): Promise<void> { throw new Error("Method not implemented."); }
  exists(key: string): Promise<boolean> { throw new Error("Method not implemented."); }
  findByEmail(email: string): Promise<User> { throw new Error("Method not implemented."); }
}
class MockSubscriptionRepository implements SubscriptionRepository {
  findAll(): Promise<Subscription[]> { throw new Error("Method not implemented."); }
  findByKey(key: string): Promise<Subscription | undefined> { throw new Error("Method not implemented."); }
  add(entity: Subscription): Promise<void> { throw new Error("Method not implemented."); }
  update(entity: Subscription): Promise<void> { throw new Error("Method not implemented."); }
  exists(key: string): Promise<boolean> { throw new Error("Method not implemented."); }
  findByOwner(email: string): Promise<Subscription | undefined> { throw new Error("Method not implemented."); }
}

export { MockLogger, MockUserRepository, MockSubscriptionRepository }
