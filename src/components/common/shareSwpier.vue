<!--
  轮播图插件
  传参数
  moduleCode:  0 全部 1闲置回收 2奢品竞拍 3库存共享 4 租赁
  configType: 1轮播 2 工具栏
  暂时可以配置  height  borderRadius
-->
<template>
  <div class="carousel" :style="{height:bannerData.height+'px',borderRadius:bannerData.borderRadius+'px'}">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <a class="swiper-slide" :href="item.targetUrl" v-for="(item,index) in carousel" :key="index">
          <img :style="bannerData.borderRadius ? {borderRadius:bannerData.borderRadius+'px'} : ''" :src="$imgUrl+item.imageUrl+'?x-oss-process=image/resize,w_640,color_f1f1f1'"/>
        </a>
      </div>
      <div class="swiper-pagination page"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: {
    bannerData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      imgUrl: '',
      carousel: ''
    }
  },
  methods: {
    // 轮播图数据
    async bannerObj () {
      let content = await this.$http.home.axiosReleaseItem({
        'moduleCode': this.bannerData.moduleCode,
        'configType': this.bannerData.configType
      })
      this.carousel = content.data.data
    },
    banner () {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        // autoplay : 3000,
        autoplayDisableOnInteraction : false,
        observer: true,
        observeParents: true
      })
    }
  },
  mounted () {
    this.bannerObj()
    this.banner()
  },
  watch: {
    bannerData () {
      this.bannerObj()
    },
    deep: true
  }
}
</script>

<style>
  .carousel .swiper-pagination-bullet{
    background: #fff;
    opacity: 1;
  }
  .carousel .swiper-pagination-bullet-active{
    background: #B39B8F;
  }
</style>
<style scoped>
  .carousel{
    background: #e6e6e6 url('//static.wbiao.co/p/share/m/images/bitmap.png') no-repeat center center;
    width: 100%;
  }
  .carousel a{
    height: 100%;
    display: block;
  }
  .carousel img{
    height: 100%;
    width: 100%;
  }
</style>
