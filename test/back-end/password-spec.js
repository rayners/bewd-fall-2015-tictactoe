
require('chai').should();

function passwordCheck(password) {
  return false;
}

describe('password', function() {
  it('should not allow an empty password', function() {
    passwordCheck('').should.be.false;
  })
})
