/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row with exact block name
  const headerRow = ['Video (video8)'];

  // Find the first iframe (the video)
  const iframe = element.querySelector('iframe');
  let contentCell = null;
  if (iframe && iframe.src) {
    // Create a link to the iframe's src
    const link = document.createElement('a');
    link.href = iframe.src;
    link.textContent = iframe.src;
    contentCell = link;
  } else {
    // Fallback: empty cell (to handle missing video)
    contentCell = '';
  }

  // Build the block table as specified
  const cells = [
    headerRow,
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
