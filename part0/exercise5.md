```mermaid

  sequenceDiagram

  participant browser
  participant server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server-->>browser: sends HTML document
  deactivate server

  note over browser, server: while rendering the spa.html browser encounters css and js file links

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: sends main.css
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server-->>browser: sends spa.js
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: sends data.json
  deactivate server

  note over browser, server: The browser renders notes from data.json on the HTML page
