const sleep = time => new Promise(x => setTimeout(x, time));

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
    if (!document.getElementById("HanBlox-Container")) {
        //++++++++++ Create HanBlox Container ++++++++++\\
        const theContainer = document.getElementsByClassName("game-buttons-container");

        //========== Create Space [Break Line] ==========\\
        const lineBreak = document.createElement("p");
        lineBreak.style = "margin-top: 5px;"

        //========== Create Div ==========\\
        const HanBlox_Container = document.createElement("div");
        HanBlox_Container.id = "HanBlox-Container"
        HanBlox_Container.style = "display: flex;"



        //++++++++++ Create Main Button Container ++++++++++\\
        const mainButtonContainer = document.createElement("div");
        mainButtonContainer.id = "HanBlox-Container-MainButton"
        mainButtonContainer.style = "display: flex;"

        //========== Create Up Down Buttons Container ==========\\
        const buttonUpDown = document.createElement("div");
        buttonUpDown.id = "HanBlox-Container-UpDownButton"
        buttonUpDown.style = "display: grid;"


        //========== Button Up ==========\\
        const buttonIup = document.createElement("i");
        buttonIup.style = "border: solid white;" +
            "border-width: 0 3px 3px 0;" +
            "display: inline-block;" +
            "padding: 3px;" +
            "margin-bottom: 0px;" +
            "transform: rotate(-135deg);" +
            "-webkit-transform: rotate(-135deg);"

        const buttonUp = document.createElement("button");
        buttonUp.id = "HanBlox-Button-Up"
        buttonUp.style = "margin: 0px 0px 0px 2px;" +
            "padding: 6px;" +
            "height: 30px;" +
            "border-top-left-radius: 8px;" +
            "border: none;" +
            "border-bottom: 1px solid #38383880;" +
            "border-right: 1px solid #38383880;" +
            "background-color: rgb(0, 176, 111);"
        buttonUp.append(buttonIup)
        upDownButtonListener(buttonUp)

        //========== Button Down ==========\\
        const buttonIdown = document.createElement("i");
        buttonIdown.style = "border: solid white;" +
            "border-width: 0 3px 3px 0;" +
            "display: inline-block;" +
            "padding: 3px;" +
            "margin-bottom: 4px;" +
            "transform: rotate(45deg);" +
            "-webkit-transform: rotate(45deg);"

        const buttonDown = document.createElement("button");
        buttonDown.id = "HanBlox-Button-Down"
        buttonDown.style = "margin: 0px 0px 0px 2px;" +
            "padding: 6px;" +
            "height: 30px;" +
            "border-bottom-left-radius: 8px;" +
            "border: none;" +
            "border-top: 1px solid #38383880;" +
            "border-right: 1px solid #38383880;" +
            "background-color: rgb(0, 176, 111);"
        buttonDown.append(buttonIdown)
        upDownButtonListener(buttonDown)

        //========== Main Button ==========\\
        const HanBlox_MainButton = document.createElement("button");
        HanBlox_MainButton.id = "HanBlox-Button-Main"
        HanBlox_MainButton.style = "width: 51px;" +
            "margin: 0px 2px 0px 0px; " +
            "padding: 9px;" +
            "border-top-right-radius: 8px;" +
            "border-bottom-right-radius: 8px;" +
            "border: none;" +
            "border-left: 1px solid #38383880;" +
            "background-color: #00b06f; "

        const MainButtonImg = document.createElement("span");
        let thecurrentMainButton = `images/${msg.currentMainButton}.svg`;
        if (msg.currentMainButton === undefined) thecurrentMainButton = "images/lowping-server.svg";
        MainButtonImg.id = `HanBlox-Span`
        MainButtonImg.style = `background-image: url(${chrome.runtime.getURL(thecurrentMainButton)});` +
            "background-size: 36px;" +
            "filter: invert(1);" +
            "width: 36px;" +
            "height: 36px;" +
            "display: inline-block;" +
            "position: relative;" +
            "top: 2px;" +
            "left: -2px"
        HanBlox_MainButton.append(MainButtonImg)
        buttonListener(HanBlox_MainButton, Number(msg.placeId))

        //========== Append Main Button ==========\\
        buttonUpDown.append(buttonUp, buttonDown)
        mainButtonContainer.append(buttonUpDown, HanBlox_MainButton);





        //++++++++++ Create Search User Button ++++++++++\\
        const searchUserContainer = document.createElement("div");
        searchUserContainer.id = "HanBlox-Container-SearchUser"
        searchUserContainer.style = "display: flex;"

        //========== Search User Button ==========\\
        const buttonSearchUser = document.createElement("button");
        buttonSearchUser.disabled = true
        buttonSearchUser.id = "HanBlox-Button-SearchUser"
        buttonSearchUser.style = "width: 55px;" +
            "margin: 0px 0px 0px 2px; " +
            "padding: 9px;" +
            "border-top-left-radius: 8px;" +
            "border-bottom-left-radius: 8px;" +
            "border: none;" +
            "background-color: #00b06f; " +
            "cursor: not-allowed;"

        const spanBtnImg2 = document.createElement("span");
        spanBtnImg2.id = `HanBlox-Span`
        spanBtnImg2.style = `background-image: url(${chrome.runtime.getURL("images/search-user.png")});` +
            "background-size: 36px;" +
            "width: 36px;" +
            "height: 36px;" +
            "display: inline-block;" 
        buttonSearchUser.append(spanBtnImg2)
        buttonListener(buttonSearchUser, Number(msg.placeId))

        //========== Search User Input ==========\\

        const inputSearchUser = document.createElement("input");
        inputSearchUser.placeholder = "Username / UserID"
        inputSearchUser.id = "HanBlox-Input-SearchUser"
        inputSearchUser.type = "text"
        inputSearchUser.autocomplete = "off"
        inputSearchUser.autocorrect = "off"
        inputSearchUser.autocapitalize = "off"
        inputSearchUser.spellcheck = "false"
        inputSearchUser.maxLength = 20
        inputSearchUser.style = "height: 60px; width: 162px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border: none; outline: none; font-size: 15.9px; color: white; background-color: rgb(13 125 84);"
        inputListener(inputSearchUser)

        searchUserContainer.append(buttonSearchUser, inputSearchUser)
        


        //++++++++++ Append ++++++++++\\
        HanBlox_Container.append(mainButtonContainer, searchUserContainer)

        theContainer[0].insertBefore(lineBreak, theContainer[0].children[1]);
        theContainer[0].insertBefore(HanBlox_Container, theContainer[0].children[2]);
        getUserData()
    }

    response();
});



