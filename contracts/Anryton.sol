// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Anryton is ERC20, Ownable {
    
    struct MintingSale {
        string name;
        uint160 supply;
        address walletAddress;
    }
    
    uint160 private constant MAX_TOTAL_SUPPLY = 400000000 ether;
    string private _latestSale = "FRIEND_FAMILY";
    uint8 public mintingCounter = 0;

    address immutable   _FRIEND_FAMILY = 0x40F073D687d1F767a2D01cAFA2d2Bdff22fdD3Bd;
    address immutable   _PRIVATE_SALE = 0xca26FC94876777c578D08A1f39de6774b91c67E4;
    address immutable   _PUBLIC_SALE = 0x5C8bD761c4926327CF65B1027FD4CaE4d1ffDD66;
    address immutable   _TEAM = 0xC9E61E82ecD2B84C29409Cb7E5e6255ebAf21151;
    address immutable   _RESERVES = 0x5cA3dc4a9D00D96f2cfe1c61eDDbE532498dfa4A;
    address immutable   _STORAGE_MINTING_ALLOCATION = 0xd88A39948B3A62a302c9c6Bb7932ca01c7bD3E05;
    address immutable   _GRANTS_REWARD = 0xF59583ae201583311b288DFe5Dc60158fB1084d4;
    address immutable   _MARKETTING = 0x3f65C00252f5AF049eccFCeDfD024E5F8EeE670f;
    address immutable   _ADVISORS = 0x1e7Bcd3c058aD518Ed38cDA9EeF149dd310a564A;
    address immutable   _LIQUIDITY_EXCHANGE_LISTING = 0xC8fc19c358045717Eaa5D6E13824f3969e949826;
    address immutable   _STAKING = 0x975a33A6c0BF5c242D5148d19E7a5e6dc28A1BB0;

    /** track wallet and supply assigned to a particular supply */
    mapping(string => address) private assignedWalletToSale;
    mapping(string => mapping(address => uint256)) private mintedWalletSupply;
    mapping(uint => MintingSale) public mintedSale;      
   

    event MintedWalletSuupply(
        string indexed sale,
        uint256 indexed supply,
        address indexed walletAddress
    );

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        address _owner
    ) ERC20(_tokenName, _tokenSymbol) Ownable(_owner) {
        _setCommissions();
    }

    function _setCommissions() private {
        _calcSaleSupply(1, "FRIEND_FAMILY", _FRIEND_FAMILY, 12000000 ether);
        _calcSaleSupply(2, "PRIVATE_SALE", _PRIVATE_SALE, 24000000 ether);
        _calcSaleSupply(3, "PUBLIC_SALE", _PUBLIC_SALE, 24000000 ether);
        _calcSaleSupply(4, "TEAM", _TEAM, 40000000 ether);
        _calcSaleSupply(5, "RESERVES", _RESERVES, 100000000 ether);
        _calcSaleSupply(
            6,
            "STORAGE_MINTING_ALLOCATION",
            _STORAGE_MINTING_ALLOCATION,
            40000000 ether
        );
        _calcSaleSupply(7, "GRANTS_REWARD", _GRANTS_REWARD, 80000000 ether);
        _calcSaleSupply(8, "MARKETTING", _MARKETTING, 40000000 ether);
        _calcSaleSupply(9, "ADVISORS", _ADVISORS, 12000000 ether);
        _calcSaleSupply(
            10,
            "LIQUIDITY_EXCHANGE_LISTING",
            _LIQUIDITY_EXCHANGE_LISTING,
            20000000 ether
        );
        _calcSaleSupply(11, "STAKING", _STAKING, 8000000 ether);

        /** mint once every partician is done
         * First sale will be get minted "FRIEND_FAMILY"
         */
        mint();
    }

    /***
     * @function _calcSaleSupply
     * @dev defining sales in a contract
     */
    function _calcSaleSupply(
        uint8 serial,
        string memory _name,
        address _walletAddress,
        uint160 _supply
    ) private {
        mintedSale[serial].name = _name;
        mintedSale[serial].supply = _supply;
        mintedSale[serial].walletAddress = _walletAddress;
    }

    /***
     * @function mintTokens
     * @dev mint token on a owner address
     * @notice onlyOwner can access this function
     */
    function mint() public onlyOwner {
        uint8 saleCount = ++mintingCounter;
        MintingSale memory mintingSale = mintedSale[saleCount];
        /** Validate amount and address should be greater than zero */
        require(
            mintingSale.supply > 0,
            "ERC20:: Mint amount should be greater than zero"
        );
        require(
            mintingSale.walletAddress != address(0),
            "ERC20:: user should not be equal to address zero"
        );

        /** Mint and set default sale supply */
        _mint(mintingSale.walletAddress, mintingSale.supply);
        _setSaleSupplyWallet(
            mintingSale.name,
            mintingSale.walletAddress,
            mintingSale.supply
        );
    }

    /***
     * @function _defaultSupplyWallet
     * @dev persist user address attaches with sale name
     */
    function _setSaleSupplyWallet(
        string memory _saleName,
        address _walletAddress,
        uint256 _supply
    ) private {
        _latestSale = _saleName;
        assignedWalletToSale[_saleName] = _walletAddress;
        mintedWalletSupply[_saleName][_walletAddress] = _supply;
        emit MintedWalletSuupply(_saleName, _supply, _walletAddress);
    }

    /***
     * @function getPerSaleWalletSupply
     * @dev return minted supply on a assgined wallet to a sale.
     */
    function getAssignedWalletAndSupply(
        string memory saleName
    ) public view returns (uint256, address) {
        address walletAddress = assignedWalletToSale[saleName];
        uint256 mintedSupply = mintedWalletSupply[saleName][walletAddress];
        return (mintedSupply, walletAddress);
    }

    /***
     * @function getDefaultSale
     * @dev Get default sale name on other contracts
     */
    function getLatestSale() public view returns (string memory) {
        return _latestSale;
    }

    /***
     * @function getMaxSupply
     * @dev returns maxTotalSupply variable
     */
    function getMaxSupply() public pure returns (uint160) {
        return MAX_TOTAL_SUPPLY;
    }
}
