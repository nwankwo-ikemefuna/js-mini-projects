function paginate(paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks = 3, currentPage = 1) {
  const numberOfItems = itemsArr.length;
  const numberOfPages = Math.ceil(numberOfItems / perPage);
  if (numberOfItems < 2) {
    return;
  }

  const paginationContainer = document.getElementById(paginationLinksContainerId);
  // add pagination class to the container
  paginationContainer.classList.add('pagination');

  // empty the container so we can display new links 
  paginationContainer.innerHTML = "";

  const numLinkStartIndex = currentPage > maxNumLinks ? currentPage - maxNumLinks : 0;
  const numLinkEndIndex = numLinkStartIndex + maxNumLinks;

  // previous page link
  const previousPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === (numLinkStartIndex + 1) ? ' disabled' : ''}`,
    'data-page': currentPage === (numLinkStartIndex + 1) ? currentPage : currentPage - 1,
  });
  previousPageLink.innerHTML = '&laquo;';
  paginationContainer.appendChild(previousPageLink);

  for (let page = numLinkStartIndex; page < numLinkEndIndex; page++) {
    const pageNum = page + 1;
    const pageLink = createElementWithAttributes('a', { 
      href: '#',
      class: `pagination-link${currentPage === pageNum ? ' active' : ''}`,
      'data-page': pageNum,
    });
    pageLink.textContent = pageNum;
    paginationContainer.appendChild(pageLink);

    onPaginationLinkClick(pageLink, paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks, pageNum);
  }

  // next page link
  const nextPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === numberOfPages ? ' disabled' : ''}`,
    'data-page': currentPage === numberOfPages ? currentPage : currentPage + 1,
  });
  nextPageLink.innerHTML = '&raquo;';
  paginationContainer.appendChild(nextPageLink);

  onPaginationLinkClick(previousPageLink, paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks);
  onPaginationLinkClick(nextPageLink, paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks);

  // handle the pagination 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = itemsArr.slice(start, end);

  // render the paginated items into its container
  const paginatedItemsContainer = document.getElementById(paginatedItemsContainerId);
  paginatedItemsContainer.innerHTML = "";
  Array.from(paginatedItems).forEach(item => {
    paginatedItemsContainer.append(item);
  });
}

function onPaginationLinkClick(linkElement, paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks, page = null) {
  linkElement.onclick = event => {
    if (!page) {
      page = event.target.dataset.page;
    }
    return paginate(paginationLinksContainerId, paginatedItemsContainerId, itemsArr, perPage, maxNumLinks, +page);
  }
}