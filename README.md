# SBN
### Typescript compiler to create .svg images from DBN (Design by Numbers) language (https://dbn.media.mit.edu/)

### Install compiler
Run the following command `npm i -g @guidodizi/sbn-compiler`

Then, to compile a `.dbn` file run  `sbn *dbnFile*`

If you'd like to log the intermediate steps of compilation *(lexer, parser, transformer)* run `sbn *dbnFile* --log`


### DBN functionalities

Firstly, the file to be compiled must be with the extension `.dbn`


| Command | Arguments | Functionality  |
| --- | ---- | ----- |
| // | - | Commented line|
| Paper | `color: [0..100]` | Creates the square that will be used as the workspace. `color` defines the background color |
| Pen | `color: [0..100]` | Defines the `color` of the designs |
| Line | `x1: [0..100]` `y1: [0..100]` `x2: [0..100]` `y2: [0..100]` | Creates a line from (`x1`,`y1`) to (`x2`,`y2`)|

