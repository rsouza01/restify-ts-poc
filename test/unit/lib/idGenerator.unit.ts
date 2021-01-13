import { expect } from 'chai';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import generateId  from '../../../src/lib/idGenerator';

describe('idGenerator', function () {
  it('generateId', () => {
	const uuid = generateId();
	expect(isValidUUIDV4(uuid)).to.be.true;
  });
});
