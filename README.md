# SBN

### Typescript compiler to create .svg images from DBN (Design by Numbers) language (https://dbn.media.mit.edu/)

### Install compiler

Run the following command `npm i -g @guidodizi/sbn-compiler`

Then, to compile a `.dbn` file run `sbn *dbnFile*`

If you'd like to log the intermediate steps of compilation _(lexer, parser, transformer)_ run `sbn *dbnFile* --log`

### DBN functionalities

Firstly, the file to be compiled must be with the extension `.dbn`

| Command | Arguments                                                   | Functionality                                                                               |
| ------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| //      | -                                                           | Commented line                                                                              |
| Paper   | `color: {0..100}`                                           | Creates the square that will be used as the workspace. `color` defines the background color |
| Pen     | `color: {0..100}`                                           | Defines the `color` of the designs                                                          |
| Line    | `x1: {0..100}` `y1: {0..100}` `x2: {0..100}` `y2: {0..100}` | Creates a line from (`x1`,`y1`) to (`x2`,`y2`)                                              |

### DBN File example

```
// square_cross.dbn

// White paper!
Paper 100
// Black pen!
Pen 0

Line 0 0 100 100
Line 100 0 0 100
Line 0 50 100 50

Line 10 10 10 90
Line 10 90 90 90
Line 90 90 90 10
Line 90 10 10 10

Line 0 0 0 100
Line 0 100 100 100
Line 100 100 100 0
Line 100 0 0 0
```
