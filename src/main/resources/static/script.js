document.addEventListener("DOMContentLoaded", function () {
    // Get references to the DOM elements
    const submitForm = document.getElementById("submitForm");
    const fetchEntriesBtn = document.getElementById("fetchEntriesBtn");
    const fetchEntryByIdBtn = document.getElementById("fetchEntryByIdBtn");
    const deleteEntryBtn = document.getElementById("deleteEntryBtn");
    const entriesList = document.getElementById("entriesList");
    const singleEntry = document.getElementById("singleEntry");

    // Function to display messages in the body
    function displayMessage(message) {
        const messageBox = document.createElement("div");
        messageBox.innerText = message;
        document.body.appendChild(messageBox);
        setTimeout(() => messageBox.remove(), 3000); // Remove message after 3 seconds
    }

    // Handle form submission to submit finance entry
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        fetch(`/submit?amount=${amount}&description=${description}&category=${category}&date=${date}`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                displayMessage("Finance entry submitted successfully!");
                submitForm.reset(); // Reset the form after submission
            })
            .catch(error => {
                console.error("Error submitting entry:", error);
                displayMessage("Error submitting entry.");
            });
    });

    // Fetch all finance entries
    fetchEntriesBtn.addEventListener("click", function () {
        fetch("/all")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    entriesList.innerHTML = "<h3>All Entries</h3>";
                    data.forEach(entry => {
                        const entryDiv = document.createElement("div");
                        entryDiv.innerHTML = `
                        <p>ID: ${entry.id} | Amount: ${entry.amount} | Description: ${entry.description} | Category: ${entry.category} | Date: ${entry.date}</p>
                    `;
                        entriesList.appendChild(entryDiv);
                    });
                    displayMessage("Fetched all entries successfully!");
                } else {
                    entriesList.innerHTML = "<p>No entries found.</p>";
                    displayMessage("No entries found.");
                }
            })
            .catch(error => {
                console.error("Error fetching entries:", error);
                displayMessage("Error fetching entries.");
            });
    });

    // Fetch a specific finance entry by ID
    fetchEntryByIdBtn.addEventListener("click", function () {
        const entryId = document.getElementById("entryId").value;

        fetch(`/entry?id=${entryId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    singleEntry.innerHTML = `
                    <h3>Entry Details</h3>
                    <p>ID: ${data.id} | Amount: ${data.amount} | Description: ${data.description} | Category: ${data.category} | Date: ${data.date}</p>
                `;
                    displayMessage("Entry fetched successfully!");
                } else {
                    singleEntry.innerHTML = "<p>No entry found for the given ID.</p>";
                    displayMessage("No entry found for the given ID.");
                }
            })
            .catch(error => {
                console.error("Error fetching entry by ID:", error);
                displayMessage("Error fetching entry by ID.");
            });
    });

    // Delete a finance entry by ID
    deleteEntryBtn.addEventListener("click", function () {
        const entryIdToDelete = document.getElementById("entryIdToDelete").value;

        fetch(`/delete?id=${entryIdToDelete}`, {
            method: "DELETE",
        })
            .then(response => response.text())
            .then(message => {
                displayMessage(message);
            })
            .catch(error => {
                console.error("Error deleting entry:", error);
                displayMessage("Error deleting entry.");
            });
    });
});
