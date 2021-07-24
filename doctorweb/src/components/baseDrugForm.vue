<!--  -->
<template>
	<div class="baseform">
		<div class="baseform_title">
			<div>
				<i class="el-icon-document-add mr10"></i>
				<span>{{ title }}</span>
			</div>
			<slot name="add" class="textRight"></slot>
		</div>
		<div class="baseform_body">
			<div class="baseform_body_item" v-for="(item, index) in prescribeDrugList" :key="index">
				<div class="baseform_body_line">
					<span class="mr60">{{ item.drugName }}</span>
					<span> {{ item.specification }}</span>
				</div>
				<div class="baseform_body_line textRight">
					<span class="mr50">{{ item.quantity }}盒</span>
					<slot name="detele"></slot>
					<!-- <i class="el-icon-delete"></i> -->
				</div>
				<div class="baseform_body_line">
					<span class="mr60">用法 : {{ item.usageName }}</span>
					<span> {{ item.frequencyName }}</span>
				</div>
				<el-divider></el-divider>
			</div>
			<div class="baseform_body_bottom">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等)

	export default {
		// import引入的组件需要注入到对象中才能使用
		components: {},
		props: ["title", "prescribeDrugList"],
		data() {
			return {};
		},
	};
</script>
<style lang="scss" scoped>
	/* @import url(); 引入公共css类 */
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
