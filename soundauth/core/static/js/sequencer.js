//////////////////////////////////////////////////////////

// initialize audio
soundLib.init();

var sampleUrls = [
"/static/samples/808/1.wav", // Kick
"/static/samples/808/2.wav", // Snare
"/static/samples/808/3.wav", // Low-conga
"/static/samples/808/4.wav", // Mid-conga
"/static/samples/808/5.wav", // High-conga
"/static/samples/808/6.wav", // Closed high hat
"/static/samples/808/7.wav", // Clap
"/static/samples/808/8.wav"
];

errback = function() {
    console.log("Error!");
}

// A place for samples to live
sampleBuffers = []

_.map(sampleUrls, function(url) {
    soundLib.loadUrl(errback
      , function(buffer) {
          sampleBuffers.push(buffer);
          console.log("Loaded " + url);
      }
      , url);
})

//////////////////////////////////////////////////////////



/*
 * CONSTANTS
 */
var NUM_COLS = 8;
var STEP_SPEED = 200; // 200ms

/*
 * STATE
 */
var currCol = 0;
var timer = null;

/*
 * SETUP
 */
var beatCol = "<div class=\"span1\"><div class=\"beat\"></div></div>";
var timeCol = "<div class=\"span1\"><div class=\"time\"></div></div>";
var beatRow = "";
var timeRow = "";

for(i = 0; i < NUM_COLS; i++) {
    beatRow += beatCol;
    timeRow += timeCol;
}
$(".noise").append($(beatRow));
$(".timeline").append($(timeRow));

/*
 * EVENT HANDLERS
 */
$(".beat").on("click", function(){
    $(this).toggleClass("pressed")
})

$(".row").on("step", function(el){
    var index = $(".row").index(el.target);
    soundLib.playNow(sampleBuffers[index]);
})

$(".play").on("click", function(){
    var playButton = $(this);
    playButton.toggleClass("pressed");
    if (playButton.hasClass("pressed")) {
        stepCol();
    } else {
        clearTimeout(timer);
    }
});

/*
 * HELPER METHODS
 */

// Step through each column and act on the various elements
var stepCol = function() {
    // clear all step classes
    $(".beat, .time").removeClass("step");

    // add step class to elements in colNun
    $(".row").map(function(index, row){
        var element = $(".beat, .time", row).eq(currCol)
        element.addClass("step");
        if (element.hasClass("pressed")){
            $(row).trigger("step");
        }
    });

    // Increment current column
    currCol += 1;
    if (currCol > NUM_COLS) {
        currCol = 0;
    }

    // continue to step through
    timer = setTimeout(stepCol, STEP_SPEED);
}

// Convert musical pattern to password value
var patternToPassword = function() {
    var bitArray = new Array();

    $(".row.noise").each(function(index, element){
        var rowBitArray = $(".beat", $(element)).map(function(index, element){
            return $(element).hasClass("pressed") ? "1" : "0";
        });
        bitArray = bitArray.concat(rowBitArray.toArray());
    })
    return bitArray.join("");
}