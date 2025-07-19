import { ad as removeSignalListener, a1 as el, a2 as sl, a8 as addSignalListener, H as networkId, bE as onNetworkIdUpdated, r as ref, bF as isBGMode, y as computed, bG as useBroadcastChannel, bH as error, w as watch, bI as getAppType, a3 as dispatchSignalSync, U as dispatchSignal, bJ as setNetworkId, bK as getBackendServer, bL as hexToBytea, ab as DEFAULT_ACCOUNT_ID, a4 as json, Y as api } from './sidePanel.js';
import { dl as onInterval20s, dm as onInterval60s, dn as onUpdateChainTip, dp as onUpdateOnTip, dq as requestData, bd as ErrorSync, bc as ApiRequestType, dr as onFocus, aD as doInitApp, ds as isValidBroadcastMsgType, dt as doSendOpen, du as doSendClose, cb as doSendUpdateNetworkId, dv as doSendUpdateWalletList, dw as doSendUpdateAccountData, dx as doSendUpdateDappAccountId, dy as doSendUpdatePendingTx, dz as doSendUpdatePeerInfoList, dA as doSendUpdatePeerInfo, dB as doSendForcePeerDisconnect, dC as doSendForcePeerConnect, dD as doSendUpdateWalletConnectList, cc as BroadcastMsgType, bS as getRandomId, dE as onAppOpen, dF as onAppClose, dG as setActiveInstance, dH as doSetActiveApp, dI as instanceAppId, bU as useCurrencyAPI, bb as getRequestData, bD as doRemovePendingTx, dJ as doUpdatePendingTxStatus, dK as onAccountDataUpdated, a9 as doProcessSubmittedTxList, dL as _loadPendingTxList, dM as setSubmittedState, d6 as setSignedState, dN as fillInputUtxoList, dO as setInvalidState, aq as isSyncLeader, de as updatePendingTxList, bu as isOnChainState, da as isExpiredState, a_ as getCalculatedChainTip, d7 as setExpiredState, dP as setOnChainState, bv as isInvalidState, R as getUtxoHash, dQ as loadUtxoCborFromUtxoHashes, as as getPendingTxList, dR as AccountDB, dS as onInterval8s, dT as SyncPriority, dU as doSyncAccount, q as getAddressCredentials, b3 as getIAppAccountByCred, dV as useDappAccount, dW as onSyncLeader, dX as doPostInitApp, dY as setAppAccount, dZ as setAppWallet, d_ as WalletDB, b$ as getIAppWallet, aL as getIAppAccount, d$ as updateUtxoLists, dk as onOnlyDappAccountSet, aU as onTxHistoryAccountUpdated, aK as getAppAccount, e0 as onRemoveAllAccountsFromSync, bZ as useGuard, e1 as GuardBlockListDB, e2 as loadAddressBook, cg as doReloadWalletList, e3 as reloadAccountData, e4 as removeAccount, e5 as doRemoveAccount, e6 as updateFavoriteAccountList, e7 as onAccountSettingsUpdated, e8 as onAppAccountAddedToAppWallet, e9 as onAccountRemoved, ea as onWalletListUpdated, eb as updateManualSyncForAllAccounts, ec as doToggleManualSyncForAllAccounts, ed as loadWalletList, ee as loadCSL, ef as loadCMS, eg as getCSLBigNum, eh as doInitFirstWorker } from './cms.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let __initEternlPromise$1 = void 0;
const _initEternlPromise = new Promise(async (resolve, reject) => {
  while (!__initEternlPromise$1) {
    await sleep(50);
  }
  await __initEternlPromise$1;
  return resolve();
});
const getEternlInitPromise = () => _initEternlPromise;
const setEternlInitPromise = (p) => {
  __initEternlPromise$1 = p;
};

