import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';

const fetchRelay: FetchFunction = async (query, variables) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY2YjE2NzQ2Y2MwZWIzZWExZjE5ZDAiLCJlbWFpbCI6ImFhQGlvay5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRkMUxRSEJJOWV6bkQxLzIxcmtqWHNPQ1JrWFkyWTY0UFROVEdiSUp0VkFIaHpHS3N2V3d3dSIsIm5hbWUiOiJvaSIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMDVUMTg6NTQ6MzEuODUwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTEtMDVUMTg6NTQ6MzEuODUwWiIsIl9fdiI6MCwiaWF0IjoxNjY3Njk4Njk1LCJleHAiOjE2Njg5MDgyOTV9.kWwp5rSbyYSEBcLclH5hVZERpvb9ky9MHCx7hq9qd3E';

  const response = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      Authorization: token,
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
