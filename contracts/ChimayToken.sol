// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

/**
 * The ChimayToken smart contract implements the ERC-20 standard. It will also govern the behavior of the Chimay cryptocurrency. 
 */
contract ChimayToken {

	string public tokenName = "Chimay Token";			// Token name
	string public tokenSymbol = "CMT";						// Token symbol
	string public tokenVersionStandard = "Chimay Token v1.0";	// Token version standard
	uint256 public totalSupply;										// Read total num tokens
	mapping(address => uint256) public balanceOf;	// Read account balance


	event Transfer(
		address indexed _from, 
		address indexed _to, 
		uint256 _value);

	
	  constructor(uint256 _initialSupply) public {
	    totalSupply = _initialSupply;	// Set total num tokens

	    balanceOf[msg.sender] = _initialSupply;		// Allocate initial supply
  }


  function transfer(address _to, uint256 _value) public returns(bool success) {
  	// exception
    require(balanceOf[msg.sender] >= _value);
   	// transfer
   	balanceOf[msg.sender] -= _value;
   	balanceOf[_to] += _value;
   	// fire transfer event
   	emit Transfer(msg.sender, _to, _value);
  }
      
}