const doLog = false;
const storeId$9 = "chainTipRestStore";
let _numFailedCalls = 999;
const onPullChainTipInterval = async () => {
  removeSignalListener(onInterval20s, storeId$9, doLog);
  removeSignalListener(onInterval60s, storeId$9, doLog);
  let updated = false;
  try {
    const chainTip = await requestChainTip();
    if (doLog) ;
    if (chainTip && chainTip.blockNo > 0) {
      onUpdateChainTip(chainTip);
      updated = true;
      _numFailedCalls = 0;
      addSignalListener(onInterval60s, storeId$9, onPullChainTipInterval, doLog);
    } else {
      addSignalListener(onInterval20s, storeId$9, onPullChainTipInterval, doLog);
    }
  } catch (err) {
    addSignalListener(onInterval20s, storeId$9, onPullChainTipInterval, doLog);
  }
  if (!updated) {
    onUpdateOnTip(++_numFailedCalls);
  }
};
const updateChainTip = async () => {
  await onPullChainTipInterval();
  return true;
};
const requestChainTip = () => {
  return requestData(
    networkId.value,
    storeId$9,
    ApiRequestType.syncChainTip,
    ErrorSync.syncChainTip,
    {
      id: storeId$9
    },
    async (data) => {
      return data.chainTip;
    }
  );
};

const storeId$8 = "chainTipController";
const startPullingChainTip = async (log) => {
  return updateChainTip();
};
addSignalListener(onFocus, storeId$8, () => startPullingChainTip());
addSignalListener(doInitApp, storeId$8, () => startPullingChainTip());
addSignalListener(onNetworkIdUpdated, storeId$8, () => startPullingChainTip());

var broadcastchannelPolyfill = {};

var hasRequiredBroadcastchannelPolyfill;

function requireBroadcastchannelPolyfill () {
	if (hasRequiredBroadcastchannelPolyfill) return broadcastchannelPolyfill;
	hasRequiredBroadcastchannelPolyfill = 1;
	(function(global) {
	    var channels = [];

	    function BroadcastChannel(channel) {
	        var $this = this;
	        channel = String(channel);

	        var id = '$BroadcastChannel$' + channel + '$';

	        channels[id] = channels[id] || [];
	        channels[id].push(this);

	        this._name = channel;
	        this._id = id;
	        this._closed = false;
	        this._mc = new MessageChannel();
	        this._mc.port1.start();
	        this._mc.port2.start();

	        global.addEventListener('storage', function(e) {
	            if (e.storageArea !== global.localStorage) return;
	            if (e.newValue == null || e.newValue === '') return;
	            if (e.key.substring(0, id.length) !== id) return;
	            var data = JSON.parse(e.newValue);
	            $this._mc.port2.postMessage(data);
	        });
	    }

	    BroadcastChannel.prototype = {
	        // BroadcastChannel API
	        get name() {
	            return this._name;
	        },
	        postMessage: function(message) {
	            var $this = this;
	            if (this._closed) {
	                var e = new Error();
	                e.name = 'InvalidStateError';
	                throw e;
	            }
	            var value = JSON.stringify(message);

	            // Broadcast to other contexts via storage events...
	            var key = this._id + String(Date.now()) + '$' + String(Math.random());
	            global.localStorage.setItem(key, value);
	            setTimeout(function() {
	                global.localStorage.removeItem(key);
	            }, 500);

	            // Broadcast to current context via ports
	            channels[this._id].forEach(function(bc) {
	                if (bc === $this) return;
	                bc._mc.port2.postMessage(JSON.parse(value));
	            });
	        },
	        close: function() {
	            if (this._closed) return;
	            this._closed = true;
	            this._mc.port1.close();
	            this._mc.port2.close();

	            var index = channels[this._id].indexOf(this);
	            channels[this._id].splice(index, 1);
	        },

	        // EventTarget API
	        get onmessage() {
	            return this._mc.port1.onmessage;
	        },
	        set onmessage(value) {
	            this._mc.port1.onmessage = value;
	        },
	        addEventListener: function(/*type, listener , useCapture*/) {
	            return this._mc.port1.addEventListener.apply(this._mc.port1, arguments);
	        },
	        removeEventListener: function(/*type, listener , useCapture*/) {
	            return this._mc.port1.removeEventListener.apply(this._mc.port1, arguments);
	        },
	        dispatchEvent: function(/*event*/) {
	            return this._mc.port1.dispatchEvent.apply(this._mc.port1, arguments);
	        },
	    };

	    global.BroadcastChannel = global.BroadcastChannel || BroadcastChannel;
	})(self);
	return broadcastchannelPolyfill;
}

requireBroadcastchannelPolyfill();

const BroadcastError = {
  isNotSupported: "BroadcastError.isNotSupported",
  invalidMsgType: "BroadcastError.invalidMsgType"
};
const getDefaultErrorMessage = (err) => {
  switch (err) {
    case BroadcastError.isNotSupported:
      return "BroadcastError: BroadcastChannel not supported";
    case BroadcastError.invalidMsgType:
      return "BroadcastError: invalid message type";
  }
  return "BroadcastError: unknown: " + err;
};

const doLogVerbose = false;
const storeId$7 = "broadcastController";
const _canPost = ref(!isBGMode());
const canPost = computed(() => _canPost.value && !isBGMode());
const {
  data,
  post,
  isSupported
} = useBroadcastChannel({ name: "eternl-bc-" + getAppType() });
if (!isSupported.value) {
  error(getDefaultErrorMessage(BroadcastError.isNotSupported));
}
const setCanPost = (can) => {
  _canPost.value = can;
};
const onData = (msgType, data2) => {
  if (data2?.includes(",")) {
    dispatchSignalSync(msgType, ...data2.split(","));
  } else {
    dispatchSignalSync(msgType, data2);
  }
};
watch(data, (msg) => {
  if (msg) {
    const protocol = msg.split(":");
    if (protocol.length === 3) {
      const msgType = protocol[0];
      if (isValidBroadcastMsgType(msgType)) {
        onData(msgType, protocol[1]);
      }
    }
  }
});
const sendOpen = (appId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.open + ":" + appId + ":" + getRandomId());
};
const sendClose = (appId) => {
  post(BroadcastMsgType.close + ":" + appId + ":" + getRandomId());
};
const sendUpdateNetworkId = (networkId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateNetworkId + ":" + networkId + ":" + getRandomId());
};
const sendUpdateWalletList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateWalletList + ":-:" + getRandomId());
};
const sendUpdateAccountData = (accountId, walletId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateAccountData + ":" + walletId + "," + accountId + ":" + getRandomId());
};
const sendUpdateDappAccountId = (walletId, accountId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateDappAccountId + ":" + walletId + "," + accountId + ":" + getRandomId());
};
const sendUpdatePendingTx = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePendingTx + ":-:" + getRandomId());
};
const sendUpdatePeerInfoList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePeerInfoList + ":-:" + getRandomId());
};
const sendUpdatePeerInfo = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePeerInfo + ":-:" + getRandomId());
};
const sendForcePeerDisconnect = (dappId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.forcePeerDisconnect + ":" + dappId + ":");
};
const sendPeerConnect = (dappId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.forcePeerConnect + ":" + dappId + ":");
};
const sendUpdateWalletConnectList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateWalletConnectList + ":-:" + getRandomId());
};
addSignalListener(onFocus, storeId$7, () => {
  setCanPost(true);
}, doLogVerbose);
addSignalListener(doSendOpen, storeId$7, sendOpen, doLogVerbose);
addSignalListener(doSendClose, storeId$7, sendClose, doLogVerbose);
addSignalListener(doSendUpdateNetworkId, storeId$7, sendUpdateNetworkId, doLogVerbose);
addSignalListener(doSendUpdateWalletList, storeId$7, sendUpdateWalletList, doLogVerbose);
addSignalListener(doSendUpdateAccountData, storeId$7, sendUpdateAccountData, doLogVerbose);
addSignalListener(doSendUpdateDappAccountId, storeId$7, sendUpdateDappAccountId, doLogVerbose);
addSignalListener(doSendUpdatePendingTx, storeId$7, sendUpdatePendingTx, doLogVerbose);
addSignalListener(doSendUpdatePeerInfoList, storeId$7, sendUpdatePeerInfoList, doLogVerbose);
addSignalListener(doSendUpdatePeerInfo, storeId$7, sendUpdatePeerInfo, doLogVerbose);
addSignalListener(doSendForcePeerDisconnect, storeId$7, sendForcePeerDisconnect, doLogVerbose);
addSignalListener(doSendForcePeerConnect, storeId$7, sendPeerConnect, doLogVerbose);
addSignalListener(doSendUpdateWalletConnectList, storeId$7, sendUpdateWalletConnectList, doLogVerbose);

