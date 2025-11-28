const {parseQueryInputs} = require('../helpers/processInput')

let sampleInput = {
    id: "recFWYtRDo5maiByg",
    choices: "SELECTED,PRICE APPROVED,INSTALLED",
    reqUploads: "",
    opUploads: "Selections File",
    ETA: "YES",
    county: "washington, DC",
    title: "Countertops Order - Butler-Washington, DC",
    links: "https://google.com,https://youtube.com",
    link_names:"GOOGLE,YOUTUBE"
}



console.log(parseQueryInputs(sampleInput))

