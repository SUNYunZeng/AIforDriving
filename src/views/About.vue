<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
        {{ item.content }}
      </ListItem>
      <ListItem>
        <Carousel autoplay v-if="uploadList!==''" loop>
          <CarouselItem v-for="(item, index) in uploadList" v-bind:key="index">
            <div class="cotainer">
              <img  style="position:absolute; height: 100%" :src=item.src />
            </div>
          </CarouselItem>

        </Carousel>
      </ListItem>
    </List>
  </div>
</template>

<script>

  export default {
    name: 'about',
    data () {
      return {
        data: [
          {
            title: 'Introduction',
            description: '一个很简单的项目',
            avatar: 'http://geoai.sunyunzeng.com/static/img/logo.97bd8b7.png',
            content: '这是一个基于深度模型的出行目的地预测系统。提供了目的地动态预测、轨迹可视化、OD热点分析等功能。'
          }
        ],
        uploadList: [
          {src: require("@/assets/imgs/img1.png")},
          {src: require("@/assets/imgs/img2.png")},
          {src: require("@/assets/imgs/img3.png")},
          {src: require("@/assets/imgs/img4.png")},
          {src: require("@/assets/imgs/img5.png")},
        ]
      };
    }
  };
</script>

<style scoped>
  .cotainer {
    margin: 0 auto;
    width: 1000px;
    height: 500px;
  }
</style>
