<template>
  <div class="layout">
    <Layout class="h">
      <Sider ref="side1" hide-trigger collapsible breakpoint="md" :collapsed-width="0" v-model="isCollapsed">
        <div class="logo">
          <img src="../assets/logo-zyd.png" alt="logo" class="logo-img" />
          <span v-show="!isCollapsed">中远达</span>
        </div>
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" accordion>
          <div v-for="(item,index) in menuItems" :key="index">
            <Submenu v-if="item.children" :name="index" >
              <template slot="title">
                <Icon :type="item.type" />
                <span v-show="!isCollapsed">{{item.text}}</span>
              </template>
              <MenuItem v-for="(v,i) in item.children" :key="i" :name="index + '-' + i" :to="v.to">{{ v.type }}</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Sider>
      <Layout>
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
            <Dropdown>
              中远达
              <DropdownMenu slot="list">
                <DropdownItem>我的</DropdownItem>
                <DropdownItem>你的</DropdownItem>
                <DropdownItem divided on-click="exit">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> 
        </Header>
        <Breadcrumb class="breadcrumb">
          <BreadcrumbItem to>首页</BreadcrumbItem>
          <BreadcrumbItem to>文章管理</BreadcrumbItem>
        </Breadcrumb>
        <Content style="margin: 20px; background: #fff; height: 260px;overflow-x: hidden;">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      isCollapsed: false
    };
  },
  mounted() {
    this.$http.post("/discover/list", {}).then(res => {
      console.log(res);
    });
  },
  computed: {
    // 菜单栏
    menuItems() {
      return this.$store.state.menuItems;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    exit(){
      console.log('a')
    }
  }
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
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
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
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
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
