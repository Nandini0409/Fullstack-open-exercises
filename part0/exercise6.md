In the single page version of the example application when the page is loaded then HTML, CSS, Javascript file and data.json file has been already fetched from the server. When the user creates a new note and clicks on the save button then unlike creating 5 requests to the server in the previous version of app it only creates a POST request to https://studies.cs.helsinki.fi/exampleapp/new_note_spa.
The new_note_spa is a file with json type which contains the information about the new note created.
Rather then sending the user input to server and then reloading the page the browser adds the new note by the logic present in the main.js file through DOM.


```mermaid

	graph TD

	A[Form submitted]-->B[New note created]
	B-->C[Pushed to notes array]
	C-->D[New note sent to the sever via POST in json format]
