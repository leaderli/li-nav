<template>

  <el-col :span="6">
    <el-tooltip placement="top">
      <template #content>    {{ props.bookmark.url }} <el-badge :value="props.bookmark.count" class="item">

      </el-badge></template>

      <el-card class="box-card nav-card" shadow="hover" @click="open(props.bookmark)">
        <!--                  <edit class="demo-svg-icon"></edit>-->
        <div class="card-body">
          <el-row :gutter="10">

            <el-tag
                v-for="tag in props.bookmark.tags"
                :key="tag"
                :disable-transitions="false"
                size="mini"
            >
              {{ tag }}
            </el-tag>
          </el-row>


          <el-row justify="start" >
            <el-col :span="24" class="comment">

                    <span>
                    {{ props.bookmark.comment }}
                    </span>
            </el-col>
          </el-row>

        </div>
      </el-card>
    </el-tooltip>
  </el-col>

</template>

<script lang="ts" setup>
import {bookmark_type} from "@/type/bookmark_type";
import {PropType} from 'vue'
import axiosNew from "axios";


const props = defineProps<{
  bookmark: bookmark_type
}>()


const open = function (bookmark: bookmark_type) {
  window.open(bookmark.url, '_blank');
  clickCount(bookmark)

}
const clickCount = function (bookmark: bookmark_type) {
  bookmark.count = (bookmark.count|0)+1
  axiosNew.put('/api/bookmarks/' + bookmark.id, bookmark)
}

</script>

<style scoped lang="scss">

.el-card {
  cursor: pointer;

}



.nav-card {

  //height: 100px;
  .comment {
    margin-top:10px;
    color: grey;
    text-align: left;
  }
}


</style>
