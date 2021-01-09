<template>
  <div :style="{ height: height + 'px', width: 'calc(100% - 40px)' }">
    <div ref="echart" class="container"></div>
    <ul>
      <li>
        <el-switch
          active-text="显示平均线"
          @change="reload"
          v-model="averageLine"
        ></el-switch>
      </li>
      <li>
        <el-switch
          active-text="显示数值"
          @change="reload"
          v-model="labelShow"
        ></el-switch>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ELine } from ".";
import { Switch } from "element-ui";
Vue.use(Switch);
@Component
export default class HbnLine extends ELine {}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
ul {
  display: flex;
  justify-content: center;
  li {
    margin: 0 10px;
  }
}
</style>
