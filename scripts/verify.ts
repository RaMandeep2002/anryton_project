const hre = require("hardhat");

async function main() {
  try {
    const addresses = [
      // {
      //   address: "0x1804bd92c5a11cf7f5f6705e76e57b0ed57d4748",
      //   params: ["ANRYTON", "ANRY"],
      //   filePath: "contracts/Anryton.sol:Anryton"
      // },
      {
        address: "0x23eDA2BB5Ed42F65F3743e7Ec675A79f2855Cc39",
        params: ["0x1804bd92c5a11cf7f5f6705e76e57b0ed57d4748"],
        filePath: "contracts/Stake.sol:Stake"
      }
    ];

    for (const data of addresses) {
      await hre.run("verify:verify", {
        //Deployed contract address
        address: data.address,
        //Pass arguments as string and comma seprated values
        constructorArguments: data.params,
        //Path of your main contract.
        contract: data.filePath,
      });

    }
  } catch (e) {
    console.log('Error', e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network rinkeby  scripts/verify.ts