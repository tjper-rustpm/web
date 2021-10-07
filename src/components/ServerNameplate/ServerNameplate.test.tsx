import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ServerNameplate from "./ServerNameplate";

let container: HTMLElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

it("renders", () => {
  act(() => {
    render(
      <ServerNameplate
        name="US East Alpha"
        elasticIP="192.168.0.1:28016"
        activePlayers={99}
        queuedPlayers={10}
      />,
      container
    );
  });
  expect(container.querySelector(".server-nameplate__name").textContent).toBe(
    "US East Alpha"
  );
  expect(container.querySelector(".server-nameplate__ip").textContent).toBe(
    "192.168.0.1:28016"
  );
  expect(
    container.querySelector(".server-nameplate__players--value").textContent
  ).toBe("99");
  expect(
    container.querySelector(".server-nameplate__queue--value").textContent
  ).toBe("10");
});
