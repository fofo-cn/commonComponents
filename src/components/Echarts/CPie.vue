<template>
  <div
    ref="echart"
    class="container"
    :style="{ height: height + 'px', width: '100%' }"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { EPie } from ".";
@Component
export default class HbnPie extends EPie {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
