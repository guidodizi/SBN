# SBN

### Typescript transpiler to create .svg images from DBN (Design by Numbers) language (https://dbn.media.mit.edu/)

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

Or this funny example of a face!
```
// face.dbn
Paper 0
Pen 100

// face contour
Line 20 30 38 5
Line 38 5 62 5
Line 62 5 80 30
Line 80 30 80 70
Line 80 70 62 95
Line 62 95 38 95
Line 38 95 20 70
Line 20 70 20 30

// left eye
Line 25 35 45 35 
Line 25 35 45 35 
Line 45 35 40 45
Line 30 45 40 45 
Line 30 45 25 35 

Line 34 35 34 37
Line 34 37 36 37
Line 36 37 36 35

// right eye
Line 55 35 75 35 
Line 75 35 70 45 
Line 60 45 70 45 
Line 60 45 55 35 

Line 64 35 64 37
Line 64 37 66 37
Line 66 37 66 35

//nose
Line 50 35 44 65
Line 44 65 55 65

//mouth
Line 40 80 60 80
Line 60 80 62 79

Line 63 75 67 78


//smoke
Line 41 80 30 90
Line 30 90 32 92
Line 31 89 33 91
Line 45 80 32 92
```

![alt Text][img]

[img]: http://i.imgur.com/JtjnONV.png "face dbn file"
