<script setup lang="ts">
import LiNav from "./components/li-nav.vue";
import {ref,watch} from "vue";

import { Edit } from '@element-plus/icons'
import {define_bookmarks_store} from "@/store";
const changeSearchEngine = function (){

  console.log('change')
}
const input = ref<string>();
watch(

    input,
    (new_val)=>{

      bookmarks_store.set_search(new_val||'')
    }
)
const bookmarks_store= define_bookmarks_store();
</script>

<template>
  <el-container>
    <el-header>


      <el-row class="search" justify="center">

        <el-col :span="19" >
          <el-input v-model="input" placeholder="Please input" >

            <template #prefix>

                <img src="@/assets/logo.png" alt="" class="icon" @click="changeSearchEngine"/>

            </template>
          </el-input>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <li-nav></li-nav>
    </el-main>
  </el-container>
</template>

<style lang="scss">
body {
  margin: 0;
  //background-color: #2c3e50;
  //background-size: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .el-header {
    height: 100px;
    //margin: 30px 0 0px 0;
  }

  .search {
    margin-top: 30px;
    //width: 60%;
  }
}
.icon {
  width: 20px;
  height: 20px;
  margin:  auto;
}
</style>
