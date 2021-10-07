import { useMemo } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch, match } from 'react-router-dom';
import queryString from 'query-string';
import { History, Location } from 'history';

interface QueryString<T = string> {
  [key: string]: T | T[] | null;
}

interface Router {
  push(path: History.Path, state?: History.LocationState): void;
  push(location: History.LocationDescriptor<History.LocationState>): void;
  replace(path: History.Path, state?: History.LocationState): void;
  replace(location: History.LocationDescriptor<History.LocationState>): void;
  pathname: History.Pathname;
  query: QueryString;
  match: match;
  location: Location;
  history: History;
}

export function useRouter<
  Params extends { [K in keyof Params]?: string } = Record<string, string>,
  LocationState = History.LocationState,
>(): Router {
  const params = useParams<Params>();
  const location = useLocation<LocationState>();
  const history = useHistory<LocationState>();
  const match = useRouteMatch<Params>();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      match,
      location,
      history,
    };
  }, [params, location, history, match]);
}
