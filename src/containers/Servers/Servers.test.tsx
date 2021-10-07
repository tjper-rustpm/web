import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_SERVERS_QUERY, Servers } from './Servers';

const mocks = [
  {
    request: {
      query: GET_SERVERS_QUERY,
    },
    result: {
      data: {},
    },
  },
];

it('renders without errors', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Servers />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});
