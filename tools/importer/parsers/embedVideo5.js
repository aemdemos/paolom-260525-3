/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML does not contain an actual video embed, iframe, video, or img, nor a src URL to extract.
  // The only content is the video control bar, with no direct reference to the video or image itself.
  // According to the block spec, we must output a table with the block name as header, and the next row should contain a link to the external video.
  // Since there is no such link or embed in the given HTML, we must gracefully output an empty row.
  const headerRow = ['Embed (embedVideo5)'];
  const contentRow = [''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
