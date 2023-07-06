const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


// Sample data (replace with your actual data source or database)
const feedData = [
    { id: 1, text: 'Feed Item 1' },
    { id: 2, text: 'Feed Item 2' },
    { id: 3, text: 'Feed Item 3' },
    // ...
    // Add more feed items
];


function generateRandomFeedItem(id) {
    const texts = ['Feed Item 1', 'Feed Item 2', 'Feed Item 3', 'Feed Item 4', 'Feed Item 5'];
    const randomText = texts[Math.floor(Math.random() * texts.length)] + Math.random();

    return { id, text: randomText };
}

for (let i = 4; i <= 900; i++) {
    const newFeedItem = generateRandomFeedItem(i);
    feedData.push(newFeedItem);
}

console.log(feedData)

// API endpoint for fetching feed items
app.get('/api/feed', (req, res) => {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const feedItems = feedData.slice(startIndex, endIndex);

    res.json(feedItems);
});

// Start the server
app.listen(3030, () => {
    console.log('Server is running on port 3030');
});
