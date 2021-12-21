<script lang="ts" setup>

import axiosNew from "axios";
import {computed, nextTick, PropType, ref} from "vue";
import {bookmark_type} from "@/type/bookmark_type";
import _ from "lodash";

const props = defineProps({
  currentBookmark: {
    type: Object as PropType<bookmark_type>|any
  }
})
const emit = defineEmits(['resetCurrentBookmark'])

const isNewBookmark = ref(false);
const closeDialog = function () {
  emit('resetCurrentBookmark')
}

const deleteBookmark = function () {
  axiosNew.delete('/api/bookmarks/' + props.currentBookmark?.id)
  emit('resetCurrentBookmark')
}
const isValidBookmark = computed(() => {
  return !props.currentBookmark || !props.currentBookmark.url || !props.currentBookmark.comment
})

const newBookmark = function () {

  axiosNew.post('/api/bookmarks/',
      {
        id: 0,
        title: '',
        comment: '',
        url: '',
        tags: []
      }
  ).then(res => {
        isNewBookmark.value = true
        emit('resetCurrentBookmark', res.data)
      }
  )
}
const saveDialog = function () {
  // update_bookmarks_api(bookmarks_store.bookmarks)
  axiosNew.put('/api/bookmarks/' + props.currentBookmark?.id,
      props.currentBookmark
  )
  emit('resetCurrentBookmark')
}


const centerDialogVisible = true


// tag
const newTag = ref<string>()
const newTagInputVisible = ref<boolean>()

const handleNewTagConfirm = async function () {

  newTagInputVisible.value = false
  let tag = newTag.value;
  if (!!tag && !_.find(props.currentBookmark!.tags, item => item === tag)) {
    props.currentBookmark!.tags.push(tag)
  }else{
    return
  }

  newTag.value = '';
  await nextTick();
  await showTagInput();
}
const handleCloseTag = function (tag: string) {
  _.remove(props.currentBookmark!.tags, item => item === tag)
}


const saveTagInputRef = ref()
const showTagInput = async function () {
  newTagInputVisible.value = true
  await nextTick()
  saveTagInputRef.value.input.focus()
}

</script>
<template>
  <el-dialog v-model="centerDialogVisible" title="Warning" fullscreen :show-close="false">

    <el-row>


      <el-tag
          v-for="tag in props.currentBookmark?.tags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleCloseTag(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
          v-if="newTagInputVisible"
          ref="saveTagInputRef"
          v-model="newTag"
          class="input-new-tag"
          size="mini"
          @keyup.enter="handleNewTagConfirm"
          @blur="handleNewTagConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showTagInput">
        + New Tag
      </el-button
      >
    </el-row>
    <el-row class="li-input-comment">

      <el-col :span="12 ">

        <el-input
            v-model="props.currentBookmark.comment"
            :rows="2"
            type="textarea"
        />
      </el-col>
    </el-row>
    <el-row>

      <el-input v-model="props.currentBookmark.url"></el-input>
    </el-row>
    <template #footer>
      <span class="li-dialog-footer">
        <el-row justify="start" style="width: 80%">
          <el-col :span="4">

              <el-button type="primary" @click="saveDialog" :disabled="isValidBookmark">保存</el-button>
          </el-col>
          <el-col :span="4">
                   <el-button type="info" @click="closeDialog" :disabled="isNewBookmark">取消</el-button>

          </el-col>
          <el-col :span="8">

          </el-col>
          <el-col :span="4">
                   <el-button type="success" @click="newBookmark" :disabled="isNewBookmark">新增</el-button>

          </el-col>
          <el-col :span="4">
                   <el-button type="danger" @click="deleteBookmark">删除</el-button>

          </el-col>
        </el-row>
      </span>
    </template>
  </el-dialog>
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

</style>
