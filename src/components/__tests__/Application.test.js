import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment/index";
import axios from "axios";

afterEach(cleanup);

describe("Appointment", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    render(<Appointment />);
  });

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