function upDownButtonListener(upDownButton) {
    upDownButton.addEventListener("click", function () {
        const theButton = upDownButton.parentNode.parentNode.children[1].children[0];
        const buttonNameBefore = theButton.style.backgroundImage.slice(5, -6).split("/")[4];

        if (upDownButton.id === "HanBlox-Button-Up") {
            switch (buttonNameBefore) {
                case "lowping-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/random-server.svg")}")`
                    currentMainButton("random-server")
                    break;

                case "rejoin-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/lowping-server.svg")}")`
                    currentMainButton("lowping-server")
                    break;

                case "small-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/rejoin-server.svg")}")`
                    currentMainButton("rejoin-server")
                    break;

                case "large-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/small-server.svg")}")`
                    currentMainButton("small-server")
                    break;
            }
        } else if (upDownButton.id === "HanBlox-Button-Down") {
            switch (buttonNameBefore) {
                case "random-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/lowping-server.svg")}")`
                    currentMainButton("lowping-server")
                    break;

                case "lowping-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/rejoin-server.svg")}")`
                    currentMainButton("rejoin-server")
                    break;

                case "rejoin-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/small-server.svg")}")`
                    currentMainButton("small-server")
                    break;

                case "small-server":
                    theButton.style.backgroundImage = `url("${chrome.runtime.getURL("images/large-server.svg")}")`
                    currentMainButton("large-server")
                    break;
            }
        }

        function currentMainButton(buttonNameAfter) {
            chrome.storage.local.set({ "currentMainButton": buttonNameAfter })
        }
    })
}

