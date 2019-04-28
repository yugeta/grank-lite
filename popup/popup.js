/**
 * popup-window script
 */

;(function(){

  //ページ内にjsライブラリの読み込み
  var $$addSouce = function(file){
    var sp = file.split(".");
    var s;
    // css
    if(sp[sp.length-1] === "css"){
      s = document.createElement("link");
      s.rel  = "stylesheet";
      s.type = "text/css";
      s.href = file + "?" +(+new Date());
    }
    // javascript
    else{
      s = document.createElement("script");
      s.src = file + "?" +(+new Date());
    }
    document.body.appendChild(s);
  }

  // イベント関数
  var $$event = function(target, mode, func){
		if (typeof target.addEventListener !== "undefined"){
      target.addEventListener(mode, func, false);
    }
    else if(typeof target.attachEvent !== "undefined"){
      target.attachEvent('on' + mode, function(){func.call(target , window.event)});
    }
  };
  
  // selectorで上位要素のエレメントを検索する。
  var $$upperSelector = function(elm , selectors) {
    selectors = (typeof selectors === "object") ? selectors : [selectors];
    if(!elm || !selectors){return;}
    var flg = null;
    for(var i=0; i<selectors.length; i++){
      for (var cur=elm; cur; cur=cur.parentElement) {
        if (cur.matches(selectors[i])) {
          flg = true;
          break;
        }
      }
      if(flg){
        break;
      }
    }
    return cur;
  }

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
// console.log("hoge");
    
  };

  $$.prototype.click_search_start = function(e){
    var input = document.getElementById("keyword");
    if(!input){return}
    if(!input.value){return;}

    // 新規タブ追加(100件まで一括表示)
    var url = "https://www.google.com/search?q=" + input.value + "&num=100";
    var createOption = {
      url:url
    , active : false
    };
    var createFunction = function(e){
      var tabId = e.id;
      var index = e.index;

      console.log(e.id);

      // alert(JSON.stringify(e));
    };
    chrome.tabs.create(createOption , createFunction);


    // // 開いているタブを閉じる
    // chrome.tabs.remove(tabId);

  };

  // var port = chrome.runtime.connect({name: "popup"});
  // port.onMessage.addListener(function(port){
  //   if(port.name === "background_2_popup"){
  //     document.getElementById("result").innerHTML = JSON.stringify(port.data)
  //     // console.log(popup);
  //   }
  // });

  chrome.runtime.onMessage.addListener(function(port){
    document.getElementById("result").innerHTML = JSON.stringify(port);
  });

  // chrome.runtime.onConnect.addListener(function(port){
  //   if(port.name === "background_2_popup"){
  //     document.getElementById("result").innerHTML = JSON.stringify(port.data)
  //     // console.log(popup);
  //   }
  // });


  new $$();
})();
