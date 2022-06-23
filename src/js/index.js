card()

async function card() {
    const url = `https://valorant-api.com/v1/agents`
    const response = await fetch(url);
    const json = await response.json();
    const data = await json.data;
    await createList(data);
    clickEvent(data);
}

async function createList(data) {
    for (let i = 0; i < data.length; i++) {
        let agent = data[i];
        if (agent.isPlayableCharacter) {
            const list = document.querySelector('.agent-list')
            const name = agent.displayName
            const agentImg = agent.displayIcon
            list.innerHTML +=
                `<li class="agent" name="${name}" id="${i}">
                    <img src="${agentImg}" alt="Personagem ${name}">
                </li>`
        }
    }
}

function clickEvent(data) {
    const agents = document.querySelectorAll('.agent')
    agents.forEach((agent) => {
        agent.addEventListener('click', async () => {
            const name = agent.getAttribute('name')
            const id = agent.getAttribute('id')
            await changeCard(name, id, data)
        })
    })
}

async function changeCard(name, id, data) {
    changeName(name);
    changeImg(name, id, data);
    changeSkills(name, id, data);

    function changeName(name) {
        const namePlace = document.querySelector('.name')
        namePlace.innerHTML = `${name.toUpperCase()}`
    }

    function changeImg(name, id, data) {
        const imgPlace = document.getElementById('agentPortrait')
        const imgContainer = document.querySelector('.img-bg')
        imgPlace.src = data[id].fullPortraitV2
        imgPlace.alt = name
        imgContainer.style.backgroundImage = `url(${data[id].background})`
    }

    function changeSkills(name, id, data) {
        const skillList = document.querySelector('.list')
        const agent = data[id]
        console.log(agent.abilities);
        if (agent.abilities.length !== skillList.length) {
            skillList.innerHTML = '';
        }
        for (let i = 0; i < agent.abilities.length; i++) {
            const skill = agent.abilities[i];
            skillList.innerHTML += 
            `<li class="skill" id="skill${i}">
                <img src="${skill.displayIcon}" alt="Skill Symbol">
                <div class="description">
                    <h4>${skill.displayName}</h4>
                    <p>${skill.description}</p>
                </div>
            </li>`
        }
    }
}