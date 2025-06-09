/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the slides (ul.storyCard > li)
  const slidesUL = element.querySelector('ul.storyCard');
  const slideLIs = slidesUL ? Array.from(slidesUL.children) : [];

  // Prepare table rows, first row is header
  const rows = [
    ['Carousel (carousel14)']
  ];

  slideLIs.forEach((li) => {
    // First cell: image
    let imageCell = null;
    const img = li.querySelector('.storyCardImage img');
    if (img) {
      imageCell = img;
    }
    // Second cell: text content
    const mediaBody = li.querySelector('.media-body');
    const cellContents = [];
    if (mediaBody) {
      // Title (use <h2>)
      const title = mediaBody.querySelector('.title');
      if (title && title.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent.trim();
        cellContents.push(h2);
      }
      // Date and author (in a div)
      const date = mediaBody.querySelector('.date');
      const author = mediaBody.querySelector('.author');
      if (date || author) {
        const metaDiv = document.createElement('div');
        if (date) {
          const time = date.querySelector('time');
          if (time) {
            metaDiv.append(time);
          } else {
            metaDiv.append(date);
          }
        }
        if (author) {
          if (date) metaDiv.append(' ');
          // author text, as "by <address>"
          const address = author.querySelector('address');
          if (address) {
            metaDiv.append('by ', address);
          } else {
            metaDiv.append(author);
          }
        }
        cellContents.push(metaDiv);
      }
      // Description: .description paragraph if present
      const desc = mediaBody.querySelector('p.description');
      if (desc && desc.textContent.trim()) {
        cellContents.push(desc);
      }
      // Additional paragraphs: look for <div><p> direct children
      const extraPs = Array.from(mediaBody.querySelectorAll(':scope > div > p'));
      extraPs.forEach((p) => {
        if (p.textContent.trim()) {
          cellContents.push(p);
        }
      });
      // Categories: .categories span
      const categories = mediaBody.querySelector('.categories');
      if (categories) {
        cellContents.push(categories);
      }
      // CTA: a.storyCardLink (CTA link in this cell)
      const cta = mediaBody.querySelector('a.storyCardLink');
      if (cta) {
        cellContents.push(cta);
      }
    }
    rows.push([
      imageCell || '',
      cellContents.length > 0 ? cellContents : ''
    ]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
