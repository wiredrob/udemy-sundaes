// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

//***Add This***
const originalError = console.error;
beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen();

  // Remove Dom warning
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18./.test(
        args[0]
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

afterAll(() => {
  // Clean up after the tests are finished.
  server.close();
  console.error = originalError;
});
