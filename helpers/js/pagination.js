function paginate(itemsContainerId, itemsArr, perPage, maxNumLinks = 3, currentPage = 1) {
  const numberOfItems = itemsArr.length;
  const numberOfPages = Math.ceil(numberOfItems / perPage);
  if (numberOfItems < 2) {
    return;
  }

  // create the pagination links container and empty it so we can display updated links 
  const paginationLinksContainer = createElementWithAttributes('div', { class: 'pagination-links' });
  paginationLinksContainer.innerHTML = "";

  const numLinkStartIndex = currentPage > maxNumLinks ? currentPage - maxNumLinks : 0;
  const numLinkEndIndex = numLinkStartIndex + maxNumLinks;

  for (let page = numLinkStartIndex; page < numLinkEndIndex; page++) {
    const pageNum = page + 1;
    const pageLink = createElementWithAttributes('a', { 
      href: '#',
      class: `pagination-link${currentPage === pageNum ? ' active' : ''}`,
      'data-page': pageNum,
    });
    pageLink.textContent = pageNum;
    paginationLinksContainer.appendChild(pageLink);

    onPaginationLinkClick(pageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, pageNum);
  }

  // previous page link
  const previousPageNum = currentPage === (numLinkStartIndex + 1) ? currentPage : currentPage - 1;
  const previousPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === (numLinkStartIndex + 1) ? ' disabled' : ''}`,
    'data-page': previousPageNum,
  });
  previousPageLink.innerHTML = '&laquo;';
  paginationLinksContainer.prepend(previousPageLink);
  onPaginationLinkClick(previousPageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, previousPageNum);

  // next page link
  const nextPageNum = currentPage === numberOfPages ? currentPage : currentPage + 1;
  const nextPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === numberOfPages ? ' disabled' : ''}`,
    'data-page': nextPageNum,
  });
  nextPageLink.innerHTML = '&raquo;';
  paginationLinksContainer.appendChild(nextPageLink);
  onPaginationLinkClick(nextPageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, nextPageNum);

  // handle the pagination 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = itemsArr.slice(start, end);

  // render the paginated items into its container
  const paginatedItemsContainer = createElementWithAttributes('div', { class: 'pagination-items' });
  Array.from(paginatedItems).forEach(item => {
    paginatedItemsContainer.append(item);
  });

  // append the pagination links container
  const itemsContainer = document.getElementById(itemsContainerId);
  itemsContainer.innerHTML = "";
  itemsContainer.append(paginatedItemsContainer, paginationLinksContainer);
}

function onPaginationLinkClick(linkElement, itemsContainerId, itemsArr, perPage, maxNumLinks, page) {
  linkElement.onclick = event => {
    if (!page) {
      page = +event.target.dataset.page;
    }
    return paginate(itemsContainerId, itemsArr, perPage, maxNumLinks, page);
  }
}