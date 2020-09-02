var ChimayToken =  artifacts.require("ChimayToken");

contract('ChimayToken', function(accounts) {
	var tokenInstance;

	it('initializes the contract with the correct values', function() {
		return ChimayToken.deployed().then(function(i) {
			tokenInstance = i;
			return tokenInstance.tokenName();
		}).then(function(n) {
			assert.equal(n, 'Chimay Token', 'has correct name');
			return tokenInstance.tokenSymbol();
		}).then(function(s) {
			assert.equal(s, 'CMT', 'has correct symbol');
			return tokenInstance.tokenVersionStandard();
		}).then(function(tvs) {
			assert.equal(tvs, 'Chimay Token v1.0', 'has correct token version standard');
		});
	});

	it('allocates the initil supply upon deployment', function() {
		return ChimayToken.deployed().then(function(i) {
			tokenInstance = i;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');		// Chai insertion lib
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 1000000, 'allocates initial supply to admin account');
		});
	});

	it('transfers tokens between sender and recipiant', function() {
		return ChimayToken.deployed().then(function(i) {
			tokenInstance = i;

			// Test require statement by testing does message caller have enough to send
			return tokenInstance.transfer.call(accounts[0], 99999999);	// no transaction
		}).then(assert.fail).catch(function(e) {
			assert(e.message.indexOf('revert') >= 0, 'error message must contain revert');
		
			// Test boolean return success
			return tokenInstance.transfer.call(accounts[1], 300000, {from: accounts[0]} );
		}).then(function(success) {
			assert.equal(success, true, 'transfer sender to receiver "true"');
		
			// Test transfer event fire
			return tokenInstance.transfer(accounts[1], 300000, {from: accounts[0] });
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1, 'one event triggered');
			assert.equal(receipt.logs[0].event,'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the sender account');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the receiver account');
			assert.equal(receipt.logs[0].args._value, 300000, 'logs the transfer amount');
			
			// Test token transfer debit from sender and credit to receiver
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balanceReceiver) {
			assert.equal(balanceReceiver.toNumber(), 300000, 'credits the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balanceSender) {
			assert.equal(balanceSender.toNumber(), 700000, 'debits the amount from the sending account');
		}); 
	});



})