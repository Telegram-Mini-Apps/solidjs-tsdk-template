import {
  Navigate,
  Route,
  HashRouter,
  useNavigate,
  type RouteSectionProps,
} from '@solidjs/router';
import { type Component, createEffect, For, onCleanup } from 'solid-js';

import { routes } from '@/navigation/routes.js';
import { getWebApp } from '@/utils/getWebApp.js';


const HashRouterRoot: Component<RouteSectionProps> = props => {
  const navigate = useNavigate();
  const bb = getWebApp().BackButton;

  createEffect(() => {
    if (props.location.pathname === '/') {
      bb.isVisible && bb.hide();
    } else {
      !bb.isVisible && bb.show();
    }
  });

  function back() {
    navigate(-1);
  }

  bb.onClick(back);
  onCleanup(() => {
    bb.offClick(back);
  });

  return <>{props.children}</>
};

export function App() {
  return (
    <HashRouter root={HashRouterRoot}>
      <Route path="/">
        <For each={routes}>
          {(route) => <Route path={route.path} component={route.Component}/>}
        </For>
      </Route>
      <Route path="*" component={() => <Navigate href="/"/>}/>
    </HashRouter>
  );
}
