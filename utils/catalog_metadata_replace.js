var yaml = require('js-yaml');
var fs = require('fs');
const path = require('path');
var jp = require('jsonpath');

function replaceLinksInSdlcMetadata(obj, sdlcCatalog) {
    let linkToSearch = '';
    for (var attributename in obj) {
        let type = typeof obj[attributename];
        if (type === 'string') {
            let key = attributename;
            let val = obj[attributename];
            if (val.indexOf('${') > -1) {
                linkToSearch = val.substring(2, val.length - 1);
                //let textToReplace = jp.query(sdlcCatalog, '$.Metadata.'+linkToSearch);
                let textToReplace = sdlcCatalog[linkToSearch];
                //console.log(textToReplace)
                if (textToReplace === undefined) {
                    throw `${linkToSearch} not found in catalog`;
                }
                obj[attributename] = textToReplace;
            }
        }
    }
    if (obj[attributename] !== undefined)
        replaceLinksInSdlcMetadata(obj[attributename]);
    return obj;
}


module.exports = replaceLinksInSdlcMetadata;