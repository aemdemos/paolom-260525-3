/* global WebImporter */
export default function parse(element, { document }) {
  // The provided element is a progress bar widget, not a data table. There is no tabular data to extract.
  // The block name/Table header matches the example: 'Table (striped, bordered, tableStripedBordered7)' exactly.
  // No 'Section Metadata' block is present or required.
  // Per guidelines, if no data is present, output just the block-table header.
  const cells = [
    ['Table (striped, bordered, tableStripedBordered7)']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}