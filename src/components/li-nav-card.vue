<template>
  <el-col :span="6">
    <el-tooltip placement="top">
      <template #content> {{ props.bookmark.url }}</template>

      <el-card class="box-card nav-card" shadow="hover" @click="open(this.props.bookmark)">
        <template #header>
          <el-row>
            <el-col :span="3">
              <img src="@/assets/logo.png" alt="" class="icon"/>
            </el-col>
            <el-col :span="21" class="title">
              <span>{{ props.bookmark.title }}</span>
            </el-col>
          </el-row>

          <!--                      <el-button class="button" type="text">click</el-button>-->
        </template>
        <!--                  <edit class="demo-svg-icon"></edit>-->
        <div class="card-body">


          <el-row justify="start" >
            <el-col :span="24" class="comment">

                    <span>
                    {{ props.bookmark.comment }}
                    </span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4" v-for="tag of this.props.bookmark.tags">
              <el-tag size="mini">
                {{ tag }}
              </el-tag>
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


const props = defineProps({
  bookmark: {
    type: Object as PropType<bookmark_type>
  }
})

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
  .icon {
    width: 18px;
    height: 18px;
    margin-top: 8px;
  }

  .title {
    line-height: 32px;
    text-align: left;

  }


  .comment {
    margin-bottom:20px;
    color: grey;
    text-align: left;
  }
}
</style>
