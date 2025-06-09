/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main filter wrapper
  const filterWrapper = element.querySelector('ul.listFilterWrapper');
  if (!filterWrapper) return;
  // Each <li class="filterMenuWrapper"> is a column
  const columnLis = Array.from(filterWrapper.children).filter(li => li.classList.contains('filterMenuWrapper'));

  // For each column, extract the title and value (All Categories / All Months)
  const columnCells = columnLis.map(li => {
    // Use the <a> inside li
    const link = li.querySelector('a.filterMenu.dropdown-toggle.link');
    if (!link) return document.createElement('div');
    const cellDiv = document.createElement('div');
    // Title
    const title = link.querySelector('span.filterTitle');
    if (title) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title.textContent.trim();
      cellDiv.appendChild(titleEl);
      cellDiv.appendChild(document.createElement('br'));
    }
    // Value
    const filterText = link.querySelector('div.filterText');
    if (filterText) {
      const valueEl = document.createElement('span');
      valueEl.textContent = filterText.textContent.trim();
      cellDiv.appendChild(valueEl);
    }
    return cellDiv;
  });

  // Header row: exactly one cell with the block name, matching the example
  const headerRow = ['Columns (columns4)'];
  const tableArr = [headerRow, columnCells];

  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
