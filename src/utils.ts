export const applyFormatting = (
  inputText: string,
  formats: { bold?: boolean; italic?: boolean; underline?: boolean }
) => {
  const { bold = false, italic = false, underline = false } = formats;

  let formattedText = inputText;

  if (bold) {
    formattedText = `<b>${formattedText}</b>`;
  }
  if (italic) {
    formattedText = `<i>${formattedText}</i>`;
  }
  if (underline) {
    formattedText = `<u>${formattedText}</u>`;
  }

  return formattedText;
};
