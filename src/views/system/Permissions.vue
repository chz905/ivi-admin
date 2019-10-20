<template>
  <div>
    <Row class="list" :gutter="16">
      <Col style="margin: 10px 0;" :xs="24" :sm="24" :md="6" :lg="6">
        <Input size="default" placeholder="用户名" />
      </Col>
      <Col style="margin: 10px 0;" :xs="24" :sm="24" :md="4" :lg="3">
        <Button type="primary" style="width: 100%" icon="ios-search">查询</Button>
      </Col>
    </Row>
    <permissions-left :list="list" @btn="options" />
    <permissions-right />
    <Modal title="修改信息" v-model="modal" @on-ok="carupdate">
      <Tree :data="infrom.menus" show-checkbox></Tree>
    </Modal>
  </div>
</template>

<script>
import permissionsLeft from "../components/Permissions/Permissionsleft";
import permissionsRight from "../components/Permissions/Permissionsright";
export default {
  name: "Permissions",
  data() {
    return {
      list: [
        { name: "1", id: "1" },
        { name: "2", id: "2" },
        { name: "3", id: "3" },
        { name: "4", id: "4" },
        { name: "5", id: "5" },
        { name: "6", id: "6" },
        { name: "7", id: "7" }
      ], //左侧姓名
      infrom: {
        groupid: "",
        menus: [
          {
            title: "首页",
            expand: true,
            children: [
              {
                title: "菜单"
              },
              {
                title: "管理"
              }
            ]
          }
        ]
      },
      modal: false
    };
  },
  created() {},
  components: {
    permissionsLeft,
    permissionsRight
  },
  methods: {
    query() {
      // groupAllList().then(res => {
      //   this.list = res.data;
      // });
    },
    options(index) {
      this.infrom.groupid = index;
      this.modal = true;
    },
    carupdate() {
      console.log(this.infrom)
      // poweradd(this.children).then(res => {
      //   console.log()
      // })
    }
  }
};
</script>

<style scoped>
.list {
  padding: 10px 16px;
  box-sizing: border-box;
}
</style>