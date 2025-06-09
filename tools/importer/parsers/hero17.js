/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example: 'Hero'
  const header = ['Hero'];

  // Get the image (first <img> found)
  const img = element.querySelector('img');

  // Get the title (Heading), if present
  const titleDiv = element.querySelector('.heroImageTitle');
  let heading = '';
  if (titleDiv && titleDiv.textContent.trim()) {
    const h1 = document.createElement('h1');
    h1.textContent = titleDiv.textContent.trim();
    heading = h1;
  }

  // Ensure that all elements in the table reference the original DOM elements
  const rows = [
    header,
    [img || ''],
    [heading || ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