const storeId$6 = "appController";
addSignalListener(BroadcastMsgType.open, storeId$6, onAppOpen);
addSignalListener(BroadcastMsgType.close, storeId$6, onAppClose);
addSignalListener(doSetActiveApp, storeId$6, setActiveInstance);
addSignalListener(onFocus, storeId$6, setActiveInstance);
const _beforeunload = async () => {
  await dispatchSignal(doSendClose, instanceAppId);
  return false;
};
const init$3 = () => {
  const isSupported = typeof window !== "undefined";
  if (!isSupported) {
    return;
  }
  window.addEventListener("beforeunload", _beforeunload);
};
init$3();

const storeId$5 = "backendServerController";
const init$2 = () => {
  watch(networkId, () => setNetworkId(networkId.value), { immediate: true });
  setInterval(() => getBackendServer(networkId.value, true), 5 * 60 * 1e3);
};
addSignalListener(doInitApp, storeId$5, init$2);

const { pullCurrencyData } = useCurrencyAPI();
const init$1 = async () => {
  await pullCurrencyData();
};
init$1();

const hasTxHashes = (networkId, accountId, txHashList) => {
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.hasTxHashes,
    ErrorSync.hasTxHashes,
    {
      id: accountId,
      txHashList: txHashList.map((hash) => hexToBytea(hash))
      // TODO: remove hexToBytea conversion, see rpcHasTxHashes_v4
    },
    async (data) => data.txHashList
  );
};

