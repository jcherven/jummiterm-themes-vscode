# Jummiterm Themes for VSCode (alpha)

A VSCode syntax and UI theme based on Jummiterm by James Cherven. Suitable for web development and system administration, designed with the following document types in mind:

- JS/JSX
- HTML/CSS
- JSON
- shell/bash
- vimscript

Work in progress.

## Design Principles

- Limited palette of colors in pastel hues
  - 8 basic cterm colors which are in inverted order for their bright variations
  - Use of darkened/lightened shades of basic theme colors to keep the number of unique colors low
  - Use italics instead of a new color where possible
- Just enough contrast; not too much
  - A reaction to prevailing maximalist color themes that brightly mark every token possible with a unique divergent color, making the reading choppy. Non-users of the scheme should be able to immediately understand what the highlighting communicates.
- Not every token is a magic word
  - Use of a typical terminal foreground color for text that doesn't need special emphasis. Powerful tokens built in to the language should get more emphasis than user tokens.
- Subtle comments
  - Comments that blend into the background a bit are easy to skim over when you need to focus on the syntax but are still very legible when paid attention to.
- Different parts of your stack should be visually distinct
  - Web development deals with so many radically different abstractions being edited at the same time. It's easier for me to mentally organize and focus/unfocus my attention between multiple panes and tabs when, for instance, Nodejs controllers have a distinct color character from MongoDB models.

## Current work

- Testing and adjusting token colors in work environments

## To Do

- More thoughtful error and warning highlighting
- Light theme for glossy screens in bright environments
- CSS token highlighting needs considerable refining
- More thoughtful color selection for VSCode GUI elements like borders and file explorer highlighting
