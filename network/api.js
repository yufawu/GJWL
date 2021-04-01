//请求地址
// const ApiRootUrl = 'http://api-sys.xfx361.com/appMiniPro/v1'; // http
// const ApiRootUrl = 'https://api-sys.xfx361.com/appMiniPro/v1'; //https--线上
// const ApiRootUrl = 'http://192.168.2.237:8089/api/mini'; //本地测试
const ApiRootUrl = 'https://zschinese.com/api/mini'; //测试服务器

module.exports = {
    WechatLogin: ApiRootUrl + '/login', //注册登录
    GetExpress: ApiRootUrl + '/setgoods/getCouriers', //获取快递公司列表
    GetGoodsType: ApiRootUrl + '/setgoods/getGoodsType', //获取物品属性
    SubmitForecast: ApiRootUrl + '/setgoods/placeSetGoods', //提交预报单
    NoInWare: ApiRootUrl + '/setgoods/noInWareGoods', //查询未入库订单
    InWare: ApiRootUrl + '/setgoods/inWareGoods', //查询已入库订单
    Abnormal: ApiRootUrl + '/setgoods/anomalyGoods', //查询异常的订单
    AddReceiver: ApiRootUrl + '/Receiversend/addUserReceiversend', //添加常用收件人
    GetReceiver: ApiRootUrl + '/Receiversend/getUserReceiversend', // 查询常用收件人 
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