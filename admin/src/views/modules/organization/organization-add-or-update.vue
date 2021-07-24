<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="机构名称" prop="organizationName">
        <el-input v-model="dataForm.organizationName" placeholder="机构名称"></el-input>
      </el-form-item>
      <el-form-item label="机构地址" prop="organizationAddr">
        <el-input v-model="dataForm.organizationAddr" placeholder="机构地址"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="organizationPhoneNo">
        <el-input v-model="dataForm.organizationPhoneNo" placeholder="联系方式"></el-input>
      </el-form-item>
     
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          drugName:"",
          tradeName:"",
          pinyinCode:"",
          packUnit:"",
          specification:"",
          price:"",
          dose:"",
          doseUnit:"",
          remark: ''
        },
        dataRule: {
          drugName: [
            { required: true, message: '参数名不能为空', trigger: 'blur' }
          ],
          tradeName: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
            pinyinCode: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
          packUnit: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
          specification: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
            price: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
            dose: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
           doseUnit: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '参数值不能为空', trigger: 'blur' }
          ],
          
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$myhttp({
             url: `/organization/get/${id}`,
              method: 'get',
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm=data.result;
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$myhttp({
              url: `/organization/${!this.dataForm.id ? 'add' : 'update'}`,
              method: 'post',
              data: {
                'id': this.dataForm.id || undefined,
                'paramKey': this.dataForm.paramKey,
                'paramValue': this.dataForm.paramValue,
                'remark': this.dataForm.remark
              }
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
