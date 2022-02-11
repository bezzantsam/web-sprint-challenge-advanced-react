/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
//import ClassComponent from "./AppClass.js";
import React from "react";
import FunctionalComponent from "./AppFunctional";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// Write your tests here

jest.setTimeout(750); // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 };
const queryOptions = { exact: false };

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
  reset = document.querySelector("#reset");
  submit = document.querySelector("#submit");
};

const updateStatefulSelectors = (document) => {
  squares = document.querySelectorAll(".square");
  coordinates = document.querySelector("#coordinates");
  steps = document.querySelector("#steps");
  message = document.querySelector("#message");
  email = document.querySelector("#email");
};

describe("Testing Functional component", () => {
  beforeEach(() => {
    render(<FunctionalComponent />);
    updateStatelessSelectors(document);
    updateStatefulSelectors(document);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should be a Functional Component", () => {
    expect(
      FunctionalComponent.prototype &&
        FunctionalComponent.prototype.isReactComponent
    ).not.toBeTruthy();
  });
  it("should be rendering on screen", () => {
    console.log(document);
    expect(document.querySelectorAll("#wrapper").length).toBeGreaterThan(0);
  });
  it('should have a h3 tag with the id "coordinates"', () => {
    console.log(document);
    expect(document.querySelectorAll("#coordinates").length).toBeGreaterThan(0);
  });
  it("should have a field text for email", () => {
    console.log(document);
    expect(document.querySelectorAll("#email").length).toBeGreaterThan(0);
  });
  it('should have h3 tag with id "steps"', () => {
    console.log(document);
    expect(document.querySelectorAll("#steps").length).toBeGreaterThan(0);
  });

  it("should change the value on the input box by the given value", () => {
    const email = document.querySelector("#email");
    fireEvent.change(email, { target: { value: "test@123.com" } });
    expect(email).toHaveValue("test@123.com");
  });
});

describe("Testing Class Component", () => {});
