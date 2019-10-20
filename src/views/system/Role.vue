<template>
  <div>
    <Row class="list" :gutter="16">
      <Col style="margin: 10px 0;" :xs="12" :sm="12" :md="5" :lg="5">
        <Input size="default" v-model="inform.name" placeholder="用户名" />
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
      listOne="姓名"
      listTwo="编号"
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
          <label>姓名:</label>
          <Input size="default" v-model="update.name" placeholder="姓名" />
        </li>
        <li>
          <label>编号:</label>
          <Input size="default" v-model="update.code" placeholder="编号" />
        </li>
      </ul>
    </Modal>
    <!-- 修改 模态框 -->
    <Modal title="修改信息" v-model="modal1" @on-ok="carupdate1" class="vertical-center-modal">
      <ul class="form">
        <li>
          <label>姓名:</label>
          <Input size="default" v-model="modify.name" placeholder="姓名" />
        </li>
        <li>
          <label>编号:</label>
          <Input size="default" v-model="modify.code" placeholder="编号" />
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import {
  groupAllList, 
  grouplist,
  groupadd,
  groupupdate,
  groupdelete
} from "@/utils/api";
import TableList from "../components/Tablelist";
export default {
  name: "Role",
  data() {
    return {
      inform: {
        name: "", //用户名
        currentPage: 1, //当前页
        pageSize: 10 //当前条数
      },
      update: {
        //新增
        name: "", //姓名
        code: "", //编号
      },
      modify: {
        //修改
        id: "",
        name: "", //姓名
        code: "", //编号
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
    this.grouplist()
  },
  //组件
  components: {
    TableList
  },
  methods: {
      //查询角色
      grouplist(){
          grouplist(this.inform).then(res => {
              console.log('grouplist',res)
          })
      },
    //查询全部角色
    query() {
      groupAllList(this.inform).then(res => {
          console.log('aaaaaa',res)
        this.list = res.data;
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
        console.log(res)
      })
    },
    //新增
    addList() {
      this.modal = true;
    },
    carupdate() {
        groupadd(this.update).then(res => {
            console.log(res)
            this.query();
        })
    },
    //删除
    del(index) {
      console.log(index)
      groupdelete({id: index}).then(res => {
        console.log(res)
        this.query();
      })
    },
    //修改
    show(data) {
      console.log('过来了',data)
      this.modal1 = true;
      this.modify.id = data.id
    },
    carupdate1() {
      console.log(this.modify)
      groupupdate(this.modify).then(res => {
        // this.judge()
        console.log(res);
        this.query();
      });
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