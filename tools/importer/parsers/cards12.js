/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block header
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Get all card list items
  const cards = element.querySelectorAll(':scope > li.storyCardList');
  cards.forEach(card => {
    // First column: image
    let img = card.querySelector('.media-left img');
    // Second column: text (collect all relevant elements)
    const mediaBody = card.querySelector('.media-body');
    let textCellContent = [];
    if (mediaBody) {
      // Collect all non-empty direct children <div> or <p>
      Array.from(mediaBody.children).forEach(child => {
        if (
          (child.tagName.toLowerCase() === 'div' || child.tagName.toLowerCase() === 'p') &&
          child.textContent.trim().length > 0
        ) {
          textCellContent.push(child);
        }
      });
      // If nothing found, but mediaBody has text, fallback to mediaBody
      if (textCellContent.length === 0 && mediaBody.textContent.trim().length > 0) {
        textCellContent = [mediaBody];
      }
    }
    // Defensive: if text cell is still empty, use an empty string
    if (textCellContent.length === 0) {
      textCellContent = [''];
    }
    // Add row: [image, text]
    rows.push([
      img || '',
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
