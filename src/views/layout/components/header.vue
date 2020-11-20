
<template>
  <div id="header-wrap">头部</div>
</template>

<script>
import {onMounted, reactive,ref} from '@vue/composition-api';
export default {
  setup(){

  }
}

</script>
<style lang='scss' scoped>
#header-wrap{
  position: fixed;
  top: 0;
  left: $navMenu;
  height: 75px;
  background-color: #ffffff;
  width: 100%;
  -webkit-box-shadow: 0 3px 16px 0  rgba(0,0,0,.1);
}
</style>