const doLogUpdate = false;
const storeId$4 = "pendingTxController";
const finalCheckMap = /* @__PURE__ */ new Map();
let _running = false;
const _toBeRemovedList = [];
const getIAppAccountByAddress = (address) => {
  const { paymentCred } = getAddressCredentials(address);
  if (paymentCred) {
    const appAccount = getIAppAccountByCred(paymentCred);
    if (appAccount) {
      return appAccount;
    }
  }
  return null;
};
const triggerUpdateOnOwnAccounts = (tx) => {
  const accountsToUpdate = [];
  for (const output of tx.body.outputs) {
    const appAccount = getIAppAccountByAddress(output.address);
    if (appAccount && !accountsToUpdate.some((a) => a.id === appAccount.id)) {
      accountsToUpdate.push(appAccount);
    }
  }
  for (const inputUtxo of tx.inputUtxoList ?? []) {
    const appAccount = getIAppAccountByAddress(inputUtxo.output.address);
    if (appAccount && !accountsToUpdate.some((a) => a.id === appAccount.id)) {
      accountsToUpdate.push(appAccount);
    }
  }
  for (const appAccount of accountsToUpdate) {
    dispatchSignalSync(doSyncAccount, appAccount, SyncPriority.high);
  }
};
const _updatePendingTxStatus = async (okList = [], failedList = [], forceButDontBroadcast = false) => {
  if (_running) {
    if (forceButDontBroadcast || okList || failedList) {
      while (_running) {
        await sleep(10);
      }
    } else {
      return;
    }
  }
  let pendingTxList = await _loadPendingTxList();
  let statusChanged = false;
  for (let i = okList.length - 1; i >= 0; i--) {
    const tx = pendingTxList.find((_tx) => _tx.hash === okList[i].hash);
    if (tx) {
      setSubmittedState(tx);
      okList.splice(i, 1);
      statusChanged = true;
    }
  }
  const calls = [];
  for (const tx of okList) {
    setSignedState(tx);
    setSubmittedState(tx);
    const allKnownPendingOutputs = [];
    for (const tx2 of pendingTxList) {
      if (tx2.inputUtxoList) {
        allKnownPendingOutputs.push(...tx2.inputUtxoList);
      }
    }
    calls.push(fillInputUtxoList(networkId.value, tx, allKnownPendingOutputs));
    pendingTxList.push(tx);
    statusChanged = true;
  }
  for (let i = failedList.length - 1; i >= 0; i--) {
    const tx = pendingTxList.find((_tx) => _tx.hash === failedList[i].hash);
    if (tx) {
      setSubmittedState(tx);
      setInvalidState(tx);
      failedList.splice(i, 1);
      statusChanged = true;
    }
  }
  if (calls.length > 0) {
    await Promise.all(calls);
  }
  if (!isSyncLeader()) {
    if (forceButDontBroadcast || statusChanged || _toBeRemovedList.length > 0) {
      await updatePendingTxList(pendingTxList, _toBeRemovedList, forceButDontBroadcast);
      _toBeRemovedList.length = 0;
    }
    return;
  }
  if (_running) {
    return;
  }
  _running = true;
  try {
    if (pendingTxList.length === 0) {
      _running = false;
      return;
    }
    const accountId = DEFAULT_ACCOUNT_ID;
    const pendingTxHashList = pendingTxList.map((tx) => tx.hash);
    if (doLogUpdate) ;
    const resTxHashes = await hasTxHashes(networkId.value, accountId, pendingTxHashList);
    if (doLogUpdate) ;
    const finalCheckKeys = finalCheckMap.keys();
    if (doLogUpdate) ;
    for (const hash of finalCheckKeys) {
      if (!pendingTxHashList.includes(hash) || resTxHashes?.includes(hash)) {
        finalCheckMap.delete(hash);
      }
    }
    if (doLogUpdate) ;
    const inputHashList = [];
    for (const pendingTx of pendingTxList) {
      const ttl = parseInt(pendingTx.body.ttl ?? "0");
      if (!isOnChainState(pendingTx.state) && !isExpiredState(pendingTx.state)) {
        const expired = ttl > 0 && ttl - getCalculatedChainTip(networkId.value) <= 0;
        setExpiredState(pendingTx, expired);
        if (expired) {
          statusChanged = true;
        }
      }
      if (resTxHashes?.includes(pendingTx.hash)) {
        if (!isOnChainState(pendingTx.state)) {
          if (doLogUpdate) ;
          setOnChainState(pendingTx);
          setInvalidState(pendingTx, false);
          setExpiredState(pendingTx, false);
          triggerUpdateOnOwnAccounts(pendingTx);
          statusChanged = true;
        }
      } else if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
      } else {
        const _inputHashList = pendingTx.body.inputs.map((input) => getUtxoHash(input));
        inputHashList.push(..._inputHashList);
      }
      if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
        continue;
      }
      if (doLogUpdate) ;
    }
    let resUtxos = null;
    if (inputHashList.length > 0) {
      if (doLogUpdate) ;
      resUtxos = await loadUtxoCborFromUtxoHashes(networkId.value, accountId, inputHashList);
      if (doLogUpdate) ;
    }
    for (const pendingTx of pendingTxList) {
      if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
        continue;
      }
      let numUnspentInputs = 0;
      for (const input of pendingTx.body.inputs) {
        const utxoCbor = resUtxos?.find((utxo) => getUtxoHash(input) === utxo.hash);
        if (doLogUpdate) ;
        if (utxoCbor) {
          numUnspentInputs++;
        } else {
          let wasSpent = false;
          for (const _tx of pendingTxList) {
            if (_tx.hash === pendingTx.hash) {
              continue;
            }
            if (isOnChainState(_tx.state)) {
              if (_tx.body.inputs.some((_input) => getUtxoHash(_input) === getUtxoHash(input))) {
                wasSpent = true;
                break;
              }
            }
          }
          if (wasSpent) {
            setInvalidState(pendingTx);
            statusChanged = true;
          }
          if (!wasSpent && pendingTxList.find((tx) => tx.hash === input.transaction_id)) {
            numUnspentInputs++;
          }
        }
      }
      if (doLogUpdate) ;
      if (numUnspentInputs === pendingTx.body.inputs.length) {
      } else if (numUnspentInputs > 0 && numUnspentInputs !== pendingTx.body.inputs.length) {
        setInvalidState(pendingTx, true);
        statusChanged = true;
      } else {
        const timestamp = finalCheckMap.get(pendingTx.hash) ?? 0;
        if (timestamp === 0) {
          finalCheckMap.set(pendingTx.hash, Date.now());
        } else if (Date.now() - timestamp > 22e3) {
          if (doLogUpdate) ;
          setInvalidState(pendingTx, true);
          statusChanged = true;
        }
      }
    }
    if (forceButDontBroadcast || statusChanged || _toBeRemovedList.length > 0) {
      await updatePendingTxList(pendingTxList, _toBeRemovedList, forceButDontBroadcast);
      _toBeRemovedList.length = 0;
    }
  } catch (err) {
    console.error(err);
  }
  _running = false;
};
const markPendingTxAsDeletable = async (appAccount) => {
  const pendingTxList = getPendingTxList(true).value;
  if (pendingTxList.length === 0) {
    return;
  }
  const txHashList = await AccountDB.getTxHashKeyList(appAccount.data.state.networkId, appAccount.id, pendingTxList.map((tx) => tx.hash));
  for (const pendingTx of pendingTxList) {
    if (txHashList.includes(pendingTx.hash)) {
      if (!_toBeRemovedList.includes(pendingTx.hash)) {
        _toBeRemovedList.push(pendingTx.hash);
      }
    }
  }
  if (_toBeRemovedList.length > 0) {
    return _updatePendingTxStatus();
  }
};
addSignalListener(doRemovePendingTx, storeId$4, async (txHash) => {
  if (!_toBeRemovedList.includes(txHash)) {
    _toBeRemovedList.push(txHash);
  }
  return _updatePendingTxStatus();
});
addSignalListener(doUpdatePendingTxStatus, storeId$4, (txHash) => {
  return _updatePendingTxStatus();
});
addSignalListener(onAccountDataUpdated, storeId$4, (_appAccount) => {
  return markPendingTxAsDeletable(_appAccount);
});
addSignalListener(doProcessSubmittedTxList, storeId$4, (okList, failedList) => {
  return _updatePendingTxStatus(okList, failedList);
});
addSignalListener(BroadcastMsgType.updatePendingTx, storeId$4, () => {
  return _updatePendingTxStatus(void 0, void 0, true);
});
const load$2 = () => {
  addSignalListener(onInterval8s, storeId$4, _updatePendingTxStatus);
};
addSignalListener(doInitApp, storeId$4, load$2);

