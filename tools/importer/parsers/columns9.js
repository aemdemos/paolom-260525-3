/* global WebImporter */
export default function parse(element, { document }) {
  // Get the media-body section (contains heading and list)
  const mediaBody = element.querySelector('.media-body');
  // Get the heading
  let heading = mediaBody ? mediaBody.querySelector('.media-heading') : null;
  // Get the social links list
  let list = mediaBody ? mediaBody.querySelector('.list-inline') : null;
  // Get the share button wrapper (if present)
  const shareButton = element.querySelector('as-share-button');

  // Compose a single column with heading and social links as required in example
  let columnContent = [];
  if (heading) columnContent.push(heading);
  if (list) columnContent.push(list);

  // Second column: share button (if present, otherwise empty string)
  let shareColumn = shareButton ? shareButton : '';

  // Table: header is one cell, data row is two columns (social links, share button)
  const headerRow = ['Columns (columns9)'];
  const dataRow = [columnContent, shareColumn];
  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
