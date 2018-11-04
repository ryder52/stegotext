//key=>value array of space types
var spaces = {
    1: '\u0020',
    2: '\u2004',
    3: '\u2008',
    4: '\u205F',
    5: '\u00A0'
};

/*
key=>value array of alphabet codes, 25 combinations of 5 spaces, with need of real space character in secret message
two alphabet characters have to be erased, in this case {w,x}
 */
var codes = {
    a: 11,
    b: 12,
    c: 13,
    d: 14,
    e: 15,
    f: 21,
    g: 22,
    h: 23,
    i: 24,
    j: 25,
    k: 31,
    l: 32,
    m: 33,
    n: 34,
    o: 35,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 51,
    v: 52,
    y: 53,
    z: 54,
    " ": 55
};

//frequently used html elements assigned to variables
var create = document.getElementById('create');
var fileInput = document.getElementById('fileInput');
var textInput = document.getElementById('textbox');
var secretInput = document.getElementById('textboxsecret');
var fileDisplayArea = document.getElementById('fileDisplayArea');

var textFile = null;
//global variable for count of spaces in public text. Required for handling larger texts without lags and crashes.
var textInputSpaces = 0;

//make text file from encoded string
function makeTextFile (text) {
    var data = new Blob([text], {type: 'text/plain'});

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    return textFile;
}

//return key from array codes witch has specified value
function getChar (code) {
    var char;
    for (var key in codes) {
        if (codes[key] === code) {
            char = key;
        }
    }
    return char;
}

//return value from array codes assigned to specified key
function getCode (char) {
    return codes[char];
}

/*
function controlling condition
Number of spaces in message should be greater than 2x(secret message character count)+4
argument 0 skips space counting in public message (again for large public message processing)
with argument 1 function counts spaces in public message
 */
function encodeReady(counterType) {
    var text = textInput.value;
    var secret = secretInput.value;
    //actual space requirements
    var minSpaceCount = 2*(secret.length)+4;

    if (counterType) {
        var textSpaces = 0;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                textSpaces++;
            }
        }
        //assign space count to global variable
        textInputSpaces = textSpaces;
    }

    if (textInputSpaces >= minSpaceCount) {
        //condition is fulfilled, there are more spaces in public text than minimal secret message requirements, ready to encode
        return true;
    } else {
        //number of spaces that have to be added to public message
        return minSpaceCount-textInputSpaces;
    }
}

//hide secret message to space characters in public message
function encode(text, secret) {
    /*
    as there are only 25 possible character codes, there is need for simplification of secret message
    all characters are transformed to lowercase and without accents
    */
    secret = secret.toLowerCase();
    secret = removeDiacritics(secret);

    var codedSecret = "";
    var output = "";
    var secretCounter = 0;

    //secret message is coded char by char to string of numbers, code for each char is from array codes
    for (var i = 0; i < secret.length; i++) {
        if (codes[secret[i]]) {
            codedSecret += getCode(secret[i]);
        } else {
            console.log('unsupported char');
        }
    }
    //end marker (two simple spaces) to recognize the end of secret message
    codedSecret += 5555;

    /*
    spaces in public text are replaced by various types from array spaces
    type of space is taken from coded message into string of numbers
    */
    for (i = 0; i < text.length; i++) {
        if (text[i] === " " && secretCounter < codedSecret.length) {
            output += spaces[codedSecret[secretCounter]];
            secretCounter++;
        } else {
            output += text[i];
        }
    }
    return output;
}

/*
reverse function to encode, input is text that might contain secret message, output is secret message

 */
function decode(file) {
    var code = "";
    var decodedSecret = "";
    for (var i = 0; i <= file.length; i++) {
        //find all spaces in file and add space type to string of numbers representing coded message
        switch(file.charCodeAt(i)) {
            case 32:
                code += 1;
                break;
            case 8196:
                code += 2;
                break;
            case 8200:
                code += 3;
                break;
            case 8287:
                code += 4;
                break;
            case 160:
                code += 5;
                break;
        }
    }


    var couple = "";
    var doomCounter = 0;

    for (i = 0; i < code.length; i++) {

        //string of numbers is processed in couples, each couple representing one character of secret message
        if (couple.length === 2) {
            decodedSecret += getChar(parseInt(couple));

            //when two simple spaces are found next to each other, processing is over and secret message is completely reconstructed
            if (couple === "55") {
                doomCounter++;
                if (doomCounter === 2) {
                    code = "";
                }
            } else {
                doomCounter = 0;
            }

            couple = code[i];

        } else {
            couple += code[i];
        }
    }
    return decodedSecret;
}

/*
display and hide information about space requirements in between text fields
when there are enough spaces to hide secret message, nothing is displayed
if there is insufficient room for secret message in public message, number of extra spaces needed is displayed
 */
function inputChecker(counterType) {
    //function returning either true or number of additional spaces required in public message
    var ready = encodeReady(counterType);
    var spaceCounter = document.getElementById('spacecounter');
    var text = textInput.value;
    var secret = secretInput.value;
    //while textfields are empty, dont show any information
    if (text && secret){
        if (ready === true){
            spaceCounter.style.display = "none";
        } else {
            spaceCounter.style.display = "block";
            spaceCounter.innerHTML = "You need " + ready + " more space(s) in public text."
        }
    } else {
        spaceCounter.style.display = "none";
    }
}

//if everything is correct, on button click file is generated
create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    var text = textInput.value;
    var secret = secretInput.value;
    var ready = encodeReady(0);
    if (ready === true){
        link.href = makeTextFile(encode(text, secret));
        link.click();
    }
}, false);

//dynamic counting of space condition
secretInput.addEventListener('input', function () {
    inputChecker(0);
});
textInput.addEventListener('input', function () {
    inputChecker(1);
});

//after upload of file, check if file is text file, then try to obtain secret message
fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var textType = /text.*/;
    if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            fileDisplayArea.innerText = ('secret message: ' + decode(reader.result));
        };

        reader.readAsText(file);
    } else {
        fileDisplayArea.innerText = "File not supported!"
    }
});

