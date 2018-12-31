<template>
  <div class="homeTpl">
    <!-- === 轮播 === -->
    <div class="banner">
      <div class="title">
        <p class="p1">闲置手表共享商城</p>
        <p class="p2">诚信·专业·责任·开放</p>
      </div>
      <div class="bannerImg">
        <share-swpier :bannerData="bannerData"></share-swpier>
      </div>
    </div>
    <!-- === 图标 === -->
    <div class="toolbar">
      <a :href="item.targetUrl" v-for="(item,index) in home.tolList" :key="index">
        <div class="img">
          <img :src="$imgUrl+item.imageUrl+'?x-oss-process=image/resize,w_96'" alt="">
        </div>
        <div class="txt">{{item.detail}}</div>
      </a>
    </div>
    <!-- === 说明 === -->
    <div class="explain cl">
      <li class="fl">
        <p class="p1">行业权威鉴定</p>
        <p class="p2">中检集团战略合作</p>
      </li>
      <li class="fr">
        <p class="p3">全程专业保障</p>
        <p class="p4">全国超800家线下网点</p>
      </li>
    </div>
    <div class="explain-b">
      加盟商家<span>{{home.shopCount}}家</span>，回收手表<span>{{home.recycleCount}}枚</span>，竞拍手表发布<span>{{home.auctionCount}}枚</span>
    </div>
    <!-- === 模块 新加四个模块 === -->
    <home-option></home-option>
    <share-footer :footerData="footerData"></share-footer>
  </div>
</template>

<script>
import homeOption from './modules/homeOption'
export default {
  components: {
    homeOption
  },
  data () {
    return {
      // 底部导航
      footerData: {
        home: true,
        member: false
      },
      home: '',
      bannerData: {
        moduleCode: 0,
        configType: 1,
        height: 136,
        borderRadius: 8
      }
    }
  },
  methods: {
    // 请求数据
    async ajaxList () {
      let list = await this.$http.home.axiosHome({
        'pager': {
          'now': 0,
          'size': 0,
          'total': 0
        }
      })
      this.home = list.data.data
    },
    // 跳转
    link (url) {
      this.$router.push({ path: url })
    }
  },
  mounted () {
    this.ajaxList()
  }
}
</script>

<style scoped>
.homeTpl{
  padding-bottom: 60px;
}
.homeTpl .banner{
  display: block;
  background-image: url("//static.wbiao.co/p/share/inventory/home/bj2.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.homeTpl .banner .title{
  padding: 28px 0 21px 0;
  text-align: center;
}
.homeTpl .banner .title .p1{
  font-size: 20px;
  color: #FFFFFF;
  line-height: 28px;
}
.homeTpl .banner .title .p2{
  font-size: 12px;
  color: #FFFFFF;
  line-height: 18px;
  letter-spacing: 8px;
}
.homeTpl .banner .bannerImg{
  padding: 0 16px;
  height: 136px;
}

.homeTpl .toolbar{
  padding: 0 17px;
  display: flex;
}
.homeTpl .toolbar a{
  display: block;
  float: left;
  text-align: center;
  padding: 17px 0 23px 0;
  flex: 1;
}
.homeTpl .toolbar a .img {
  width: 48px;
  margin: 0 auto;
}
.homeTpl .toolbar a .img img{
  width: 48px;
  height: 48px;
}
.homeTpl .toolbar a .txt {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  letter-spacing: 0;
  text-align: center;
  line-height: 20px;
}

.homeTpl .explain{
  padding: 0 16px;
}
.homeTpl .explain li{
  width: 48%;
  background-image: linear-gradient(0deg, rgba(218,226,242,0.00) 0%, #CFD6E6 100%);
  border-radius: 8px;
  text-align: center;
}
.homeTpl .explain li:nth-child(1){
  background-image: linear-gradient(0deg, rgba(242,230,218,0.00) 0%, #E6DACF 100%);
  border-radius: 8px;
}
.homeTpl .explain li .p1{
  font-size: 16px;
  color: #665852;
  line-height: 22px;
  padding-top: 20px;
  font-weight: bold;
}
.homeTpl .explain li .p2{
  font-size: 12px;
  color: #B39B8F;
  line-height: 17px;
  padding-bottom: 23px;
}
.homeTpl .explain li .p3{
  font-size: 16px;
  color: #525866;
  line-height: 22px;
  padding-top: 20px;
}
.homeTpl .explain li .p4{
  font-size: 12px;
  color: #8F9BB3;
  line-height: 17px;
  padding-bottom: 23px;
}
.homeTpl .explain-b{
  margin: 14px 16px;
  background: #F5F5F5;
  border-radius: 100px;
  font-size: 12px;
  color: #999999;
  line-height: 28px;
  text-align: center;
}
.homeTpl .explain-b text{
  color: #000;
  font-weight: bold;
}
</style>
