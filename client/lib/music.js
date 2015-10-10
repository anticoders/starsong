_.extend(Utils.music, {

  pxInSecond: new ReactiveVar(100),

  timeToPx: function(time) {
    return Math.floor(time * Utils.music.pxInSecond.get() / Utils.music.second);
  },

  pxToTime: function(px) {
    return Math.floor(px * Utils.music.second / Utils.music.pxInSecond.get());
    // return time * pxInSecond / Utils.music.second;
  },

});


