/**
 * 更新labels相关数据，一次性功能
 * 请单独运行
 */
var logger = require('../middlewares/logger').logger;
var common = require('../common');
var models = require('../lib/server/models');
var UserModel = models.UserModel;
var then = require('thenjs');

var updateLabels = function () {
    then(function (defer) {
		UserModel.find({ display: { '$exists': false } }, defer);
    }).then(function (defer, results) {
        if (results.length) {
            then.each(results, function (defer1, item) {
                if (item.steps && (item.steps)[0] && (item.steps)[0].img_url) {
                    item.cover = (item.steps)[0].img_url;
                    item.save(defer1);
                }
                else {
                    logger.warn('(' + item._id + '.steps)[0].img_url is null or undefinde');
                    defer1(null, true);
                }
            }).then(function () {
                defer(null, true);
            }).fail(function (defer1, err) {
                if (err) {
                    defer(err, err);
                }
            });
        }
        else {
            logger.warn('cards collection is empty');
            defer(null, true);
        }
    }).then(function () {
        logger.info('update \'description\' of \'cards\' finish!');
    }).fail(function (defer, err) {
        if (err) {
            logger.error(err);
        }
    });
};
(function () {
    common.connectMongo();
    updateCards();
// 如何结束
})();
exports.updateCards = updateCards;
