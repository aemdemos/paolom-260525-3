/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const cells = [['Cards (cards6)']];
  // Get all immediate li children (each card)
  const items = element.querySelectorAll(':scope > li');
  items.forEach(li => {
    const panelBody = li.querySelector('.panel-body');
    if (!panelBody) return;
    // Get image
    const img = panelBody.querySelector('.tileImageWrapper img');
    // Get title
    const title = panelBody.querySelector('h3.title');
    // Compose text cell with title and description text
    let textCell = document.createElement('div');
    // Add the title if it exists
    if (title) textCell.append(title);
    // Add the remaining text content (description)
    // Find all direct children of panelBody that are after title and are not the image wrapper
    let foundTitle = false;
    Array.from(panelBody.childNodes).forEach(node => {
      if (node === title) {
        foundTitle = true;
        return;
      }
      if (!foundTitle) return;
      // If it's a non-empty text node or an element (e.g., <p>, <span>, <a>)
      if ((node.nodeType === 3 && node.textContent.trim()) || node.nodeType === 1) {
        textCell.append(node);
      }
    });
    // Add card row
    cells.push([
      img || '',
      textCell
    ]);
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}