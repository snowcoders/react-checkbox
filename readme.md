# Deprecation notice

The majority of what this package did is hide the checkbox and provide a way to add your own styled checkbox. However now that IE 11 is deprecated, the css property [all: unset](https://caniuse.com/css-all) works across enough browsers that it doesn't make sense to maintain this project.

If you want to create your own custom checkbox, there are tons of tutorials that show you how to use `:before` to create your own styled checkbox, however the new update is to just unset all the fields for the input itself that way it doesn't show up.

```css
input[type=checkbox] {
  all: unset;
}
```

# An unstyled React checkbox

[![npm (scoped)](https://img.shields.io/npm/v/@snowcoders/react-checkbox.svg)](https://www.npmjs.com/package/@snowcoders/react-checkbox)
[![CircleCI branch](https://img.shields.io/circleci/project/github/snowcoders/react-checkbox.svg)](https://circleci.com/gh/snowcoders/react-checkbox)

# Use it

`npm install --save @snowcoders/react-checkbox save-prefix "~"`

# Parent Library

This component is part of a larger components library, [react-ui-base](https://github.com/snowcoders/react-ui-base). The goal is to keep all the core logic and base css styles in a single location, that way building out new UI component libraries cheaper and faster (and less buggy).

We highly recommend visiting the react-ui-base repository to understand how to customize the css along with see examples.

You can also view all the components on our demo site https://snowcoders.github.io/react-ui-base/

# This component

Renders a simple checkbox component with a button as the main visual element that triggers a checkbox element. This allows for greater css customizations while maintaining the same API as a checkbox.