const doLogAction = false;
const storeId$3 = "onlyDappAccount";
const {
  dappAccountId,
  dappWalletId,
  dappAccountUpdated
} = useDappAccount();
const updateDappAccount = async () => {
  const walletId = dappWalletId.value;
  const accountId = dappAccountId.value;
  if (!walletId || !accountId) {
    setAppAccount(null);
    setAppWallet(null);
    return;
  }
  const walletList = await WalletDB.getWalletDataList(networkId.value);
  let appAccount = null;
  let appWallet = null;
  for (const walletData of walletList) {
    const wallet = walletData.wallet;
    if (wallet.id === walletId) {
      const accountList = wallet.accountList;
      for (const account of accountList) {
        if (account.id === accountId) {
          const accountData = await AccountDB.getAccountData(networkId.value, account);
          if (!accountData) {
            break;
          }
          appWallet = getIAppWallet(walletId, walletData, true);
          appAccount = getIAppAccount(accountId, walletId, accountData);
          break;
        }
      }
      if (appWallet && appAccount) {
        break;
      }
    }
  }
  if (!appAccount) {
    appAccount = null;
    appWallet = null;
  } else {
    let _utxoMap = null;
    try {
      const res = await AccountDB.getUtxoMap(appAccount);
      if (res.utxoMap) {
        _utxoMap = res.utxoMap;
        if (doLogAction) ;
      }
    } catch (err) {
      console.error(el(storeId$3), sl("updateDappAccount"), "getUtxoMap", err);
    }
    if (!_utxoMap) {
      console.log(
        el(storeId$3),
        sl("updateDappAccount"),
        "no utxoMap loaded"
      );
      appAccount = null;
      appWallet = null;
    } else {
      appAccount.utxoMap = _utxoMap;
      updateUtxoLists(appAccount);
    }
  }
  setAppAccount(appAccount);
  setAppWallet(appWallet);
  dispatchSignalSync(onOnlyDappAccountSet, appAccount);
  dispatchSignalSync(onTxHistoryAccountUpdated, appAccount);
  addAccountToSync(isSyncLeader());
  await setNetworkId(networkId.value);
};
let toid = -1;
watch(dappAccountUpdated, () => {
  clearTimeout(toid);
  toid = setTimeout(() => {
    updateDappAccount();
  }, 250);
}, { immediate: true });
const init = async () => {
  await setNetworkId(networkId.value);
  await updateDappAccount();
};
const addAccountToSync = (isSyncLeader2) => {
  const appAccount = getAppAccount();
  if (appAccount && isSyncLeader2) {
    dispatchSignalSync(doSyncAccount, appAccount, SyncPriority.high);
  } else {
    dispatchSignalSync(onRemoveAllAccountsFromSync);
  }
};
addSignalListener(onSyncLeader, storeId$3, (isSyncLeader2) => addAccountToSync(isSyncLeader2));
addSignalListener(onAccountDataUpdated, storeId$3, (_appAccount) => {
});
addSignalListener(doPostInitApp, storeId$3, init);

