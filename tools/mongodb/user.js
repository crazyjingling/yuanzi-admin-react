db.getCollection('userv2').update({'labels': {'$not':{'$size': 0}}}, {'$set': {"talentStatus" : "done"}}, false,true);
db.getCollection('userv2').update({'labels': {'$size': 0}}, {'$set': {"talentStatus" : "undone"}}, false,true);
db.getCollection('userv2').update({'labels': {'$size': 0}, 'talentInfo': {'$exists': true}}, {'$set': {"talentStatus" : "waitting"}}, false,true);
db.getCollection('userv2').update({'role': {'$size': 0}, 'talentInfo': {'$exists': true}}, {'$set': {"talentStatus" : "waitting"}}, false,true);
db.getCollection('userv2').update({role: 'consumer'}, {'$set': {role: []}},false,true)
