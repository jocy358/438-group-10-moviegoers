//testing that api works

// API KEY: e95d4610
fetch("http://www.omdbapi.com/?t=Cinderella&apikey=e95d4610")
    .then(response => {
        if (!response.ok) {
            throw new Error("Couldn't fetch movie data");
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
