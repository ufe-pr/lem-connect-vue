import React from "react";
import {
  LaserEyesModalProvider,
  ConnectWalletButton,
} from "lasereyes-modal-connect";
import "lasereyes-modal-connect/dist/style.css";
import { Root, createRoot } from "react-dom/client";
import LaserEyesStoreAdapter from "./lasereyes-adapter";
import LaserEyesModalStoreAdapter from "./lem-connect-adapter";

export class ReactConnector {
  root: Root;

  constructor(targetEl: HTMLElement) {
    this.root = createRoot(targetEl);
  }

  render(showButton: boolean) {
    this.root.render(
      <LaserEyesModalProvider>
        {showButton && <ConnectWalletButton />}
        <LaserEyesStoreAdapter />
        <LaserEyesModalStoreAdapter />
      </LaserEyesModalProvider>
    );
  }
}
