<!--  -->
<template>
	<div class="formbody">
		<div class="form">
			<el-form ref="form" :model="form" label-width="100px" border="true" fit="false" align="center">
				<el-form-item label="药品">
					<el-button @click="drawer = true" style="width: 300px">{{searchWord}}</el-button>
				</el-form-item>
				<el-form-item label="频次">
					<el-radio-group v-model="form.frequencyName" v-for="(item, index) in frequencyList" :key="index">
						<el-radio :label="item.itemNameAbbr" style="margin-left: 15px;"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="用法">
					<el-radio-group v-model="form.usageName" v-for="(item, index) in usageList" :key="index">
						<el-radio :label="item.itemName" style="margin-left: 15px;"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="剂量">
					<el-input-number class="formbody_inputnumber" v-model="form.dose" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="用药天数(天)">
					<el-col :span="8"></el-col>
					<el-input-number v-model="form.takeDays" class="formbody_inputnumber" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="总量(盒)">
					<el-input-number v-model="form.quantity" class="formbody_inputnumber" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="form.remark"></el-input>
				</el-form-item>
				<mybutton class="textRight" @click.native="submitDrug" text="提交药品">
				</mybutton>
			</el-form>
		</div>
		<el-drawer :visible.sync="drawer" direction="rtl" append-to-body>

			<div class="search">
				<el-input class="drawer_search" placeholder="请输入内容" suffix-icon="el-icon-search" @change="search"
					v-model="keyword" style="width: 90%;">
				</el-input>
				<div class="search-text">
					搜索结果({{drugList.length}}条)
				</div>
			</div>
			<div class="result">
				<div class="drawer_item" v-for="(item, index) in drugList" :key="index" @click="chooseDrug(item)">
					<div class="lh30">{{ item.drugName }}
						<div class="dose">
							{{item.dose}}{{item.doseUnit}}
						</div>
					</div>
					<div class="lh30">{{ item.factoryName }}</div>
				</div>
			</div>

		</el-drawer>
	</div>
</template>

<script>
	// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)
	import mybutton from "../components/mybutton.vue";

	export default {
		// import引入的组件需要注入到对象中才能使用
		components: {
			mybutton
		},
		data() {
			return {
				drawer: false,
				form: {
					drugId: -1,
					drugName: "",
					dose: 1.0,
					usageName: [],
					frequencyName: [],
					takeDays: 1,
					quantity: 1,
					remark: "",
					specification: ''
				},
				keyword: "",
				frequencyList: [],
				usageList: [],
				drugList: [],
				subDrugList: [],
			};
		},

		computed: {
			searchWord() {
				console.log(this.form.drugName);
				if (this.form.drugName === '' || this.form.drugName === undefined) {
					return "点击选择药品";
				} else {
					return this.form.drugName + '    ' + this.form.specification;
				}
			}
		},

		methods: {
			chooseDrug(item) {
				this.form.drugId = item.drugId;
				this.form.drugName = item.drugName;
				this.form.specification = item.specification;
				this.drawer = false;
			},
			submitDrug() {
				// this.form.id = id;
				console.log(this.form);
				this.$emit('sub', this.form);
			},
			initForm() {
				this.form.drugId = -1;
				this.form.drugName = '';
				this.form.dose = 1.0;
				this.form.takeDays = 1;
				this.form.quantity = 1;
				this.form.remark = "";
				this.form.specification = '';
				this.form.drugName = [];
				this.form.frequencyName = [];
			},
			search() {
				if (this.keyword === "") {
					this.$http.get(`drug/search/-1`).then(({
						data
					}) => {
						this.drugList = data.result;
					});
				} else {
					this.$http.get(`drug/search/${this.keyword}`).then(({
						data
					}) => {
						this.drugList = data.result;
					});
				}
			},
		},
		mounted() {
			this.$http.get("usage/list").then(({
				data
			}) => {
				this.usageList = data.result;
			});
			this.$http.get("frequency/list").then(({
				data
			}) => {
				this.frequencyList = data.result;
			});

			this.$http.get(`/drug/page?page=1&size=20`).then(({
				data
			}) => {
				this.drugList = data.result.records;
			});
			this.$http.post(`prescribe/`, {}).then(({
				data
			}) => {
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
			padding: 15px 50px;
		}
	}

	.drawer_item {
		height: 80px;
		padding: 15px 40px 0 40px;
		border-bottom: 1px #BBBBBB solid;
	}

	.drawer_search {
		margin-left: 30px;
		margin-right: 30px;
		width: 80%;
		margin-bottom: 0;
		margin-top: 0;
	}

	.formbody_inputnumber {
		display: block;
		margin-left: 30%;
		margin-bottom: 0;
		margin-top: 0;
	}

	.search {
		position: fixed;
		z-index: 9999;
		width: 30%;
		height: 50px;
	}

	.search-text {
		margin-top: 10px;
		background-color: rgba(102, 153, 204, 0.5);
		padding: 5%;
		letter-spacing: 2rpx;
		top: 100rpx;
		width: 90%;
	}

	.result {
		margin-top: 110px;
	}

	.dose {
		display: inline;
		float: right;
	}
</style>
