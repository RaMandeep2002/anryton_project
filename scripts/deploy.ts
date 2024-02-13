import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";
import {
  Anryton,
  Anryton__factory,
  Stake,
  Stake__factory
} from "../typechain-types";

async function main() {
  const signers: SignerWithAddress[] = await ethers.getSigners();;
  const owner: SignerWithAddress = signers[0];
  await deployContractWithProxy(owner) as any;
}

async function deployContractWithProxy(owner: any) {
  const erc20: Anryton = await new Anryton__factory(owner).deploy("ANRYTON", "ANRY", "",{
       gasLimit: 10000000
    });
  const contract: Stake = await new Stake__factory(owner).deploy(erc20.target, {
    gasLimit: 10000000
  });

  console.log({
    Anryton: erc20.target, 
    Stake: contract.target
  });
}

main()
  .then(() => console.log('Deployed on network, Wait for terminal exit..!!'))
  .catch((error) => console.error(error));

