
<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
       <svg-icon iconClass="console" className="console"/>
    </div>
    
  </div>
</template>

<script>
import {onMounted, reactive,ref} from '@vue/composition-api';
export default {
  setup(props,{root}){
   const navMenuState = ()=>{
     root.$store.commit('app/SET_COLLAPSE')
   }
   return {
     navMenuState
   }
  }
}

</script>
<style lang='scss' scoped>
@import '@/styles/config.scss';

#header-wrap{
  position: fixed;
  top: 0;
  left: $navMenu;
  height: 75px;
  line-height: 75px;
  background-color: #ffffff;
  width: 100%;
  @include webkit(box-shadow,0 3px 16px 0  rgba(0,0,0,.1));
  @include webkit (transition,all .3s ease 0s);
}
.close {
  #header-wrap{
    left: 60px;
  }
}
.header-icon{
    margin-left: 20px;
    font-size: 20px;
  }
</style>