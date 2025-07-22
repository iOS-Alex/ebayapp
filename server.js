const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = 4000; // Backend runs on 4000, frontend on 3000

// Replace with your actual eBay OAuth token
const EBAY_OAUTH_TOKEN = 'v^1.1#i^1#f^0#r^0#p^3#I^3#t^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';

app.use(cors());

// Proxy endpoint for eBay search
app.get('/api/ebay-search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing search query' });

  const endpoint = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&limit=10`;

  try {
    const ebayRes = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${EBAY_OAUTH_TOKEN}`,
        'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=US',
        'Content-Type': 'application/json',
      },
    });
    const data = await ebayRes.json();
    res.status(ebayRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from eBay', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
}); 