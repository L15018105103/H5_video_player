(function () {
  var playB = document.querySelector(".play");
  var video = document.querySelector('.videofile');
  var oProgress = document.querySelector('.progress');
  var oVolume = document.querySelector('.volume');  
  var oOpenfile = document.querySelector('.openfile');
  var oTitle = document.querySelector('.title');
  var oFile = document.getElementById('file');
  var togglePlay = false;//判断是否视频在播放
  var interval;//每0.1s获取一次当前播放的进度
  var currentTime = 0;//音频的当前时间
  var totalTime = 0;//音频的总时间
  var progress = 0;//音频的进度
  var file = null;//播放的视频文件
  var url = null;//播放的视频文件的URL

  playB.onclick = function () {
    if(togglePlay){//暂停
      pauseVideo();
    }else{//开始播放
      video.play();
      totalTime = video.duration;
      playB.style.backgroundImage = 'url("images/pause.png")';
      togglePlay = true;
      interval = setInterval(function () {
        currentTime = video.currentTime;
        progress = (currentTime/totalTime) * 100;
        oProgress.style.background = 'linear-gradient(to right, #0086b3 '+progress+'%, #ccc '+progress+'%)';
      },100);
    }
  }

  oVolume.onclick = function () {
    if(video.volume === 0){//静音状态
      video.volume = 1;
      oVolume.style.backgroundImage = 'url("images/volume-max.png")';
    }else{
      video.volume = 0;
      oVolume.style.backgroundImage = 'url("images/volume-min.png")';
    }
  }

  oOpenfile.onclick = function () {
    oFile.click();
  }

  oFile.onchange = function () {
    pauseVideo();
    resetProgress();
    file = oFile.files[0];
    oTitle.innerHTML = file.name;
    url = URL.createObjectURL(file);
    video.src = url;
  }

  function pauseVideo() {
    video.pause();
    playB.style.backgroundImage = 'url("images/play.png")';
    togglePlay = false;
    clearInterval(interval);
  }

  function resetProgress() {
    currentTime = 0;
    progress = 0;
    oProgress.style.background = 'linear-gradient(to right, #0086b3 0%, #ccc 0%)';
  }

})();