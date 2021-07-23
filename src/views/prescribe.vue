<!--  -->
<template>
  <div class="prescribe">
    <myhead></myhead>
    <el-container>
      <el-aside class="aside">
        <div class="prescribe_aside_font">西药方</div>
        <div class="prescribe_aside_font">中成药方</div>
        <div class="prescribe_aside_font">已提交</div>
      </el-aside>
      <el-main>
        <h3>设置处方</h3>
        <myform title="中成药方" :prescribeDrugList="drugList">
          <div slot="add" @click="dialogFormVisible=true">
            <i class="el-icon-plus mr10"></i>
            <span>新增药品</span>
          </div>
          <div slot="footer">
            <i class="el-icon-delete-solid"></i>
            <span>删除处方</span>
          </div>
        </myform>
         <div class="form_button" @click="submitPre">
          <span>提交药品</span>
        </div>
      </el-main>
    </el-container>
    <el-dialog  :visible.sync="dialogFormVisible">
      <addDrugForm></addDrugForm>
</el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
import myhead from "../components/head.vue";
import myform from "../components/baseDrugForm.vue";
import addDrugForm from "../components/addDrugForm.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { myhead, myform, addDrugForm},
  data() {
    return {
      dialogFormVisible:false,
      drugList: [
        {
          drugName: "阿莫西林",
          specification: "xx",
          drugId: "1",
          dose: "1.00",
          frequencyName: "bid",
          usageName: "口服",
          takeDays: "1",
          quantity: "1",
          remark: "",
        },
      ],
    };
  },

  computed: {},

  watch: {},

  methods: {
    handleAdd()
    {

    },
    submitPre()
    {
      
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.prescribe{
  height: 600px;
}
.aside {
  height: 500px;
  background-color: #6699cc;
 display: flex;
 flex-direction: column;
 justify-content: center;
}
.prescribe_aside_font {
  color: #fff;
  font-weight: 700;
  line-height: 60px;
}
</style>