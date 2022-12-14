import { render } from "@testing-library/react";
import Login from "./Login";
import { Router, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { reducer } from "../../store";
import React, { Component } from "react";
import { Provider } from "react-redux";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(reducer, preloadedState),
    ...renderOptions
  } = {}
) {
  const h = createMemoryHistory();
  function Wrapper({ children }) {
    return (
      <Router location={h.location} navigator={h}>
        <Provider store={store}>{children}</Provider>
      </Router>
    );
  }

  // Return an object with the store and all of RTL's query functionsF
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

it("should log in successfully", () => {
  const { login } = renderWithProviders(<Login />);
});
