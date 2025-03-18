document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("submitForm");
    const fetchEntriesBtn = document.getElementById("fetchEntriesBtn");
    const fetchEntryByIdBtn = document.getElementById("fetchEntryByIdBtn");
    const deleteEntryBtn = document.getElementById("deleteEntryBtn");
    const entriesList = document.getElementById("entriesList");
    const singleEntry = document.getElementById("singleEntry");

    // Submit finance entry
    submitForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        try {
            const response = await fetch("http://localhost:8080/submit", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    amount: amount,
                    description: description,
                    category: category,
                    date: date
                })
            });
            if (!response.ok) throw new Error("Failed to submit entry");
            alert("Entry submitted successfully!");
            submitForm.reset();
        } catch (error) {
            console.error("Error submitting entry:", error);
            alert("Failed to submit entry");
        }
    });

    // Fetch all finance entries
    fetchEntriesBtn.addEventListener("click", async function () {
        try {
            const response = await fetch("http://localhost:8080/all");
            if (!response.ok) throw new Error("Failed to fetch entries");
            const data = await response.json();

            if (data.length === 0) {
                entriesList.innerHTML = "<p>No entries found.</p>";
                return;
            }

            let tableHtml = `<table border='1'>
                        <tr><th>ID</th><th>Amount</th><th>Description</th><th>Category</th><th>Date</th></tr>`;
            data.forEach(entry => {
                tableHtml += `<tr>
                        <td>${entry.id}</td>
                        <td>${entry.amount}</td>
                        <td>${entry.description}</td>
                        <td>${entry.category}</td>
                        <td>${entry.date}</td>
                    </tr>`;
            });
            tableHtml += "</table>";
            entriesList.innerHTML = tableHtml;
        } catch (error) {
            console.error("Error fetching entries:", error);
            alert("Error fetching entries!");
        }
    });

    // Fetch single entry by ID
    fetchEntryByIdBtn.addEventListener("click", async function () {
        const entryId = document.getElementById("entryId").value;
        if (!entryId) return alert("Please enter an entry ID");

        try {
            const response = await fetch(`http://localhost:8080/entry?id=${entryId}`);
            if (!response.ok) throw new Error("Failed to fetch entry");
            const entry = await response.json();
            singleEntry.innerHTML = `<p><strong>ID:</strong> ${entry.id}<br>
                                     <strong>Amount:</strong> ${entry.amount}<br>
                                     <strong>Description:</strong> ${entry.description}<br>
                                     <strong>Category:</strong> ${entry.category}<br>
                                     <strong>Date:</strong> ${entry.date}</p>`;
        } catch (error) {
            console.error("Error fetching entry:", error);
            alert("Failed to fetch entry");
        }
    });

    // Delete entry by ID
    deleteEntryBtn.addEventListener("click", async function () {
        const entryIdToDelete = document.getElementById("entryIdToDelete").value;
        if (!entryIdToDelete) return alert("Please enter an entry ID to delete");

        try {
            const response = await fetch(`http://localhost:8080/delete?id=${entryIdToDelete}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete entry");
            alert("Entry deleted successfully");
            document.getElementById("entryIdToDelete").value = "";
        } catch (error) {
            console.error("Error deleting entry:", error);
            alert("Failed to delete entry");
        }
    });
});