/**
 * webpage script
 */

;(function(){
//   var $$event = function(target, mode, func){
// 		if (typeof target.addEventListener !== "undefined"){
//       target.addEventListener(mode, func, false);
//     }
//     else if(typeof target.attachEvent !== "undefined"){
//       target.attachEvent('on' + mode
//       , function(){func.call(target, window.event)});
//     }
//   };

//   var $$ = function(){
//     console.log("contents-start");
//     // this.setOptions(options);

//     // switch(document.readyState){
//     //   case "complete":
//     //     this.start();
//     //     break;
//     //   case "interactive":
//     //     $$event(window
//     //       , "DOMContentLoaded"
//     //       , (function(e){this.start(e)}).bind(this));
//     //     break;
//     //   default:
//     //     $$event(window
//     //       , "load"
//     //       , (function(e){this.start(e)}).bind(this));
//     //     break;
//     // }

//     var lists = document.querySelectorAll("#ires .srg > .g");
//     for(var i=0; i<lists.length; i++){
//       var r = lists[i].querySelector(":scope .r");
//       console.log(r.href);
//     }
//   };
// // console.log("contents-start");
//   // $$event(window , "DOMContentLoaded" , (function(e){new $$}).bind(this));


  // data
  var data = {
    ad : []
  , search : []
  };

  // ad
  var ad_lists = document.querySelectorAll("#tads .ads-ad");
  for(var i=0; i<ad_lists.length; i++){
    var ad_title = ad_lists[i].querySelector(":scope .ad_cclk a h3");
    var ad_url   = ad_lists[i].querySelector(":scope .ad_cclk a cite");
    // console.log("ad-title : " + ad_title.textContent);
    // console.log("ad-url : " + ad_url.textContent);
    data.ad.push({
      type  : "top-ad"
    , title : ad_title.textContent
    , url   : ad_url.textContent
    });
  }
  var ad_lists = document.querySelectorAll("#bottomads .ads-ad");
  for(var i=0; i<ad_lists.length; i++){
    var ad_title = ad_lists[i].querySelector(":scope .ad_cclk a h3");
    var ad_url   = ad_lists[i].querySelector(":scope .ad_cclk a cite");
    // console.log("ad-title : " + ad_title.textContent);
    // console.log("ad-url : " + ad_url.textContent);
    data.ad.push({
      type  : "bottom-ad"
    , title : ad_title.textContent
    , url   : ad_url.textContent
    });
  }
  

  // seo
  var srg = document.querySelectorAll("#ires .srg");
  for(var i=0; i<srg.length; i++){
    var g = srg[i].querySelectorAll(":scope .g");
    for(var j=0; j<g.length; j++){
      var title = g[j].querySelector(":scope .rc .r a h3");
      var url = g[j].querySelector(":scope .rc .r a cite");
      data.search.push({
        title : title.textContent
      , url   : url.textContent
      });
    }
  }

  // console.log(data);

  // var port = chrome.runtime.connect({name: "firstAccess"});
  // port.postMessage({
  //   name : "searched"
  // , data : JSON.stringify(data)
  // });

  chrome.runtime.sendMessage({
    greeting: "hello"
  },
  function(response) {
    // document.getElementById("div").textContent = response.msg;
  });

  

  // port.onMessage.addListener(function(res){
  //   console.log(res);
  // });

})();


