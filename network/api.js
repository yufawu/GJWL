//请求地址
// const ApiRootUrl = 'http://api-sys.xfx361.com/appMiniPro/v1'; // http
const ApiRootUrl = 'https://api-sys.xfx361.com/setgoods/api/mini';
// const ApiRootUrl = 'http://192.168.2.237:8089/api/mini'; //本地测试
// const ApiRootUrl = 'https://zschinese.com/api/mini'; //测试服务器

module.exports = {
    GetBanner: ApiRootUrl + '/config/carousels', //首页轮播图
    WechatLogin: ApiRootUrl + '/login', //注册登录
    GetExpress: ApiRootUrl + '/preAwb/getCouriers', //获取快递公司列表
    GetGoodsType: ApiRootUrl + '/preAwb/getGoodsType', //获取物品属性
    SubmitForecast: ApiRootUrl + '/preAwb/placeSetGoods', //提交预报单
    NoInWare: ApiRootUrl + '/preAwb/noInWareGoods', //查询未入库订单
    InWare: ApiRootUrl + '/preAwb/inWareGoods', //查询已入库订单
    Abnormal: ApiRootUrl + '/preAwb/anomalyGoods', //查询异常的订单
    AddReceiver: ApiRootUrl + '/Receiversend/addUserReceiversend', //添加常用收件人
    GetReceiver: ApiRootUrl + '/Receiversend/getUserReceiversend', // 查询常用收件人 
    GetReceiverDetail: ApiRootUrl + '/Receiversend/getReceiversendById', // 查询收件人详细信息
    EditReceiver: ApiRootUrl + '/Receiversend/editReceiversend', // 修改常用收件人 
    DeleteReceiver: ApiRootUrl + '/Receiversend/delReceiversend', // 删除常用收件人 
    PackForecastDetail: ApiRootUrl + '/preAwb/getPreAwbById', //包裹预报详情
    EditPackForecast: ApiRootUrl + '/preAwb/editPreAwb', //修改包裹预报
    DeletePackForecast: ApiRootUrl + '/preAwb/delPreAwb', //删除包裹预报
    PackAbnormal: ApiRootUrl + '/preAwb/errOrderList', //异常件列表
    PackAbnormalClaim: ApiRootUrl + '/preAwb/claim', //异常件认领
    PackAbnormalQuery: ApiRootUrl + '/preAwb/errOrderClaim', //异常件查询
    GetWarehouse: ApiRootUrl + '/config/getValueByKey', //获取仓库信息
    GetChannel: ApiRootUrl + '/channel/channels', //获取渠道列表
    ChannelDetail: ApiRootUrl + '/channel/channelInfo', //获取渠道详情
    GetSecneValue: ApiRootUrl + '/getUserByOpenId', //获取二维码scene数据
    GetQrCode: ApiRootUrl + '/qrCode', //获取带scene的二维码
    BindPhone: ApiRootUrl + '/resetTel', //绑定手机号
    BindEmail: ApiRootUrl + '/setEmail', //绑定邮箱
    GetEmailCode: ApiRootUrl + '/sendCodeToEmail', //获取邮箱验证码
    GetNoticeList: ApiRootUrl + '/issue/getIssueList', //获取公告列表
    GetNoticeDetail: ApiRootUrl + '/issue/getIssueById', //获取公告详情
    GetProblemList: ApiRootUrl + '/issue/getProblemList', //获取常见问题列表
    GetProblemDetail: ApiRootUrl + '/issue/getProblemById', //获取常见问题详情
    OrderUnpaid: ApiRootUrl + '/setgoods/getNoPayOrder', //获取待支付订单
    OrderDeliver: ApiRootUrl + '/setgoods/getDeliverOrder', //获取已发货订单
    OrderUndeliver: ApiRootUrl + '/setgoods/getNoDeliverOrder', //获取待发货订单
    OrderSign: ApiRootUrl + '/setgoods/getSignOrder', //获取已签收订单
    OrderDetail: ApiRootUrl + '/setgoods/getOrderInfo', //获取订单详情
    OrderPayment: ApiRootUrl + '/pay/payOrder', //订单支付
    OrderPayRecord: ApiRootUrl + '/pay/payRecord', //查询支付记
    GetCompanyPreface: ApiRootUrl + '/getCompanyPreface', //查看公司介绍
    GetContactaddre: ApiRootUrl + '/getContactaddre', //查看公司联系地址
    GetMyShare: ApiRootUrl + '/getMyShareUser', //分享用户的列表
    SearchLogo: ApiRootUrl + '/logo', // logo图查询
    GetNews: ApiRootUrl + '/news', // 获取新闻列表 
    GetNewsData: ApiRootUrl + '/newsdata', // 获取新闻详情 
    GetPort: ApiRootUrl + '/port', // 包机运力 
    GetBlackList: ApiRootUrl + '/blackCompany', // 黑名单查询
    PackConfirm:ApiRootUrl +'/setgoods/getNoPackSetgoods',//确认打包列表
    PackConfirmId:ApiRootUrl +'/setgoods/confirmPackage',//确认打包id
    GetPreAwbBySetgoodsId:ApiRootUrl +'/setgoods/getPreAwbBySetgoodsId',//根据集货id查询预报单
    GetTrackBySetgoodsId:ApiRootUrl +'/setgoods/getTrackBySetgoodsId',//根据集货id查询轨迹
}