// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// 部署、验证 遇到的问题
// 
// 1.使用hardhat脚本部署交易失败，使用remix部署成功
// 2.验证合约 提供APIKEY(测试网对应的主网申请)
// 3.验证合约 部署和验证的solidity编译版本需要相同
// 4.验证合约 部署和验证 配置参数需要一样
// 5.验证合约 ankr节点失败，quicknode节点成功
// 6.验证合约 部署的openzeppelin依赖 和 验证的openzeppelin依赖版本需要相同

contract FoamBear is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant TOKEN_INFO_ROLE = keccak256("TOKEN_INFO_ROLE");

    string private baseURI;

    // mapping: tokenId => (key => value);
    mapping(uint256 => mapping(uint256 => uint256)) public tokenInfos;

    constructor() ERC721("FoamBear", "FB") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(TOKEN_INFO_ROLE, msg.sender);
    }

    function safeMint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    function exists(uint256 tokenId) public view returns(bool) {
        return _exists(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata uri) public onlyRole(MINTER_ROLE) {
        baseURI = uri;
    }

    function setTokenInfo(uint256 tokenId, uint256 key, uint256 value) public onlyRole(TOKEN_INFO_ROLE) {
        tokenInfos[tokenId][key] = value;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
