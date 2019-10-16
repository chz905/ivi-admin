<template>
  <div class="layout">
    <Layout class="h">
      <!-- 左侧导航栏 -->
      <Sider ref="side1" hide-trigger collapsible breakpoint="md" :collapsed-width="0" v-model="isCollapsed">
        <div class="logo">
          <img src="../assets/logo-zyd.png" alt="logo" class="logo-img" />
          <span v-show="!isCollapsed">中远达</span>
        </div>
        <!-- 侧边栏 -->
        <Navigation :permissions="menus"/>
      </Sider>
      <!-- 右侧内容 -->
      <Layout>
        <!-- 右侧头部 -->
        <Header class="layout-header-bar">
          <div class="icon-open">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{margin: '0 20px'}"
              type="md-menu"
              size="24"
            ></Icon>
          </div>
          <div>
            <Dropdown @on-click="changeDate" >
              <a href="javascript:void(0)">
                {{ user.nickname }}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>我的</DropdownItem>
                <DropdownItem divided name="exit">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> 
        </Header>
        <!-- 面包屑 -->
        <Breadcrumb class="breadcrumb">
          <BreadcrumbItem v-for="(item,index) in list" :key="index">{{ item.meta.name }}</BreadcrumbItem>
        </Breadcrumb>
        <!-- 内容 -->
        <Content style="margin: 20px; background: #fff; height: 260px;overflow-x: hidden;">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Navigation from '../views/components/Navigation'
export default {
  name: "HelloWorld",
  data() {
    return {
      isCollapsed: false,
      list: [],
      menus:[],
      user:{}
    };
  },
  //生命周期
  created() {
    //路由变化
    this.list = this.$route.matched
    this.menus = JSON.parse(localStorage.menus) //菜单
    this.user = JSON.parse(localStorage.user)   //个人
    // let con = localStorage.menus;
  },
  components:{
    Navigation
  },
  //计算属性
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  //方法
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    changeDate(name){
      if(name == 'exit'){
        localStorage.token = ''
        localStorage.menus = ''
        localStorage.user = ''
        this.$router.push("/login");
      }
    }
  },
  //监听
  watch: {
    $route(){   // 监听路由变化
      this.list = []
      this.list = this.$route.matched
    }
  },
  // //导航守卫
  // beforeRouteEnter(to, from, next) {
  //     // console.log(to)
  //   next(vm => {
  //     vm.permissions = to.params.table;
  //   });
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.h {
  height: 100%;
}
.logo {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 20px 0;
  justify-content: center;
}
.logo img {
  width: 40px;
  margin-right: 10px;
}
.layout-header-bar {
  display: flex;
  padding-left: 20px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-icon {
  transition: all 0.3s;
}
.icon-open {
  flex-grow: 1;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.breadcrumb {
  padding-left: 20px;
  margin-top: 2px;
  height: 60px;
  line-height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-track:hover {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b9b9b9;
}

::-webkit-scrollbar-thumb:hover {
  background: #747474;
}

::-webkit-scrollbar-thumb:active {
  background: #555;
}
</style>
