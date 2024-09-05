# Lasereyes Modal (Vue)

This package is to serve as an adapter for the [`lasereyes-modal`](https://github.com/ufe-pr/lasereyes-modal) package as well as the [`@omnisat/lasereyes`](https://github.com/omnisat/lasereyes) package for Vue.js.

## Installation

```bash
npm install @omnisat/lasereyes lasereyes-modal-vue
```

Additionally, you'll have to configure Vite to include a buffer polyfill for the `@omnisat/lasereyes` package. This is because the `@omnisat/lasereyes` package uses the `Buffer` class which is not available in the browser. To do this, update your `vite.config.js` like so:

```js
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      include: ["buffer"],
    }),
  ],
});
```

## Usage

Simply import the `LaserEyesModal` component from the package and place it wherever you want the connect wallet button to be.

**Example:**

```vue
<!-- App.vue -->
<script setup lang="ts">
import { LaserEyesModal } from "lasereyes-modal-vue";
</script>

<template>
  <h1>Hello world</h1>
  <LaserEyesModal />
</template>

<style scoped></style>
```

If you would rather have the button styled yourself, you can import the `useLaserEyesModal` composable and use it to control the modal.

> Note: The LaserEyesModal component has to exist in your component tree for the modal to work. You can hide the button using the `no-button` prop.

**Example:**

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useLaserEyesModal } from "lasereyes-modal-vue";

const { openModal } = useLaserEyesModal();
</script>

<template>
  <LaserEyesModal no-button />
  <h1>Hello world</h1>
  <button @click="openModal">Connect Wallet</button>
</template>

<style scoped></style>
```

## License

MIT