<script setup lang="ts">
import LiNav from "./components/li-nav.vue";
import {ref, watch} from "vue";
import {define_bookmarks_store} from "@/store";


const input = ref<string>();
watch(
    input,
    (new_val) => {

      bookmarks_store.set_search(new_val || '')
    }
)
const bookmarks_store = define_bookmarks_store();


const engine = ref('baidu')
const options = [
  {
    value: 'baidu',
    label: 'baidu'
  },

  {
    value: 'google',
    label: 'google'
  }
]


const search = function (){

  if(engine.value === 'baidu'){

  window.open('https://www.baidu.com/s?word='+input.value)
  }else {
    window.open('https://www.google.com/search?q='+input.value)
  }
}

const input_ref = ref<HTMLElement>()



const  focusout = function (){
  window.addEventListener('keyup',function (e:KeyboardEvent){

    if(e.altKey&& e.key === 'Backspace'){
      input_ref.value?.focus()

    }
  })
}

</script>

<template>
  <el-container>
    <el-header>
      <el-row class="search" justify="center">
        <el-col :span="3">
        <el-select v-model="engine" placeholder="Select" >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="16">
          <el-input v-model="input"  autofocus @keyup.enter="search"  @focusout="focusout" ref="input_ref" clearable>
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
    margin-top: 20px;
    left: -5px;

  }
}

.icon {
  width: 20px;
  height: 20px;
  margin: auto;
}
</style>
