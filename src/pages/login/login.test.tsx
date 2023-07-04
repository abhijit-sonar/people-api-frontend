import { fireEvent, render, screen } from "../../test-utils";
import Login from "./Login";

describe("Login button", async () => {
  it("should be disabled unless terms accepted", () => {
    render(<Login />);

    expect(screen.getByRole("button")).toBeDisabled();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
