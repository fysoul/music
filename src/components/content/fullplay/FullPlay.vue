<template>
  <div class="FullPlay">
     <show-img/>
  </div>
</template>

<script>
import ShowImg from './ShowImg.vue';
export default {
  name: 'FullPlay',
  data () {
    return {

    };
  },
  methods: {

    },
  components: {
      ShowImg
    },
}
</script>

<style  scoped>
 .FullPlay{
  position: fixed;
  width: 90%;
  height: 90%;
  top: 100rem;
  left: 100rem;
}
</style>