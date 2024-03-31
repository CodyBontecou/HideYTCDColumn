chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab's status is complete, indicating it has fully loaded
  if (
    changeInfo.status === 'complete' &&
    tab.url.startsWith('https://studio.youtube.com/')
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: hideLastYTCDColumnElement,
    })

    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      css: 'body .column.ytcd-channel-dashboard { width: calc(50% - var(--card-margin)) !important; }',
    })
  }
})

function hideLastYTCDColumnElement() {
  const elements = document.querySelectorAll('ytcd-card-column')
  if (elements.length > 0) {
    const lastElement = elements[elements.length - 1]
    lastElement.style.display = 'none'
  }
}
