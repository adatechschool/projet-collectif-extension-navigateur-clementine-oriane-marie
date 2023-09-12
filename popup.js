document.getElementById('styleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const textColor = document.getElementById('textColor').value;

    chrome.scripting.executeScript({
        target: { tabId: "modify-page" },
        function: (color) => {
            document.body.style.color = color;
            console.log("salut")
        },
        args: [textColor]
    });
})
