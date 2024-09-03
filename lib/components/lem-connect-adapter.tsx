import { FRACTAL_TESTNET, MAINNET, SIGNET, TESTNET } from "@omnisat/lasereyes";
import { useLaserEyesModal as useLaserEyesModalOriginal } from "lasereyes-modal-connect";
import { LaserEyesModalConfig } from "lasereyes-modal-connect/dist/types/config";
import React, { useEffect } from "react";
import { ToRefs, reactive, ref, toRefs, toValue, watchEffect } from "vue";

interface LaserEyesContext {
  isOpen: boolean;
  isLoading: boolean;
  showModal: () => void;
  hideModal: () => void;
  config: LaserEyesModalConfig;
  setConfig: (config: LaserEyesModalConfig) => void;
}

const initialContext: LaserEyesContext = {
  isOpen: false,
  isLoading: false,
  showModal: () => {},
  hideModal: () => {},
  config: {
    networks: [MAINNET, TESTNET, SIGNET, FRACTAL_TESTNET],
    defaultNetwork: "mainnet",
  },
  setConfig: () => {},
};

const lemCtx = ref<LaserEyesContext>();

function updateStore(ctx: LaserEyesContext) {
  lemCtx.value = ctx;
}

export function useLaserEyesModal() {
  let ctx = toRefs(reactive<LaserEyesContext>(initialContext));

  function copyContext(reffedCtx: ToRefs<any>, newCtx: any) {
    for (const key in newCtx) {
      if (reffedCtx[key].value === newCtx[key]) {
        continue;
      }
      reffedCtx[key].value = newCtx[key];
    }
  }

  const getContext = () => {
    const newValue = toValue(lemCtx);
    if (newValue) {
      copyContext(ctx, newValue);
    }
  };

  watchEffect(() => getContext());

  return ctx;
}

export default function LaserEyesModalStoreAdapter() {
  const lemCtx = useLaserEyesModalOriginal();

  useEffect(() => {
    updateStore(lemCtx);
  }, [lemCtx]);

  return <></>;
}
