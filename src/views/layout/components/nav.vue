
<template>
  <div id="nav-warp">
    <h1 class="logo">
      <img src="@/assets/logo.png" alt="">
    </h1>
      <el-menu default-active="1-4-1" 
                class="el-menu-vertical-demo" 
                @open="handleOpen" 
                @close="handleClose" 
                background-color="transparent" 
                active-text-color="#fff"	 
                text-color="#fff" :router="true" 
                :collapse="isCollapse">
        <template v-for="(item,index) in routers">
          <el-submenu :index="index+''" :key="item.id" v-if="!item.hidden">
            <!-- 一级菜单 -->
            <template slot="title">
             <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
              <span slot="title">{{item.meta.name}}</span>
            </template>
            <!-- 子菜单 -->
              <el-menu-item :index="subItem.path" v-for="(subItem) in item.children"  :key="subItem.id">
                <template slot="title">
             <svg-icon iconClass='home' className="home"/>
              <span slot="title">{{item.meta.name}}</span>
            </template>  
              </el-menu-item> 
          </el-submenu>
        </template>
    </el-menu>
    
  </div> 
</template>

<script>
import {computed, onMounted, reactive,ref} from '@vue/composition-api';
export default {
  name:'layoutNav',
  setup(peops,{root}){
    // const  isCollapse = ref(false)
    const handleOpen =()=>{

    };
    const handleClose =()=>{

    };
    /**
     * 监听 isCollapse变化
     * */
    const  isCollapse =computed(()=> root.$store.state.app.isCollapse)
    const routers = ref(root.$router.options.routes)
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    }
  }
}

</script>
<style lang='scss' scoped>
@import '@/styles/config.scss';
#nav-warp{
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh; 
  background-color: #344a5f;
  @include webkit (transition,all .3s ease 0s);
  svg{
    font-size: 20px ;
    margin-right: 10px;
  }
}
.logo{
    text-align: center;
    img{
      @include webkit (transition,all .3s ease 0s);
       margin: 20px auto;
      width: 92px;
    }
  }
.close{
  #nav-warp{
    width: 64px;
  }
  .logo{
    img{
       margin: 20px auto;
      width: 60%;
    }
  }
}
</style>