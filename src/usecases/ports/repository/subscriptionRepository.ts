import { CRUDRepository } from '../infrastructure';
import { Subscription } from '../../../core/domain';

// export default interface SubscriptionRepository extends CRUDRepository<Subscription, string> {
// }

export default interface SubscriptionRepository extends CRUDRepository<Subscription, string> {
  findByOwner: (email: string) => Promise<Subscription | undefined>;
}
