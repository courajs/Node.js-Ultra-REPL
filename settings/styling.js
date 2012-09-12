var R = require('repl-rainbow');

var white = R(255, 255, 255);
var red = R(230, 0, 30);
var blue = R(0, 20, 200);
var yellow = R(255, 255, 0);
var lightyellow = R(255, 255, 100);
var mediumyellow = R(180, 180, 20);
var darkyellow = R(75, 75, 10);
var medblue = R(20,0,150);
var chartreuse = R(40, 255, 0);
var deeppink = R(180, 0, 130);
var gray = R(150, 150, 150);
var darkgray = R(80, 80, 80);
var hotpink = R(255, 0, 150);
var brightgreen = R(0, 255, 50);
var green = R(0, 220, 30);
var darkgreen = R(0, 160, 20);
var brightred = R(255, 0, 30);
var seagreen = R(0, 255, 220);
var darkcyan = R(0,100,100);
var mediumcyan = R(0,180,180);
var orange = R(255, 180, 0);
var lightblue = R(180, 180, 255);

var greenyellow = R(200, 255, 0);
var header = R(0,30,150).fg(white);

module.exports = {
  error: red,
  errorbg: R(255,0,30).fg(white),
  success: R(0,200,50),

  inspector: {
    header      : R(0,50,180).under(),

    // falsey
    Undefined   : R(50,100,50),
    Null        : R(50,50,100),
    // constructor functions
    Constructor : R(0,175,255),
    Proto       : hotpink,
    // normal types
    Function    : R(0,75,175),
    Boolean     : lightyellow,
    Date        : darkgreen,
    Error       : brightred,
    Number      : R(150,0,255),
    RegExp      : R(50,200,0),
    // property names and strings
    HString     : darkgreen,
    String      : R(0,200,50),
    HConstant   : darkyellow,
    Constant    : lightyellow,
    FHConstant  : darkcyan,
    FConstant   : seagreen,
    FName       : lightblue,
    FHName      : R(90,90,135),
    HName       : R(75,75,75),
    Name        : R(220,220,220),
    // meta-labels
    More        : R(200,100,0),
    Accessor    : orange,
    Circular    : R(150,100,0),
    // brackets
    Square      : hotpink,
    Curly       : orange,
    Node        : greenyellow,
  },
  syntax: {
    curly           : blue,
    square          : blue,
    round           : R(0,20,150),
    punctuation     : R(220,220,220),
    string          : green,
    number          : green,
    def             : mediumyellow,
    property        : mediumcyan,
    variable        : seagreen,
    variable2       : mediumyellow,
    comment         : darkgray,
    operator        : brightred,
    conditional     : deeppink,
    loop            : deeppink,
    scope           : R(0, 150, 30).fg(white),
    trycatch        : deeppink,
    declaration     : deeppink,
    control         : deeppink,
    member          : hotpink,
    atom            : blue,
    special         : brightred,
    builtin_method  : red,
    builtin_object  : red,
    builtin_class   : yellow,
    undefined       : R(50,100,50),
    null            : R(50,50,100),
  },

  help: {
    intro: green,
    names: mediumcyan,
    keybind: mediumyellow,
    keyword: deeppink,
    command: darkgreen,
    keywords:  yellow
  },
  intro: [yellow, brightred ],
    prompt: {
    separator: ['◊', darkgreen],
    end: ['»', seagreen],
    '--': mediumyellow,
    '++': yellow,
    number: mediumyellow
  },
  info: {
    context:    header,
    header:     header,
    page:       header,
    keydisplay: header
  },
  context: {
    create: chartreuse,
    remove: red,
    reset: hotpink,
    next: chartreuse,
    prev: chartreuse,
    names:  [ brightgreen, yellow, hotpink, R(0,230,255),
              orange, R(150,0,255), seagreen, R(0,150,255) ]
  },
};
