//执行前更新这些分类,这里不是最新的
db.getCollection('labels').update({title: {'$in': ['全部', '故事', '英文', '游戏', '手工', '自然', '艺术', '乐途', '美食', '其它']}},{'$set':{type:'classify'}},false,true)

db.getCollection('labels').update({ display: { '$exists': false } }, { '$set': { display: false }}, false, true)
