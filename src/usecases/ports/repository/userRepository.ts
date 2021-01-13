import { CRUDRepository } from '../infrastructure';
import { User } from '../../../core/domain';

export default interface UserRepository extends CRUDRepository<User, string> {
  findByEmail: (email: string) => Promise<User | undefined>;
}
