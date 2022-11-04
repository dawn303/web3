# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# 初始化项目
```shell
# 安装hardhat工程依赖
# chai: 用于测试的组件(用于编写智能合约测试用例)
# ethers: 与区块链交互的完整组件库、代码少、接口简单、和web3相比推荐使用ethers
yarn add hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-network-helpers @nomiclabs/hardhat-etherscan @typechain/hardhat hardhat-gas-reporter solidity-coverage typechain @typechain/ethers-v5 @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle chai ethers

# 安装typescript的依赖
yarn add ts-node typescript @types/node @types/mocha @types/chai

# 安装openzeppelin库(商用级别的智能合约开源库)
yarn add @openzeppelin/contracts @openzeppelin/hardhat-upgrades

# 安装 dotenv ，可以把.env 文件导入到系统环境变量中给程序使用的一个js包
# 在hardhat.config.ts 在最上面添加import 'dotenv/config'
yarn add dotenv

# Hardhat deploy
# 这是hardhat工程化必要的插件，这个插件用来帮忙管理代码部署，你能轻松的在代码中根据名称获取到你部署的合约地址，
# 同时也能根据上下文来决定什么合约需要部署。还能和migration一样设定只能部署一次的合约。
# 同时也给测试提供了非常方便的函数来进行灵活的合约部署，比如你可以只部署带有某些tag的合约。
# 安装完成后，在hardhat.config.ts 文件中添加import \"hardhat-deploy\" 
yarn add hardhat-deploy @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers --dev

# 安装完成，运行测试
yarn hardhat test
```
