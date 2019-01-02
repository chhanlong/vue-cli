<template>
  <div class="W_main">
    <!-- 内容 -->
    <div class="content">
      <div class="title cl">
        <p class="fl">移动端</p>
      </div>

      <div class="name">
        <div class="text">手机号码</div>
        <div class="textTwo">
          <input type="number" placeholder="请输入" maxlength="11" v-model="phone">
        </div>
      </div>
      <div class="name message">
        <div class="text">短信验证</div>
        <div class="textTwo">
          <input type="number" placeholder="请输入" maxlength="6" v-model="verification">
          <div class="code" v-show="show" @click="code">获取验证码</div>
          <div class="codeTwo " v-show="!show">（<span>{{count}}</span>s）</div>
        </div>
      </div>

    </div>
    <!-- 底部 -->
    <div class="footer" :class="buttonClass == 1 ? 'on':''" @click="button">完成</div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      phone: '', // 手机号码
      verification: '', // 验证码
      buttonClass: 0,
      show: true,
      count: '',
      timer: null
    }
  },
  methods: {
    // 请求短信验证码
    async message () {
      await this.$http.home.axiosUseCode({'phone': this.phone})
      Toast('已发送')
    },
    // 请求登陆
    async login () {
      let loginFun = await this.$http.home.axiosUseLogin({
        'code': this.verification,
        'phone': this.phone,
        'platformSource': 'Mall',
        'terminalType': 'M'
      })
      try {
        this.VueCookies.set('wbiao.memberservice.tokenid', loginFun.data.data.tokenID)
        this.VueCookies.set('memberInfo', loginFun.data.data.memberInfo)
        Toast('登录成功')
        this.$router.go(-1)
      } catch (e) {}
    },
    // 点击发送验证码
    code () {
      if (this.phone && this.phone.length === 11) {
        this.message()
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      } else if (Number(this.phone.length) === 0) {
        Toast('手机号码不能为空')
      } else if (Number(this.phone.length) !== 11) {
        Toast('手机号码格式错误')
      }
    },
    // 点击登陆
    button () {
      this.login()
    }
  },
  // 监听两个输入框内容
  computed: {
    submitElement () {
      const {phone, verification} = this
      return {
        phone,
        verification
      }
    }
  },
  watch: {
    submitElement: {
      handler: function (val) {
        if (val.phone && val.verification) {
          this.buttonClass = 1
        } else {
          this.buttonClass = 0
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .W_main>.content{
    padding: 20px 20px 0 20px;
  }
  .W_main>.content>.title{
    font-size: 24px;
    color: #333333;
    line-height: 33px;
  }
  .W_main>.content>.name{
    padding-top: 30px;
  }
  .W_main>.content>.name .text{
    font-size: 14px;
    color: #666666;
    line-height: 20px;
  }
  .W_main>.content>.name .textTwo{
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #DDDDDD;
  }
  .W_main>.content>.name .textTwo input{
    outline: inherit;
    border: 0;
    font-size: 16px;
    width: 100%;
    max-width: 640px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 25px;
  }
  .W_main>.content>.message>.textTwo{
    position: relative;
  }
  .W_main>.content>.message>.textTwo .code{
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 18px;
    color: #D6BE90;
    line-height: 25px;
  }
  .W_main>.content>.message>.textTwo .codeTwo{
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 18px;
    line-height: 25px;
    color: #CCCCCC;
  }
  .W_main>.content>.message>.textTwo input{
    width: 50%;
  }
  .W_main>.footer{
    margin:40px 20px 0 20px;
    height: 50px;
    background: #DDDDDD;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 50px;
    display: block;
  }
  .W_main>.on{
    background: #D6BE90;
  }
  .W_main>.recovery{
    text-align: center;
    font-size: 12px;
    color: #999999;
    line-height: 12px;
    margin-top: 178px;
    width: 100%;
  }
  .W_main>.recovery .p2{
    color: #D6BE90;
  }
</style>
