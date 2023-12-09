// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NyatheesOVO is ERC721, ERC721Enumerable, Pausable, AccessControl, ERC721Burnable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant TOKENINFO_ROLE = keccak256("TOKENINFO_ROLE");

    /// tokenId => level
    mapping (uint256 => uint256) public tokenIdToLevel;
    /// tokenId => hash rate
    mapping (uint256 => uint256) public tokenIdToHashRate;
    /// tokenId => vip rate
    mapping (uint256 => uint256) public tokenIdToVIPRate;
    // tokenId => boost rate
    mapping (uint256 => uint256) public tokenIdToBoostRate;
    // tokenId => bomb rate
    mapping (uint256 => uint256) public tokenIdToBombRate;

    string public baseURI;
    constructor() ERC721("Nyathees-OVO", "NyaOVO") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(TOKENINFO_ROLE, msg.sender);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata uri) public onlyRole(DEFAULT_ADMIN_ROLE) {
        baseURI = uri;
    }

    function setLevel(uint256 tokenId, uint256 level) public onlyRole(TOKENINFO_ROLE) {
        require(tokenId > 0, "wrong token id");
        tokenIdToLevel[tokenId] = level;
    }

    function setHashRate(uint256 tokenId, uint256 hashRate) public onlyRole(TOKENINFO_ROLE) {
        require(tokenId > 0, "wrong token id");
        tokenIdToHashRate[tokenId] = hashRate;
    }

    function setVIPCardRate(uint256 tokenId, uint256 vipRate) public onlyRole(TOKENINFO_ROLE) {
        require(tokenId > 0, "wrong token id");
        tokenIdToVIPRate[tokenId] = vipRate;
    }

    function setBoostCardRate(uint256 tokenId, uint256 boostRate) public onlyRole(TOKENINFO_ROLE) {
        require(tokenId > 0, "wrong token id");
        tokenIdToBoostRate[tokenId] = boostRate;
    }

    function setBombCardRate(uint256 tokenId, uint256 bombRate) public onlyRole(TOKENINFO_ROLE) {
        require(tokenId > 0, "wrong token id");
        tokenIdToBombRate[tokenId] = bombRate;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
