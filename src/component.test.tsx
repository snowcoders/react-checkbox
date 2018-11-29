import * as React from "react";

import { Checkbox, ICheckboxProps } from "./component";

import { expect } from "chai";
import {
  configure,
  mount,
  ReactWrapper,
  shallow,
  ShallowWrapper
} from "enzyme";
import { mock, spy } from "sinon";

// Configure enzyme
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Checkbox", () => {
  let defaultProps: ICheckboxProps;
  beforeEach(() => {
    defaultProps = {};
  });

  it("Render", () => {
    let wrapper = shallow(<Checkbox {...defaultProps} />);
    expect(wrapper).to.have.length(1);
  });

  describe("Classname", () => {
    it("Default has classname", () => {
      let wrapper = shallow(<Checkbox {...defaultProps} />);
      let rootElement = wrapper.first();
      expect(rootElement.props().className).to.contain("sci-react-checkbox");
    });

    it("Disable style has no classname", () => {
      let wrapper = shallow(
        <Checkbox
          {...defaultProps}
          className="blue"
          isBaseStylesDisabled={true}
        />
      );
      let rootElement = wrapper.first();
      expect(rootElement.props().className).to.not.contain(
        "sci-react-checkbox"
      );
    });

    it("Class name override", () => {
      let wrapper = shallow(<Checkbox {...defaultProps} className="blue" />);
      let rootElement = wrapper.first();
      expect(rootElement.props().className).to.contain("sci-react-checkbox");
      expect(rootElement.props().className).to.contain("blue");
    });
  });

  describe("Uncontrolled", () => {
    beforeEach(() => {
      defaultProps = {
        checked: true
      };
    });

    it("Does not maintain it's own state", () => {
      // Render and validate the checkbox is checked
      let wrapper = mount(<Checkbox {...defaultProps} />);
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;

      // Find and click on the visual
      let visual = wrapper.find(".visual");
      expect(visual.length, "visual.length").not.to.equal(0);
      // For some reason we are getting this node twice... just make sure it's the same thing
      expect(visual.at(0).getDOMNode() === visual.at(1).getDOMNode()).to.be
        .true;
      visual.first().simulate("click");
      // Now for some reason, onChange isn't called whne we click the visual element, lets run it manually
      wrapper
        .find(".data")
        .props()
        .onChange({
          isDefaultPrevented: () => {
            return false;
          }
        } as any);

      // Now check the className
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;
    });

    it("Callback onChange", (done: MochaDone) => {
      // Props setup
      defaultProps.onChange = done;
      let onChangeSpy = spy(defaultProps, "onChange");

      // Render and validate the checkbox is checked
      let wrapper = mount(<Checkbox {...defaultProps} />);
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;

      // Find and click on the visual
      let visual = wrapper.find(".visual");
      expect(visual.length, "visual.length").not.to.equal(0);
      // For some reason we are getting this node twice... just make sure it's the same thing
      expect(visual.at(0).getDOMNode() === visual.at(1).getDOMNode()).to.be
        .true;
      visual.first().simulate("click");
      // Now for some reason, onChange isn't called whne we click the visual element, lets run it manually
      wrapper
        .find(".data")
        .props()
        .onChange(null);
    });

    it("Has no label", () => {
      let wrapper = shallow(<Checkbox {...defaultProps} />);
      expect(wrapper.find(".text").length).to.equal(0);
    });

    it("Has label", () => {
      defaultProps.labelText = "I'm a label!";
      let wrapper = shallow(<Checkbox {...defaultProps} />);
      expect(wrapper.find(".text").length).to.equal(1);
      expect(wrapper.find(".text").text()).to.equal(defaultProps.labelText);
    });
  });

  describe("Controlled", () => {
    beforeEach(() => {
      defaultProps = {
        defaultChecked: true
      };
    });

    it("Maintains it's own state", () => {
      // Render and validate the checkbox is checked
      let wrapper = mount(<Checkbox {...defaultProps} />);
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;

      // Find and click on the visual
      let visual = wrapper.find(".visual");
      expect(visual.length, "visual.length").not.to.equal(0);
      // For some reason we are getting this node twice... just make sure it's the same thing
      expect(visual.at(0).getDOMNode() === visual.at(1).getDOMNode()).to.be
        .true;
      visual.first().simulate("click");
      // Now for some reason, onChange isn't called whne we click the visual element, lets run it manually
      wrapper
        .find(".data")
        .props()
        .onChange({
          isDefaultPrevented: () => {
            return false;
          }
        } as any);

      // Now check the className
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.false;
    });

    it("State does not change if default is prevented", () => {
      // Render and validate the checkbox is checked
      let wrapper = mount(<Checkbox {...defaultProps} />);
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;

      // Find and click on the visual
      let visual = wrapper.find(".visual");
      expect(visual.length, "visual.length").not.to.equal(0);
      // For some reason we are getting this node twice... just make sure it's the same thing
      expect(visual.at(0).getDOMNode() === visual.at(1).getDOMNode()).to.be
        .true;
      visual.first().simulate("click");
      // Now for some reason, onChange isn't called whne we click the visual element, lets run it manually
      wrapper
        .find(".data")
        .props()
        .onChange({
          isDefaultPrevented: () => {
            return true;
          }
        } as any);

      // Now check the className
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;
    });

    it("Callback onChange", (done: MochaDone) => {
      // Props setup
      defaultProps.onChange = done;
      let onChangeSpy = spy(defaultProps, "onChange");

      // Render and validate the checkbox is checked
      let wrapper = mount(<Checkbox {...defaultProps} />);
      expect(
        wrapper.getDOMNode().classList.contains("checked"),
        "Should have class 'checked'"
      ).to.be.true;

      // Find and click on the visual
      let visual = wrapper.find(".visual");
      expect(visual.length, "visual.length").not.to.equal(0);
      // For some reason we are getting this node twice... just make sure it's the same thing
      expect(visual.at(0).getDOMNode() === visual.at(1).getDOMNode()).to.be
        .true;
      visual.first().simulate("click");
      // Now for some reason, onChange isn't called whne we click the visual element, lets run it manually
      wrapper
        .find(".data")
        .props()
        .onChange(null);
    });

    it("Has no label", () => {
      let wrapper = shallow(<Checkbox {...defaultProps} />);
      expect(wrapper.find(".text").length).to.equal(0);
    });

    it("Has label", () => {
      defaultProps.labelText = "I'm a label!";
      let wrapper = shallow(<Checkbox {...defaultProps} />);
      expect(wrapper.find(".text").length).to.equal(1);
      expect(wrapper.find(".text").text()).to.equal(defaultProps.labelText);
    });
  });

  it("Applies event element props to the currentTarget element", () => {
    defaultProps.eventElementProps = {
      ["data-value"]: 5
    };
    defaultProps.onChange = () => {};
    let onChangeSpy = spy(defaultProps, "onChange");
    let wrapper = shallow(<Checkbox {...defaultProps} />);
    let data = wrapper.find(".data");

    expect(data.props()["data-value"]).to.equal(5);
  });

  it("Sets button type to undefined even if passed in a type", () => {
    defaultProps.type = "button";
    let wrapper = shallow(<Checkbox {...defaultProps} />);
    let visual = wrapper.find(".visual");
    expect(visual.props().type).to.be.undefined;
  });
});
