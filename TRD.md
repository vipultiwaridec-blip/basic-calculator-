# Technical Requirements Document

## Architecture
A static client-side web app with three runtime files:
- `index.html`: semantic page structure and calculator controls.
- `styles.css`: responsive visual system, layout, states, and reduced-motion support.
- `script.js`: input state, recursive-descent arithmetic parser, rendering, and keyboard events.

## Runtime behavior
- Buttons expose values through `data-value` or actions through `data-action`.
- `render()` updates the expression and live result after every state change.
- The parser handles operator precedence: unary signs, multiplication/division/modulo, then addition/subtraction.
- Expressions are parsed as tokens rather than passed to `eval` or `Function`.
- Results are rounded to ten decimal places to avoid noisy floating-point display.

## Browser and accessibility
- Target modern browsers with ES2022 support.
- Use semantic buttons, `output`, `aria-label`, and `aria-live` for screen-reader feedback.
- Keep a visible `:focus-visible` outline.
- Use responsive CSS for narrow screens and respect `prefers-reduced-motion`.

## Validation checklist
- `2 + 3 * 4` previews and calculates as `14`.
- `10 / 0` displays `Error`.
- `C`, `DEL`, `±`, decimal input, and keyboard shortcuts work.
- No console errors during normal use.