const callAPIPost = async (url, payload, networkId, commit, onError) => {
  try {
    if (networkId === null) {
      throw new Error("Error: callAPIPost: no valid network set");
    }
    const res = await api.post("/" + networkId + url, payload);
    commit(res);
  } catch (e) {
    if (onError) {
      onError(e);
    }
  }
};

const fileHashSubstringLength = 8;

const {
  cacheServerScamInfos
} = useGuard();
let _lastUpdate = -1;
let _toId = setTimeout(() => {
});
const storeId$2 = "guardController";
const loadGuard = async () => {
  clearTimeout(_toId);
  if (_lastUpdate + 12 * 60 * 1e3 < Date.now()) {
    const lastImportInfo = await GuardBlockListDB.getLastImportInfo();
    let hash = null;
    if (lastImportInfo && lastImportInfo.lastHash) {
      hash = lastImportInfo.lastHash.substring(0, fileHashSubstringLength);
    }
    await callAPIPost("/v2/misc/guard", { h: hash }, networkId.value, onLoadList, onErrorList);
  }
  await cacheServerScamInfos();
  _toId = setTimeout(() => {
    loadGuard();
  }, 15 * 60 * 1e3);
};
const processReportImport = async (blockListImport) => {
  const {
    bulkAddGuardReport,
    getLastImportInfo
  } = GuardBlockListDB;
  let importInfo = await getLastImportInfo();
  if (importInfo && importInfo.lastHash === blockListImport.h) {
    return;
  }
  await bulkAddGuardReport(blockListImport);
  importInfo = await getLastImportInfo();
  _lastUpdate = importInfo?.timestamp ?? Date.now();
};
const onLoadList = async (data) => {
  if (data?.data) {
    const reports = data.data;
    await processReportImport(reports);
  } else {
    await onErrorList();
  }
};
const onErrorList = async () => {
};
let _loadedOnce = false;
const load$1 = () => {
  if (_loadedOnce) {
    return;
  }
  _loadedOnce = true;
  loadGuard();
};
addSignalListener(doSetActiveApp, storeId$2, load$1);

