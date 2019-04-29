/**
 * popup-window script
 */

;(function(){

  // イベント関数
  var $$event = function(target, mode, func){
		if (typeof target.addEventListener !== "undefined"){
      target.addEventListener(mode, func, false);
    }
    else if(typeof target.attachEvent !== "undefined"){
      target.attachEvent('on' + mode, function(){func.call(target , window.event)});
    }
  };

  // ページ起動判定処理
  var $$ = function(){
		switch(document.readyState){
      case "complete":
        this.loaded();
      case "interactive":
        $$event(window , "DOMContentLoaded" , (function(e){this.loaded(e)}).bind(this));
      default:
        $$event(window , "load" , (function(e){this.loaded(e)}).bind(this));
    }
  };

  

  // ページ読み込み後の実行処理
  $$.prototype.loaded = function(e){
    var search_start = document.getElementById("search_start");
    if(search_start){
      $$event(search_start , "click" , (function(e){this.click_search_start(e)}).bind(this));
    }
    
    var input_keyword = document.getElementById("keyword");
    var keyword = localStorage.getItem("grank_keyword");
    if(input_keyword && keyword){
      input_keyword.value = keyword;
    }

    var input_domain = document.getElementById("domain");
    var domain = localStorage.getItem("grank_domain");
    if(input_domain && domain){
      input_domain.value = domain;
    }
  };

  $$.prototype.click_search_start = function(e){
    
    var input_keyword = document.getElementById("keyword");
    if(input_keyword){
      localStorage.setItem("grank_keyword" , input_keyword.value);
    }

    var input_domain = document.getElementById("domain");
    if(input_domain){
      localStorage.setItem("grank_domain" , input_domain.value);
    }

    chrome.tabs.create({
      url:"https://www.google.com/search?q=" + input_keyword.value + "&num=100"
      ,active : false
    }
    ,function(e){
      $$options.tabId = e.id;
    });

  };

  var $$options = {
    tabId : null
  };

  chrome.runtime.onMessage.addListener(function(port){

    if(port.name === "contents_2_popup_alldata"){
      document.getElementById("result").innerHTML = JSON.stringify(port.data);
      return "res";
    }
    
    else if(port.name === "contents_2_popup_rank"){

      var rank   = "--";
      var domain = localStorage.getItem("grank_domain");
      for(var i=0; i<port.data.search.length; i++){
        if(port.data.search[i].url.split("/")[2] === domain){
          rank = (i+1);
          break;
        }
      }
      var str = port.data.word + " : "+ rank +"位 : "+ port.data.count +"件中";
      document.getElementById("result").innerHTML = str;
    }
  });


  new $$();
})();
