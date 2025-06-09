/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate list items (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > li'));

  // For each column, extract only meaningful content (heading and text)
  const columnContents = columns.map(li => {
    const panel = li.querySelector('.panel-body');
    if (!panel) return li;
    const cellContent = [];
    // Icon if present
    const icon = panel.querySelector('.headerIcon');
    if (icon) {
      cellContent.push(icon);
    }
    // Heading (h2)
    const heading = panel.querySelector('h2');
    if (heading) {
      cellContent.push(heading);
    }
    // Text description
    // Try to combine all <div> and <p> tags (but skip empty <p> and panelBottomLink)
    const descs = Array.from(panel.childNodes).filter(node => {
      if (node.nodeType === 1) {
        if (node.tagName === 'P' && node.textContent.trim().length === 0) return false;
        if (node.classList && node.classList.contains('panelBottomLink')) return false;
        if (node.tagName === 'I' || node.tagName === 'H2') return false;
        return node.tagName === 'P' || node.tagName === 'DIV';
      }
      return false;
    });
    cellContent.push(...descs);
    return cellContent;
  });

  // Build the table
  const cells = [
    ['Columns (columns13)'], // Header row, 1 column
    columnContents          // Content row, N columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
