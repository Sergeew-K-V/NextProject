import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import About from "@/pages/about"

describe("About page", () => {
  it("Header should have text", () => {
    render(<About />)
    const headerText = "About Page"
    const heading = screen.getByRole("heading")
    const paragrahp = screen.getByTestId("parn")
    expect(paragrahp).toHaveTextContent("This app about how I been learing Next JS.")
    expect(heading).toHaveTextContent(headerText)
  })
})
