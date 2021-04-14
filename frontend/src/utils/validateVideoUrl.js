function validateYouTubeUrl(url) {
  //   var url = $("#youTubeUrl").val();
  if (url != undefined || url != "") {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (!(match && match[2].length == 11)) {
      // Do anything for being valid
      // if need to change the url to embed url then use below line
      //   console.log("youtube url not valid");
      return true;
    } else {
      // Do anything for being invalid
      //   console.log("correct !!");
      return false;
    }
  }
}
