export default {
  confirm: '确认',
  cancel: '取消',
  pending: '等待交易确认',
  max: '全部',
  dismiss: '关闭',
  transaction: {
    pending: '等待确认',
    submitted: '已提交',
    rejected: '已取消',
  },
  wallet: {
    select_provider: '选择连接钱包',
    unlock: '连接钱包',
    my_account: '我的账户',
    balance: '余额',
    view: '在 Stcscan 上查看',
    sign_out: '退出',
    add_to_wallet: '添加到钱包',
  },
  nav: {
    home: '首页',
    exchange: '交易',
    farm: '挖矿',
    stake: '质押',
    analytics: '统计',
    borrow: '借贷',
    dashboard: '仪表盘',
  },
  farm: {
    title: '流动性挖矿',
    subtitle: '添加流动性并质押 LP 代币赚取 SHARE',
    earned: '已赚得',
    apr: '年化收益率',
    more: '更多',
    your_staked: '已质押',
    harvest: '提取奖励',
    collecting: '正在提取',
    stake: '质押',
    unstake: '解除质押',
    add_liquidity: '添加流动性',
    approve: '授权',
    deposit_token: '存入 {{ tokenName }} 代币',
    available: '可用 {{ symbol }}',
    withdraw_token: '取出 {{ tokenName }} 代币',
    total_staked: '总质押量',
    your_share: '您的份额',
    tvl: '总锁仓',
    rewards: '奖励',
    cannot_gt: '输入值不能大于',
    source: '使用',
  },
  stake: {
    title: '质押',
    subtitle: '质押 SHARE 从平台所有还款中赚收益',
    rewards: '增发奖励',
    claim_all: '领取奖励',
    claim: '领取奖励',
    stake: '质押代币',
    unstake: '解除质押',
    earned: '已赚得',
    apr: '预计年化收益率',
    learn_more: '了解更多',
    stake_share: '质押 SHARE 铸造 sSHARE',
    info: '质押信息',
    wallet_balance: '钱包余额',
    unstake_share: '燃烧 sSHARE 提取 SHARE',
    insufficient_bal: '钱包余额不足',
    cannot_gt: '输入值不能大于',
    locked: '已锁定 sSHARE',
    unlock_time: '解锁时间',
    sshare_tip: 'sSHARE 根据您在池子中的份额自动赚取平台收益',
    lock_tip: '每次质押新的 SHARE 后，都会重新生成 24 小时的锁定期',
    exchange_rate: '兑换率',
    apr_tip: '最近30天年化收益率',
    locked_tip: '新铸造的 sSHARE 会被锁仓24小时',
    unlock_time_tip: 'sSHARE 解锁时间，解锁后可提出到钱包',
  },
  borrow: {
    title: '借贷',
    subtitle: '抵押生息资产，借出与美元挂钩的稳定币——WEN',
    total_borrowed: 'WEN 借出总量',
    left_to_borrow: 'WEN 剩余可借量',
    interest_rate: '借款利息',
    liquidation_fee: '清算费用',
    back: '返回',
    borrow: '借贷',
    repay: '还款',
    position: '我的仓位',
    deposit_collateral: '存入抵押资产',
    borrow_wen: '借出 WEN',
    remove_collateral: '提取抵押资产',
    repay_wen: '还款 WEN',
    add_collateral: '添加抵押物',
    add_and_borrow: '添加抵押物并借款',
    enter: '请输入数值',
    collat_deposited: '已存入抵押物',
    collat_val: '抵押物价值',
    wen_borrowed: '已借出 WEN',
    liquidation_price: '清算价格',
    withdrawalbe: '可提现金额',
    max_callat_ratio: '最高抵押率', 
    borrow_fee: '借款手续费',
    debt_to_repay: '借款量',
    repay_and_remove: '还款并提取抵押物',
    available_to_borrow: 'WEN 可借量',
    wen_amount: 'WEN 借出量',
    expected_liq_price: '预计清算价格',
    expected_position_health: '预计健康度',
    position_health: '健康度',
    pool_info: '资产池信息',
    wallet_balance: '钱包余额',
    insufficient_bal: '钱包余额不足',
    cannot_gt: '输入值不能大于',
    cannot_lt: '输入值不能小于',
    available_to_repay: '最大可还金额',
    available_to_withdraw: '最大可提取金额',
    available_to_deposit: '最大可存金额',
    collat_deposited_tip: '已存入的抵押物数量',
    collat_val_tip: '已存入抵押物的美元价值',
    wen_borrowed_tip: '目前仓位下已借出的 WEN',
    liquidation_price_tip: '当抵押物价格下降到清算价格，您的仓位会被清算',
    left_to_borrow_tip: '根据当前已存入抵押物计算，可借出 WEN 的数量',
    max_callat_ratio_tip: '最大抵押率 (MCR) - MCR 表示当前选择的抵押物最大可借出的债务比例',
    liquidation_fee_tip: '清算人在执行清算流程购买抵押物时，所获的的折扣，或者说奖励',
    borrow_fee_tip: '当借出 WEN 时，借贷手续费会加到债务上',
    interest_rate_tip: '您的债务每年会增长的百分比',
    deprecated: '已停用',
    deprecated_tip: '已停用的借贷池只允许用户还款或提取抵押物',
    tvl: '总锁仓量',
  },
  dashboard: {
    title: '仪表盘',
    subtitle: '管理您的所有仓位',
    total_borrowed: '总借款额',
    total_collat_val: '总抵押价值',
    open_positions: '仓位数量',
    no_open_position: '暂时没有仓位',
  },
  notice: {
    ido: '稳稳首轮 IDO 将于 3月8日10:30 正式启动！投入 STC 以折扣价格兑换 SHARE 治理代币！',
    learn_more: '了解更多',
  }
}