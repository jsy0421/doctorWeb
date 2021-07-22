<!--  -->
<template>
  <div class="formbody">
    <myhead></myhead>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="药方类型">
          <el-col :span="20">
            <el-radio-group v-model="form.type">
              <el-radio border label="西药方"></el-radio>
              <el-radio border label="中成药方"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="药品">
          <el-col :span="20">
            <el-select v-model="form.drug" placeholder="选择药品">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="频次">
          <el-radio-group
            v-model="form.frequencyName"
            v-for="(item, index) in frequencyList"
            :key="index"
          >
            <el-radio :label="item.itemNameAbbr"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用法">
          <el-radio-group
            v-model="form.usageName"
            v-for="(item, index) in usageList"
            :key="index"
          >
            <el-radio :label="item.itemName"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="剂量">
          <el-input-number
            v-model="form.dose"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="用药天数(天)">
          <el-input-number
            v-model="form.takeDays"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总量(盒)">
          <el-input-number
            v-model="form.quantity"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
import myhead from "../components/head.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    myhead,
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        dose: 1.02,
        usageName: [],
        frequencyName: [],
        takeDays: 0,
        quantity: 0,
        type: [],
        remark: "",
        keyword: "",
      },
      frequencyList: [],
      usageList: [],
    };
  },

  computed: {},

  watch: {},

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  mounted() {
    this.$http.get("usage/list").then(({ data }) => {
      this.usageList = data.result;
    });
    this.$http.get("frequency/list").then(({ data }) => {
      this.frequencyList = data.result;
    });
    this.$http.get(`drug/search/${this.keyword}`).then(({ data }) => {
      this.form.frequencyList = data.result;
    });
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.formbody {
  .form {
    font-size: 24px;
    width: 1200px;
    margin: 30px auto;
    background-color: #eee;
    padding: 15px 50px;
  }
}
</style>