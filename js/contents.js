;$$grank_google = (function(){
  
  var $$ = function(){
    return this.search();
  };


  // data
  $$.prototype.data = {
    ad : []
  , search : []
  };


  // ad
  $$.prototype.search = function(){
    var ad_lists = document.querySelectorAll("#tads .ads-ad");
    for(var i=0; i<ad_lists.length; i++){
      var ad_title = ad_lists[i].querySelector(":scope .ad_cclk a h3");
      var ad_url   = ad_lists[i].querySelector(":scope .ad_cclk a cite");
      this.data.ad.push({
        type  : "top-ad"
      , title : ad_title.textContent
      , url   : ad_url.textContent
      });
    }
    var ad_lists = document.querySelectorAll("#bottomads .ads-ad");
    for(var i=0; i<ad_lists.length; i++){
      var ad_title = ad_lists[i].querySelector(":scope .ad_cclk a h3");
      var ad_url   = ad_lists[i].querySelector(":scope .ad_cclk a cite");
      this.data.ad.push({
        type  : "bottom-ad"
      , title : ad_title.textContent
      , url   : ad_url.textContent
      });
    }

    
    // search
    var srg = document.querySelectorAll("#ires .srg");
    for(var i=0; i<srg.length; i++){
      var g = srg[i].querySelectorAll(":scope .g");
      for(var j=0; j<g.length; j++){
        var title = g[j].querySelector(":scope .rc .r a h3");
        var url = g[j].querySelector(":scope .rc .r a cite");
        this.data.search.push({
          title : title.textContent
        , url   : (url.textContent.match(/$http/)) ? url.textContent : "://" + url.textContent
        });
      }
    }

    // count
    var resultStats = document.getElementById("resultStats");
    if(resultStats){
      if(resultStats.textContent.match(/約 ([0-9,].*?) 件/)){
        var str = RegExp.$1;
        if(str){
          this.data.count = Number(str.replace(/,/g,""));
        }
        else{
          this.data.count = 0;
        }
      }
      else{
        this.data.count = "";
      }
    }

    // word
    var input = document.querySelector("input[name='q']");
    if(input){
      this.data.word = input.value;
    }

    return this.data;
  };
  
  return $$;
})();


/**
 * Search engine : Google
 */

;(function(){

  // イベントライブラリ
  var $$event = function(target, mode, func){
		//other Browser
		if (typeof target.addEventListener !== "undefined"){
      target.addEventListener(mode, func, false);
    }
    else if(typeof target.attachEvent !== "undefined"){
      target.attachEvent('on' + mode, function(){func.call(target , window.event)});
    }
  };

  var $$ = function(){
    $$options.data = new $$grank_google();

    chrome.runtime.sendMessage({
      name   : "contents_2_popup_rank"
      ,data  : $$options.data
    });

    
  };

  var $$options = {
    data : null
  , tabId : null
  };
  


  chrome.runtime.onMessage.addListener(function(port){
    console.log(port);
  });


  new $$();

})();


