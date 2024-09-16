```mermaid

  sequenceDiagram
  participant browser
  participant server

  note over browser, server: When user clicks the save button then total 5 requests are created by browser to server

  browser->>server: Submits the user input to server via http POST request
  activate server
  server-->>browser: Redirects the URL to GET https://studies.cs.helsinki.fi/exampleapp/notes
  deactivate server

  browser->>server: sends request to GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: renders HTML documnet
  deactivate server

  browser->>server: requests main.css
  activate server
  server-->>browser: sends main.css
  deactivate server

  browser->>server: requests main.js
  activate server
  server-->>browser: sends main.js
  deactivate server

  note over browser, server: main.js execution starts that fetches json

  browser->>server: requests to fetch data.json
  activate server
  server-->>browser: renders the notes on the HTML document with the new note(user input) added.
  deactivate server
