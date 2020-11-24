
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
@import '@/styles/config.scss';

#main-wrap{
   position: fixed;
   left: $navMenu;
   top: 75px;
   right: 0;
   bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: 0;
  background-color: #ffffff;
   @include webkit(box-shadow,0 3px 16px 0  rgba(0,0,0,.1));
  @include webkit (transition,all .3s ease 0s);
} 
.close {
  #main-wrap{
    left: 60px;
  }
}
</style>