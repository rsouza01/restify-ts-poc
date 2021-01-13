import assert from 'assert';
import { expect } from 'chai';
import { User } from '../../../../../src/core/domain';


describe('User', function () {
  it('Constructor', function () {
    const user: User = {
			id: 'id',
			name: 'name',
			email: 'name@email.com',
			owner: true,
			subscriptionId: ''
		};

	expect(user.id).to.equal('id');
	expect(user.name).to.equal('name');
  });
});
