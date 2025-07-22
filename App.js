// App.js
import React, { useState } from 'react';
// If using Create React App or Vite, ensure Tailwind CSS is set up in your project.
// For barcode scanning, install: npm install react-qr-barcode-scanner
// For eBay API, insert your credentials where indicated below.

// Placeholder for barcode scanner import
// import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const EBAY_APP_ID = 'AlexForr-ProductA-SBX-a0ba6230d-779849f5'; // <-- Insert your eBay App ID here

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState({});

  // Helper: Fetch eBay search results
  const fetchEbayResults = async (searchTerm) => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      // eBay Browse API endpoint (public search)
      const endpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(searchTerm)}&limit=10`;
      // You need to use OAuth for production; for demo, this is a placeholder
      const res = await fetch(endpoint, {
        headers: {
          'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=US',
          'Authorization': `Bearer v^1.1#i^1#f^0#r^0#p^3#I^3#t^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` // <-- Replace with your OAuth token
        }
      });
      if (!res.ok) throw new Error('eBay API error');
      const data = await res.json();
      setResults(data.itemSummaries || []);
    } catch (err) {
      setError('Failed to fetch eBay data.');
    }
    setLoading(false);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchEbayResults(query.trim());
    }
  };

  // Handle barcode scan (simulate for now)
  const handleBarcodeScan = (code) => {
    setBarcode(code);
    setQuery(code);
    fetchEbayResults(code);
    setScanning(false);
  };

  // Calculate profit and confidence score
  const getProfit = (item, price) => {
    if (!item.price || !price) return null;
    const avgPrice = parseFloat(item.price.value);
    const ebayFee = avgPrice * 0.13 + 0.3; // eBay fee estimate: 13% + $0.30
    const profit = avgPrice - price - ebayFee;
    return profit;
  };
  const getConfidence = (item, profit) => {
    // Simple confidence: more sales + higher profit = higher score
    const sales = item.seller ? (item.seller.feedbackScore || 0) : 0;
    if (profit == null) return 0;
    let score = 0;
    if (profit > 10) score += 40;
    else if (profit > 5) score += 30;
    else if (profit > 0) score += 20;
    if (sales > 1000) score += 40;
    else if (sales > 100) score += 30;
    else if (sales > 10) score += 20;
    return Math.min(100, score);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <h1 className="text-2xl font-bold mb-2 text-center">eBay Store Product Analyzer</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2"
            type="text"
            placeholder="Search product or scan barcode..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>
        <button
          className="w-full mb-4 bg-green-600 text-white py-2 rounded"
          onClick={() => setScanning(!scanning)}
        >
          {scanning ? 'Stop Scanning' : 'Scan Barcode'}
        </button>
        {/* Barcode Scanner Placeholder */}
        {scanning && (
          <div className="mb-4">
            {/* Uncomment and use BarcodeScannerComponent for real scanning */}
            {/*
            <BarcodeScannerComponent
              width={300}
              height={200}
              onUpdate={(err, result) => {
                if (result) handleBarcodeScan(result.text);
              }}
            />
            */}
            <div className="text-center text-gray-500">[Barcode scanner would appear here]</div>
            <button className="mt-2 text-blue-600 underline" onClick={() => handleBarcodeScan('0123456789012')}>Simulate Scan (0123456789012)</button>
          </div>
        )}
        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        <div className="space-y-4">
          {results.map(item => (
            <div key={item.itemId} className="border rounded p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                {item.image && <img src={item.image.imageUrl} alt="" className="w-16 h-16 object-contain rounded" />}
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.price ? `$${item.price.value} ${item.price.currency}` : 'No price'}</div>
                  <div className="text-xs text-gray-500">{item.condition}</div>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter your purchase price"
                  value={purchasePrice[item.itemId] || ''}
                  onChange={e => setPurchasePrice({ ...purchasePrice, [item.itemId]: e.target.value })}
                />
                {purchasePrice[item.itemId] && (
                  <>
                    <div className="text-sm">Profit: <span className={getProfit(item, parseFloat(purchasePrice[item.itemId])) > 0 ? 'text-green-600' : 'text-red-600'}>
                      ${getProfit(item, parseFloat(purchasePrice[item.itemId]))?.toFixed(2) || '0.00'}</span></div>
                    <div className="text-sm">Confidence Score: <span className="font-bold">{getConfidence(item, getProfit(item, parseFloat(purchasePrice[item.itemId])))}/100</span></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-gray-400 text-center">
          <div>Powered by eBay API. For demo use only. Insert your API credentials in App.js.</div>
          <div>Tailwind CSS required. See <a className="underline" href="https://tailwindcss.com/docs/guides/create-react-app" target="_blank" rel="noopener noreferrer">setup guide</a>.</div>
        </div>
      </div>
    </div>
  );
}

export default App; 
