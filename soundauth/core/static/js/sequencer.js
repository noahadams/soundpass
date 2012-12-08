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

$(".beat").on("step", function(){
    console.log("play sounds!");
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
    $(".row").map(function(index, element){
        var element = $(".beat, .time", element).eq(currCol)
        element.addClass("step");
        if (element.hasClass("pressed")){
            element.trigger("step");
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