<template>
  <div>
    <p @click="popup = true">
      筛选
    </p>
    <van-popup v-model="popup" @click-overlay="popup = false" position="bottom">
      <div
        class="container"
        v-for="(item, groupIndex) in form"
        :key="item.title"
      >
        <p class="title">{{ item.title }}</p>
        <ul>
          <li
            v-for="val in item.data"
            :key="val.Id"
            :class="{
              active:
                groupIndex + '_' + val.Id ===
                groupIndex + '_' + value[groupIndex]
            }"
            @click="onChange(val.Id, groupIndex)"
          >
            <span>{{ val.Name }}</span>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Select from "./Select.vue";
@Component({ components: { Select } })
export default class MultipleSelect extends Vue {
  @Prop() form!: any;
  popup = false;
  value: number[] = [];
  group = "";
  created() {
    this.value = Array(this.form.length).fill(0);
  }
  onChange(id: number, groupIndex: number) {
    // this.value[groupIndex] = id;
    this.$set(this.value, groupIndex, id);
    // this.value[title] = id;
    // this.group = title;
    // console.log(this.value[this.group]);
    this.$emit("getId", id);
  }
}
</script>

<style lang="scss" scoped>
main {
  .button {
    margin: 8px;
    min-width: 80px;
    border: 1px solid #3fbf8d;
    background: #ebf9f3;
    border-radius: 4px;
  }
  .container {
    .title {
      font-size: 18px;
      text-align: left;
      padding: 20px;
    }
    ul {
      margin: 0 6px;
      font-size: 14px;
      li {
        width: 110px;
        box-sizing: border-box;
        text-align: center;
        margin: 4px 3px;
        display: inline-block;
        line-height: 16px;
        font-size: 15px;
        padding: 8px 0;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #333;
        background: #eee;
        &.active {
          background: #ebf9f3;
          border: 1px solid #3fbf8d;
          opacity: 1;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
