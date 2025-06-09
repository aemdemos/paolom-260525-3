/* global WebImporter */
export default function parse(element, { document }) {
  // Find the listFilterWrapper (should be a <ul>)
  const list = element.querySelector('ul.listFilterWrapper');
  if (!list) return;
  // Get direct li children (filterMenuWrapper)
  const menuItems = Array.from(list.children).filter(li => li.classList.contains('filterMenuWrapper'));
  // Only keep the first two (Category and Month)
  if (menuItems.length < 2) return;

  // Helper to extract label/value from each filter summary
  function getCol(li) {
    const a = li.querySelector('a.filterMenu');
    if (!a) return '';
    const titleEl = a.querySelector('.filterTitle');
    const textEl = a.querySelector('.filterText');
    // Compose: bold label above value
    const wrap = document.createElement('div');
    if (titleEl) {
      const labelDiv = document.createElement('div');
      labelDiv.style.fontWeight = 'bold';
      labelDiv.textContent = titleEl.textContent.trim();
      wrap.appendChild(labelDiv);
    }
    if (textEl) {
      const valueDiv = document.createElement('div');
      valueDiv.textContent = textEl.textContent.trim();
      wrap.appendChild(valueDiv);
    }
    return wrap;
  }

  const col1 = getCol(menuItems[0]);
  const col2 = getCol(menuItems[1]);

  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns3)'],
    [col1, col2]
  ], document);
  element.replaceWith(table);
}
