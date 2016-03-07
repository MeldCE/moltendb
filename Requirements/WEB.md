
## Flow
1. User requests page
1. Server receives request
1. Server check if request is a no Javascript request
  - If it isn't a no javascript request
    1 .Server checks if client already has current single html, if so,
      sends not modified
    1. Server checks if have cached single html
      - If no cached single html
        1. Server generates html including
          - including standard and custom javascript
          - including standard and custom css

Clear cache if something changes that means the html needs to be rebuit
