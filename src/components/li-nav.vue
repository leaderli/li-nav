<script setup lang="ts">
import {ref} from 'vue'
import _ from 'lodash'
import {Link} from "@/type/link";

import LiNavCard from '@/components/li-nav-card.vue'

const cardColNumber= 4;
const groupLink = function (): Array<Array<Link>> {
  const links: Array<Link> = ([])

  for (let i = 0; i < 10; i++) {

    links.push({
      index: i,
      title: 'element-plus' + i,
      url: 'https://element-plus.gitee.io/',
      tag: ['vue', 'element' + i],
      comment: '刘靖还是那么帅' + i
    })
  }
  return Object.values(_(links).groupBy(link=>Math.floor(link.index/cardColNumber)).value())
}()



</script>

<template>
  <div id="nav">

    <el-row :gutter="20" v-for="links of groupLink" :key="links">
      <li-nav-card v-for=" link of links " :link="link"></li-nav-card>
    </el-row>

  </div>
</template>

<style scoped lang="scss">

#nav {
  padding: 0 20px;
  width: 80%;
  height: 600px;
  margin: 0 auto;

  > .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }


  > .el-col {
    border-radius: 4px;
  }


}


</style>
