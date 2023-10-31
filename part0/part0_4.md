

sequenceDiagram

    title Part0.4 New note diagram
    participant browser
    participant server

    Note right of browser: At this step, the page has alreadey been rendered in the browser 

    Note right of browser: User adds text to input then submits form

    browser->>server: POST user input (new_notes)
    activate server
    

    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser executes the Javascript code that fetches the JSON from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON File
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes