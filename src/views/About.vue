<template>
  <main>
    <Select class="select1" :form="form1" @getId="getId" />
    <Select :form="form2" />
    <!-- <MultipleSelect :form="form" /> -->
    <el-button type="primary" @click="$router.push('ecahrts')">
      未传参echarts
    </el-button>
    <el-button type="primary" @click="showEcharts('pie')">
      已传参echarts饼图
    </el-button>
    <el-button type="primary" @click="showEcharts('lineandbar')">
      已传参echarts柱状图和折线图
    </el-button>

    <el-dialog
      title="折线图和柱状图"
      :visible.sync="showLineAndBar"
      width="60%"
      :before-close="() => handleClose('line-and-bar')"
    >
      <LineAndBar />
    </el-dialog>

    <el-dialog
      title="饼图"
      :visible.sync="showPie"
      width="60%"
      :before-close="() => handleClose('pie')"
    >
      <span>这是一段信息</span>
    </el-dialog>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Select from "@/components/Select.vue";
import MultipleSelect from "@/components/MultipleSelect.vue";
import LineAndBar from "./echarts/LineAndBar";
import { Dialog } from "element-ui";
Vue.use(Dialog);
@Component({ components: { Select, MultipleSelect, LineAndBar } })
export default class About extends Vue {
  // form: any = [
  //   {
  //     title: "枚举1",
  //     button: true,
  //     data: [
  //       { Id: 1, Name: "111" },
  //       { Id: 2, Name: "222" },
  //       { Id: 3, Name: "333" },
  //       { Id: 4, Name: "444" },
  //       { Id: 5, Name: "555" },
  //       { Id: 6, Name: "666" }
  //     ]
  //   },
  //   {
  //     title: "枚举2",
  //     button: true,
  //     data: [
  //       { Id: 1, Name: "111" },
  //       { Id: 2, Name: "222" },
  //       { Id: 3, Name: "333" },
  //       { Id: 4, Name: "444" },
  //       { Id: 5, Name: "555" },
  //       { Id: 6, Name: "666" }
  //     ]
  //   }
  // ];
  getId(id: number) {
    console.log(id);
  }
  form1: any = {
    title: "枚举1",
    button: true,
    data: [
      { Id: 1, Name: "111" },
      { Id: 2, Name: "222" },
      { Id: 3, Name: "333" },
      { Id: 4, Name: "444" },
      { Id: 5, Name: "555" },
      { Id: 6, Name: "666" }
    ]
  };
  form2: any = {
    title: "枚举2",
    button: true,
    data: [
      { Id: 1, Name: "111" },
      { Id: 2, Name: "222" },
      { Id: 3, Name: "333" },
      { Id: 4, Name: "444" },
      { Id: 5, Name: "555" },
      { Id: 6, Name: "666" }
    ]
  };
  dialogVisible = false;
  showPie = false;
  showLineAndBar = false;
  handleClose(type: string) {
    if (type === "pie") {
      this.showPie = false;
    } else {
      this.showLineAndBar = false;
    }
  }
  showEcharts(type: string) {
    if (type === "pie") {
      this.showPie = true;
    } else {
      this.showLineAndBar = true;
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
