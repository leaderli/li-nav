<script setup lang="ts">
import {ref} from 'vue'
import _ from 'lodash'
import {BookMark} from "@/type/bookMark";

import LiNavCard from '@/components/li-nav-card.vue'

const cardColNumber= 4;
const groupByBookMarks = function (): Array<Array<BookMark>> {
  const bookMarks: Array<BookMark> = ([])

  for (let i = 0; i < 10; i++) {

    bookMarks.push({
      index: i,
      title: 'element-plus' + i,
      url: 'https://element-plus.gitee.io/',
      tags: ['vue', 'element' + i],
      comment: '刘靖还是那么帅' + i
    })
  }
  return Object.values(_(bookMarks).groupBy(bookmark=>Math.floor(bookmark.index/cardColNumber)).value())
}()



</script>

<template>
  <div id="nav">

    <el-row :gutter="20" v-for="bookmarks of groupByBookMarks" :key="bookmarks">
      <li-nav-card v-for=" bookmark of bookmarks " :bookmark="bookmark"></li-nav-card>
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
