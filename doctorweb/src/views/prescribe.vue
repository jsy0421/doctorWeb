<!--  -->
<template>
	<div class="prescribe">
		<div class="background">
			<img src="../assets/background.jpg" style="width: 100%; height: 100%;opacity: 0.3;">
		</div>
		<myhead :avatarUrl="avatarUrl" :doctorName="doctorName"
			:doctorPosition="doctorPosition" :currentPage=1></myhead>
		
		<el-container>
			<el-aside class="aside" width="200px">
				<el-menu default-active="1" class="prescribe_aside" background-color="#6699cc" text-color="#fff"
					active-text-color="#85add6" @open="chooseOne" @close="chooseOne">
					<el-submenu index="1" class="index">
						<template slot="title">
							<i class="el-icon-s-order" style="color: white;"></i>
							新增处方
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1" @click="xiyaoclick">西药方</el-menu-item>
							<el-menu-item index="1-2" @click="zhongyaoclick">中成药方</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="2" @click="chooseTwo">
						<template slot="title">
							<i class="el-icon-finished" style="color: white;"></i>
							已提交
						</template>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<div v-if="curNow === 1">
					<h3 class="titleName">设置处方</h3>
					<div v-for="(item, index) of prescriptionList" :key="index">
						<div class="baseform">
							<div class="baseform_title">
								<div>
									<i class="el-icon-document-add mr10"></i>
									<span>{{ item.prescriptionName }}</span>
								</div>
								<div @click="addMidicine(index)">
									<i class="el-icon-plus mr10"></i>
									<span>新增药品</span>
								</div>
							</div>
							<div class="baseform_body">
								<div class="baseform_body_item" v-for="(itm, ind) in item.drugList" :key="ind">
									<div class="baseform_body_line">
										<span class="mr60">{{ itm.drugName }}</span>
										<span> {{ itm.specification }}</span>
									</div>
									<div class="baseform_body_line textRight">
										<span class="mr50">{{ itm.quantity }}盒</span>
										<i class="el-icon-delete" @click="deleteMedicine(index,ind)"></i>
									</div>
									<div class="baseform_body_line">
										<span class="mr60">用法 : {{ itm.usageName }}</span>
										<span> {{ itm.frequencyName }}</span>
									</div>
									<el-divider></el-divider>
								</div>
								<div class="baseform_body_bottom">
									<div @click="deletePrescription(index)">
										<i class="el-icon-delete-solid"></i>
										<span>删除处方</span>
									</div>
								</div>
							</div>
						</div>

					</div>

					<mybutton class="prescribe_bottom_button" @click.native="submitPre" text="提交处方">
					</mybutton>
				</div>
				<div v-else>
					<h3 class="titleName">已提交处方</h3>
					<div v-for="(item, index) of finishList" :key="index">
						<myform :title="item.prescriptionName" :prescribeDrugList="item.drugList"></myform>
					</div>
				</div>

			</el-main>
		</el-container>
		<el-dialog :visible.sync="dialogFormVisible">
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
		components: {
			myhead,
			myform,
			addDrugForm,
			mybutton
		},
		data() {
			return {
				dialogFormVisible: false,
				prescriptionList: [],
				// drugList: [],
				finishList: [],
				orgId: "",
				doctorId: "",
				avatarUrl: "",
				doctorName: "",
				doctorPosition: "",
				drugNames: "",
				userId: '',
				createUserId: '', //用户userid
				consultId: '',
				id: -1,
				curNow: 1
			};
		},

		methods: {
			deleteMedicine(index, ind) {
				this.prescriptionList[index].drugList.splice(ind, 1)
			},
			deletePrescription(index) {
				this.prescriptionList.splice(index, 1)
			},
			getData() {
				this.doctorName = sessionStorage.getItem("doctorName");
				this.doctorPosition = sessionStorage.getItem("levelName");
				this.avatarUrl = sessionStorage.getItem("avatarUrl");
				this.doctorId = sessionStorage.getItem("doctorId");
				console.log(this.$route.query)
				var option = this.$route.query;
				this.orgId = option.orgId;
				this.doctorId = option.doctorId;
				this.doctorName = option.doctorName;
				this.drugNames = option.drugNames;
				this.userId = option.userId;
				this.createUserId = option.createUserId;
				this.consultId = option.consultId;
			},
			chooseOne() {
				this.curNow = 1;
				console.log(this.curNow);
			},
			chooseTwo() {
				this.curNow = 2;
				console.log(this.curNow);
				console.log(this.finishList);
			},
			submitPre() {
				this.$http.post(`prescribe/`, this.prescriptionList).then(({
					data
				}) => {
					if (data.code === 200) {
						this.$message({
							showClose: true,
							message: "处方提交成功",
							type: "success",
						});
						for (var i = 0; i < this.prescriptionList.length; i++) {
							this.finishList.push(this.prescriptionList[i]);
						}
						this.prescriptionList = []
					}
				});

			},
			dialogClose(e) {
				console.log(e);
				// this.drugList.push(e);
				this.prescriptionList[this.id].drugList.push(e);
				console.log(this.prescriptionList);
				this.dialogFormVisible = false;
			},
			xiyaoclick() {
				this.curNow = 1;
				var id = this.prescriptionList.length;
				var newPrescription = {
					userId: this.createUserId,
					orgId: this.orgId,
					consultId: this.consultId,
					doctorId: this.doctorId,
					doctorName: this.doctorName,
					prescriptionId: id,
					prescriptionName: '西药方',
					prescriptionType: '1',
					drugList: []
				};
				this.prescriptionList.push(newPrescription);
				console.log(this.prescriptionList);
			},
			zhongyaoclick() {
				this.curNow = 1;
				var id = this.prescriptionList.length;
				var newPrescription = {
					userId: this.createUserId,
					orgId: this.orgId,
					consultId: this.consultId,
					doctorId: this.doctorId,
					doctorName: this.doctorName,
					prescriptionId: id,
					prescriptionName: '中成药方',
					prescriptionType: '2',
					drugList: []
				};
				this.prescriptionList.push(newPrescription);
				console.log(this.prescriptionList);
			},
			addMidicine(index) {
				this.id = index;
				this.dialogFormVisible = true;
				console.log(this.id)
			}

		},
		mounted(data) {
			this.getData();
			this.$
			console.log(data);

		},
	};
</script>
<style lang="scss" scoped>
	/* @import url(); 引入公共css类 */
	.background {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute;
	
	}
	.prescribe {
		height:100%;
		background: "../assets/background.jpg"no-repeat;
	}
	
	.index{
		margin-bottom: 150px;
	}

	.aside {
		height: 660px;
		background-color: #6699cc;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 1px 0px 5px #888888;
	}

	.prescribe_aside {
		color: #fff;
		font-weight: 700;
		line-height: 60px;
	}

	.prescribe_bottom_button {
		position: absolute;
		bottom: 40px;
		right: 40px;
	}

	.titleName {
		font-size: 40px;
		font-weight: 600;
		margin-top: 20px;
		margin-bottom: 40px;
	}

	.detele {
		display: inline;
		padding: 2%;
	}

	.baseform {
		background-color: #fff;
		border-radius: 20px;
		overflow: hidden;
	}

	.baseform_title {
		background-color: #ccccff;
		height: 50px;
		line-height: 50px;
		padding-left: 30px;
		padding-right: 30px;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
	}

	.baseform_body {
		text-align: left;
		padding: 30px 50px;

		.baseform_body_bottom {
			text-align: right;
			margin-top: 60px;
		}
	}
</style>
