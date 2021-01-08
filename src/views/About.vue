<template>
  <main>
    <Select class="select1" :form="form1" @getId="getId" />
    <Select :form="form2" />
    <!-- </van-popup> -->
    <MultipleSelect :form="form" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Select from "@/components/Select.vue";
import MultipleSelect from "@/components/MultipleSelect.vue";
import { Popup } from "vant";
Vue.use(Popup);
@Component({ components: { Select, MultipleSelect } })
export default class About extends Vue {
  form: any = [
    {
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
    },
    {
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
    }
  ];
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
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
}
</style>
