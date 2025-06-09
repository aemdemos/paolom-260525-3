/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children with class 'subItem' (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > .subItem'));

  // For each column, extract the main content (the .joinMailingListHolder .textHolder)
  const colCells = columns.map((col) => {
    const textHolder = col.querySelector('.joinMailingListHolder .textHolder');
    if (textHolder) {
      // Keep all children (including any text, span, p, a, etc) in their original order
      const children = Array.from(textHolder.childNodes).filter(n => {
        // Keep element nodes and non-empty text nodes
        return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim());
      });
      // If only one node, use it directly; if more, use as array
      if (children.length === 1) return children[0];
      return children;
    }
    // If .textHolder missing, fallback to column element (should not occur)
    return col;
  });

  // Compose table rows
  // The header row must have the same number of columns as the content row.
  // Only the first cell has the header text, the rest are empty strings.
  const headerRow = ['Columns (columns15)'];
  while (headerRow.length < colCells.length) headerRow.push('');
  const contentRow = colCells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
