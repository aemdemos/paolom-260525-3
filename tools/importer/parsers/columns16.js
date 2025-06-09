/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should be a single column as per the requirements
  const headerRow = ['Columns (columns16)'];

  // Find all direct child .subItem divs, each represents a column
  const subItems = element.querySelectorAll(':scope > .subItem');

  // Defensive: If there are no subItems, do not replace
  if (!subItems.length) return;

  // Each column's content comes from .joinMailingListHolder > .textHolder
  // If not found, fallback to content of subItem
  const columns = Array.from(subItems).map(subItem => {
    const content = subItem.querySelector('.joinMailingListHolder > .textHolder');
    return content || subItem;
  });

  // Build the table data structure: header row (1 col), then a single row with all columns
  const tableData = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
