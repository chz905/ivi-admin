<template>
  <div class="caradmin">
    <Row class="list" :gutter="16">
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.ownername" placeholder="车主姓名" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.cardid" placeholder="身份证号码" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.vinno" placeholder="车牌号" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.tagcode" placeholder="防盗编号" />
      </Col>
      <Col style="margin: 10px 0;" :xs="24" :sm="24" :md="4" :lg="4">
        <Button type="primary" @click="findList">查询</Button>
      </Col>
    </Row>
    <table-list
      listOne="姓名"
      listTwo="身份证号"
      listThree="联系地址"
      listFour="车辆品牌"
      listFive="防盗编号"
      listSix="车牌号码"
      :list="list"
      @del="del"
      @update="show"
    ></table-list>
    <div class="page">
      <Page :total="length" @on-change="changePage" />
    </div>

    <!-- 模态框 -->
    <Modal title="修改信息" v-model="modal" @on-ok="carupdate" class="vertical-center-modal">
      <ul class="form">
        <li>
          <label>车主姓名:</label>
          <Input size="default" v-model="update.ownername" placeholder="车主姓名" />
        </li>
        <li>
          <label>身份证号:</label>
          <Input size="default" v-model="update.cardid" placeholder="身份证号" />
        </li>
        <li>
          <label>联系地址:</label>
          <Input size="default" v-model="update.caraddress" placeholder="联系地址" />
        </li>
        <li>
          <label>车辆品牌:</label>
          <Input size="default" v-model="update.vehiclebrand" placeholder="车辆品牌" />
        </li>
        <li>
          <label>车牌号码:</label>
          <Input size="default" v-model="update.carnum" placeholder="车牌号码" />
        </li>
        <li>
          <label>防盗编号:</label>
          <Input size="default" v-model="update.tagcode" placeholder="防盗编号" />
        </li>
      </ul>
      <Upload
        action="//jsonplaceholder.typicode.com/posts/"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="handleBeforeUpload"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        style="display: inline-block;width:58px;"
      >
        <div class="demo-upload-group" style="width: 58px;height:58px;line-height: 58px;">
          <!-- <Icon v-if="" type="ios-camera" size="20"></Icon> -->
          <img src="../../assets/logo-zyd.png" alt />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.stop="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click.stop="handleRemove(item)"></Icon>
          </div>
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script>
import { findCar, cardelete, carupdate } from "@/utils/api";
import TableList from "../components/Tablelist";
export default {
  name: "Caradmin",
  data() {
    return {
      inform: {
        ownername: "",
        cardid: "",
        vinno: "",
        tagcode: "",
        currentPage: 1, //当前页
        pageSize: 10 //当前页条数
      },
      update: {
        id: "",
        ownername: "",
        cardid: "",
        caraddress: "",
        vehiclebrand: "",
        carnum: "",
        tagcode: ""
      },
      image1: "",
      image2: "",
      length: 0, //总共多少条数据
      list: [],
      modal: false
    };
  },
  //组件
  components: {
    TableList
  },
  //钩子
  created() {
    this.query();
  },
  methods: {
    query() {
      findCar(this.inform).then(res => {
        console.log(res);
        this.list = res.data.items;
        this.length = res.data.totalNum;
        //初始化input
        // this.inform.ownername = "";
        // this.inform.cardid = "";
        // this.inform.vinno = "";
        // this.inform.tagcode = "";
      });
    },
    //车辆查询
    findList() {
      console.log(this.inform);
      this.query();
    },
    //模态框 展示隐藏
    show(data) {
      console.log(data);
      this.update.id = data.id;
      this.update.ownername = data.ownername;
      this.update.cardid = data.cardid;
      this.update.caraddress = data.caraddress;
      this.update.vehiclebrand = data.vehiclebrand;
      this.update.carnum = data.carnum;
      this.update.tagcode = data.tagcode;
      this.modal = true;
    },
    //车辆修改
    carupdate() {
      carupdate(this.update).then(res => {
        console.log("111", this.update);
        this.$Message.success("修改成功");
        console.log("1", res);
        this.query();
      });
    },
    //车辆删除
    del(index) {
      cardelete({ id: index }).then(res => {
        console.log(res);
        findCar(this.inform).then(res => {
          console.log(res);
          this.list = res.data.items;
          this.length = res.data.totalNum;
        });
      });
    },
    // 分页
    changePage(num) {
      findCar({
        ownername: "",
        cardid: "",
        vinno: "",
        tagcode: "",
        currentPage: num,
        pageSize: 10
      }).then(res => {
        // console.log(res);
        this.list = res.data.items;
        this.length = res.data.totalNum;
      });
    },
    // 修改信息表单判断
    // if()

    //文件成功上传时的钩子
    handleSuccess(res, file) {},
    // 上传文件失败时的钩子
    handleError(error, file) {},
    // 文件超出制定大小的钩子
    handleMaxSize() {},
    // 文件上传之前的钩子
    handleBeforeUpload() {}
  }
};
</script>

<style scoped>
.list {
  padding: 10px 16px;
  box-sizing: border-box;
}
.page {
  padding: 20px 18px;
  text-align: center;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}

/* 上传图片css */
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-group:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form li {
  width: 48%;
  margin: 10px 0;
}
.form li label {
  font-size: 14px;
  line-height: 30px;
}
</style>