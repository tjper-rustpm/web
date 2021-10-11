import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { DateTime } from 'luxon';

import { ThemeProvider } from 'styled-components';
import { light } from 'themes/light';
import ServerNameplate from './ServerNameplate';
import { DormantServer, LiveServer } from '../../providers/Server/Server';

let container: HTMLElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

it('renders LiveServer', () => {
  const updated = DateTime.now();
  const created = DateTime.now().minus({ hours: 1 });

  const server: LiveServer = {
    __typename: 'LiveServer',
    id: 'UUID',
    associationID: 'associationUUID',
    activePlayers: 99,
    queuedPlayers: 10,
    definition: {
      id: 'UUID',
      instanceID: 'instanceUUID',
      instanceKind: 'instanceKind',
      allocationID: 'allocationID',
      elasticIP: 'elasticIP',
      name: 'name',
      region: 'region',
      description: 'description',
      url: 'url',
      bannerURL: 'bannerURL',
      background: 'AIRPORT',
      tickRate: 30,
      mapSalt: 1,
      mapSeed: 2,
      mapSize: 3000,
      maxPlayers: 200,
      mapWipeFrequency: 'mapWipeFrequency',
      blueprintWipeFrequency: 'blueprintWipeFrequency',
      schedule: [],
      tags: [],
    },
    updatedAt: updated,
    createdAt: created,
  };

  act(() => {
    render(
      <ThemeProvider theme={light}>
        <ServerNameplate server={server} />
      </ThemeProvider>,
      container,
    );
  });
  expect(container.querySelector('.server-nameplate__name').textContent).toBe('name');
  expect(container.querySelector('.server-nameplate__ip').textContent).toBe('elasticIP');
  expect(container.querySelector('.server-nameplate__players--value').textContent).toBe('99');
  expect(container.querySelector('.server-nameplate__queue--value').textContent).toBe('10');
  expect(container.querySelector('.server-nameplate__countdown--value').textContent).toBe('01:00:00');
});

it('renders DormantServer', () => {
  const updated = DateTime.now();
  const created = DateTime.now().minus({ hours: 1 });
  const starts = DateTime.now().plus({ hours: 1 });

  const server: DormantServer = {
    __typename: 'DormantServer',
    id: 'UUID',
    definition: {
      id: 'UUID',
      instanceID: 'instanceUUID',
      instanceKind: 'instanceKind',
      allocationID: 'allocationID',
      elasticIP: 'elasticIP',
      name: 'name',
      region: 'region',
      description: 'description',
      url: 'url',
      bannerURL: 'bannerURL',
      background: 'AIRPORT',
      tickRate: 30,
      mapSalt: 1,
      mapSeed: 2,
      mapSize: 3000,
      maxPlayers: 200,
      mapWipeFrequency: 'mapWipeFrequency',
      blueprintWipeFrequency: 'blueprintWipeFrequency',
      schedule: [],
      tags: [],
    },
    startsAt: starts,
    updatedAt: updated,
    createdAt: created,
  };

  act(() => {
    render(
      <ThemeProvider theme={light}>
        <ServerNameplate server={server} />
      </ThemeProvider>,
      container,
    );
  });
  expect(container).toBeDefined();
  expect(container.querySelector('.server-nameplate__name').textContent).toBe('name');
  expect(container.querySelector('.server-nameplate__ip')).toBeNull();
  expect(container.querySelector('.server-nameplate__players--value')).toBeNull();
  expect(container.querySelector('.server-nameplate__queue--value')).toBeNull();
  expect(container.querySelector('.server-nameplate__countdown--value').textContent).toBe(
    starts.diffNow().toFormat('hh:mm:ss'),
  );
});
