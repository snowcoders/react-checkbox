import * as React from "react";

// Components
import { UnstyledButton } from "@snowcoders/react-unstyled-button";

// Utilities
import * as classNames from "classnames";

export interface ICheckboxProps
  extends React.ButtonHTMLAttributes<HTMLElement | HTMLInputElement> {
  /** The visual representation of the checkbox */
  checkboxContent?: JSX.Element;
  /** Controled version if the checkbox is checked or not. Either defaultCheckbox or checkbox should be provided. */
  checked?: boolean;
  /** Uncontrolled version if the checkbox is checked or not. Either defaultCheckbox or checkbox should be provided. */
  defaultChecked?: boolean;
  /** If the base styles provided in styles.scss are applied or not */
  isBaseStylesDisabled?: boolean;
  /** The text that appears next to the checkbox */
  labelText?: string;
  /** Props that will be applied to the element that triggers the onChange event */
  eventElementProps?: { [key: string]: any };
  /** Called whenever the checkbox is changed */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxState {
  isChecked?: boolean;
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  private inputRef: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    if (this.props.checked == null && this.props.defaultChecked != null) {
      this.state = {
        isChecked: this.props.defaultChecked
      };
    } else {
      this.state = {};
    }
  }

  render() {
    let {
      checkboxContent,
      checked,
      className,
      defaultChecked,
      disabled,
      eventElementProps,
      isBaseStylesDisabled,
      labelText,
      onChange,
      role,
      ...otherButtonProps
    } = this.props;

    // Figure out the base classname to be applied
    className = classNames(
      { "sci-react-checkbox": isBaseStylesDisabled !== true },
      { checked: this.props.checked || this.state.isChecked },
      className
    );

    return (
      <div className={className}>
        <label className="content">
          <UnstyledButton
            aria-checked={
              this.props["aria-checked"] || checked || this.state.isChecked
            }
            className="visual"
            disabled={disabled}
            onClick={this.onButtonClick}
            role={role || "checkbox"}
            {...otherButtonProps}
            type={undefined}
            value={undefined}
          >
            {checkboxContent}
          </UnstyledButton>
          <input
            {...eventElementProps}
            checked={checked}
            className="data"
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={this.onInputChange}
            ref={this.setInputRef}
            type="checkbox"
          />
          {labelText != null && <span className="text">{labelText}</span>}
        </label>
      </div>
    );
  }

  setInputRef = (ref: HTMLInputElement) => {
    this.inputRef = ref;
  };

  onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.inputRef.click();
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (event.isDefaultPrevented()) {
      return;
    }

    if (this.state.isChecked != null) {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }
  };
}
