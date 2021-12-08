<script setup lang="ts">
import _ from 'lodash'
import {bookmark_type} from "@/type/bookmark_type";

import {bookmarks_api} from '@/api/bookmarks_api';

import LiNavCard from '@/components/li-nav-card.vue'
import {ref} from "vue";

const cardColNumber= 4;

const shard_bookmarks = ref<Array<Array<bookmark_type>>>();
bookmarks_api().then(res=>{
  console.log(res)
  shard_bookmarks.value = Object.values(_(res).groupBy(bookmark=>Math.floor(bookmark.index/cardColNumber)).value())
})




</script>

<template>
  <div id="nav">

    <el-row :gutter="20" v-for="bookmarks of shard_bookmarks" :key="bookmarks">
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
