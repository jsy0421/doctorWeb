<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="项目名称" prop="itemName">
        <el-input v-model="dataForm.itemName" placeholder="参数名称"></el-input>
      </el-form-item>
      <el-form-item label="名称缩写" prop="itemNameAbbr">
        <el-input v-model="dataForm.itemNameAbbr" placeholder="缩写"></el-input>
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
          itemName:"",
          itemNameAbbr:"",
        },
        dataRule: {
          itemName: [
            { required: true, message: '参数名不能为空', trigger: 'blur' }
          ],
          itemNameAbbr: [
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
             url: `/frequency/get/${id}`,
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
              url: `/frequency/${!this.dataForm.id ? 'add' : 'update'}`,
              method: 'post',
              data: {
                id: this.dataForm.id || undefined,
                itemName: this.dataForm.itemName,
                itemNameAbbr: this.dataForm.itemNameAbbr,
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
