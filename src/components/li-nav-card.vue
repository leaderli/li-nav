<template>
  <el-col :span="6">
    <el-tooltip placement="top">
      <template #content> {{ props.bookmark.url }}</template>

      <el-card class="box-card nav-card" shadow="hover" @click="open(props.bookmark)">
        <!--                  <edit class="demo-svg-icon"></edit>-->
        <div class="card-body">
          <el-row :gutter="10">
            <el-col :span="4" v-for="tag of props.bookmark.tags">
              <el-tag size="mini">
                {{ tag }}
              </el-tag>
            </el-col>
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


const props = defineProps<{
  bookmark: bookmark_type
}>()


const open = function (bookmark: bookmark_type) {
  console.log(bookmark)
  window.open(bookmark.url, '_blank');
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
