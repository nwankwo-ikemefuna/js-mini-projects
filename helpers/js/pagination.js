const paginate = (itemsContainerId, itemsArr, perPage, maxNumLinks = 3, currentPage = 1, onPaginateCallback = null) => {
  
  const itemsContainer = document.getElementById(itemsContainerId);
  itemsContainer.innerHTML = "";
  
  const numberOfItems = itemsArr.length;
  const numberOfPages = Math.ceil(numberOfItems / perPage);

  if (numberOfItems <= perPage) {
    renderPaginatedItems(itemsContainer, itemsArr);
    // execute callback function 
    handleOnPaginationCallback(onPaginateCallback);
    return;
  }

  // create the pagination links container and empty it so we can display updated links 
  const paginationLinksContainerId = `${itemsContainerId}-pagination-links`;
  const paginationLinksContainer = document.getElementById(paginationLinksContainerId);
  if (!paginationLinksContainer) {
    alert(`Pagination config error: no element with id ${paginationLinksContainerId} was found`);
  }
  paginationLinksContainer.setAttribute('class', 'pagination-links');
  paginationLinksContainer.innerHTML = "";

  let numLinkStart = currentPage === 1 ? 1 : currentPage - 1;
  if (currentPage >= numberOfPages && numberOfPages >= maxNumLinks) {
    numLinkStart -= 1;
  }

  let numLinkEnd = numLinkStart + maxNumLinks - 1;
  if (currentPage <= numberOfPages && numberOfPages <= maxNumLinks) {
    numLinkEnd = numberOfPages;
  }

  for (let pageNum = numLinkStart; pageNum <= numLinkEnd; pageNum++) {
    const pageLink = createElementWithAttributes('a', { 
      href: '#',
      class: `pagination-link${currentPage === pageNum ? ' active' : ''}`,
      'data-page': pageNum,
    });
    pageLink.textContent = pageNum;
    paginationLinksContainer.appendChild(pageLink);

    onPaginationLinkClick(pageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, pageNum, onPaginateCallback);
  }

  // previous page link
  const previousPageNum = currentPage === numLinkStart ? currentPage : currentPage - 1;
  const previousPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === numLinkStart ? ' disabled' : ''}`,
    'data-page': previousPageNum,
    title: 'Previous'
  });
  previousPageLink.innerHTML = '&laquo;';
  paginationLinksContainer.prepend(previousPageLink);
  onPaginationLinkClick(previousPageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, previousPageNum, onPaginateCallback);

  // next page link
  const nextPageNum = currentPage === numberOfPages ? currentPage : currentPage + 1;
  const nextPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === numberOfPages ? ' disabled' : ''}`,
    'data-page': nextPageNum,
    title: 'Next'
  });
  nextPageLink.innerHTML = '&raquo;';
  paginationLinksContainer.appendChild(nextPageLink);
  onPaginationLinkClick(nextPageLink, itemsContainerId, itemsArr, perPage, maxNumLinks, nextPageNum, onPaginateCallback);

  // handle the pagination 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = itemsArr.slice(start, end);

  // render the paginated items into its container
  renderPaginatedItems(itemsContainer, paginatedItems);

  // execute callback function 
  handleOnPaginationCallback(onPaginateCallback);
}

const onPaginationLinkClick = (linkElement, itemsContainerId, itemsArr, perPage, maxNumLinks, page, onPaginateCallback) => {
  linkElement.onclick = event => {
    if (!page) {
      page = +event.target.dataset.page;
    }
    const numberOfPages = Math.ceil(itemsArr.length / perPage);
    if (page < 1 || page > numberOfPages) {
      // not likely but just in case
      return;
    }
    return paginate(itemsContainerId, itemsArr, perPage, maxNumLinks, page, onPaginateCallback);
  }
}

function handleOnPaginationCallback(onPaginateCallback) {
  // execute callback function 
  if (onPaginateCallback && typeof onPaginateCallback === 'function') {
    onPaginateCallback();
  }
}

const renderPaginatedItems = (containerElem, itemsArr) => {
  Array.from(itemsArr).forEach(item => {
    containerElem.append(item);
  });
}