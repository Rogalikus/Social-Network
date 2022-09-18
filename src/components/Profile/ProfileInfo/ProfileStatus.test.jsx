import React from "react";
import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";
import { jest } from "@jest/globals";

// const profileStatus = () => {
//   return <ProfileStatus updateStatus={mockCallBack} status="Status yes" />;
// };

describe("ProfileStatus component", () => {
  test("satatus from props should be in the state ", () => {
    const component = create(<ProfileStatus status="Status yes" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Status yes");
  });
  test("after creation should be displayed with status ", () => {
    const component = create(<ProfileStatus status="Status yes" />);
    const root = component.root;
    let span = root.findByType("input");
    expect(span).not.toBeNull();
  });
  test("after creation should be displayed with status ", () => {
    const component = create(<ProfileStatus status="Status yes" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });
  test("after creation should be displayed with status ", () => {
    const component = create(<ProfileStatus status="Status yes" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("Status yes");
  });
  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="Status yes" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("Status yes");
  });
  test("callback should be call", () => {
    const mockCallBack = jest.fn();
    const component = create(
      <ProfileStatus updateStatus={mockCallBack} status="Status yes" />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
