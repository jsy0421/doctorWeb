<!--  -->
<template>
  <div class="mybutton">
    <span>{{text}}</span>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)

export default {
  // import引入的组件需要注入到对象中才能使用
  props:['text'],
  components: {},
  data() {
    return {};
  },

  computed: {},

  watch: {},

  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */

.mybutton {
  span{
    font-size: 16px;
    color: #fff;
    border-radius: 25px;
    background-color: #6699cc;
    padding: 15px 40px;
  }
}
</style>