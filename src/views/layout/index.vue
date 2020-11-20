
<template>
  <div>
        <layoutHeader/>
        <layoutMain/>
        <layoutNav/>
  </div>
</template>

<script>
import layoutHeader from './components/header';
import layoutMain from './components/main';
import layoutNav from './components/nav';
import {onMounted, reactive,ref} from '@vue/composition-api';
export default {
  name:'layout',
  components:{
    layoutHeader,
    layoutMain,
    layoutNav
  },
  setup(){

  }
}

</script>
<style lang='scss' scoped>
</style>