// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// 从ERC20的标准实现，窥探solidity开发的注意事项
// 深入理解ERC20及其实践
// 
// 问题及思考
// 1.transfer转移数量为0时，为什么必须视为正常的交易？ 
//      a.value=0，对交易的结果没有影响
//      b.禁止转移，比如加个require判断，可以减少一次状态变量修改，进而可以减少gas费
//      所以进一步问题应该是：value=0，不管视为正常交易，还是让其回滚，都对交易结果没影响，那为什么不加个require，花费更少的gas费呢？
//      设计程序的核心思想：优先保证交易成功，其次才是优化gas等
// 
// 2.发行ERC20的token时，为什么需要给msg.sender铸造一个token总量？
//      这涉及到区块链的本质，即交易。能够提出这个问题的人，一定是用web2的思维来思考web3，包括以前刚入行的我自己。
//      web2的思维是把token总量存储在合约，由合约进行分配，这种思维在区块链的世界里是行不通的
//      一切都是交易，必须由人主动发起一笔交易才能触发分配，这就是为什么第一次发行token的同时，要给创建者，即msg.sender铸造出totalsupply的余额
//      后期由创建者触发交易，分配token
// 
// 3.以前发行的ERC20 token，想添加新的功能，可以升级吗？
//      主要涉及 所有用户的balance余额
//      还没有用户，无所谓，随意升级
//      有持有用户，有多少？
// 
// 4.同样一个ERC20的token，在ETH链上叫ERC20，在BNB链上叫BEP20，其本质都一样，只是不同的区块链名字不一样而已

contract ERC20Test {
    address payable public owner;

    string public url;

    constructor() {
        owner = payable(msg.sender);
    }
}
