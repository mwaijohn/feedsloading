// Constants
const PAGE_SIZE = 150; // Number of items to load per request
let currentPage = 1; // Track the current page number

// Function to fetch data from the server
function fetchData(page) {
    return fetch(`http://localhost:3030/api/feed?page=${page}&limit=${PAGE_SIZE}`)
        .then(response => response.json())
        .then(data => data);
}

// Function to render the feed items
function renderFeedItems(items) {
    const feedContainer = document.getElementById('feed-container');

    items.forEach(item => {
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.textContent = item.text;

        feedContainer.appendChild(feedItem);
    });
}

// Function to handle scrolling and fetch more data
function handleScroll() {
    const feedContainer = document.getElementById('feed-container');

    if (feedContainer.scrollTop + feedContainer.clientHeight >= feedContainer.scrollHeight) {
        currentPage++; // Increment the page number
        fetchData(currentPage)
            .then(items => renderFeedItems(items));
    }
}

// Attach scroll event listener
window.addEventListener('scrollend', handleScroll);

// Initial data load
fetchData(currentPage)
    .then(items => renderFeedItems(items));
