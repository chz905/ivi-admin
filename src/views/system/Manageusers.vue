<template>
  <div>
    <Row class="list" :gutter="16">
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.nickname" placeholder="用户名" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.username" placeholder="账户" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.mobilephone" placeholder="手机号" />
      </Col>
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.groupid" placeholder="角色ID" />
      </Col>
      <Col
        style="margin: 10px 0;display: flex; justify-content:space-between"
        :xs="24"
        :sm="24"
        :md="4"
        :lg="4"
      >
        <Button type="primary" style="width: 46%" icon="ios-search" @click="findList">查询</Button>
        <Button type="success" style="width: 46%" icon="ios-add-circle-outline" @click="addList">添加</Button>
      </Col>
    </Row>
    <table-list
      listOne="用户名"
      listTwo="账户"
      listThree="手机号"
      listFour="角色"
      :list="list"
      @del="del"
      @update="show"
    ></table-list>
    <div class="page">
      <Page :total="length" @on-change="changePage" />
    </div>

    <!-- 添加 模态框 -->
    <Modal title="修改信息" v-model="modal" @on-ok="carupdate" class="vertical-center-modal">
      <ul class="form">
        <li>
          <label>用户名:</label>
          <Input size="default" v-model="update.nickname" placeholder="用户名" />
        </li>
        <li>
          <label>账户:</label>
          <Input size="default" v-model="update.username" placeholder="账户" />
        </li>
        <li>
          <label>密码:</label>
          <Input size="default" v-model="update.password" placeholder="密码" />
        </li>
        <li>
          <label>手机号:</label>
          <Input size="default" v-model="update.mobilephone" placeholder="手机号" />
        </li>
        <li>
          <label>角色ID:</label>
          <Input size="default" v-model="update.groupid" placeholder="角色id" />
        </li>
      </ul>
    </Modal>
    <!--  -->
    <Modal title="修改信息" v-model="modal1" @on-ok="carupdate1" class="vertical-center-modal">
      <ul class="form">
        <li>
          <label>用户名:</label>
          <Input size="default" v-model="modify.nickname" placeholder="用户名" />
        </li>
        <li>
          <label>账户:</label>
          <Input size="default" v-model="modify.username" placeholder="账户" />
        </li>
        <li>
          <label>密码:</label>
          <Input size="default" v-model="modify.password" placeholder="密码" />
        </li>
        <li>
          <label>手机号:</label>
          <Input size="default" v-model="modify.mobilephone" placeholder="手机号" />
        </li>
        <li>
          <label>角色:</label>
          <Input size="default" v-model="modify.groupid" placeholder="角色" />
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import {
  manageusers,
  manageusersadd,
  manageusersupdate,
  manageusersdelete
} from "@/utils/api";
import TableList from "../components/Tablelist";
export default {
  name: "Manageusers",
  data() {
    return {
      inform: {
        nickname: "", //用户名
        username: "", //账户
        mobilephone: "", //手机号
        groupid: "", //角色id
        currentPage: 1, //当前页
        pageSize: 10 //当前条数
      },
      update: {
        //新增
        nickname: "",
        username: "",
        password: "",
        mobilephone: "",
        groupid: ""
      },
      modify: {
        //修改
        id: "",
        nickname: "", //用户名
        username: "", //账户
        password: "", //密码
        mobilephone: "", //手机号
        groupid: "" //角色id
      },
      list: [],
      length: 0, //总共多少条数据
      modal: false,
      modal1: false
    };
  },
  //钩子函数
  created() {
    this.query();
  },
  //组件
  components: {
    TableList
  },
  methods: {
    query() {
      manageusers(this.inform).then(res => {
        this.list = res.data.items;
        this.length = res.data.totalNum;
      });
    },
    //查询
    findList() {
      this.query();
    },
    //分页
    changePage(num) {
      manageusers({
        nickname: "",
        username: "",
        mobilephone: "",
        groupid: "",
        currentPage: num,
        pageSize: 10
      }).then(res => {
        // console.log(res)
      })
    },
    //新增
    addList() {
      this.modal = true;
    },
    carupdate() {
      manageusersadd(this.update).then(res => {
        this.judge()
        this.query();
      });
    },
    //删除
    del(index) {
      manageusersdelete({id: index}).then(res => {
        this.query();
      })
    },
    //修改
    show(data) {
      this.modal1 = true;
      this.modify.id = data.id
      
    },
    carupdate1() {
      manageusersupdate(this.modify).then(res => {
        this.judge()
        this.query();
      });
    },
    judge(){
      let ph = /^1[3|5|7|8|][0-9]{9}$/; //手机号正则
      if(ph.test(this.update.mobilephone) == '' || ph.test(this.modify.mobilephone)){
        this.$Message.warning('请输入正确的手机号')
        return
      }
    }
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