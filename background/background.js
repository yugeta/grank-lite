/**
 * background script
 */

// console.log("GRS:background");

// function checkDomain(domain){
//   console.log(domain);
// 	// // on
// 	// if(domain.match(/(.*?)google.com$/i)){
// 	// 	chrome.browserAction.setIcon({path:"on.png"});
// 	// }
// 	// // off
// 	// else{
// 	// 	chrome.browserAction.setIcon({path:"off.png"});
// 	// }
// }


// chrome.tabs.onSelectionChanged.addListener(function(tabid){
//   checkDomain("selection : "+tabid);
//   // console.log("selection : "+tabid);

// 	// chrome.tabs.get(tabid, function(tab){
// 	// 	//domainの取得
//   // 		var domain = tab.url.split("/")[2];
// 	// 	// changeIcon
// 	// 	checkDomain("selection : "+domain);
// 	// });
// });
// // chrome.windows.onFocusChanged.addListener(function(winid){
// //   console.log("focus : " + winid);
// // 	// chrome.tabs.getSelected(winid, function(tab){
// // 	// 	//domainの取得
// //   // 		var domain = tab.url.split("/")[2];
// // 	// 	// changeIcon
// // 	// 	checkDomain("focus : "+domain);
// // 	// });
// // });


chrome.runtime.onConnect.addListener(function(port){

  if(port.name === "firstAccess"){
    var data = JSON.stringify(port);
    localStorage.setItem("contents_header" , data);
  }

  port.onMessage.addListener(function(port){

    // contents
    if(port.name === "searched"){
      var data = JSON.parse(port.data);
      localStorage.setItem("searchData" , JSON.stringify(data , null , "  "));

      
    }

    // popup
    else if(port.name === "popup"){
      var popup_port = chrome.runtime.connect({name: "background_2_popup"});
      popup_port.postMessage({"data":"test-post"});
    }
  });

  // if(port.name === "popup"){
  //   var data = JSON.stringify(port);
  //   localStorage.setItem("popup" , data);
  // }


});



