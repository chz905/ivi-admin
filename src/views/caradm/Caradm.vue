<template>
  <div class="caradmin">
    <Row class="form">
      <li>
        <span>车主姓名：</span>
        <Input v-model="inform.ownername" placeholder="车主姓名" style="width: 200px" />
      </li>
      <li>
        <span>身份证号码：</span>
        <Input v-model="inform.cardid" placeholder="身份证号码" style="width: 200px" />
      </li>
      <li>
        <span>车牌号：</span>
        <Input v-model="inform.vinno" placeholder="车牌号" style="width: 200px" />
      </li>
      <li>
        <span>防盗编号：</span>
        <Input v-model="inform.tagcode" placeholder="防盗编号" style="width: 200px" />
      </li>
      <li>
        <Button type="primary" @click="find">查询</Button>
      </li>
    </Row>
  </div>
</template>

<script>
import { findCar } from "@/utils/api";
export default {
  name: "Caradmin",
  data() {
    return {
      inform: {
        ownername: "",
        cardid: "",
        vinno: "",
        tagcode: ""
      }
    };
  },
  methods: {
    find() {
      findCar(this.inform).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
</style>