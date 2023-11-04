const summaryButton = document.getElementById('summarise');

summaryButton.addEventListener('click', async function() {
    this.classList.add("clicked");
        
    // let queryOptions = { active: true, lastFocusedWindow: true };
    // // `tab` will either be a `tabs.Tab` instance or `undefined`.
    // let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab.url);

    // // Remove all knowledgebases
    // const docs = await fetch("https://api.voiceflow.com/v3alpha/knowledge-base/docs", {
    //     method: "GET",
    //     headers: {
    //         "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
    //         "Content-Type": "application/json",
    //     }
    // })
    // const docsData = await docs.json().then(data => data.data);
    // const docIDs = docsData.map(doc => doc.documentID);
    // console.log(docIDs);

    // for (let i = 0; i < docIDs.length; i++) {
    //     await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/${docIDs[i]}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
    //             "Content-Type": "application/json",
    //         }
    //     });
    // }

    // // Upload website url to Voiceflow
    // await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload`, {
    //     method: "POST",
    //     headers: {
    //         "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(
    //         {
    //             "data": {
    //                 "type": "url",
    //                 "url": tab.url,
    //                 "name": tab.url
    //             }
    //         }
    //     )
    // });

    // Query Knowledge base
    return
    const query = await fetch(`https://general-runtime.voiceflow.com/knowledge-base/query`, {
        method: "POST",
        headers: {
            "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "question": "Summarise the text.",
                "chunkLimit": 2
            }
        )
    });
    const queryData = await query.json();
    document.getElementById("output").innerHTML = JSON.stringify(queryData.output);
})

const submit = document.getElementById('submit');
const input = document.getElementById('text_input');

submit.addEventListener('click', async () => {
    const question = input.value;
    input.value = "";
    const query = await fetch(`https://general-runtime.voiceflow.com/knowledge-base/query`, {
        method: "POST",
        headers: {
            "Authorization" : "VF.DM.65466ed244035a0007581665.6rYrKeWuVw9jOp3a",
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





// if (path.length > 10) {
// 	if (path.slice(1,8) == 'chatbot') {
// 		p_id = path.slice(9);

// 		window.addEventListener("message", async function(event) {
//             // Deactivate all active knowledgebases
//             const activeKBs = await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs?Pagination=includeTags=%5B%22active%22%5D`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization" : "VF.DM.653819a58c3eff000770194e.SIbscm4pddAc1ND4",
//                     "Content-Type": "application/json",
//                 },
//             })
//             const activeKBsData = await activeKBs.json().then(data => data.data);

//             for (let i = 0; i < activeKBsData.length; i++) {
//                 const activeKB = activeKBsData[i];
//                 const activeKBID = activeKB.documentID;

//                 await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/${activeKBID}/tags/detach`, {
//                     method: "POST",
//                     headers: {
//                         "Authorization" : "VF.DM.653819a58c3eff000770194e.SIbscm4pddAc1ND4",
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(
//                         {
//                             "data": {
//                                 "tags": ["active"]
//                             }
//                         })
//                 });
//             }

//             // Find current knowledgebase
//             const current = await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs?Pagination=includeTags=%5B%22${p_id}%22%5D`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization" : "VF.DM.653819a58c3eff000770194e.SIbscm4pddAc1ND4",
//                     "Content-Type": "application/json",
//                 },
//             })
//             const currentDocument = await current.json().then(data => data.data[0].documentID);

// 			// Submit post request to activate current knowledgebase
//   			await fetch(`https://api.voiceflow.com/v3alpha/knowledge-base/docs/${currentDocument}/tags/attach`, {
//     				method: "POST",
//     				headers: {
// 					    "Authorization" : "VF.DM.653819a58c3eff000770194e.SIbscm4pddAc1ND4",
//       					"Content-Type": "application/json",
//     				},
//     				body: JSON.stringify(
// 					{
// 						"data": {
// 							"tags": ["active"]
// 						}
// 					})
//   				});
// 		});
// 	}
// }

// const path = window.location.pathname;

// if (path.length > 10) {
// 	if (path.slice(1,8) == 'chatbot') {
// 		p_id = path.slice(9);

//   		(function(d, t) {
//       			var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
//       			v.onload = function() {
//         			window.voiceflow.chat.load({
//           				verify: { projectID: '653819a58c3eff0007701942' },
//           				url: 'https://general-runtime.voiceflow.com',
//           				versionID: 'production'
//         			}).then(() => {
//                 			setTimeout(function() {
//                   				window.voiceflow.chat.open();
//                 			}, 1000);
//               			});
//       			}
//       			v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
//   		})(document, 'script');
// 	}
// }