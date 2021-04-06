//请求地址
// const ApiRootUrl = 'http://api-sys.xfx361.com/appMiniPro/v1'; // http
// const ApiRootUrl = 'https://api-sys.xfx361.com/appMiniPro/v1'; //https--线上
// const ApiRootUrl = 'https://api-sys.xfx361.com/setgoods/api/mini';
const ApiRootUrl = 'http://192.168.2.237:8089/api/mini'; //本地测试
// const ApiRootUrl = 'https://zschinese.com/api/mini'; //测试服务器

module.exports = {
    GetBanner: ApiRootUrl + '/config/carousels', //首页轮播图
    WechatLogin: ApiRootUrl + '/login', //注册登录
    GetExpress: ApiRootUrl + '/setgoods/getCouriers', //获取快递公司列表
    GetGoodsType: ApiRootUrl + '/setgoods/getGoodsType', //获取物品属性
    SubmitForecast: ApiRootUrl + '/setgoods/placeSetGoods', //提交预报单
    NoInWare: ApiRootUrl + '/setgoods/noInWareGoods', //查询未入库订单
    InWare: ApiRootUrl + '/setgoods/inWareGoods', //查询已入库订单
    Abnormal: ApiRootUrl + '/setgoods/anomalyGoods', //查询异常的订单
    AddReceiver: ApiRootUrl + '/Receiversend/addUserReceiversend', //添加常用收件人
    GetReceiver: ApiRootUrl + '/Receiversend/getUserReceiversend', // 查询常用收件人 
    GetReceiverDetail: ApiRootUrl + '/Receiversend/getReceiversendById', // 查询收件人详细信息
    EditReceiver: ApiRootUrl + '/Receiversend/editReceiversend', // 修改常用收件人 
    DeleteReceiver: ApiRootUrl + '/Receiversend/delReceiversend', // 删除常用收件人 
    PackForecastDetail: ApiRootUrl + '/setgoods/getPreAwbById', //包裹预报详情
    EditPackForecast: ApiRootUrl + '/setgoods/editPreAwb', //修改包裹预报
    DeletePackForecast: ApiRootUrl + '/setgoods/delPreAwb', //删除包裹预报
    GetWarehouse: ApiRootUrl + '/config/getValueByKey', //获取仓库信息
    GetWays: ApiRootUrl + '/config/getValueByKey', //获取路线信息
    GetSecneValue: ApiRootUrl + '/getUserByOpenId', //获取二维码scene数据
    GetQrCode: ApiRootUrl + '/qrCode', //获取带scene的二维码
    BindInviteCode: ApiRootUrl + '/bindInviteCode', //绑定邀请码
    GetCompanyPreface: ApiRootUrl + '/getCompanyPreface', //查看公司介绍
    GetContactaddre: ApiRootUrl + '/getContactaddre', //查看公司联系地址
    GetMyShare: ApiRootUrl + '/getMyShareUser', //分享用户的列表
    SearchLogo: ApiRootUrl + '/logo', // logo图查询
    GetNews: ApiRootUrl + '/news', // 获取新闻列表 
    GetNewsData: ApiRootUrl + '/newsdata', // 获取新闻详情 
    GetPort: ApiRootUrl + '/port', // 包机运力 
    GetBlackList: ApiRootUrl + '/blackCompany', // 黑名单查询 
}