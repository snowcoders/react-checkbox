import * as React from "react";

// Components
import { UnstyledButton } from "@snowcoders/react-unstyled-button";

// Utilities
import * as classNames from "classnames";

export interface ICheckboxProps {
    /** A classname to apply to the root element */
    className?: string;
    /** If the base styles provided in styles.scss are applied or not */
    isBaseStylesDisabled?: boolean;
    /** The text that appears next to the checkbox */
    labelText?: string;
    /** Controled version if the checkbox is checked or not. Either defaultCheckbox or checkbox should be provided. */
    checked?: boolean;
    /** Uncontrolled version if the checkbox is checked or not. Either defaultCheckbox or checkbox should be provided. */
    defaultChecked?: boolean;
    /** Called whenever the checkbox is changed */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** The visual representation of the checkbox */
    checkboxContent?: JSX.Element;
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
            isBaseStylesDisabled,
            className,
            labelText,
            checked,
            defaultChecked,
            checkboxContent } = this.props;

        // Figure out the base classname to be applied
        className = classNames(
            { "sci-react-checkbox": isBaseStylesDisabled !== true },
            { "checked": this.props.checked || this.state.isChecked },
            className);

        return (
            <div className={className}>
                <label className="content">
                    <UnstyledButton
                        className="visual"
                        onClick={this.onButtonClick}>
                        {checkboxContent}
                    </UnstyledButton>
                    <input
                        checked={checked}
                        className="data"
                        defaultChecked={defaultChecked}
                        onChange={this.onInputChange}
                        ref={this.setInputRef}
                        type="checkbox"
                    />
                    {
                        labelText != null &&
                        <span className="text">{labelText}</span>
                    }
                </label>
            </div>
        );
    }

    setInputRef = (ref: HTMLInputElement) => {
        this.inputRef = ref;
    }

    onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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