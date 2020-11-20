
<template>
  <div id="nav-warp">菜单</div>
</template>

<script>
import {onMounted, reactive,ref} from '@vue/composition-api';
export default {
  setup(){

  }
}

</script>
<style lang='scss' scoped>
#nav-warp{
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh; 
  background-color: #344a5f;
}
</style>