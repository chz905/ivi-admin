<template>
  <div class="navigation" v-if="permissions">
    <Menu active-name="1" theme="dark" width="auto" accordion>
        <!-- <div style="color:#fff">{{ permissions[0].children[0].hasPower }}</div> -->
      <MenuItem name="1" to="index">
            <Icon type="md-home" />
            主页
      </MenuItem>
      <!-- 系统设置 -->
      <Submenu name="2" v-if="permissions[0].hasPower">
        <template slot="title">
          <Icon type="ios-paper" />
          <span>{{ permissions[0].name }}</span>
        </template>
        <MenuItem name="2-1" to="manageusers" v-if="permissions[0].children[0].hasPower">{{ permissions[0].children[0].name }}</MenuItem>
        <MenuItem name="2-2" to="role" v-if="permissions[0].children[1].hasPower">{{ permissions[0].children[1].name }}</MenuItem>
        <MenuItem name="2-3" to="permissions" v-if="permissions[0].children[2].hasPower">{{ permissions[0].children[2].name }}</MenuItem>
      </Submenu>
      
      <!-- 车辆跟踪 -->
      <Submenu name="3"  v-if="permissions[1].hasPower">
        <template slot="title">
          <Icon type="ios-people" />
          <span>{{ permissions[1].name }}</span>
        </template>
        <MenuItem name="3-1" to="cartrack" v-if="permissions[1].children[0].hasPower">{{ permissions[1].children[0].name }}</MenuItem>
        <MenuItem name="3-2" to="carpath" v-if="permissions[1].children[1].hasPower">{{ permissions[1].children[1].name }}</MenuItem>
      </Submenu>

      <!-- 车辆管理 -->
      <MenuItem name="4" to="caradm" v-if="permissions[2].hasPower">
        <Icon type="ios-people" />
        {{ permissions[2].name }}
      </MenuItem>
      
      <!-- 车辆保险 -->
      <Submenu name="5"  v-if="permissions[3].hasPower">
        <template slot="title">
          <Icon type="ios-people" />
          <span>{{ permissions[3].name }}</span>
        </template>
        <MenuItem name="5-1" to="insurance" v-if="permissions[3].children[0].hasPower">{{ permissions[3].children[0].name }}</MenuItem>
      </Submenu>

      <!-- 商品管理 -->
      <Submenu name="6"  v-if="permissions[4].hasPower">
        <template slot="title">
          <Icon type="ios-people" />
          <span>{{ permissions[4].name }}</span>
        </template>
        <MenuItem name="6-1" to="banner" v-if="permissions[4].children[0].hasPower">{{ permissions[4].children[0].name }}</MenuItem>
        <MenuItem name="6-2" to="goodsadm" v-if="permissions[4].children[1].hasPower">{{ permissions[4].children[1].name }}</MenuItem>
      </Submenu>

      <!-- Gps终端管理 -->
      <MenuItem name="7" to="gpscmd" v-if="permissions[5].hasPower" class="gps">
        <Icon type="ios-people" />
        {{ permissions[5].name }}
      </MenuItem>
      
      <!-- 统计分析 -->
      <Submenu name="7"  v-if="permissions[6].hasPower">
        <template slot="title">
          <Icon type="ios-people" />
          <span>{{ permissions[6].name }}</span>
        </template>
        <MenuItem name="7-1" to="sales" v-if="permissions[6].children[0].hasPower">{{ permissions[6].children[0].name }}</MenuItem>
        <MenuItem name="7-2" to="findcarnum" v-if="permissions[6].children[1].hasPower">{{ permissions[6].children[1].name }}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
    
<script>
export default {
  name: "Navigation",
  mounted() {},
  props: {
    permissions: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
    background: #2d8cf0;
}
</style>
