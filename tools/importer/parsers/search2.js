/* global WebImporter */
export default function parse(element, { document }) {
  // Determine the query index URL for search.
  // The example hardcodes:
  // https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json
  // There is nothing in the provided HTML indicating a dynamic or custom search index URL,
  // nor is there a Section Metadata block in the markdown example.
  // Therefore, we use the demo index URL as in the example, for all such headers.

  // Header row as in the example
  const headerRow = ['Search (search2)'];
  // Content row as in the example
  const indexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  const cells = [
    headerRow,
    [indexUrl]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
