// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'signin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SigninPage/reducer'),
          System.import('containers/SigninPage/sagas'),
          System.import('containers/SigninPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signinPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },  {
      path: '/signin',
      name: 'signinPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SigninPage/reducer'),
          System.import('containers/SigninPage/sagas'),
          System.import('containers/SigninPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signinPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/main',
      name: 'mainPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/MainPage/reducer'),
          System.import('containers/MainPage/sagas'),
          System.import('containers/MainPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mainPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/network',
      name: 'networkPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/NetworkPage/reducer'),
          System.import('containers/NetworkPage/sagas'),
          System.import('containers/NetworkPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('networkPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/profiles',
      name: 'profilesContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProfilesContainer/reducer'),
          System.import('containers/ProfilesContainer/sagas'),
          System.import('containers/ProfilesContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilesContainer', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/serials',
      name: 'serialsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SerialsPage/reducer'),
          System.import('containers/SerialsPage/sagas'),
          System.import('containers/SerialsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('serialsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
