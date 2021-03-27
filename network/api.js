//请求地址
// const ApiRootUrl = 'http://api-sys.xfx361.com/appMiniPro/v1'; // http
// const ApiRootUrl = 'https://api-sys.xfx361.com/appMiniPro/v1'; //https--线上
const ApiRootUrl = 'http://192.168.2.237:8089/api/mini'; //本地测试

module.exports = {
    WechatLogin: ApiRootUrl + '/login', //注册登录
    WechatRefreshLogin: ApiRootUrl + '/wechatRefreshLogin', //刷新登录状态
    FindBanner: ApiRootUrl + '/findBanner', //首页轮播
    CheckCode: ApiRootUrl + '/checkCode', //验证邀请码
    GetVerifyCode: ApiRootUrl + '/getVerifyCode', //获取验证码
    BindPhone: ApiRootUrl + '/bindPhone', //验证验证码
    SearchQuotation: ApiRootUrl + '/search/quotation', //报价查询
    SearchTrack: ApiRootUrl + '/search/track', //轨迹查询
    GPSTrack: ApiRootUrl + '/search/GPSTrack', // GPS轨迹 
    SearchContent: ApiRootUrl + '/search/content', //渠道详情
    GetSgin: ApiRootUrl + '/getSgin', //获取二维码scene数据
    Getwxacodeunlimit: ApiRootUrl + '/getwxacodeunlimit', //获取带scene的二维码
    BindInviteCode: ApiRootUrl + '/bindInviteCode', //绑定邀请码
    GetCompanyPreface: ApiRootUrl + '/getCompanyPreface', //查看公司介绍
    GetContactaddre: ApiRootUrl + '/getContactaddre', //查看公司联系地址
    FindPartake: ApiRootUrl + '/findPartake', //分享用户
    SearchLogo: ApiRootUrl + '/logo', // logo图查询
    GetNews: ApiRootUrl + '/news', // 获取新闻列表 
    GetNewsData: ApiRootUrl + '/newsdata', // 获取新闻详情 
    GetPort: ApiRootUrl + '/port', // 包机运力 
    GetBlackList: ApiRootUrl + '/blackCompany', // 黑名单查询 
}