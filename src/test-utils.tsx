import { cleanup, render } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  function RouterWrapper(props: any) {
    return (
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <>{props.children}</>,
          },
        ])}
      />
    );
  }

  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => <RouterWrapper>{children}</RouterWrapper>,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
