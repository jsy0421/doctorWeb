<!--  -->
<template>
	<div class="detail">
		<myhead :avatarUrl="avatarUrl" :doctorName="doctorName"
			:doctorPosition="doctorPosition" :currentPage=2></myhead>
		<div class="detail_title pl30 pr30">
			<div class="type">
				{{ detail.prescribeList[page].prescriptionType | typeFormat }}
			</div>
			<div class="f40 w700 mt30 mb10">{{detail.prescribeList[page].orgName}}</div>
			<div class="f30">处方笺</div>
			<div class="textRight">
				日期: {{ detail.prescribeList[page].createTime | dateFormat }}
			</div>
		</div>
		<div class="detail_body">
			<div class="detail_left ml30">
				<div class="detail_left_top">
					<div class="f24 w700 textLeft mb10">患者信息</div>
					<div class="detail_body_line detail_flex">
						<span>姓名: {{ detail.personName }}</span>
						<span>性别: {{ detail.personGenderName }}</span>
						<span>年龄: {{ detail.personAge }}</span>
					</div>
					<div class="detail_body_line detail_flex">
						<span>身份证号: {{ detail.personCardId }}</span>
						<span>手机号: {{ detail.personPhoneNo }}</span>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="detail_left_bottom">
					<div class="f24 w700 textLeft mb10">医师信息</div>
					<div class="detail_body_line detail_flex">
						处方医师: {{ detail.prescribeList[page].doctorName }}
					</div>
					<div class="textLeft detail_body_line">审核医师:</div>
					<div class="textLeft detail_body_line">发药医师:</div>
					<div class="textRight detail_body_line">盖章: &nbsp;&nbsp;&nbsp;</div>
				</div>
			</div>
			<div class="detail_right mr30">
				<div class="f24 w700 textLeft mb10">药品信息</div>
				<div class="detail_right_list" v-for="(item, index) in detail.prescribeList[page].drugList"
					:key="index">
					<div class="detail_body_line textLeft">
						{{ item.drugName }}
					</div>
					<span class="detail_type">{{ item.quantity }}盒</span>
					<div class="detail_body_line textLeft">
						用法: {{ item.usageName }}
					</div>

					<el-divider></el-divider>
				</div>
				<div class="textRight">药费: <div style="color: #e5964d;display: inline;">{{ totalPrice }}</div>元</div>
			</div>
		</div>

		<el-pagination background layout="prev, pager, next" :total="total" :page-size='1' @current-change='changePage'>
		</el-pagination>


	</div>
</template>

<script>
	// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
	import myhead from "../components/head.vue";

	export default {
		// import引入的组件需要注入到对象中才能使用
		components: {
			myhead
		},
		data() {
			return {
				detail: {},
				page: 0,
				orgId: "",
				doctorId: "",
				avatarUrl: "",
				doctorName: "",
				doctorPosition: "",
				drugNames: "",
				userId: '',
				createUserId: '', //用户userid
				consultId: '',
				total: 0,
				count: 0
			};
		},

		computed: {
			totalPrice() {
				let sum = 0;
				// console.log(this.detail.prescribeList[this.page].drugList);

				this.detail.prescribeList[this.page].drugList.forEach((element) => {
					sum += element.quantity * element.price;
				});
				return sum;
			},
		},

		watch: {},

		methods: {
			load() {
				this.count += 2
			},
			getData() {
				this.doctorName = sessionStorage.getItem("doctorName");
				this.doctorPosition = sessionStorage.getItem("levelName");
				this.avatarUrl = sessionStorage.getItem("avatarUrl");
				this.doctorId = sessionStorage.getItem("doctorId");
				var option = this.$route.query;
				this.orgId = option.orgId;
				this.doctorId = option.doctorId;
				this.doctorName = option.doctorName;
				this.drugNames = option.drugNames;
				this.userId = option.userId;
				this.createUserId = option.createUserId;
				this.consultId = option.consultId;
			},
			changePage(event) {
				this.page = event-1
				console.log(this.page)
			}
		},
		filters: {
			dateFormat(time) {
				var data = time.substring(0, 10);
				var second = time.substring(11, 19);
				return data + " " + second;
			},
			typeFormat(type) {

				if (type === "1") {
					return "西药方";
				} else if (type === "2") {
					return "中成药方";
				} else {
					return "中药方";
				}
			},
		},
		mounted() {
			this.getData();
			// console.log(this.consultId);
			this.$http.get(`/prescribe/${this.consultId}`).then(({
				data
			}) => {
				console.log(data);
				this.detail = data.result;
				console.log(this.detail.prescribeList.length)
				this.total = this.detail.prescribeList.length
			});
		},
	};
</script>
<style lang="scss" scoped>
	/* @import url(); 引入公共css类 */


	.detail_type {
		display: inline-block;
		position: absolute;
		right: 50px;
		border-radius: 1px solid #000;
	}

	.detail_body {
		display: flex;
		font-size: 18px;

		.detail_body_line {
			height: 50px;
			line-height: 50px;
		}
	}

	.detail_left {
		flex: 1;


		.detail_left_top {
			padding: 20px 20px;
		}

		.detail_left_bottom {
			padding: 20px 20px;
		}

		padding-right: 10px;
		border-right: 1px #BBBBBB solid;
		width: 550px;
	}

	.detail_right {
		flex: 1;
		padding: 40px 20px;
		width: 550px;
	}

	.detail_flex {
		display: flex;
		justify-content: space-between;
	}

	.type {
		border: 3px #021834 solid;
		width: 80px;
		height: 30px;
		float: right;
		padding: 20px;
		padding-top: 30px;
		margin-left: 20px;
	}
</style>
