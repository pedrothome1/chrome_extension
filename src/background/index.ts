chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("onInstalled event fired!")
  console.log(details)
})
