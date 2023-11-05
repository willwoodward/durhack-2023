const summaryButton = document.getElementById('summarise');
const summariseAgainButton = document.getElementById('summarise_again');
const afterClick = document.getElementById("after_click");

summariseAgainButton.addEventListener('click', async function () {
    summaryButton.classList.remove("clicked");
    afterClick.classList.remove("clicked")
});

summaryButton.addEventListener('click', async function () {
    summaryButton.classList.add("clicked");
    afterClick.classList.add("clicked");


    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url);

    // Remove all knowledgebases
    const docs = await fetch("https://api.voiceflow.com/v3alpha/knowledge-base/docs", {
        method: "GET",
        headers: {
            "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
            "Content-Type": "application/json",
        }
    })
    const docsData = await docs.json().then(data => data.data);
    const docIDs = docsData.map(doc => doc.documentID);
    console.log(docIDs);

    for (let i = 0; i < docIDs.length; i++) {
        await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/${docIDs[i]}`, {
            method: "DELETE",
            headers: {
                "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
                "Content-Type": "application/json",
            }
        });
    }

    // Upload website url to Voiceflow
    await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload`, {
        method: "POST",
        headers: {
            "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "data": {
                    "type": "url",
                    "url": tab.url,
                    "name": tab.url
                }
            }
        )
    });

    setTimeout(async () => {
        // Query Knowledge base
        let responseSize = document.getElementById("summary_length").value;
        if (responseSize === "short") {
            console.log('success');
            responseSize = 1;
        } else if (responseSize === "meduim") {
            responseSize = 2;
        } else {
            responseSize = 3;
        }

        const query = await fetch(`https://general-runtime.voiceflow.com/knowledge-base/query`, {
            method: "POST",
            headers: {
                "Authorization": "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "question": `Summarise the text in ${responseSize} short sentences.`,
                    "chunkLimit": 2
                }
            )
        });
        const queryData = await query.json();
        document.getElementById("output").innerHTML = JSON.stringify(queryData.output);
    }, 3000)
})

const submit = document.getElementById('submit');
const input = document.getElementById('text_input');

submit.addEventListener('click', async () => {
    const question = input.value;
    input.value = "";
    const query = await fetch(`https://general-runtime.voiceflow.com/knowledge-base/query`, {
        method: "POST",
        headers: {
            "Authorization": "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "question": question,
                "chunkLimit": 2
            }
        )
    });
    const queryData = await query.json();
    document.getElementById("output").innerHTML = JSON.stringify(queryData.output);
})
