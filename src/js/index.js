teste()

async function teste() {
    const url = `https://valorant-api.com/v1/agents`
    const response = await fetch(url);
    const json = await response.json();
    await createList(json);
    // await createCard(json)
}

async function createList(json) {
    const agents = json.data
    for (let i = 0; i < agents.length; i++) {
        let agent = agents[i];
        if (agent.isPlayableCharacter) {
            const list = document.querySelector('.agent-list')
            const name = agent.displayName
            const agentImg = agent.displayIcon
            list.innerHTML +=
                `<li class="agent" id="${name}">
                    <img src="${agentImg}" alt="Personagem ${name}">
                </li>`
        }
    }
}