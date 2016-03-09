import {Router} from 'express';
import {graphql} from 'graphql';

import getDefaultFavicon from '../helpers/default-favicon';
import getMarkup from '../helpers/get-markup';
import routeHandler from '../helpers/route-handler';
import routes from '../../routers/admin';
import schema from '../schema';
import {UserModel} from '../models';
import {getAdmin as getAdminActionType} from '../../client/actions/types';
import {getQueryVariables} from '../../decorators/query-props';

var adminRouter = new Router();

// Restrict from here onwards
adminRouter.get('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.header.push(getDefaultFavicon(res));

    if (process.env.NODE_ENV === 'production') {
      res.locals.header.push({
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/css/admin.css'
        }
      });
    }

    res.locals.footer.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/js/admin.js`
      }
    });
    next();
  } else {
    res.redirect('/admin/login');
  }
});

adminRouter.get('/admin*', (req, res, next) => {

  if (req.isAuthenticated()) {
    routeHandler(routes, req, res, next);
  } else {
    next();
  }
});

adminRouter.get('/admin*', async (req, res, next) => {
	console.log('=================================1', 1);
	if (req.isAuthenticated() && req.routerState) {
    const AdminContainer = req.routerState.components[0];
    const PanelContainer = req.routerState.components[1];

    const {panelSettings, defaultQuery} = PanelContainer;
    const queryVariables = Object.assign({}, defaultQuery, req.query);

	  const paginateQuery = getQueryVariables(queryVariables);

    const {query, variables} = AdminContainer.getQueryAndVariables(
      {
        params: req.routerState.params,
        queryVariables: {
          ...paginateQuery
        }
      },
      {
        ...panelSettings
      }
    );
    const userId = req.session.passport.user;
    try{
        var user = await UserModel
              .findById(userId)
            .select({
				_id: 1,
				'account.username': 1,
				nickname: 1
			})
			.exec();
    }catch(sessionUserError){
      console.log('=================================sessionUserError', sessionUserError);
    }

    try{
      var data = await graphql(
          schema.getSchema(),
          query,
          {
            isAuthenticated: true,
            user
          },
          variables
      );
    }catch (graphqlError){
      console.log('=================================graphqlError', graphqlError);
    }
    console.log('=================================data', data);

    await req.store.dispatch({
      type: getAdminActionType,
      ...data
    });
    res.status(200).send(getMarkup(req.store, res));
  } else {
    next();
  }
});

export default adminRouter;
