<template>
  <div id="app">
    <transition :name="transitionName"  mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
    name: "app",
    data () {  
        return {  
            transitionName: ''
        }
    },
    //     watch: {
// 　　　'$route' (to, from) {
// 　　　　let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
// 　　　　　　if(isBack) {
//     　　　　     this.transitionName = 'slide-right'
//                 this.$router.isBack = false
//             } else {
//             　  this.transitionName = 'slide-left'
//                 this.$router.isBack = true
//             }
//         }
//     }
}
</script>




