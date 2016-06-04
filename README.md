![Relax CMS](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/logo_small.png "Relax logo")
====================================
[![Slack Status](http://slack-relax.herokuapp.com/badge.svg)](http://slack-relax.herokuapp.com/)

**IMPORTANT NOTE:** Relax isn't yet ready for production, stay tunned for releases, beta version will come soon

Support our work and help us make this the best open source CMS, be our [patreon](http://patreon.com/relax)!

Relax is a powerful new generation CMS on top of
[React](https://facebook.github.io/react/) and [Node.js](https://nodejs.org/en/)
which aims for a better way of building websites.

It features a live page builder based on components and a smart and easy way of
binding dynamic data to them.

We're currently working on releasing the beta version which should come up early 2016. If you want to collaborate in the meantime or just say anything join us at [Relax Slack](http://slack-relax.herokuapp.com/)

![Relax Screenshot](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/screenshot.jpg "Relax screenshot")

**You can check the demo [here](http://demo.getrelax.io/admin)**

Demo credentials:
 - user: demo
 - pass: demo

Installation
------------

### Dependencies

Relax uses [sharp](https://github.com/lovell/sharp) to resize images.
If you're using OS X, you'll need to install its libvips dependency via `brew install homebrew/science/vips`.
Full installation instructions are available [here](http://sharp.dimens.io/en/stable/install/).

You'll also need [MongoDB](https://www.mongodb.org/).

### How to Relax

Since we are yet to tag our first release, git clone this repository and run
`npm install` followed by `npm start`.

By default the application runs at port `8080`. Go ahead and visit
`http://localhost:8080/admin/init`, here you can setup the first user and you're ready to relax.


Configuration
-------------

To configure the application you can use a `.relaxrc` file. You can place it
next to the application, on any parent folder, in your `HOME` folder, etc.

You can find a sample with the default values [here](.relaxrc.sample).


Contributing
------------

### Build and start

#### Development

While in development it's convenient to keep your application running while
watching for changes, for that you can run `npm run dev`.

The application will automatically restart when needed and keep your bundles
up to date.

#### Production

To build your assets ready to go for production run `npm run build` and `npm start` to start the application.


License
-------
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
 *
 * npm install 时 sharp 模块报错, http://sharp.dimens.io/en/stable/install/    主要是升级gcc,升级后更新动态库 http://itbilu.com/linux/management/NymXRUieg.html
 * tnpm cnpm
 * */

Relax is [GPL-3 licensed](LICENSE).


Troubleshooting
---------------

Please create [an issue](https://github.com/relax/relax/issues/new).
