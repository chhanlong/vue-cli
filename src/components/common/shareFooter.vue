<template>
  <div class="content">

    <div class="butFooter cl">
      <div class="fl list" @click="home">
        <div class="img icon" :class="footerData.home == 1 ? 'icon-home-tab-ico-hl':'icon-home-tab-ico'"></div>
        <div class="text">首页</div>
      </div>
      <div class="fr list" @click="member">
        <div class="img icon" :class="footerData.member == 1 ? 'icon-member-tab-ico2':'icon-member-tab-ico'"></div>
        <div class="text">我的</div>
      </div>
      <!--<div class="release" @click="releaseOpen">-->
        <!--<em class="icons icons-release-tab-ico ico"></em>-->
        <!--<p class="text">发布</p>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
export default {
  props: {
    footerData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  methods: {
    home() {
      this.$router.push('/index')
    },
    member() {
      this.$router.push('/member')
    }
  }
}
</script>

<style scoped>
.butFooter{
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
}
.butFooter>.list{
  width:50%;
  text-align: center;
  display: block;
  height: 46px;
}
.butFooter>.list .img{
  margin: 4px auto 0 auto;
}
.butFooter>.list .text{
  font-size: 11px;
  color: #333;
}
.butFooter>.release{
  width: 56px;
  height: 50px;
  margin: 0 auto;
  position: relative;
}
.butFooter>.release em{
  position: absolute;
  top: -22px;
  z-index: 10;
  left: 0;
  display: block;
}
.butFooter>.release p{
  position: absolute;
  font-size: 11px;
  text-align: center;
  line-height: 14px;
  color: #666;
  left: 0;
  bottom: 4px;
  width: 100%;
}
</style>
