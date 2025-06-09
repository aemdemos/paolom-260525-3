/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row per spec
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Find the <ul class="storyCard"> in the structure
  const ul = element.querySelector('ul.storyCard');
  if (!ul) return;
  const lis = ul.querySelectorAll(':scope > li.storyCardList');

  lis.forEach(li => {
    // --- Image/Icon cell ---
    const img = li.querySelector('.storyCardImage img');
    // Always require the image for the row to be valid
    if (!img) return;

    // --- Text Content cell ---
    const mediaBody = li.querySelector('.media-body');
    if (!mediaBody) return;
    const cellContent = [];

    // Title (mandatory, strong)
    const title = mediaBody.querySelector('.title');
    if (title) {
      // Use strong to match example (not h3 to avoid extra markup)
      const strong = document.createElement('strong');
      strong.innerHTML = title.innerHTML;
      cellContent.push(strong);
    }

    // Date and Author (optional, small font in source, can be included)
    const date = mediaBody.querySelector('.date');
    const author = mediaBody.querySelector('.author');
    if (date || author) {
      const meta = document.createElement('div');
      if (date) meta.append(date);
      if (author) meta.append(author);
      cellContent.push(meta);
    }

    // Description paragraph: prefer .description if it has text, else first <div><p>...</p></div><p>
    let desc = mediaBody.querySelector('p.description');
    // Only add if not empty
    if (!desc || !desc.textContent.trim()) {
      // Fallback: first <div><p>...</p></div> (some cards use this instead)
      const divP = mediaBody.querySelector('div > p');
      if (divP && divP.textContent.trim()) {
        desc = divP;
      } else {
        desc = null;
      }
    }
    if (desc && desc.textContent.trim()) {
      cellContent.push(desc);
    }

    // If there's a second paragraph, and it's not empty or duplicate, include it
    const allPs = mediaBody.querySelectorAll('div > p');
    if (allPs.length > 1) {
      allPs.forEach((p, idx) => {
        if (idx === 0) return; // already included above
        if (p.textContent.trim()) cellContent.push(p);
      });
    }

    // Categories (optional, often at bottom)
    const cats = mediaBody.querySelector('.categories');
    if (cats) cellContent.push(cats);

    // Only push this row if both image and text content present
    if (img && cellContent.length) {
      rows.push([img, cellContent]);
    }
  });

  // Only create the table if there is at least the header and one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
