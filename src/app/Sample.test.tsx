import { render, screen } from "@testing-library/react";
import Sample from "./Sample";

test("画面表示", () => {
    render(<Sample />);
    const title = screen.getByText("hello world");
    expect(title).toBeInTheDocument();
}   )   ;