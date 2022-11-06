import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';
import { store } from '../reducers/store';

const fetchRelay: FetchFunction = async (query, variables) => {
  const { user } = store.getState().auth;

  const response = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      Authorization: user?.token || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query.text,
      variables,
    }),
  });

  return await response.json();
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
