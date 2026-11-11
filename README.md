# Sinila store (static site)

Pages: home.html, product.html, order.html, policies.html, track.html.
Content lives in src/config.js. Edit that file to change products, prices, reviews, videos and contact details.

## Build
    python3 build.py

Outputs:
- dist/ — production files (index.html, product.html, order.html, policies.html, track.html, config.js)
- preview/ — single-file versions for quick viewing

## Before launch
- Set demoMode to false in src/config.js. This hides demo reviews, videos, numbers and posts.
- Replace demo photos, videos, reviews and the pour-vs-spray numbers with real ones.
- Add real business details, social links, the YouTube video ID and the Google Maps link.
- Connect the Google Apps Script URL (scriptUrl) for orders, return requests and tracking.
- Have a lawyer or adviser check the policy wording.

## Not yet connected
Order, return and tracking forms show demo results until the Google Sheet backend is connected.
