
<template>
  <div id="layout" :class="isCollapse ? 'close' :'open'">
        <layoutHeader/>
        <layoutMain/>
        <layoutNav/>
  </div>
</template>

<script>
import layoutHeader from './components/header';
import layoutMain from './components/main';
import layoutNav from './components/nav';
import {computed, onMounted, reactive,ref} from '@vue/composition-api';
export default {
  name:'layout',
  components:{
    layoutHeader,
    layoutMain,
    layoutNav
  },
  setup(props,{root}){
    const isCollapse = computed(()=> root.$store.state.app.isCollapse)
    return {
      isCollapse
    }
  }
}

</script>
<style lang='scss' scoped>
</style>