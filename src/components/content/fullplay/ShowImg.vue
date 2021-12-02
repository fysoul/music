<template>
  <div class="ShowImg">
    <img :src="img"/>
    <div>歌曲名： 花的踪迹</div>
    <div>艺术家： mao</div>
  </div>
</template>

<script>
export default {
  name: 'ShowImg',
  data () {
    return {
        img:'./../../../assets/img/list/w.png'
    };
  },
  methods: {

    },
  components: {

    },
}
</script>

<style  scoped>
 .ShowImg{
    background: red;
}
</style>