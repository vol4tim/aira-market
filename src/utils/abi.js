export default {
  LiabilityMarket: [{ constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'asks', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'setOwner', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_promisee', type: 'address' }, { name: '_price', type: 'uint256' }], name: 'limitSell', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'asksLength', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'bids', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'hammer', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'bidsLength', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'destroy', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_id', type: 'uint256' }, { name: '_candidates', type: 'uint256' }], name: 'sellConfirm', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'priceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_price', type: 'uint256' }], name: 'limitBuy', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_id', type: 'uint256' }, { name: '_promisee', type: 'address' }], name: 'sellAt', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'ordersOf', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_id', type: 'uint256' }], name: 'buyAt', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_i', type: 'uint256' }], name: 'getOrder', outputs: [{ name: '', type: 'address[]' }, { name: '', type: 'address[]' }, { name: '', type: 'address' }, { name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_hammer', type: 'address' }], name: 'setHammer', outputs: [], payable: false, type: 'function' }, { inputs: [{ name: '_name', type: 'string' }], payable: false, type: 'constructor' }, { payable: true, type: 'fallback' }, { anonymous: false, inputs: [{ indexed: true, name: 'order', type: 'uint256' }], name: 'OpenAskOrder', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'order', type: 'uint256' }], name: 'OpenBidOrder', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'order', type: 'uint256' }], name: 'CloseAskOrder', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'order', type: 'uint256' }], name: 'CloseBidOrder', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'order', type: 'uint256' }, { indexed: true, name: 'beneficiary', type: 'address' }, { indexed: true, name: 'promisee', type: 'address' }], name: 'AskOrderCandidates', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'liability', type: 'address' }], name: 'NewLiability', type: 'event' }],
  Token: [{ constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'setOwner', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'hammer', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'destroy', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_hammer', type: 'address' }], name: 'setHammer', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }], name: 'unapprove', outputs: [], payable: false, type: 'function' }, { inputs: [{ name: '_name', type: 'string' }, { name: '_symbol', type: 'string' }, { name: '_decimals', type: 'uint8' }, { name: '_count', type: 'uint256' }], payable: false, type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, name: '_from', type: 'address' }, { indexed: true, name: '_to', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: '_owner', type: 'address' }, { indexed: true, name: '_spender', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Approval', type: 'event' }],
  Liability: [{ constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'setOwner', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'cost', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'hammer', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'promisee', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_resultHash', type: 'bytes32' }], name: 'publishHash', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'gasbase', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'gasprice', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'destroy', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'resultHash', outputs: [{ name: '', type: 'bytes32' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_gasprice', type: 'uint256' }], name: 'payment', outputs: [{ name: '', type: 'bool' }], payable: true, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'promisor', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_hammer', type: 'address' }], name: 'setHammer', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { inputs: [{ name: '_promisor', type: 'address' }, { name: '_promisee', type: 'address' }, { name: '_token', type: 'address' }, { name: '_cost', type: 'uint256' }], payable: false, type: 'constructor' }, { payable: true, type: 'fallback' }, { anonymous: false, inputs: [{ indexed: true, name: 'hash', type: 'bytes32' }], name: 'Result', type: 'event' }],
  ENS: [{ constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'setOwner', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'hammer', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_address', type: 'address' }, { name: '_hash', type: 'string' }], name: 'set', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'destroy', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_hammer', type: 'address' }], name: 'setHammer', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'items', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }]
}
