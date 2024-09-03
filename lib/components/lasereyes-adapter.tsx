import {
  FRACTAL_TESTNET,
  LEATHER,
  MAGIC_EDEN,
  MAINNET,
  OYL,
  SIGNET,
  TESTNET,
  UNISAT,
  XVERSE,
  useLaserEyes as useLaserEyesOriginal,
} from "@omnisat/lasereyes";
// import { useLaserEyesModal } from "lasereyes-modal-connect";
import React, { useEffect } from "react";
import { ToRefs, reactive, ref, toRefs, toValue, watchEffect } from "vue";

export const initialWalletContext = {
  hasUnisat: false,
  hasXverse: false,
  hasOyl: false,
  hasMagicEden: false,
  hasOkx: false,
  hasLeather: false,
  hasPhantom: false,
  hasWizz: false,
  isInitializing: true,
  connected: false,
  isConnecting: false,
  publicKey: "",
  address: "",
  paymentAddress: "",
  paymentPublicKey: "",
  balance: undefined,
  network: MAINNET as
    | typeof MAINNET
    | typeof TESTNET
    | typeof SIGNET
    | typeof FRACTAL_TESTNET,
  library: null,
  provider: null,
  accounts: [],
  connect: async (
    _:
      | typeof OYL
      | typeof UNISAT
      | typeof XVERSE
      | typeof LEATHER
      | typeof MAGIC_EDEN
  ) => {},
  disconnect: () => {},
  requestAccounts: async () => [],
  getNetwork: async () => MAINNET,
  switchNetwork: async (
    _: typeof MAINNET | typeof TESTNET | typeof SIGNET | typeof FRACTAL_TESTNET
  ) => {},
  getPublicKey: async () => "",
  getBalance: async () => "",
  getInscriptions: async () => [],
  sendBTC: async (_: string, __: number) => "",
  signMessage: async (_: string) => "",
  signPsbt: async (_: string) => {
    return {
      signedPsbtHex: "",
      signedPsbtBase64: "",
      txId: "",
    };
  },
  pushPsbt: async (_: string) => {
    return "";
  },
  inscribe: async (_: any) => "",
  isCreatingCommit: false,
  isInscribing: false,
};

type LaserEyesContextType = {
  isInitializing: boolean;
  connected: boolean;
  isConnecting: boolean;
  publicKey: string;
  address: string;
  paymentAddress: string;
  paymentPublicKey: string;
  balance: number | undefined;
  network:
    | typeof MAINNET
    | typeof TESTNET
    | typeof SIGNET
    | typeof FRACTAL_TESTNET;
  library: any;
  provider: any;
  accounts: string[];
  hasUnisat: boolean;
  hasXverse: boolean;
  hasOyl: boolean;
  hasMagicEden: boolean;
  hasOkx: boolean;
  hasLeather: boolean;
  hasPhantom: boolean;
  hasWizz: boolean;
  connect: (
    walletName: typeof UNISAT | typeof XVERSE | typeof MAGIC_EDEN
  ) => Promise<void>;
  disconnect: () => void;
  requestAccounts: () => Promise<string[]>;
  getNetwork: () => Promise<string | undefined>;
  switchNetwork: (
    network:
      | typeof MAINNET
      | typeof TESTNET
      | typeof SIGNET
      | typeof FRACTAL_TESTNET
  ) => Promise<void>;
  getPublicKey: () => Promise<string>;
  getBalance: () => Promise<string>;
  getInscriptions: () => Promise<any[]>;
  sendBTC: (to: string, amount: number) => Promise<string>;
  signMessage: (message: string, toSignAddress?: string) => Promise<string>;
  signPsbt: (
    tx: string,
    finalize?: boolean,
    broadcast?: boolean
  ) => Promise<
    | {
        signedPsbtHex: string | undefined;
        signedPsbtBase64: string | undefined;
        txId?: string;
      }
    | undefined
  >;
  pushPsbt: (tx: string) => Promise<string | undefined>;
};

const leCtx = ref<LaserEyesContextType>(initialWalletContext);

function updateLaserEyesStore(ctx: LaserEyesContextType) {
  leCtx.value = ctx;
}

export function useLaserEyes() {
  let ctx = toRefs(reactive<LaserEyesContextType>(initialWalletContext));

  function copyContext(reffedCtx: ToRefs<any>, newCtx: any) {
    for (const key in newCtx) {
      if (reffedCtx[key].value === newCtx[key]) {
        continue;
      }
      reffedCtx[key].value = newCtx[key];
    }
  }

  const getContext = () => {
    const newValue = toValue(leCtx);
    if (newValue) {
      copyContext(ctx, newValue);
    }
  };

  watchEffect(() => getContext());

  return ctx;
}

export default function LaserEyesStoreAdapter() {
  const leCtx = useLaserEyesOriginal();

  useEffect(() => {
    updateLaserEyesStore(leCtx);
  }, [leCtx]);

  return <></>;
}
