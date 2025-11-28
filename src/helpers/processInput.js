
const formattedParams = { 'choices': [], 'uploads': [], 'links': [], 'comments': [], 'ETA': '', 'requireETAWhen' : '' }

const getQuery = () => {
  if (typeof window !== 'undefined') {
    let result = {};
    let entries = new URLSearchParams(window.location.search);
    console.log(entries)
    for (const [key, value] of entries) {
      result[key.replace("amp;","")] = value
    }
    console.log(result)
    return result;
  }
  return {};
};


let parseQueryInputs = function (parameters) {
  parameters = Object.assign(getQuery(), parameters)
  if (parameters.title && parameters.title.includes("Floorplan")) {
    console.log("FLOORPLAN")
    if (parameters.county !== "Washington, DC") {
      console.log("NOT DC")
      var indexOfOptionalFiles = (parameters['Optional Uploads'] || []).indexOf("MEP and Other Plans");
      if (indexOfOptionalFiles !== -1) {
        parameters['Optional Uploads'].splice(indexOfOptionalFiles, 1);
      }
    }
  }
  Object.keys(parameters).forEach(parameterKey => {
    switch (parameterKey) {
      case 'ETA':
        formattedParams['eta'] = parameters['ETA'].length > 0 ? parameters['ETA'][0] : "No"
        break;
      case 'links':
        formattedParams['links'] = parameters['links'] ? parameters['links'].split(',') : []
        break;
      default:
        formattedParams[parameterKey] = parameters[parameterKey];
    }
  })
  
  if ( parameters['hide_choices']) {
    parameters['hide_choices'].split(',').forEach((choice) => {
      const index = formattedParams['Form Fields'].indexOf(choice);
      console.log(index)
      if (index > -1) {
        formattedParams['Form Fields'].splice(index, 1);
      }
    })
  }  
  console.log("Params: ",parameters)
  return formattedParams;
}



export default parseQueryInputs;