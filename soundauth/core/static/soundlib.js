/*
 * A stupidly small webkit audio wrapper, depends on jquery
 */

(function() {
soundLib || soundLib = {};

/*
 * init - call once to initilize the audio Context so we can play audio
 */
var init = soundLib.init = function() {
    soundLib.audioContext = new webkitAudioContext();
}

/*
 * Invoke callback(buffer) after having loaded an audio file from url
 */
var loadUrl = soundLib.loadUrl = function (err, cb, url) {
    var req = new XMLHttpRequest()
      , absolutify = document.createElement("A");
      , absoluteUrl;

    absolutify.href = url;
    absoluteUrl = absolutify.href;
    
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = function() {
        soundLib.audioContext.decodeAudioData(req.response, callback, err);
    }
    req.send();
}

/*
 * Play the buffer in our context at time
 */

var playAtTime = soundLib.playAtTime = function(buffer, time) {
    var context = soundLib.audioContext
      , source = context.createBufferSource();

    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.noteOn(time); // play at Time
}

soundLib.playNow = function(buffer) {
    playAtTime(buffer, 0);
}

})();