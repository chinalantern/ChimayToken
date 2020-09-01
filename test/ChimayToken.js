var ChimayToken =  artifacts.require("ChimayToken");

contract('ChimayToken', function(accounts) {

	it('sets the total supply upon deployment', function() {
		return ChimayToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 9, 'sets the total supply to 1,000,000');		// Chai insertion lib
		});
	});
})