<script setup lang="ts">
import {ref} from 'vue'
import _ from 'lodash'

interface Link{
  index:number,
  title:string,
  url:string,
  tag:Array<string>,
  comment:string
}
const links = ref<Array<Link>>([])

for (let i = 0; i < 100; i++) {

  links.value.push({
    index:i,
    title:'element-plus'+i,
    url:'https://element-plus.gitee.io/',
    tag:['vue','element'+i],
    comment:'刘靖还是那么帅'+i
  })
}

const groupLink: Array<Array<Link>> = _.groupBy(links.value, link => {
  const index = Math.floor(link.index / 4);
  console.log(link, index)
  return index
});

const go = function (next){

  console.log(next)
  window.open(next.url, '_blank');
}

console.log(groupLink)


</script>

<template>
  <!--      <div class="grid">-->
  <!--        <div v-for="link of links" :key="link">-->
  <!--&lt;!&ndash;          <el-tooltip placement="top">&ndash;&gt;-->

  <!--&lt;!&ndash;            <div class="icon-item">&ndash;&gt;-->
  <!--              <img class="icon" src="@/assets/logo.png">-->
  <!--              <span>{{ link}}</span>-->
  <!--&lt;!&ndash;            </div>&ndash;&gt;-->
  <!--&lt;!&ndash;          </el-tooltip>&ndash;&gt;-->
  <!--        </div>-->
  <!--      </div>-->
  <div>

    <el-scrollbar height="600px">
      <div id="nav">

        <el-row  v-for="links of groupLink" :gutter="20">
          <el-col v-for=" link of links " :span="6">
            <el-tooltip placement="right-start">
              <template #content> {{link.url}}</template>

            <el-card class="box-card nav-card" shadow="hover" @click="go(link)">
              <!--                  <template #header>-->
              <div class="card-header">
                <el-row>
                  <el-col :span="4">

                    <img src="favicon.ico" alt="" class="icon"/>
                  </el-col>
                  <el-col :span="20" offset="" class="title">

                    <span>{{link.title}}</span>

                  </el-col>
                </el-row>
                <el-row gutter="10">
                  <el-col  span="4" v-for="tag of link.tag">

                    <el-tag  size="mini">
                    {{ tag }}
                    </el-tag >
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="comment">

                    <span>
                    {{ link.comment }}
                    </span>
                  </el-col>
                </el-row>
                <!--                      <el-button class="button" type="text">click</el-button>-->
              </div>
              <!--                  </template>-->
              <!--                  <edit class="demo-svg-icon"></edit>-->
            </el-card>
            </el-tooltip>
          </el-col>

        </el-row>
        <!--      <ul class="demo-icon-list">-->
        <!--        <li v-for="link of links" :key="link" class="icon-item">-->
        <!--          -->

        <!--        </li>-->


        <!--      </ul>-->
      </div>
    </el-scrollbar>
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

  .el-card {
    cursor: pointer;
  }
  .icon{
    width: 20px;
    height: 20px;
    margin-top: 6px;
  }
  .title{
    line-height: 32px;
  }
  .nav-card{
    .el-row{
      margin-bottom: 10px;

    }
    .comment{
      margin: 10px 0 0 -10px;
      color: grey;
    }
  }

}





//.demo-icon-list .icon-item  .icon-name {
//  margin-bottom: 10px;
//}
//.grid {
//  position: relative;
//  //display: grid;
//  //grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//}
//.icon-item {
//  margin: 10px;
//  text-align: center;
//  width: 200px;
//  height:  200px;
//  float: left;
//  font-size: 30px;
//  color: #24292e;
//  cursor: pointer;
//}
//span {
//  display: block;
//  font-size: 16px;
//  //margin-top: 10px;
//}
//.icon{
//  width: 20px;
//  height: 20px;
//}

</style>
