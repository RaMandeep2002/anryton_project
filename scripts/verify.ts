const hre = require("hardhat");

async function main() {
  try {
    const addresses = [
    //   {
    //     address: "0x02d4bE5093fBE2c92BBBC101d98c3845C066Fc6e",
    //     params: ["ANRYTON", "ANRY"],
    //     filePath: "contracts/Anryton.sol:Anryton"
    //   },
      {
        address: "0x128420D828f98A147feC71F4e82DB987b653Ae3b",
        params: ["0x02d4bE5093fBE2c92BBBC101d98c3845C066Fc6e"],
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