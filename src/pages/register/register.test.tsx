import { fireEvent, render, screen } from "../../test-utils";
import Register from "./Register";

describe("Login button", async () => {
  it("should be disabled unless terms accepted", () => {
    render(<Register />);

    expect(screen.getByRole("button")).toBeDisabled();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
