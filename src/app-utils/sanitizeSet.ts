import sanitizeHtml from "sanitize-html";

const verifyIframeUrl = (data: string) => {
  const iframeRegex = /<iframe.+?src="([^"]+)"[^>]*>/gi;
  const youtubeUrls: string[] = [];

  let match;
  while ((match = iframeRegex.exec(data)) !== null) {
    const iframeUrl = match[1];
    if (
      iframeUrl.startsWith("https://www.youtube.com/embed/") ||
      iframeUrl.startsWith("https://youtube.com/")
    ) {
      youtubeUrls.push(iframeUrl);
    } else {
      return false; // Return false if any iframe is not from YouTube
    }
  }
  let isOk =
    youtubeUrls.length === 0 ||
    youtubeUrls.length === data.match(iframeRegex).length;
  // Return true if no iframes exist or all iframes are from YouTube
  return isOk;
};

const ProcessData = (data: any) => {
  data.forEach((item: any) => {
    if (!verifyIframeUrl(item.definition) || !verifyIframeUrl(item.term)) {
      alert(
        "Само youtube е позволен като адрес. Ще премахнем дадената флашкарта с цел сигурност."
      );
      data.splice(data.indexOf(item), 1);
    } else {
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
