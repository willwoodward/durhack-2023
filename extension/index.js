const summaryButton = document.getElementById('summarise');

summaryButton.addEventListener('click', () => {
    let path;

    chrome.tabs.getSelected(null,function(tab) {
        console.log(tab.url);
    });

    alert(path)
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