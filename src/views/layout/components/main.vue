
<template>
  <div id="main-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
import {onMounted, reactive,ref} from '@vue/composition-api';
export default {
  setup(){

  }
}

</script>
<style lang='scss' scoped>
#main-wrap{
   position: fixed;
   left: $navMenu;
   top: 75px;
   right: 0;
   bottom: 0;
  // -webkit-box-sizing: border-box;
  border: 30px solid #f7f7f7;
  border-bottom: 0;
  background-color: #ffffff;
}
</style>