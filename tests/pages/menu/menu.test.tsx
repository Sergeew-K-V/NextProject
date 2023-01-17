import "@testing-library/jest-dom"
import React from "react"
import Menu, { getStaticProps } from "@/pages/menu"
import { URL_SERVER } from "../../../constants/URLS"
import { render } from "@testing-library/react"
const TEST_MENU = [
  {
    name: "Овощной",
    description: "Соус и овощи на выбор",
    image: "/icons/sandwiches/ovoshnoy.png",
    price: 105,
    category: "sandwiches",
    market: "subway",
    type: "multiple",
    weight: 1,
    components: {
      sizes: "1x",
      breads: "white-italian",
      vegetables: [],
      sauces: [],
      fillings: [],
    },
    componentsRule: {
      sizes: 1,
      breads: 1,
      sauces: 3,
    },
    id: 1,
  },
  {
    name: "Индейка",
    description: "Сэндвич с индейкой, соус и овощи на выбор",
    image: "/icons/sandwiches/ind.png",
    price: 150,
    category: "sandwiches",
    market: "subway",
    type: "multiple",
    weight: 1,
    components: {
      sizes: "1x",
      breads: "white-italian",
      vegetables: [],
      sauces: [],
      fillings: ["turkey"],
    },
    componentsRule: {
      sizes: 1,
      breads: 1,
      sauces: 3,
    },
    id: 2,
  },
  {
    name: "Ветчина",
    description: "Сэндвич с ветчиной, соус и овощи на выбор",
    image: "/icons/sandwiches/vetchina.png",
    price: 150,
    category: "sandwiches",
    market: "subway",
    type: "multiple",
    weight: 1,
    components: {
      sizes: "1x",
      breads: "white-italian",
      vegetables: [],
      sauces: [],
      fillings: ["ham"],
    },
    componentsRule: {
      sizes: 1,
      breads: 1,
      sauces: 3,
    },
    id: 3,
  },
]

// need to complite in the future, because now I'm going to worked project
describe("The menu page", () => {
  it("Menu page should get static props", () => {
    render(<Menu menu={TEST_MENU} />)
  })
})
