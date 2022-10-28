/**
 * GitHub: https://github.com/Raihann22
 * GitHub Repository: https://github.com/Raihann22/HanBlox
 * LICENSE: https://choosealicense.com/licenses/mit
 * 
 * © 2022 Raihan
 */

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!tab.url || !tab.url.includes("roblox.com") || !changeInfo.status || changeInfo.status === "loading") return
    const splitUrl = tab.url.split("/");

    if (splitUrl[3] === "games") {
        chrome.storage.local.get("currentMainButton", function(result) {
            chrome.tabs.sendMessage(tabId, {
                placeId: splitUrl[4],
                currentMainButton: result.currentMainButton
            })
        })
    }
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.type === "getUserData") {
        getUserData(msg.userId, msg.serverId).then(response)
    }

    return true
})



async function getUserData(theUserId, serverId) {
    let theServerId = serverId;

    await fetch('https://presence.roblox.com/v1/presence/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: `{ "userIds": [${theUserId}] }`
    }).then(x => x.json()).then(receive => {

        const data = receive.userPresences[0];
        if (data.gameId !== theServerId && data.gameId !== null) {
            theServerId = data.gameId;

            chrome.storage.local.get("recentServers", async function (result) {
                result = result.recentServers;
                let theStatus = 0;
                let allRecentServers = [];

                for (let i = 0; i < result?.length; i++) {
                    if (result[i][theUserId]) {
                        theStatus = 2

                        await Promise.all(result[i][theUserId].map(d => {
                            if (d[data.placeId]) {
                                d[data.placeId] = data.gameId
                                theStatus = 3
                                x = result.length

                                chrome.storage.local.set({
                                    "recentServers": result
                                });
                            }
                        }))
                        result[i][theUserId].push({
                            [data.placeId]: data.gameId
                        })
                        allRecentServers.push(result[i])

                    } else {
                        if (theStatus === 0) theStatus = 1
                        allRecentServers.push(result[i])
                    }
                }

                if (theStatus === 0) {
                    chrome.storage.local.set({
                        "recentServers": [
                            {
                                [theUserId]: [
                                    {
                                        [data.placeId]: data.gameId
                                    }
                                ]
                            }
                        ]
                    });
                } else if (theStatus === 1) {
                    allRecentServers.push({
                        [theUserId]: [
                            {
                                [data.placeId]: data.gameId
                            }
                        ]
                    })
                    chrome.storage.local.set({
                        "recentServers": allRecentServers
                    });
                } else if (theStatus === 2) {
                    chrome.storage.local.set({
                        "recentServers": allRecentServers
                    });
                }
            })
        }
    })

    return {done: true, serverId: theServerId}
}