// you can also use a renderer like "@testing-library/react" or "enzyme/mount" here
import { render, unmountComponentAtNode, } from "react-dom";
import { fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Router, Routes } from "react-router-dom";
import AdminScreen from "../routes/AdminScreen";
import BookingScreen from "../routes/BookingScreen";
import LoginScreen from "../routes/LoginScreen";
import { act } from "react-dom/test-utils";
import fetchMock from 'jest-fetch-mock';
import { MOCK_ADMIN, MOCK_ADMIN_CONTRACTOR_RESPONSE, MOCK_AVAILABLE_EQUIPMENTS_RESPONSE, MOCK_BOOKED_EQUIPMENTS_RESPONSE, MOCK_CREDENTIALS } from "./fixtures";
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

let container: Element | null = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  jest.restoreAllMocks();
});

it("login should work & set local storage properly", async () => {
  // setup
  jest.spyOn(global, 'fetch').mockResolvedValue(MOCK_ADMIN_CONTRACTOR_RESPONSE)
  act(() => (render(<LoginScreen />, container)));
  // find DOM elements on LoginScreen
  const usernameEle = container?.querySelector("#username");
  const passwordEle = container?.querySelector("#password");
  const submitBtnEle = container?.querySelector("#submit");
  ["Username", "Password"].map(t => expect(container?.textContent).toContain(t));
  if (usernameEle && passwordEle && submitBtnEle) {
    // Input username & password
    [usernameEle, passwordEle].map(ele => fireEvent.change(ele, { target: { value: MOCK_CREDENTIALS } }));
    // Click on `submit` button & wait for the component to be updated (localStorage)
    await waitFor(() => {
      fireEvent.click(submitBtnEle);
    })
    // check if localStorage was updated to the mock response returned by `/login` API
    const user = localStorage.getItem("user");
    if (user) {
      expect(JSON.parse(user)).toMatchObject(MOCK_ADMIN);
    }
  } else {
    fail("username, password or submit elements was not found!")
  }
});

it("admin screen should show equipments in the table", async () => {
  // setup (mock response of `/booked-equipments` API)
  jest.spyOn(global, 'fetch').mockResolvedValue(MOCK_BOOKED_EQUIPMENTS_RESPONSE)
  await act(() => (render(<AdminScreen />, container)));
  // check if the response has been painted on DOM table correctly
  const expectedEquipment = JSON.parse((MOCK_BOOKED_EQUIPMENTS_RESPONSE as any)._bodyText)[0];
  // validate if table rows have been correctly displayed on DOM
  [expectedEquipment.id, expectedEquipment.serial_number, expectedEquipment.username, expectedEquipment.model].map(value => {
    expect(container?.textContent).toContain(`${value}`);
  })
});

it("booking screen should show available equipments in the table", async () => {
  // setup (mock response of `/booked-equipments` API)
  jest.spyOn(global, 'fetch').mockResolvedValue(MOCK_AVAILABLE_EQUIPMENTS_RESPONSE)
  await act(() => (render(<BookingScreen />, container)));
  // check if the response has been painted on DOM table correctly
  const expectedEquipment = JSON.parse((MOCK_AVAILABLE_EQUIPMENTS_RESPONSE as any)._bodyText)[0];
  // validate if table rows have been correctly displayed on DOM
  [expectedEquipment.id, expectedEquipment.serial_number, expectedEquipment.model].map(value => {
    expect(container?.textContent).toContain(`${value}`);
  })
});