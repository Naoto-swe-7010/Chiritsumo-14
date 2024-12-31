import SignIn from "./SignIn";

import { render, screen } from "@testing-library/react";


describe(SignIn, () => {
    test("タイトル「ちりつも」が表示される", () => {
        render(<SignIn />);
        const title = screen.getByRole("button");
        expect(title).toBeInTheDocument();
    })
});