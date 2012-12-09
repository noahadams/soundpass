//////////////////////////////////////////////////////////

// initialize audio
soundLib.init();

var sampleUrls = [
"/static/samples/808/1.mp3", // Kick
"/static/samples/808/2.mp3", // Snare
"/static/samples/808/3.mp3", // Low-conga
"/static/samples/808/4.mp3", // Mid-conga
"/static/samples/808/5.mp3", // High-conga
"/static/samples/808/6.mp3", // Closed high hat
"/static/samples/808/7.mp3", // Clap
"/static/samples/808/8.mp3"  // Cymbal
];

errback = function() {
    console.log("Error!");
}

// A place for samples to live
var sampleBuffers = []

var loaded = 0;

var url, i, len = sampleUrls.length;
for(i=0, len=sampleUrls.length; i < len; i++) {
    url = sampleUrls[i];
    // closure to hold value of i around asyncily
    (function() {
        var _i = i;
        soundLib.loadUrl(errback
          , function(buffer) {
                sampleBuffers[_i] = buffer;
                console.log("Loaded " + (_i + 1));
                loaded++;
                if (loaded == sampleUrls.length) {
                    $(".main").removeClass("loading").addClass("paused");
                }
          }
          , url);
    })();
}

//////////////////////////////////////////////////////////



/*
 * CONSTANTS
 */
var NUM_COLS = 8;
// Beats per minute
var BPM = 120;
// 8 8th note steps, 4 beats
var STEP_SPEED = 30000/BPM; // 200ms
// Hack to determine event handling
var tap = /ip(hone|od|ad)|android.*(mobile)/i.test(navigator.userAgent) ? "touchstart": "click";

/*
 * STATE
 */
var currCol = 0;
var timer = null;

/*
 * SETUP
 */
var beatCol = "<div class=\"beat-box\"><div class=\"beat\"></div></div>";
var timeCol = "<div class=\"beat-box\"><div class=\"time\"></div></div>";
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
$(".beat").on(tap, function(){
    $(this).toggleClass("pressed")
})

$(".row").on("step", function(el){
    var index = $(".row").index(el.target) - 1;
    soundLib.playNow(sampleBuffers[index]);
})

$(".play").on(tap, function(){
    event.preventDefault();
    var playButton = $(this);
    playButton.toggleClass("pressed");
    if (playButton.hasClass("pressed")) {
        stepCol();
        $(".main").removeClass("paused").addClass("playing");
    } else {
        clearTimeout(timer);
        $(".main").removeClass("playing").addClass("paused");
    }
});

$(".clear").on(tap, function() {
    $(".beat").removeClass("pressed");
})

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
    if (currCol == NUM_COLS) {
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
