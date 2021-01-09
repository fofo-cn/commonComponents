<template>
  <main>
    <el-button
      type="primary"
      @click="popup = true"
      :class="{ text: form.text, button: form.button }"
    >
      {{ form.title }}
    </el-button>
    <el-dialog
      title="提示"
      :visible.sync="popup"
      width="30%"
      :before-close="handleClose"
    >
      <div class="container">
        <p class="title">{{ form.title }}</p>
        <ul>
          <li
            v-for="val in form.data"
            :key="val.Id"
            :class="{ active: val.Id === value }"
            @click="onChange(val.Id)"
          >
            <span>{{ val.Name }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({ components: {} })
export default class Select extends Vue {
  @Prop() form!: any;
  popup = false;
  value = 0;
  onChange(id: number) {
    this.value = id;
    this.$emit("getId", id);
  }
  handleClose() {
    this.popup = false;
  }
}
</script>

<style lang="scss" scoped>
main {
  .button {
    margin: 8px;
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
