const SdlControlCatalogMetadata = require("../../models/sdlc_control_catalog_metadata");
const SdlControlCatalog = require("../../models/sdl_control_catalog");
const request = require('request');
const SDLCRuleEngine = require('../../rule_engine/sdl_rule_engine');
var sdlcRuleEngine = new SDLCRuleEngine().getInstance();

const SPRING_SERVICE_PORT = process.env.SPRING_SERIVE_PORT || 8888;
const SPRING_SERVICE_URL = process.env.SPRING_SERVICE_URL || `http://localhost:${SPRING_SERVICE_PORT}`;


exports.createControlCatalogMetadata = (req, mainres, next) => {
    request(SPRING_SERVICE_URL + '/client-config/sdlcatalogmetadata', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let sdlcCatalogData = body.propertySources[0].source;

        SdlControlCatalogMetadata
            .findOne({ where: { key: 'sdlc_metadata' } })
            .then(function (obj) {
                if (obj) {
                    let updateSdlcCatalog = obj.update({
                        metadata: sdlcCatalogData
                    });
                    createOrUpdateCatalogMetadata(updateSdlcCatalog, mainres);
                } else {
                    let createSdlcCatalog = SdlControlCatalogMetadata.create({
                        key: 'sdlc_metadata',
                        metadata: sdlcCatalogData
                    })
                    createOrUpdateCatalogMetadata(createSdlcCatalog, mainres);
                }
            })
    });
}
function createOrUpdateCatalogMetadata(modelPromise, mainres) {
    return modelPromise.then(result => {
        sdlcRuleEngine.sdlcCatalogMetadata = result.metadata;
        mainres.status(201).json({
            message: "Data Saved Successfully!",
            result: result
        });
    })
        .catch(err => {
            console.log(err)
            mainres.status(500).json({
                message: "An error occurred. Please try again later!"
            });
        });
}
