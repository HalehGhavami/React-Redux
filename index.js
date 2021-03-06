// is not still react redux and I'm writing in node to use redux
const redux = require('redux');

//adding redux logger
const reduxLogger = require('redux-logger');

//create a logger
const logger = reduxLogger.createLogger();

const createStore = redux.createStore;

//added combine reducer
const combineReducer = redux.combineReducers;

//create an apply middleware to be able to have a middleware
const applyMiddleware = redux.applyMiddleware;

const BUY_MOB = 'BUY_MOB';
const BUY_TAB = 'BUY_TAB';

//Actions
function buyMob() {
  return {
    type: BUY_MOB,
    info: 'first action',
  };
}

function buyTab() {
  return {
    type: BUY_TAB,
    info: 'second action',
  };
}

const initialMobState = {
  numberOfMobs: 100,
};

const initialTabState = {
  numberOfTabs: 50,
};

//multi reducer for multiple action

const mobReducer = (state = initialMobState, action) => {
  switch (action.type) {
    case BUY_MOB:
      return {
        ...state,
        numberOfMobs: state.numberOfMobs - 1,
      };
    default:
      return state;
  }
};

const tabReducer = (state = initialTabState, action) => {
  switch (action.type) {
    case BUY_TAB:
      return {
        ...state,
        numberOfTabs: state.numberOfTabs - 1,
      };
    default:
      return state;
  }
};

//before passing reducer to createStore creating an object
const rootReducer = combineReducer({
  mob: mobReducer,
  tab: tabReducer,
});

//state of our application is in Redux Store
//second argument with the help of applyMiddleware for using logger
const store = createStore(rootReducer, applyMiddleware(logger));

// state is available through getState()
console.log('IntialStore is', store.getState());

//register listenere with subscribe

const unSubscribe = store.subscribe(() =>
  console.log('Updated state is', store.getState())
);

// update state with dispatch(action)
store.dispatch(buyMob());
store.dispatch(buyMob());

store.dispatch(buyTab());

// with return of listener it will become unregister, because I used arrow funcation for subscribe
// I returned listener with this line of code
unSubscribe();
