/* global WebImporter */
export default function parse(element, { document }) {
  // Find all story card <li> elements
  const cardLis = element.querySelectorAll('ul.storyCard > li.storyCardList');
  const rows = [];

  cardLis.forEach((li) => {
    const card = li.querySelector('.storyCardCustomItem');
    if (!card) return;
    const mediaBody = card.querySelector('.media-body');
    let leftImage = null;
    let rightImage = null;
    let mediaLeft = card.querySelector('.media-left');
    let mediaRight = card.querySelector('.media-right:not(.ng-hide)');
    if (!mediaRight) {
      mediaRight = card.querySelector('.media-right');
    }
    if (mediaLeft) {
      leftImage = mediaLeft.querySelector('img');
    }
    if (mediaRight) {
      rightImage = mediaRight.querySelector('img');
    }
    if (leftImage && mediaBody) {
      rows.push([leftImage, mediaBody]);
    } else if (rightImage && mediaBody) {
      rows.push([mediaBody, rightImage]);
    } else if (mediaBody) {
      rows.push([mediaBody]);
    } else {
      rows.push([card]);
    }
  });

  // Fix: header row should be a single cell spanning all columns
  // So, cells[0] is [header], then content rows
  const colCount = rows.length > 0 ? rows[0].length : 1;
  const headerRow = ['Columns (columns11)'];
  const cells = [headerRow, ...rows];

  // Create table with correct header
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colSpan on header <th> if there are multiple columns
  if (colCount > 1) {
    const th = table.querySelector('th');
    if (th) {
      th.colSpan = colCount;
    }
  }

  element.replaceWith(table);
}
