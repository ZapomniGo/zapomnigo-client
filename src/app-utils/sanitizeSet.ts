import sanitizeHtml from "sanitize-html";

const ProcessData = (data: any) => {
  data.forEach((item: any) => {
    item.title = sanitizeHtml(item.title, {
      allowedTags: [],
      allowedAttributes: {},
    });
    item.description = sanitizeHtml(item.description, {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
  return data;
};
export default ProcessData;
