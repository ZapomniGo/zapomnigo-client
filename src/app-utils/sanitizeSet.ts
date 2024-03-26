import sanitizeHtml from "sanitize-html";

const verifyIframeUrl = (data) => {
  const iframeRegex = /<iframe.+?src="([^"]+)".*?>/i;
  const match = data.match(iframeRegex);

  if (match) {
    const iframeUrl = match[1];
    const isYoutubeUrl = iframeUrl.startsWith("https://www.youtube.com/");
    return isYoutubeUrl;
  } else {
    // No iframe found in the definition
    return true;
  }
};

const ProcessData = (data: any) => {
  data.forEach((item: any) => {
    if (!verifyIframeUrl(item.definition) || !verifyIframeUrl(item.term)) {
      alert("Само youtube е позволен като адрес. Ще премахнем дадената флашкарта с цел сигурност.");
      data.splice(data.indexOf(item), 1);
    } else {
      console.log(item);
      item.title = sanitizeHtml(item.term, {
        allowedTags: [],
        allowedAttributes: {},
      });
      item.description = sanitizeHtml(item.definition, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  });
  return data;
};
export default ProcessData;
