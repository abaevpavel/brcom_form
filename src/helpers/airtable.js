const axios = require('axios');

const fetchInfo = async (configId, recordId, callback) => {
    const configPromise = axios.get(`https://api.airtable.com/v0/appAXGQKbdIebg7mV/Todos%20Config/${configId}`,
        {
            headers: {
                "Authorization": `Bearer patUICwnkk9q8SnFv.da5a8cd0d87db095995b1c1b3a14458bf37af437b713777457c78ea771dfd11b`
            }
        }
    )
    const recordInfoPromise = axios.get(`https://api.airtable.com/v0/appAXGQKbdIebg7mV/Todos/${recordId}`,
        {
            headers: {
                "Authorization": `Bearer patUICwnkk9q8SnFv.da5a8cd0d87db095995b1c1b3a14458bf37af437b713777457c78ea771dfd11b`
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