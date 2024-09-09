window.onload = function() {
    document.getElementById("subredditname").value = "";
};

document.addEventListener("DOMContentLoaded", function() {
    function getSelectedValue() {
        const selectElement = document.getElementById("options");
        return selectElement ? selectElement.value : "";
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        document.getElementById("Joke-Header").textContent = "Loading...";
        document.getElementById("Joke-Description").textContent = "";
        document.getElementById("URL").textContent = "";
        document.getElementById("Date").textContent = "";
        document.getElementById("copytextbutton").disabled = true;
        
        const subreddit = document.getElementById("subredditname").value.trim();
        const selectedValue = getSelectedValue();
        const apiUrl = `https://redditapi-sitt.onrender.com/${subreddit}?type=${selectedValue}`;
        console.log("Results are being fetched....")

        fetch(apiUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log("Results fetched.")
                document.getElementById("Joke-Header").textContent = data.title || "Content not loading, please resubmit again";
                document.getElementById("Joke-Description").textContent = data.description || "";
                document.getElementById("URL").textContent = data.url ? `PostURL : ${data.url}` : "";
                document.getElementById("Date").textContent = data.date ? `Date: ${data.date}` : "";
                document.getElementById("copytextbutton").disabled = false;
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                copytextbutton.disabled = true;
            });
    }

    const form = document.getElementById("redditapifetcher");
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error("Error: Form element not found.");
    }
});

function copytext() {
    const jokeHeader = document.getElementById("Joke-Header").textContent;
    const jokeDescription = document.getElementById("Joke-Description").textContent;
    const url = document.getElementById("URL").textContent;

    const combinedText = `${jokeHeader}\n\n${jokeDescription}\n\nPost Link - ${url}\n\nDone using https://sairaj.tabcat.live/redditapi.html`;

    navigator.clipboard.writeText(combinedText)
    .then(() => {
        alert("Copied the text: \n\n" + combinedText + "\n\n") ;
    })
    .catch(err => {
        console.error("Error copying text: ", err);
    });
}
