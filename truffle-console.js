// npx truffle --network goerli console
SuperfluidSDK = require("@superfluid-finance/js-sdk")
sf = new SuperfluidSDK.Framework({version: "v1", web3, tokens: ["fDAI"] })
await sf.initialize()
const { toWad, toBN, fromWad, wad4human } = require("@decentral.ee/web3-helpers");
const dai = await TestToken.at(sf.tokens.fDAI.address);
const daix = sf.tokens.fDAIx;
bob = accounts[0];
alice = accounts[1];
dan = accounts[2];
carol = accounts[3];
await dai.mint(bob, web3.utils.toWei("100", "ether"), { from: bob })
(async () => (wad4human(await dai.balanceOf(bob))))()
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })
daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })
(async () => (wad4human(await daix.balanceOf(bob))))()
await sf.cfa.createFlow({ superToken: daix.address, sender: bob, receiver: alice, flowRate: "385802469135802" });
(async () => wad4human(await daix.balanceOf(bob)))()
(async () => wad4human(await daix.balanceOf(alice)))()
(await sf.cfa.getNetFlow({superToken: daix.address, account: bob})).toString()
sf.cfa.deleteFlow({superToken: daix.address, sender: bob, receiver: alice, by: bob});
(await daix.balanceOf(bob)).toString() / 1e18
(await daix.balanceOf(alice)).toString() / 1e18
function createPlayBatchCall(upgradeAmount = 0) { return [ [ 201, sf.agreements.cfa.address, web3.eth.abi.encodeParameters(["bytes", "bytes"],[sf.agreements.cfa.contract.methods.createFlow(daix.address, alice, upgradeAmount.toString(), "0x").encodeABI(), "0x" ] ) ], [ 201, sf.agreements.cfa.address, web3.eth.abi.encodeParameters(["bytes", "bytes"],[sf.agreements.cfa.contract.methods.createFlow(daix.address, dan, upgradeAmount.toString()/100, "0x").encodeABI(), "0x" ] ) ] ]; }
await sf.host.batchCall(createPlayBatchCall(31580246913000))
function createDeleteBatchCall() { return [ [ 201, sf.agreements.cfa.address, web3.eth.abi.encodeParameters(["bytes", "bytes"],[sf.agreements.cfa.contract.methods.deleteFlow(daix.address, bob, alice, "0x").encodeABI(), "0x" ] ) ], [ 201, sf.agreements.cfa.address, web3.eth.abi.encodeParameters(["bytes", "bytes"],[sf.agreements.cfa.contract.methods.deleteFlow(daix.address, bob, dan, "0x").encodeABI(), "0x" ] ) ] ]; }
await sf.host.batchCall(createDeleteBatchCall())