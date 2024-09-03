<script setup lang="ts">
import { onMounted, toRefs, toValue, watchEffect, defineProps, ref } from "vue";
import { ReactConnector } from "./connector";

const props = defineProps<{ noButton?: boolean }>();
const { noButton } = toRefs(props);
const reactComponent = ref<ReactConnector | null>(null);

onMounted(() => {
  reactComponent.value = new ReactConnector(
    document.getElementById("lem-connect-vue-root")!
  );
  reactComponent.value.render(!noButton);
});

watchEffect(() => reactComponent.value?.render(!toValue(noButton)));
</script>

<template>
  <div id="lem-connect-vue-root">
    <!-- render react component in here -->
  </div>
</template>

<style scoped></style>
