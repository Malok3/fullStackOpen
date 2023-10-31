```mermaid

sequenceDiagram

    title Part 0.6 New note in Single page aoo diagram
    participant browser
    participant server

    Note right of browser: At this step, the page has alreadey been rendered in the browser 

    Note right of browser: User adds text to input then submits form
    Note right of browser: The browser executes function that adds the new note at the bottom of the list then render the list
    Note right of browser: The function adds this new notes to the JSON file then send it to server

    browser->>server: POST user input (new_note_spa)
    activate server