function buttonListener(HanBlox_Button, placeId) {
    HanBlox_Button.addEventListener("click", async function () {
        const theButton = HanBlox_Button.children[0];
        HanBlox_Button.disabled = true
        HanBlox_Button.style.cursor = "wait"

        let joinButton = document.createElement("button");



        if (HanBlox_Button.id === "HanBlox-Button-Main") {
            const buttonName = theButton.style.backgroundImage.slice(5, -6).split("/")[4];

            switch (buttonName) {
                case "random-server":
                    fetchServer().then(async result => {
                        if (result.data[0]) {
                            joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${result.data[Math.floor(Math.random() * result.data.length)].id}")`)

                        }
                        joinServer(joinButton)
                    })
                    break;

                case "lowping-server":
                    fetchServer().then(async result => {
                        if (result.data[0]) {
                            let lowPing
                            await Promise.all(result.data.map(data => {
                                if (!lowPing || (data.ping < lowPing.ping && data.maxPlayers != 0)) lowPing = { ping: data.ping, id: data.id }
                            }))

                            joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${lowPing.id}")`);
                        }
                        joinServer(joinButton)
                    })
                    break;

                case "rejoin-server":
                    chrome.storage.local.get("recentServers", async function (results) {
                        let result = results.recentServers;
                        let theGameId;
                        for (let x = 0; x < result.length; x++) {
                            const theUserId = document.querySelectorAll('[name="user-data"]')[0].dataset.userid;
                            if (result[x][theUserId]) {
                                for (let y = 0; y < result[x][theUserId].length; y++) {
                                    if (result[x][theUserId][y][placeId]) {
                                        theGameId = result[x][theUserId][y][placeId];
                                        y = result[x][theUserId].length;
                                    }
                                }
                                x = result.length;
                            }
                        }

                        if (theGameId) {
                            joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${theGameId}")`);
                            joinServer(joinButton)
                        } else {
                            alert("You don't have recent server in this game!")
                            joinButton.remove();
                            HanBlox_Button.disabled = false
                            HanBlox_Button.style.cursor = ""
                        }
                    })

                    break;

                case "small-server":
                    fetchServer("A").then(async result => {
                        if (result.data[0]) {
                            joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${result.data[0].id}")`);
                        }
                        joinServer(joinButton)
                    })
                    break;

                case "large-server":
                    fetchServer("D").then(async result => {
                        if (result.data[0]) {
                            joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${result.data[0].id}")`);
                        }
                        joinServer(joinButton)
                    })
                    break;
            }

        } else if (HanBlox_Button.id === "HanBlox-Button-SearchUser") {
            const targetUser = document.getElementById("HanBlox-Input-SearchUser").value;
            const theGameId = await findUser(targetUser, placeId);

            if (theGameId) {
                joinButton.setAttribute("onclick", `Roblox.GameLauncher.joinGameInstance(${placeId}, "${theGameId}")`);
                joinServer(joinButton)
            } else {
                alert("User not found!")
                joinButton.remove();
                HanBlox_Button.disabled = false
                HanBlox_Button.style.cursor = ""
            }
        }
    })

    async function fetchServer(A_D) {
        let AscDesc = A_D || ""
        if (AscDesc) {
            switch (AscDesc) {
                case "A":
                    AscDesc = "sortOrder=Asc&"
                    break;

                case "D":
                    AscDesc = "sortOrder=Desc&"
                    break;
            }
        }

        return await fetch(`https://games.roblox.com/v1/games/${placeId}/servers/Public?${AscDesc}excludeFullGames=true&limit=100`)
            .then(x => x.json()).then(x => {
                if (x.data[0]) {
                    for (let i = 0; i < 100;) {
                        if (!x.data[i].playing || x.data[i].playing < 1) {
                            x.data.splice(i, 1)
                        } else {
                            i++
                        }
                        if (x.data.length === i) i = 100
                    }
                }
                return x
            })
    }

    async function joinServer(joinButton) {
        if (joinButton.hasAttribute("onclick")) {
            await sleep(500);
            joinButton.click();
        } else {
            alert("No Server")
        }

        await sleep(500);
        joinButton.remove();
        HanBlox_Button.disabled = false
        HanBlox_Button.style.cursor = ""
    }
}

function inputListener(input) {
    input.addEventListener('input', function () {
        const theButton = input.parentNode.children[0];
        if (input.value.length < 3 || input.value.length > 20) {
            theButton.style.cursor = "not-allowed"
            theButton.disabled = true
        } else {
            theButton.style.cursor = ""
            theButton.disabled = false
        }
    });

    input.onkeydown = function(event) {return /[a-z0-9_]/i.test(event.key)};
}

async function findUser(targetUser, placeId) {
    let userThumbnail = await fetchTargetThumbnail();
    let allTokens = [];

    if (!targetUser) return

    await fetchServers("");
    return await fetchTokens();


    async function fetchTargetThumbnail() {
        if (!/^\d+$/.test(targetUser)) {
            await fetch(`https://api.roblox.com/users/get-by-username?username=${targetUser}`).then(x=> x.json()).then(x=> targetUser = x.Id)
        }
        if (!targetUser) return

        return fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${targetUser}&size=150x150&format=Png`)
            .then(x => x.json()).then(x => { return x.data[0].imageUrl });
    }

    async function fetchServers(nextPageCursor) {
        await fetch(`https://games.roblox.com/v1/games/${placeId}/servers/Public?limit=100&cursor=${nextPageCursor}`).then(x => x.json()).then(async servers => {
            const { nextPageCursor, data } = servers;
            await Promise.all(data.map(server => {
                server.playerTokens.forEach(playerToken => {
                    allTokens.push(
                        {
                            requestId: server.id,
                            token: playerToken,
                            type: 'AvatarHeadshot',
                            size: '150x150',
                        }
                    )
                })
            }))

            if (!nextPageCursor) return
            return fetchServers(nextPageCursor);
        })
    }

    async function fetchTokens() {
        let readyToFetch = [];
        let checked = 0;
        let foundUser;

        for (let i = 0; i < allTokens.length; i++) {
            checked++
            readyToFetch.push(allTokens[i])
            if (checked == 100 || i == allTokens.length - 1) {
                await fetch('https://thumbnails.roblox.com/v1/batch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(readyToFetch)
                }).then(x => x.json()).then(x => {
                    return x.data.forEach(data => {
                        if (data.imageUrl === userThumbnail) {
                            foundUser = data.requestId;
                            i = allTokens.length;
                        }
                    })
                })

                readyToFetch = [];
                checked = 0;
                await sleep(50)
            }
        }
        return foundUser
    }

}

async function getUserData() {
    let theServerId = null
    while (0 < 3) {
        await new Promise(x => {
            chrome.runtime.sendMessage({
                type: "getUserData",
                serverId: theServerId,
                userId: document.querySelectorAll('[name="user-data"]')[0].dataset.userid
            }, async function (receive) {
                if (receive.done === true) {
                    theServerId = receive.serverId
                    x()
                }
            })
        })
        await sleep(30000) // Delay before fetching the presence
    }
}