/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { TableItem } from 'components';

class ListTable extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.data = [
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/807cc0ba-c730-4186-b83f-fdc9bf087f60',
          'labels': [],
          'nickname': '马慧测试',
          'userId': '566fdadd3f7354d1362a8dd9',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 63,
        'subTitle': '小兔杰瑞和妈妈在一起挖地瓜、揉面团、摘樱桃的日常生活场景，是不是小朋友们生活中也都有经历呢？',
        'title': '我爱妈妈',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-07/84eef9ee-b224-42aa-8eb3-43b0f199088e',
        'tryCount': 704,
        'collectCount': 2,
        'commentCount': 100,
        'strategyId': '55b638aaebb4fec1188ad8ca',
        'score': 8.7,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com/userAvatar/2015-12/8d5147d0-d75e-49de-b465-71ea05d93c4c',
          'labels': [
            {
              'title': '魅力达人',
              'color': '#3e8ea1',
              'labelId': '55b0536cc9e3c6090f67f4b5'
            }
          ],
          'nickname': '北极熊',
          'userId': '55f9494eaef559806222df05',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 9,
        'subTitle': '孩子之间经常出现“打人”和“被打”的情况，近些年校园暴力也屡屡发生。孩子打架，家长们不妨抛开焦虑与成见，直面问题的本质……',
        'title': '孩子爱打架，家长不妨这样做',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-11/875b8560-01a4-448a-8a08-cd469e4843d5',
        'tryCount': 531,
        'collectCount': 2,
        'commentCount': 16,
        'strategyId': '558a63906d3a042967cf796b',
        'score': 9.3,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com/userAvatar/2015-12/8d5147d0-d75e-49de-b465-71ea05d93c4c',
          'labels': [
            {
              'title': '魅力达人',
              'color': '#3e8ea1',
              'labelId': '55b0536cc9e3c6090f67f4b5'
            }
          ],
          'nickname': '北极熊',
          'userId': '55f9494eaef559806222df05',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 1,
        'subTitle': '真正的安全只有通过运动才能得到保障，在运动的过程中增强孩子的运动能力，提升他们的规则意识和安全意识，当孩子真正面临危险的时候，才知道如何保护自己。',
        'title': '让孩子在运动中提高安全意识',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-11/0cf886a2-98b0-43c9-847a-e36682c92e29',
        'tryCount': 673,
        'collectCount': 1,
        'commentCount': 11,
        'strategyId': '559f768e05c385ea26ded3f7',
        'score': 9,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com/userAvatar/2015-12/8d5147d0-d75e-49de-b465-71ea05d93c4c',
          'labels': [
            {
              'title': '魅力达人',
              'color': '#3e8ea1',
              'labelId': '55b0536cc9e3c6090f67f4b5'
            }
          ],
          'nickname': '北极熊',
          'userId': '55f9494eaef559806222df05',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 3,
        'subTitle': '有些孩子在家里很霸道，说话声音大，可是到幼儿园或学校就很胆小，很怂，而且存在这种情况的孩子不在少数，那么家长该怎么做帮助孩子改变呢？',
        'title': '孩子在家是龙在外是虫，怎么办？',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-11/7e52d783-eacd-48d4-8243-fa157a44e6e4',
        'tryCount': 878,
        'collectCount': 1,
        'commentCount': 6,
        'strategyId': '5628995d957967a232f351c4',
        'score': 9,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/716350e6-c2a3-4e93-9b26-d29d0e621b56',
          'labels': [],
          'nickname': '逗逗',
          'userId': '545de0712b500d9e66e9274e',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 6,
        'subTitle': 'opportunities ',
        'title': '没有音频',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-11/e757ab43-502e-43fa-8180-077e74029fda',
        'tryCount': 879,
        'collectCount': 1,
        'commentCount': 45,
        'strategyId': '53cc30c993bfa82c7b406eff',
        'score': 9.7,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/341ce634-8a13-4bf1-b8d7-34a734423db6',
          'labels': [],
          'nickname': '相濡①沫',
          'userId': '56694afc6c36a90c252baee3',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '很多爸爸妈妈在孩子还没出世，就开始为宝贝屯各种东西了，比如：小衣服、奶瓶、纸尿裤、小床等等生活必需品。大家想一想我们还可以为孩子屯些什么呢？',
        'title': '你还可以为孩子屯什么？',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/4e356429-53cc-4177-9c9c-7b90be3af1fc',
        'tryCount': 754,
        'collectCount': 1,
        'commentCount': 12,
        'strategyId': '55c0741348c1f219228799c3',
        'score': 7.6,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/bb6dc4c0-103c-417d-951a-007c02d9d36c',
          'labels': [],
          'nickname': '呵呵哒',
          'userId': '557508cfa03ff3dc07d7bf83',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 5,
        'subTitle': '其实我们每天都收到很多网络信息，如果你是一个有心的麻麻，当你看到某个不错的东东时，你会想说，咦~！当年如果我学习的时候，有这个多好呀~！那么这个时候，你会想说，给我宝宝屯一本吧。',
        'title': '为宝宝屯的英语宝典',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/9a600d97-4fc0-4911-a586-27ba6890b35e',
        'tryCount': 666,
        'collectCount': 2,
        'commentCount': 4,
        'strategyId': '55c04e0b48c1f219228799b0',
        'score': 6.9,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2015-07/d96ad60c-5630-474e-8c6f-6be7b09b5972',
          'labels': [],
          'nickname': 'z.p',
          'userId': '55963e5efe33ff443ae992c3',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '那些年，为宝宝屯的另外一样东西，就是相册。我和我相公已经脑补了这个画面，当我们把她交给未来女婿的时候，这个相册就是给闺女和女婿屯的《育儿宝典》！',
        'title': '为宝屯相册，记录点滴',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/d071b019-89d9-4f9c-a489-f83dba14846e',
        'tryCount': 716,
        'collectCount': 1,
        'commentCount': 2,
        'strategyId': '55c0593248c1f219228799b4',
        'score': 9.2,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/576b0856-200a-4f5a-b6fe-2cdbfd0d7efc',
          'labels': [],
          'nickname': '🍀青🍀',
          'userId': '55817b1435596edd0aa9ebca',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '正面管教系列绘本，正确处理负面情绪',
        'title': '绘本--杰瑞的冷静太空',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/b52c8acb-3075-478e-a829-b74843f20776',
        'tryCount': 630,
        'collectCount': 1,
        'commentCount': 29,
        'strategyId': '55c0567c48c1f219228799b3',
        'score': 8.3,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets-dev.iyuanzi.net/userAvatar/2015-12/6df7692b-4364-4324-ae39-45d36c42bb3f',
          'labels': [],
          'nickname': '王志远_ly',
          'userId': '55750927a03ff3dc07d7bf88',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '随着“单独二胎”政策的实施，许多父母正筹划着再要个孩子。弄得想生二胎的父母深陷忧虑，到底是生还是不生呢？',
        'title': '二胎，生还是不生？',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/6c258852-c08c-4d36-9ccf-407ba1506882',
        'tryCount': 648,
        'collectCount': 2,
        'commentCount': 0,
        'strategyId': '55bf3d7048c1f219228799ad',
        'score': 6.9,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/118a1d66-378c-4349-b391-1b10bdd61626',
          'labels': [],
          'nickname': '采蘑菇的大南瓜',
          'userId': '53cbcacc48c71b960d1e52c0',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 1,
        'subTitle': '一位龙凤胎妈妈向一位龙凤胎爸爸提问：请教一下，两个孩子你觉得能够爱的公平吗？今天加班回来晚了，回来后两个小家伙都让我抱，于是我抱了姐姐，逗奶奶抱着的弟弟玩了一下。就哄姐姐睡觉去了，等姐姐睡着再去抱弟弟已经睡着了。感觉有点对不起弟弟一样。同样让妈妈抱，为什么只抱姐姐抱弟弟？弟弟会不会有意见？',
        'title': '两个孩子，父母怎样公平的爱？',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-02/9b41ffa9-7c0d-4257-b8d0-d090a22968aa',
        'tryCount': 637,
        'collectCount': 1,
        'commentCount': 1,
        'strategyId': '54d0820c5b2594cb201fea10',
        'score': 8.3,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/bbabc8f8-e3b3-487a-abaf-8ce87f1a8b7a',
          'labels': [],
          'nickname': '长袜子田田',
          'userId': '54539d6e6ffef65403e4686e',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '给两个孩子当妈妈，可不是简单的所有事情都double一下——实际生活没有那么恐怖，也没有那么轻松。说它没有那么恐怖，因为在日常照料上，你也许只会增加50%的工作量，因为他们可以共享接近的食谱和一盘“天线宝宝”。说它没有那么轻松，是因为你和孩子之间，孩子与孩子之间不是固定程序，1+1的答案实在是复杂。',
        'title': '双宝妈妈入门课-跟愧疚说拜拜',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-11/5fde05a5-7a6b-430a-84a6-c9a954623f70',
        'tryCount': 881,
        'collectCount': 1,
        'commentCount': 4,
        'strategyId': '546b0f0a2b399af125121d2b',
        'score': 8.8,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-09/df3136bb-0fb0-4d75-8a51-3ee3db179b62',
          'labels': [],
          'nickname': '小柚子麻麻',
          'userId': '53d1fad031fb76c35c14b1c2',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '抚养两个孩子长大成人虽然辛苦，可是这个过程中又充满了无穷的乐趣和幸福……',
        'title': '最好的礼物--为什么要生俩？',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-12/dad5663f-96ca-4e69-abb7-f48e89810aae',
        'tryCount': 608,
        'collectCount': 2,
        'commentCount': 1,
        'strategyId': '548cec782da721ff72224585',
        'score': 8.3,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-09/df3136bb-0fb0-4d75-8a51-3ee3db179b62',
          'labels': [],
          'nickname': '小柚子麻麻',
          'userId': '53d1fad031fb76c35c14b1c2',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 4,
        'subTitle': '为了阻止父母生二胎，武汉13岁女孩相继以“逃学”、“离家出走”、“跳楼”相威胁，后来还尝试用刀片割手腕，逼得父母最终放弃了二胎，怀孕13周零5天的母亲含泪终止妊娠。华东师范大学心理咨询中心特聘儿童青少年心理专家陈默，特别为准备生二胎的父母们支招——要生二胎，怎么跟老大说？',
        'title': '生二胎支招：怎么和大宝说',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-01/a20b9d26-4e4d-4525-a8bf-a0fa9d2be447',
        'tryCount': 623,
        'collectCount': 0,
        'commentCount': 0,
        'strategyId': '54c07713c9f7d51b12a9e579',
        'score': 9.7,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/bbabc8f8-e3b3-487a-abaf-8ce87f1a8b7a',
          'labels': [],
          'nickname': '长袜子田田',
          'userId': '54539d6e6ffef65403e4686e',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '家里的老二，从懂事起就自然而然地接受了分享妈妈、分享玩具的状态，所以他相对来说容易满足于现状。不过因为他总是与家里那个大孩子有固定的年龄差，所以如何帮助他接受差距、建立自信，并且在“分享”的同时满足他的情感上的需要，对他来说非常重要。',
        'title': '双宝妈妈入门课-如何应对二宝',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-11/d8bda12b-b86f-45f0-a5d7-f51ccf97fa36',
        'tryCount': 965,
        'collectCount': 0,
        'commentCount': 1,
        'strategyId': '546b0f0a2b399af125121d45',
        'score': 8.3,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/bbabc8f8-e3b3-487a-abaf-8ce87f1a8b7a',
          'labels': [],
          'nickname': '长袜子田田',
          'userId': '54539d6e6ffef65403e4686e',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 2,
        'subTitle': '因为要做关于两个孩子的“特别关注”，所以开始翻看自己这些年的育儿日记，想跟大家分享一些我给两个孩子做妈妈的心情与体悟。',
        'title': '一辈子的温暖',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-12/b872d4b6-bfff-46d2-a011-e6b1fb8d3114',
        'tryCount': 562,
        'collectCount': 0,
        'commentCount': 0,
        'strategyId': '549002533b8087eb0e864a28',
        'score': 9.2,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/bbabc8f8-e3b3-487a-abaf-8ce87f1a8b7a',
          'labels': [],
          'nickname': '长袜子田田',
          'userId': '54539d6e6ffef65403e4686e',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '家里添了一个小宝宝，对你的老大来说是生活的巨大改变，他需要一个适应和接受的过程。不要认为他应该理所当然地接受这个同胞，“有个伴儿多好啊”是大人一厢情愿的想法，孩子并不领情。',
        'title': '双宝妈妈入门课-做大宝的工作',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-11/c41cc4d4-266a-4217-b156-f148ee10a3b1',
        'tryCount': 743,
        'collectCount': 1,
        'commentCount': 3,
        'strategyId': '546b0f0a2b399af125121d36',
        'score': 0,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-11/8d93b83e-3d1b-4a70-809a-a800c399bc7b',
          'labels': [],
          'nickname': 'Take 30',
          'userId': '5461c995b2e6094b7c76f4ac',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '有时父母为了吓唬孩子，用“陌生人很危险”的方式教育孩子，其实教育孩子认清什么是可疑的行为，更能让孩子掌握保护自己的策略和技巧。',
        'title': '帮助孩子辨识可疑行为的人',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/d6b6e0e8-d967-4987-a40f-07fd59b07ef6',
        'tryCount': 569,
        'collectCount': 0,
        'commentCount': 0,
        'strategyId': '55bf061d48c1f21922879943',
        'score': 6.9,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-10/40159eeb-c294-4b23-9f05-c15d7d85fa2d',
          'labels': [],
          'nickname': '方枪枪',
          'userId': '53d1fa9d31fb76c35c14b1c1',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '这组照片记录了宝宝温暖对待弟弟妹妹的瞬间，简直有爱到爆。从小让孩子有个伴，这感觉真好。给你一个生二胎的理由，被暖到的赶紧转走吧！',
        'title': '大宝爱小宝的美好时刻',
        'cover': 'http://assets.iyuanzi.net/cardImg/2014-12/03c3bac4-5de7-47bd-8863-64542e6acbd4',
        'tryCount': 855,
        'collectCount': 1,
        'commentCount': 1,
        'strategyId': '548ceb222da721ff72224528',
        'score': 0,
        'isCollected': false
      },
      {
        'owner': {
          'avatar': 'http://assets.iyuanzi.net/userAvatar/2014-11/8d93b83e-3d1b-4a70-809a-a800c399bc7b',
          'labels': [],
          'nickname': 'Take 30',
          'userId': '5461c995b2e6094b7c76f4ac',
          'themeStyle': {
            'avatarBgImg': 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1'
          }
        },
        'photoCount': 0,
        'subTitle': '父母教育孩子最好的办法是，与孩子一起模拟各种情境，再帮助孩子多次的练习，直到孩子完全掌握这些安全技能。',
        'title': '创造情景，训练安全技巧',
        'cover': 'http://assets.iyuanzi.net/cardImg/2015-08/f3ba3925-fde4-4e2b-baa5-ff8af6e5b66f',
        'tryCount': 824,
        'collectCount': 1,
        'commentCount': 0,
        'strategyId': '55bf081b48c1f21922879946',
        'score': 0,
        'isCollected': false
      }];

    this.state.showFields = [
      { key: 'owner.avatar', name: '用户头像', type: 'avatar' },
      { key: 'owner.nickname', name: '昵称', type: 'text' },
      { key: 'title', name: '标题', type: 'text' },
      { key: 'subTitle', name: '副标题', type: 'text' },
      { key: 'cover', name: '封面', type: 'image' },
      { key: 'tryCount', name: '试过', type: 'text' }

    ];

  }

  render() {
    const data = this.state.data;
    const showFields = this.state.showFields;
    const tableItems = data.map(function (item) {
      return <TableItem key={item.strategyId} data={item} showFields={showFields}/>;
    });
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {showFields.map((item) => <th>{item.name}</th>)}
            </tr>
          </thead>
          <tbody>
          {tableItems}
          </tbody>
        </table>
      </div>

    );
  }
}

export default ListTable;