const storeId$1 = "addressBookController";
const load = () => {
  return loadAddressBook();
};
addSignalListener(doInitApp, storeId$1, load);

const storeId = "walletListController";
const doLoadWalletList = async (doBroadcast = false) => {
  if (!doBroadcast) {
    return loadWalletList();
  }
  await loadWalletList();
  return dispatchSignal(doSendUpdateWalletList);
};
addSignalListener(doReloadWalletList, storeId, () => {
  return doLoadWalletList(false);
});
addSignalListener(BroadcastMsgType.updateWalletList, storeId, () => {
  return doLoadWalletList(false);
});
addSignalListener(BroadcastMsgType.updateAccountData, storeId, (walletId, accountId) => {
  return reloadAccountData(walletId, accountId);
});
addSignalListener(doRemoveAccount, storeId, (walletId, accountId, doUpdate = true) => {
  return removeAccount(walletId, accountId, doUpdate);
});
addSignalListener(onAccountDataUpdated, storeId, (appAccount, doBroadcast = true) => {
  updateFavoriteAccountList();
  if (doBroadcast) {
    dispatchSignalSync(doSendUpdateAccountData, appAccount.id, appAccount.walletId);
  }
});
addSignalListener(onAccountSettingsUpdated, storeId, () => {
  updateFavoriteAccountList();
});
addSignalListener(onAppAccountAddedToAppWallet, storeId, () => {
  updateFavoriteAccountList();
});
addSignalListener(onAccountRemoved, storeId, () => {
  updateFavoriteAccountList();
});
addSignalListener(onWalletListUpdated, storeId, () => {
  updateFavoriteAccountList();
});
addSignalListener(onFocus, storeId, () => {
  return doLoadWalletList();
});
addSignalListener(doToggleManualSyncForAllAccounts, storeId, async (walletId) => {
  const appWallet = getIAppWallet(walletId);
  if (appWallet) {
    return await updateManualSyncForAllAccounts(appWallet, !appWallet.hasManualSyncAccount);
  }
  throw new Error("No appWallet set.");
});
addSignalListener(doInitApp, storeId, () => {
  return loadWalletList();
});

let __initEternlPromise = void 0;
const _initEternlSidePanel = async (progress) => {
  if (progress) {
    progress.value = 0;
  }
  performance.now();
  await Promise.all([
    loadCSL(networkId.value),
    loadCMS()
  ]);
  if (progress) {
    progress.value = 25;
  }
  await Promise.all([
    dispatchSignal(doSetActiveApp),
    // doSetActiveApp -> onSyncLeader for managerV2
    waitForCSL()
  ]);
  if (progress) {
    progress.value = Math.floor(50 + 25 * Math.random());
  }
  await dispatchSignal(doInitFirstWorker);
  await dispatchSignal(doInitApp);
  await dispatchSignal(doPostInitApp);
  if (progress) {
    progress.value = 100;
  }
};
const initEternl = (progress) => {
  if (!__initEternlPromise) {
    __initEternlPromise = _initEternlSidePanel(progress);
    setEternlInitPromise(__initEternlPromise);
  }
  return getEternlInitPromise();
};
const waitCSLInit = new Promise((resolve) => {
  const intervalId = setInterval(() => {
    if (globalThis["cslInitialized"]) {
      const num = getCSLBigNum("1000");
      num.free();
      clearInterval(intervalId);
      resolve(true);
    }
  }, 50);
});
const waitForCSL = () => {
  return waitCSLInit;
};

export { _initEternlSidePanel, initEternl };
