```mermaid

sequenceDiagram

    title part0.5 Single page app diagram
    participant browser
    participant server

    browser->>server: GET 	https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET ../exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server


    browser->>server: GET ../exampleapp/spa.js
    activate server
    server-->>browser: the JS file
    deactivate server


    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server (spa.js:line31)

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: the JSON file
    deactivate server

    Note right of browser: The browser executes the callback function that renders the list of notes from JSON file

    