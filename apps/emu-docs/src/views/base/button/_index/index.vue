<template>
  <EmDocs v-bind="model"> </EmDocs>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import attrs from "./data/attrs";
import slots from "./data/slots";
import events from "./data/events";
import { EmDocs } from "@/components";

const model = reactive({
  title: "面板(em-panel)",
  icon: "appstore",
  attrs,
  slots,
  events,
});
</script>
