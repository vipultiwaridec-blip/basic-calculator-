# Product Requirements Document

## Product
Orbit Calculator

## Goal
Provide a fast, clear calculator for common arithmetic in a browser, with a live answer preview as the user builds an expression.

## Target user
Anyone who needs quick everyday calculations on desktop or mobile.

## Requirements
- Support addition, subtraction, multiplication, division, modulo, decimals, unary sign, and parentheses.
- Show the typed expression and its current result in real time.
- Support mouse/touch controls and keyboard input.
- Include clear, delete, sign-toggle, and equals controls.
- Prevent unsafe code execution and show a readable error state for invalid input or division by zero.
- Work at mobile and desktop widths with accessible labels and visible focus states.

## Success criteria
- A user can calculate a valid expression without page navigation or reload.
- Every valid partial expression updates the live result when it can be evaluated.
- Clear resets the expression and result to zero.
- Enter calculates; Escape clears; Backspace deletes the last character.
