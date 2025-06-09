/* global WebImporter */
export default function parse(element, { document }) {
  // Find mainWrapper containing the columns
  const mainWrapper = element.querySelector('ul.mainWrapper');
  if (!mainWrapper) return;

  // Each direct child <li> of mainWrapper is a column
  const columns = Array.from(mainWrapper.children).filter(li => li.tagName === 'LI');

  // For each column, gather its content (ul.columnListHeader and/or div.socialMedia)
  const columnContents = columns.map(li => {
    const blocks = [];
    // Navigation block (may be empty, so only include if it has children)
    const navBlock = li.querySelector('ul.columnListHeader');
    if (navBlock && navBlock.children.length > 0) blocks.push(navBlock);
    // Social media block (direct child div.socialMedia)
    const socialBlock = Array.from(li.children).find(child => child.classList && child.classList.contains('socialMedia'));
    if (socialBlock) blocks.push(socialBlock);
    // If only one content block, return it; if more, return array; if none, return empty string
    if (blocks.length === 1) return blocks[0];
    if (blocks.length > 1) return blocks;
    return '';
  });
  // Remove trailing empty columns (sometimes markup leaves trailing blank <li>)
  while (columnContents.length && !columnContents[columnContents.length - 1]) {
    columnContents.pop();
  }

  // Prepare table cells: header row (one cell only), then content row (one cell per column)
  const headerRow = ['Columns (columns10)'];
  const contentRow = columnContents;
  const cells = [headerRow, contentRow];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
