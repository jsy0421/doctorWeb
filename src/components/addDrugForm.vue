<!--  -->
<template>
  <div class="formbody">
    <div class="form">
      <el-form ref="form" :model="form" label-width="100px" border='true'
      fit="false" align="center">
        <el-form-item label="药品">
          <el-button @click="drawer = true" style="width:100px">选择药品</el-button>
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
            v-model="form.dose" style="margin-top:0px"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="用药天数(天)">
            <el-col :span="8"></el-col>
          <el-input-number
            v-model="form.takeDays"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总量(盒)">
          <el-input-number
            v-model="form.quantity"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <div class="form_button" @click="submitDrug">
          <span>提交药品</span>
        </div>
      </el-form>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="rtl"
      append-to-body
    >
      <div
        class="drawer_item"
        v-for="(item,index) in drugList"
        :key="index"
        @click="chooseDrug"
      >
      <div class="lh30">药品名 {{item.drugName}}</div>
        <div class="lh30">药品厂家 {{item.factoryName}}</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      drawer: false,
      form: {
        name: "",
        dose: 1.0,
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
      drugList:[],
      subDrugList:[]
    };
  },

  computed: {},

  watch: {},

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    chooseDrug()
    {
      this.drawer=true
    },
    submitDrug()
    {
      this.subDrugList.push(this.form);
      this.drawer=false;
    }
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
    this.$http.get(`/drug/page?page=1&size=20`)
      .then(({ data }) => {
        console.log(data);
        this. drugList= data.result.records;
      });
    this.$http.post(`prescribe/`, {}).then(({ data }) => {
      if (data.code === 200) {
        this.$message({
          showClose: true,
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.formbody {
  .form {
    font-size: 24px;
    width: 500px;
    padding: 15px 50px; 
    .form_button{
    text-align: right;
    span{
    color: #fff;
    border-radius: 10px ;
        background-color: #6699cc;
        padding: 10px;
    }
    }
  }
}
.drawer_item{
  height: 80px;
  padding: 10px 40px;
}

</style>