import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./rtk/store";
import { setDataCB } from "./rtk/passerSlice";
import pubSub from "container/pubSub";
import { setPubSub } from "./rtk/passerSlice";

const mount = (el, { onNavigate, defaultHistory, initialPath, fromIceCreamMF, pubSub }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) history.listen(onNavigate);
  // if (fromIceCreamMF) store.dispatch(setDataCB({ cb: fromIceCreamMF }));  // Now we will use pub-sub method for communication

  if (onNavigate && pubSub) store.dispatch(setPubSub({ pubSub }));

  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    el
  );

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV == "development") {
  const devRoot = document.querySelector("#icecream-dev-root");

  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };
