<script setup lang="ts">
import {bookmark_type} from "@/type/bookmark_type";
import {bookmarks_api,update_bookmarks_api} from '@/api/bookmarks_api';
import LiNavCard from '@/components/li-nav-card.vue'
import {computed, nextTick, ref} from "vue";
import {define_bookmarks_store} from "@/store";
import _ from 'lodash';
import axiosNew from "axios";

const cardColNumber = 4;
const bookmarks_store = define_bookmarks_store();

let i =0;
const  fetch_bookmarks_api = function (){
  bookmarks_api().then(res => {
    res.forEach(item=>item.id =i++ )
    console.log(JSON.stringify(res))
    bookmarks_store.set_bookmarks(res)
  })
}

fetch_bookmarks_api()

const currentBookmark = ref<bookmark_type | null>()

const closeDialog = function () {
  console.log('close')
  currentBookmark.value = null
  fetch_bookmarks_api()
}

const saveDialog = function () {
  console.log('save')
  currentBookmark.value = null
  // update_bookmarks_api(bookmarks_store.bookmarks)
  axiosNew.patch('/api/bookmarks/',
    bookmarks_store.bookmarks
  )
}


const centerDialogVisible = computed(() => {
  console.log('centerDialogVisible', (!!currentBookmark.value))
  return !!currentBookmark.value
})

const displayDialog = function (bookmark: bookmark_type) {
  console.log('123123')
  currentBookmark.value = bookmark
  console.log(currentBookmark.value)
}


// tag

const newTag = ref<string>()
const newTagInputVisible = ref<boolean>()

const handleNewTagConfirm = function (bookmark: bookmark_type) {

  newTagInputVisible.value = false
  let tag = newTag.value;
  console.log(tag)
  if (!!tag && !_.find(bookmark.tags,item=>item===tag)) {
    bookmark.tags.push(tag)
  }
  console.log(bookmark.tags)

}
const handleCloseTag = function (bookmark: bookmark_type, tag: string) {
  _.remove(bookmark.tags, item => item === tag)
}

const saveTagInputRef = ref()
const showTagInput = async function () {
  newTagInputVisible.value = true
  console.log('before', saveTagInputRef.value)
  await nextTick()
  console.log('after', saveTagInputRef.value)
  saveTagInputRef.value.input.focus()
}

</script>

<template>
  <div id="nav">

    <el-row :gutter="20" v-for="bookmarks of bookmarks_store.shard_bookmarks" :key="bookmarks">
      <li-nav-card v-for=" bookmark of bookmarks " :bookmark="bookmark"
                   @contextmenu.prevent.native="displayDialog(bookmark)"></li-nav-card>
    </el-row>

  </div>
  <div>
    <el-dialog v-model="centerDialogVisible" title="Warning" fullscreen :show-close="false">

        <el-row>


        <el-tag
            v-for="tag in currentBookmark?.tags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(currentBookmark,tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
            v-if="newTagInputVisible"
            ref="saveTagInputRef"
            v-model="newTag"
            class="input-new-tag"
            size="mini"
            @keyup.enter="handleNewTagConfirm(currentBookmark)"
            @blur="handleNewTagConfirm(currentBookmark)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTagInput">
          + New Tag
        </el-button
        >
        </el-row>
        <el-row  class="li-input-comment">

          <el-col :span="12 ">

        <el-input
            v-model="currentBookmark.comment"
            :rows="2"
            type="textarea"
        />
          </el-col>
        </el-row>
      <el-row>

        <el-input v-model="currentBookmark.url"></el-input>
      </el-row>
      <template #footer>
      <span class="li-dialog-footer">
        <el-button type="primary" @click="saveDialog">保存</el-button>
        <el-button type="primary" @click="closeDialog">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}


.li-dialog-footer {
  display: flex;
  justify-content: center;
}

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
