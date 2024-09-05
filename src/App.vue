<script setup lang="ts">
import { LaserEyesModal, useLaserEyes } from "../lib/index";

const { address } = useLaserEyes();
</script>

<template>
  <p>Address: {{ address }}</p>

  <LaserEyesModal />
</template>

<style scoped></style>
