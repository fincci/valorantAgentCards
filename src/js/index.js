async function teste() {
    const url = `https://valorant-api.com/v1/agents`
    const response = await fetch(url);
    const json = await response.json();   
    console.log(json);
}

// teste();