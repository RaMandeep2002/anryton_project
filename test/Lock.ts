import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Stake Contract', () => {
  let stakeContract: any;
  let anryton : any;
  let owner: any;
  let user1: any;
  let user2: any;

  const TOKEN_A_AMOUNT = ethers.parseEther('1200');
  // const TOKEN_B_AMOUNT = ethers.parseEther('1000');
  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    const Anryton = await ethers.getContractFactory("Anryton");
    const Stake = await ethers.getContractFactory('Stake');
    anryton = await Anryton.deploy("ANRYTON", "ANRY");
    stakeContract = await Stake.deploy(anryton.target);
    // await stakeContract.deployed();
  });
  it("addresses of the user",async () => {
    console.log("the address of the anryton token ==> ",anryton.target );
    console.log("The address of the stakeing contract ==> ",stakeContract.target );
    console.log("The address of the owner ==> ", owner.address);
    console.log("The address of the user1 ==> ", user1.address);
    console.log("the adddress of the user2 ==> ", user2.address)
  })

  it('should allow users to deposit tokens', async () => {
    
    await anryton.connect(owner).approve(stakeContract.target,  TOKEN_A_AMOUNT);
    const depositAmount = ethers.parseEther('100');
    console.log("THe deposit ammount is ==> ",depositAmount)
    // User1 deposits tokens
    await stakeContract.connect(owner).deposit(user1.address, depositAmount);

    // Check if the user1's balance is updated
    const user1Balance = await stakeContract.users(user1.address);
    console.log(user1Balance)
    const user1tokenbalance = await user1Balance.tokenBalance;
    console.log("The balance of the token  for the user1 ==> ", user1tokenbalance);
    expect(user1tokenbalance).to.equal(depositAmount);

    // Check if the contract holds the deposited tokens
    const contractBalance = await anryton.balanceOf(stakeContract.target);
    console.log("The contract balance of the staking contract holds==>", contractBalance);
    expect(contractBalance).to.equal(depositAmount);
  });

    it('should allow users to stake tokens', async () => {
      await anryton.connect(owner).approve(stakeContract.target,  TOKEN_A_AMOUNT);
      const depositAmount = ethers.parseEther('100');
      console.log("THe deposit ammount is ==> ",depositAmount)
      const stakeAmount = ethers.parseEther('50');

      // User1 deposits tokens
      await stakeContract.connect(owner).deposit(user1.address, depositAmount);
      const user1Balance1 = await stakeContract.users(user1.address);
      console.log(user1Balance1)
      // User1 stakes tokens
      await stakeContract.connect(owner).stakeOrLockTokens(user1.address, stakeAmount, 'STAKE');

      // Check if the user1's staked balance is updated
      const user1Balance2 = await stakeContract.users(user1.address);
      console.log(user1Balance2)
      expect(user1Balance2.stakedTokens).to.equal(stakeAmount);

      // Check if the contract's balance is updated
      const contractBalance = await anryton.balanceOf(stakeContract.target);
      console.log("contract balance ==> ", contractBalance);
      expect(contractBalance).to.equal("150000000000000000000");
    });
    it.only("should allow users to Unstake tokens", async() =>{
      await anryton.connect(owner).approve(stakeContract.target,  TOKEN_A_AMOUNT);
      const depositAmount = ethers.parseEther('100');
      console.log("THe deposit ammount is ==> ",depositAmount)
      const stakeAmount = ethers.parseEther('50');

      // User1 deposits tokens
      await stakeContract.connect(owner).deposit(user1.address, depositAmount);
      const user1Balance1 = await stakeContract.users(user1.address);
      console.log(user1Balance1)
      // User1 stakes tokens
      await stakeContract.connect(owner).stakeOrLockTokens(user1.address, stakeAmount, 'STAKE');

      // Check if the user1's staked balance is updated
      const user1Balance2 = await stakeContract.users(user1.address);
      console.log(user1Balance2)
      expect(user1Balance2.stakedTokens).to.equal(stakeAmount);

      await stakeContract.connect(owner).unStakeOrUnLock("UN_STAKE");
      const user1Balance3 = await stakeContract.users(user1.address);
      console.log(user1Balance3)
    })

  // Add more test cases for other functions as needed

});
