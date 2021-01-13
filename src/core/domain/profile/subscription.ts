import User from './user';

export default interface Subscription {
  id: string;
  userIds: string[];
}
