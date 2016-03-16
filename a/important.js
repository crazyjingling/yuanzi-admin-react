/**
 * 1. 更新 label 中display不为true的值为false, 更新大分类的 type 为 classify ,使用 tools/mongodb/label.js mongodb脚本
 * 2. 更新 user 中的 talentStatus, 使用 tools/mongodb/user.js mongodb脚本
 * 3. 更新 topic 中的 cards 为 strategies,
 * 4. 更新 user 中的 role 为数组, consumer 角色是 role 都置空, 使用 tools/mongodb/user.js mongodb脚本
 * 4. 关于查询的说明: 查询条件均存在 search 字段中, search 的数据结构如下(以妙招为例):
 * 		search :   {
 * 						title: { value: '宝宝', type: 'text'},
 * 					    owner: { value: '56aa49208527d1bd35a958ba', type: 'select'} //这里的 type
 *				   }
 * tnpm cnpm
 * */
