<template>
  <div class="table">
    <div class="tabgroup" style="padding: 0 20px;">
      <table class="tablelist">
        <tr>
          <!-- 车辆管理 -->
          <th v-if="listOne">{{ listOne }}</th>
          <th v-if="listTwo">{{ listTwo }}</th>
          <th v-if="listThree">{{ listThree }}</th>
          <th v-if="listFour">{{ listFour }}</th>
          <th v-if="listFive">{{ listFive }}</th>
          <th v-if="listSix">{{ listSix }}</th>

          <!-- 按钮 -->
          <th>操作</th>
        </tr>
        <template v-if="list.length !== 0">
          <tr v-for="(item,index) in list" :key="index">
            <!-- 车辆管理 -->
            <td v-if="item.ownername">{{ item.ownername }}</td>
            <td v-if="item.cardid">{{ item.cardid }}</td>
            <td v-if="item.caraddress">{{ item.caraddress }}</td>
            <td v-if="item.vehiclebrand">{{ item.vehiclebrand }}</td>
            <td v-if="item.carnum">{{ item.carnum }}</td>
            <td v-if="item.tagcode">{{ item.tagcode }}</td>

            <!-- 用户管理 -->
            <td v-if="item.nickname">{{ item.nickname }}</td>
            <td v-if="item.username">{{ item.username }}</td>
            <td v-if="item.mobilephone">{{ item.mobilephone }}</td>
            <td v-if="item.groupid">{{ item.groupid }}</td>

            <!-- 车辆管理 -->
            <td v-if="item.name">{{ item.name }}</td>
            <td v-if="item.code">{{ item.code }}</td>
            
            <td>
              <Button
                type="primary"
                size="small"
                style="margin: 0 10px;"
                @click="$emit('update',item)"
              >修改</Button>
              <Poptip
                confirm
                title="确定删除这条数据么"
                @on-ok="$emit('del',item.id)"
              >
                <Button
                  type="error"
                  size="small"
                  style="margin: 0 10px;"
                >删除</Button>
              </Poptip>
            </td>
          </tr>
        </template>
        <tr v-else class="zwsj">
          <th colspan="7">暂无数据</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    // 车辆管理
    inform: Object,
    listOne: String,
    listTwo: String,
    listThree: String,
    listFour: String,
    listFive: String,
    listSix: String,

    list: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.tabgroup {
  width: 100%;
  /* min-width: 300px; */
  overflow-y: hidden;
  padding: 0 10px;
  box-sizing: border-box;
}
.tablelist {
  width: 100%;
  min-width: 1000px;
}
.tablelist,
td,
th {
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
  height: 40px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.tablelist > tr > th {
  background: #f2f2f2;
  color: #666;
}
td,
th {
  /* width: 14%; */
  width: 210px;
}
.zwsj {
  height: 60px;
}
</style>