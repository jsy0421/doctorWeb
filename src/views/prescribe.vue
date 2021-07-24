<!--  -->
<template>
  <div class="prescribe">
    <myhead></myhead>
    <el-container>
      <el-aside class="aside">
          <el-menu
      default-active="1"
      class="prescribe_aside"
      background-color="#6699cc"
      text-color="#fff"
       active-text-color="#85add6"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>新增处方</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="xiyaoclick">西药方</el-menu-item>
          <el-menu-item index="1-2" @click="zhongyaoclick">中成药方</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">已提交</span>
      </el-menu-item>
          </el-menu>
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
         <mybutton class="prescribe_bottom_button" @click="submitPre" text="提交处方">
        </mybutton>
      </el-main>
    </el-container>
    <el-dialog  :visible.sync="dialogFormVisible" >
      <addDrugForm @sub="dialogClose"></addDrugForm>
</el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
import myhead from "../components/head.vue";
import mybutton from "../components/mybutton.vue";
import myform from "../components/baseDrugForm.vue";
import addDrugForm from "../components/addDrugForm.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { myhead, myform, addDrugForm,mybutton},
  data() {
    return {
      dialogFormVisible:false,
      prescriptionList:[],
      drugList: [
        // {
        //   drugName: "",
        //   specification: "",
        //   drugId: "-1",
        //   dose: "",
        //   frequencyName: "",
        //   usageName: "",
        //   takeDays: "",
        //   quantity: "",
        //   remark: "",
        // },
      ],
      finishList:[],
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

    },
    dialogClose(e)
    {
      console.log(e);
      this.drugList.push(e);
      this.dialogFormVisible=false;
    },
    xiyaoclick()
    {
        let newPrecription={
            prescriptionType:"1"
        };
        this.prescriptionList.push(newPrecription);

    },
     zhongyaoclick()
    {
       let newPrecription={
            prescriptionType:"2"
        };
          this.prescriptionList.push(newPrecription);
    }
    
  },
  mounted(data) {
    this.$
    console.log(data);

  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.prescribe{
  height: 800px;
  background: "../assets/background.jpg" no-repeat;
}
.aside {
  height: 500px;
  background-color: #6699cc;
 display: flex;
 flex-direction: column;
 justify-content: center;
}
.prescribe_aside {
  color: #fff;
  font-weight: 700;
  line-height: 60px;
}
.prescribe_bottom_button{
    position: absolute;
    bottom: 40px;
    right: 10px;
}
</style>