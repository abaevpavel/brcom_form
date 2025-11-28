import React from 'react';
import Uploader from './uploader';

function FileUploads(props) {
  console.log(props)

  if ((!props.requiredUploads && !props.optionalUploads) || !props.showUploads) {
    return (null);
  }
  

  return (
    <div className="mt-4">
      <h4 className="text-center">Please, upload files below:</h4>
      {(props.requiredUploads || []).map((upload, index) =>
        <div className="row mt-3" key={`upload_1${index}`}>
          <div className="col-xs-6 col-sm-10 col-md-8 col-lg-6 mx-auto">
            <Uploader upload={{"name" : upload, "required" : true}} passUrlUp={props.passUrlUp} fileIsLoading={props.fileIsLoading}></Uploader>
          </div>
        </div>
      )}
      {(props.optionalUploads || []).map((upload, index) =>
        <div className="row mt-3" key={`upload_2${index}`}>
          <div className="col-xs-6 col-sm-10 col-md-8 col-lg-6 mx-auto">
            <Uploader upload={{"name" : upload, "required" : false}} passUrlUp={props.passUrlUp} fileIsLoading={props.fileIsLoading}></Uploader>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploads;