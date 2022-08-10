const paginate = (itemsContainerId, itemsArr, perPage, maxNumLinks = 3, currentPage = 1) => {
  
  const itemsContainer = document.getElementById(itemsContainerId);
  itemsContainer.innerHTML = "";
  
  const numberOfItems = itemsArr.length;
  const numberOfPages = Math.ceil(numberOfItems / perPage);

  if (numberOfItems <= perPage || numberOfItems <= maxNumLinks) {
    renderPaginatedItems(itemsContainer, itemsArr);
    return;
  }

  // create the pagination links container and empty it so we can display updated links 
  const paginationLinksContainer = createElementWithAttributes('div', { class: 'pagination-links' });
  paginationLinksContainer.innerHTML = "";

  let numLinkStart = currentPage === 1 ? 1 : currentPage - 1;
  if (currentPage >= numberOfPages && numberOfPages >= maxNumLinks) {
    numLinkStart -= 1;
  }

  let numLinkEnd = numLinkStart + maxNumLinks - 1;
  if (currentPage <= numberOfPages && numberOfPages <= maxNumLinks) {
    numLinkEnd = numberOfPages;
  }

  console.log('numberOfPages', numberOfPages);
  console.log('currentPage', currentPage);
  console.log('numLinkStart', numLinkStart);
  console.log('numLinkEnd', numLinkEnd);

  for (let pageNum = numLinkStart; pageNum <= numLinkEnd; pageNum++) {
    /*if (pageNum > maxNumLinks) {
      break;
    }*/
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
  const previousPageNum = currentPage === numLinkStart ? currentPage : currentPage - 1;
  const previousPageLink = createElementWithAttributes('a', { 
    href: '#',
    class: `pagination-link${currentPage === numLinkStart ? ' disabled' : ''}`,
    'data-page': previousPageNum,
    title: 'Previous'
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
    title: 'Next'
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
  renderPaginatedItems(paginatedItemsContainer, paginatedItems);

  // append the pagination links container to the items container
  itemsContainer.append(paginatedItemsContainer, paginationLinksContainer);
}

const onPaginationLinkClick = (linkElement, itemsContainerId, itemsArr, perPage, maxNumLinks, page) => {
  linkElement.onclick = event => {
    if (!page) {
      page = +event.target.dataset.page;
    }
    const numberOfPages = Math.ceil(itemsArr.length / perPage);
    if (page < 1 || page > numberOfPages) {
      // not likely but just in case
      return;
    }
    return paginate(itemsContainerId, itemsArr, perPage, maxNumLinks, page);
  }
}

const renderPaginatedItems = (itemsContainer, itemsArr) => {
  Array.from(itemsArr).forEach(item => {
    itemsContainer.append(item);
  });
}