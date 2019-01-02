<template>
  <div class="memberContent">
    <!-- ===未登陆=== -->
    <div class="W_notLogin" v-if="!isLogin">
      <div class="login_head">
        <dl><dt></dt><dd>请登录</dd></dl>
        <p>
          <em>余额<i></i></em> <span>¥- - -</span>
        </p>
      </div>
      <a class="login" href="/login">立即登录</a>
    </div>
    <!-- ===商家用户登陆=== -->
    <div class="W_Login" v-if="isLogin">
      <!-- ===头部=== -->
      <div class="login_head">
        <dl @click="information()">
          <dt class="icon-d-toux"></dt>
          <dd>{{memberObj.memberName}}</dd>
        </dl>
        <a @click="jumpLink('/inventory/balance/')">
          <em>余额 <i></i></em>
          <span>¥{{memberObj.balAmt || '0.00' }}</span>
        </a>
      </div>
      <!-- ===我是卖家=== -->
      <h6>我是卖家</h6>
      <div class="list W_sell">
        <a :class="item.border ? 'border':''" @click="jumpLink(item.herf)" v-for="(item, index) in sell" :key="index">
          <em>{{item.name}}</em>
          <span>{{item.num}}<i class="icon-d-go01"></i></span>
        </a>
      </div>
      <!-- ===我是买家=== -->
      <h6>我是买家</h6>
      <div class="list W_buy">
        <a :class="item.border ? 'border':''" @click="jumpLink(item.herf)" v-for="(item, index) in buy" :key="index">
          <em>{{item.name}}</em>
          <span>{{item.num}}<i class="icon-d-go01"></i></span>
        </a>
      </div>
      <!-- ===收藏留言=== -->
      <div class="list W_other">
        <a :class="item.border ? 'border':''" @click="jumpLink(item.herf)" v-for="(item, index) in other" :key="index">
          <em>{{item.name}}</em>
          <span>{{item.num}}<i class="icon-d-go01"></i></span>
        </a>
      </div>
      <!-- ===设置=== -->
      <div class="list W_sell install">
        <a href="/pages/member/set" class="border">
          <em>设置</em>
          <span><i class="icon-d-go01"></i></span>
        </a>
      </div>
    </div>
    <!-- === 底部导航 === -->
    <share-footer :footerData="footerData"></share-footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 底部导航
      footerData: {
        home: false,
        member: true
      },
      isLogin: 0,
      tokenId: '',
      memberObj: [],
      sell: '',
      buy: '',
      other: ''
    }
  },
  methods: {
    // 请求接口
    async ajaxMember () {
      let member = await this.$http.home.axiosMemberInfo()
      this.memberObj = member.data.data
      this.sell = [
        {
          name: '我发布的',
          herf: '/recovery/order/list',
          num: this.memberObj.publishCount || '',
          border: false
        },
        {
          name: '我卖出的',
          herf: '/auction/seller/order/list',
          num: this.memberObj.saleCount || '',
          border: true
        }
      ]
      this.buy = [
        {
          name: '我买到的',
          herf: '/auction/buyer/order/list',
          num: this.memberObj.buyCount || '',
          border: false
        },
        {
          name: '我租到的',
          herf: '/inventory/lease/order/list',
          num: this.memberObj.leaseCount || '',
          border: false
        },
        {
          name: '我参拍的',
          herf: '/auction/member/participation',
          num: this.memberObj.auctionCount || '',
          border: true
        }
      ]
      this.other = [
        {
          name: '我收藏的',
          herf: '/auction/member/collection',
          num: this.memberObj.favCount || '',
          border: false
        },
        {
          name: '我的留言',
          herf: '/auction/member/collection',
          num: this.memberObj.favCount || '',
          border: true
        }
      ]
    },
    // 判断
    login () {
      this.VueCookies.get('wbiao.memberservice.tokenid') ? this.isLogin = 1 && this.ajaxMember() : this.isLogin = 0
    },
    // 跳转
    jumpLink (link) {
      this.$router.push('/index')
    }
  },
  mounted () {
    this.login()
  }
}
</script>

<style scoped>
body{
  background-color: #f1f1f1;
}
.memberContent{
  padding-bottom: 80px;
}
.memberContent .login_head{
  height: 120px;
  background-image: linear-gradient(269deg, #D9B582 0%, #BF9F73 100%);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.memberContent .login_head dl{
  width: 64px;
  padding-top: 18px;
  float: left;
}
.memberContent .W_notLogin .login_head dl dt{
  width: 64px;
  height: 64px;
  background-image: linear-gradient(0deg, #eee 0%, #D8D8D8 100%);
  border-radius: 50%;
}
.memberContent .login_head dl dd{
  font-size: 12px;
  color: #fff;
  margin-top: 8px;
  text-align: center;
}
.memberContent .login_head a,
.memberContent .login_head p{
  float: right;
  margin-top: 46px;
  line-height: 28px;
  overflow: hidden;
  display: block;
}
.memberContent .login_head a em,
.memberContent .login_head p em{
  font-size: 12px;
  color: #fff;
  margin-right: 8px;
  line-height: 17px;
  display: inline-block;
  float: left;
}
.memberContent .login_head a em i,
.memberContent .login_head p em i{
  display: block;
  width: 8px;
  height: 2px;
  background: #fff;
  margin: 4px auto 0;
}
.memberContent .login_head a span,
.memberContent .login_head p span{
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  line-height: 28px;
  float: left;
}
.memberContent .icon-d-toux{
  display: block;
  background-image: url("//static.wbiao.co/p/share/inventory/images/icon-d-toux.png");
  background-size: 100%;
  width: 64px;
  height: 64px;
}
.memberContent .icon-d-go01{
  display: block;
  background-image: url("//static.wbiao.co/p/share/inventory/images/icon-d-go01.png");
  background-size: 100%;
  width: 14px;
  height: 14px;
}
.memberContent .W_notLogin a.login{
  background-image: linear-gradient(269deg, #D9B582 0%, #BF9F73 100%);
  border-radius: 2px;
  width: 120px;
  height: 36px;
  margin: 180px auto 0;
  font-size: 14px;
  color: #fff;
  line-height: 36px;
  text-align: center;
  display: block;
}
.memberContent .W_Login h6{
  margin-top: 21px;
  text-align: center;
  font-size: 12px;
  color: #999;
  line-height: 14px;
}
.memberContent .W_Login .list{
  width: 93.6%;
  margin: 9px auto 0;
  background: #fff;
  border-radius: 10px;
  padding-left: 12px;
  box-sizing: border-box;
}
.memberContent .W_Login .W_other{
  margin-top: 20px;
}
.memberContent .W_Login .install{
  margin-top: 20px;
}
.memberContent .W_Login .list p,
.memberContent .W_Login .list a{
  border-bottom: 1px solid #eee;
  line-height: 52px;
  font-size: 14px;
  overflow: hidden;
  color: #333;
  padding-right: 12px;
  box-sizing: border-box;
  display: block;
}
.memberContent .W_Login .list a em{
  width: 40%;
  float: left;
}
.memberContent .W_Login .list .border{
  border-bottom: 0;
}
.memberContent .W_Login .list p span,
.memberContent .W_Login .list a span{
  color: #666;
  float: right;
  position: relative;
  padding-right: 14px;
  height: 52px;
}
.memberContent .W_Login .list p span i,
.memberContent .W_Login .list a span i{
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -7px;
}
</style>
