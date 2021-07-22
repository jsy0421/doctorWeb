<template>
  <div>
    <el-header>
      <button class="makeMedicine">
        <i class="el-icon-edit-outline"></i>复诊配药
      </button>
      <button class="record">
        <i class="el-icon-document-copy"></i>接诊记录
      </button>
      <div class="doctorPosition">{{ doctorPosition }}</div>
      <div class="doctorName">{{ doctorName }}</div>
      <el-avatar :size="40" :src="avatarUrl"></el-avatar>
    </el-header>
    <div class="content">
      <div
          class="container"
          :class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
          v-for="(item, index) of containerlist"
          :key="index"
      >
        <div class="container-header" :class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }">
          申请时间：{{ item.createTime.split('T')[0] }} {{ item.createTime.split('T')[1].split('.')[0] }}  <span style="color: ">状态</span>
        </div>
        <div
            v-show="item.content"
            class="container-content"
            :class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
            @click="zhuan(index)"
        >
          <div class="content-item">
            <img
                width="150px"
                height="150px"
                :src="item.avatarUrl"
                alt=""
                srcset=""
            />
            <div class="content-item-two">
              <h3>患者信息</h3>
              <span
              >{{ item.personName }} {{ item.personGenderName }}
                {{ item.personAge }}</span
              >
            </div>
          </div>
          <div class="content-item">
            <h3>历史病症</h3>
            <span>{{ item.diagnosis }}</span>
          </div>
          <div class="content-item">
            <h3>病情描述</h3>
            <span>{{ item.question }}</span>
          </div>
        </div>
        <div
            v-show="item.details"
            class="container-content"
            :class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
            @click="zhuan(index)"
        >
          <div class="details-content">
            <h3 style="padding: 10px 0; text-align: left">所需药品</h3>
            <div class="content-first">
              <span v-for="(ite, inde) of item.drugNames" :key="inde">{{
                  ite
                }}</span>
            </div>
            <h3 style="padding: 10px 0; text-align: left">病情图片</h3>
            <div class="block">
              <el-carousel trigger="click" height="120px">
                <el-carousel-item v-for="ele in photo" :key="ele">
                  <div>
                    <img :src='ele'/>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div class='container-footer' :class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }">
          <button class="footer-button">创建处方</button>
        </div>
      </div>
    </div>
    <div class="footers">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size='2' @current-change='changePage'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "consultRecords",
  data() {
    return {
      containerlist: [
        {
          content: true,
          details: false,
          createTime: "2021-07-14T02:50:56.000+00:00",
          avatarUrl: "",
          personName: "",
          personGenderName: "",
          personAge: "",
          diagnosis: "",
          question: "",
          drugNames: ["肠炎宁片"],
        },
      ],

      rotate: false,
      rotateIndex: 0,
      avatarUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      doctorName: "医生姓名",
      doctorPosition: "职位",
      page: 1,
      total: 0,
      photo: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData(){
      this.axios
          .post("http://47.98.50.20:12000/doctor/consult/page", {
            doctorId: "smile",
            status: "3",
            page: this.page,
            size: 2,
          })
          .then((response) => {
            const res = response.data.result.records;
            this.containerlist = res;
            // console.log(res);
            let drugNames = [];
            for (let i of this.containerlist) {
              drugNames = i.drugNames.split(",");
              i.drugNames = drugNames;
              i.details = false;
              i.content = true;
              // i.push({
              //   details: false,
              // });
              // i.push({
              //   content: true,
              // });
              this.photo = i.photoIds.split(',').filter(item => item && item.trim())
            }
            this.total = response.data.result.total
            console.log(this.total)
            console.log(drugNames);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //翻转效果
    zhuan(index) {
      this.$nextTick(()=>{
        this.rotate = !this.rotate;
        this.rotateIndex = index;
        this.containerlist[index].content = !this.containerlist[index].content;
        this.containerlist[index].details = !this.containerlist[index].details;
      })
    },
    changePage (event) {
      this.page = event
      this.getData()

    }
  },
};
</script>

<style lang="scss">
.container-content {
  height: 270px;
}
.footers {
  margin-top: 80px;
}

.content {
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  justify-content: center;
}
.content-first {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 50px;
  overflow: hidden;
  justify-content: center;
}
.content-first > span {
  color: #6699cc;
  display: inline-block;
  padding: 7px 20px;
  margin: 10px 0;
  border-radius: 20px;
  border: 1px solid #6699cc;
}
.details-content {
  padding: 0 20px;
}
.footer-button {
  width: 140px;
  padding: 10px 10px;
  border-radius: 30px;
  margin-top: 16px;
  margin-right: 30px;
}
.content {
  width: 100%;
  margin: 150px auto 0;
  display: flex;
  flex-wrap: wrap;
}
.content-item-two {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.content-item > span {
  width: 150px;
  text-align: left;
}
.content-item {
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.content-item > img {
  border-radius: 50%;
}

.container-footer {
  border-top: 1px dashed #6699cc;
  // padding: 20px;
  text-align: right;
}
.container-header {
  border-bottom: 1px solid #6699cc;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.container {
  box-shadow: #999 5px 5px 10px;
  width: 360px;
  height: 460px;
  border: 4px #6699cc solid;
  border-radius: 20px;
  margin-bottom: 50px;
  margin-left: 80px;
}
.aa {
  transition: all 1s;
}

.go {
  // transform: rotateY(360deg);
  transform: rotateY(180deg);
  transition: all 1s;
}

.details-back {
  transform: rotateY(180deg);
}
.el-header {
  background-color: #6699cc;
  color: #333;
  line-height: 60px;
  box-shadow: 0px 1px 5px #888888;
}

.doctorName {
  display: inline;
  float: right;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.doctorPosition {
  display: inline;
  float: right;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 20px;
  color: white;
  font-size: 15px;
}

.el-avatar {
  float: right;
  display: flex;
  margin-top: 10px;
  margin-right: 20px;
  box-shadow: 1px 1px 10px #888888;
}

button {
  width: 10%;
  height: 100%;
  background-color: #6699cc;
  color: white;
  border: 0;
  font-size: 20px;
}

button:hover {
  background-color: #87a5cc;
}

i {
  padding-right: 10px;
}

.makeMedicine {
  margin-right: 20%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
