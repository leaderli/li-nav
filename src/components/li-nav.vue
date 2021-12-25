<script setup lang="ts">
import {bookmark_type} from "@/type/bookmark_type";
import {bookmarks_api} from '@/api/bookmarks_api';
import LiNavCard from '@/components/li-nav-card.vue'
import {computed, ref} from "vue";
import {define_bookmarks_store} from "@/store";
import axiosNew from "axios";
import LiNavDialog from "@/components/li-nav-dialog.vue";

const cardColNumber = 4;
const bookmarks_store = define_bookmarks_store();

const fetch_bookmarks_api = function () {
  bookmarks_api().then(res => {
    bookmarks_store.set_bookmarks(res)
  })
}

fetch_bookmarks_api()

const currentBookmark = ref<bookmark_type | null>()
const resetCurrentBookmark = function (bookmark: bookmark_type | null = null) {
  currentBookmark.value = bookmark
  fetch_bookmarks_api()
}

const displayDialog = function (bookmark: bookmark_type) {
  currentBookmark.value = bookmark
}
const centerDialogVisible = computed(() => {
  return !!currentBookmark.value
})

const input_alt_key_input = function (e:KeyboardEvent){
  if(e.altKey && !!e.key.match(/^[0-9]$/)){

    console.log(e.key)
  }
}



</script>

<template>
  <div id="nav">

    <el-row :gutter="20" v-for="bookmarks of bookmarks_store.shard_bookmarks" :key="bookmarks">

    <li-nav-card v-for=" bookmark of bookmarks " :bookmark="bookmark"
                   @contextmenu.prevent.native="displayDialog(bookmark)"></li-nav-card>
    </el-row>

  </div>

  <li-nav-dialog v-if="centerDialogVisible" :currentBookmark="currentBookmark"
                 @resetCurrentBookmark="resetCurrentBookmark"></li-nav-dialog>
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
