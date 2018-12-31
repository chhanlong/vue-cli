<template>
  <div class="option cl">
    <li class="cl" @click="herf(item.link)" v-for="(item, index) in arr" :key="index">
      <div class="fl">
        <p class="p1">{{item.title}}</p>
        <p class="p2">{{item.subheading}}</p>
      </div>
      <div class="fr icon" :class="item.icon"></div>
    </li>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [
        {
          title: '奢品百科',
          subheading: '关于奢品的一切',
          icon: 'icon-home-option-1',
          link: '/pages/news/list'
        },
        {
          title: '拒绝脏物',
          subheading: '合力规范二手市场',
          icon: 'icon-home-option-2',
          link: '/packageBlacklist/home/index'
        },
        {
          title: '鉴定培训',
          subheading: '中检注册认证',
          icon: 'icon-home-option-3',
          link: '/pages/webview/index?url=https://m.wbiao.cn/topics/appraisal/'
        },
        {
          title: '分享首页',
          subheading: '分享奢品共享',
          icon: 'icon-home-option-4',
          link: '/pages/home/share'
        }
      ]
    }
  },
  methods: {
    herf (src) {
      this.$router.push({ path: src })
    }
  }
}
</script>

<style>
.option{
  margin: 0 20px 14px 20px;
}
.option li:nth-of-type(odd){
  float: left;
}
.option li:nth-of-type(even){
  float: right;
}
.option li{
  border: 1px solid #E6E6E6;
  border-radius: 8px;
  padding: 11px 12px 11px 8px;
  margin-bottom: 10px;
  width: 42%;
}
.option li .p1{
  padding-top: 5px;
  font-size: 14px;
  color: #333333;
  line-height: 14px;
}
.option li .p2{
  padding-top: 3px;
  font-size: 12px;
  color: #999999;
  line-height: 17px;
}
</style>
