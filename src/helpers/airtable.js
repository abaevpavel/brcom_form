const axios = require('axios');

const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN || '';

const fetchInfo = async (configId, recordId, callback) => {
    const configPromise = axios.get(`https://api.airtable.com/v0/appAXGQKbdIebg7mV/Todos%20Config/${configId}`,
        {
            headers: {
                "Authorization": `Bearer ${AIRTABLE_TOKEN}`
            }
        }
    )
    const recordInfoPromise = axios.get(`https://api.airtable.com/v0/appAXGQKbdIebg7mV/Todos/${recordId}`,
        {
            headers: {
                "Authorization": `Bearer ${AIRTABLE_TOKEN}`
            }
        }
    )

    Promise.all([configPromise, recordInfoPromise]).then(function (response) {
        const result = {'item' : response[1].data, 'config' : response[0].data};
        
        if (result.item.fields.County[0] !== "Washington, DC") {
            var indexOfOptionalFiles = (result.config.fields['Optional Uploads'] || []).indexOf("MEP and Other Plans");
            if (indexOfOptionalFiles !== -1) {
                result.config.fields['Optional Uploads'].splice(indexOfOptionalFiles, 1);
                }
            }
        
        callback(result)
    })
        .catch(function (error) {
            console.log(error);
        })
}







export {  fetchInfo };