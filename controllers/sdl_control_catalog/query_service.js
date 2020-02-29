const SdlControlCatalog = require("../../models/sdl_control_catalog");
const request = require('request');
const SDLCRuleEngine = require('../../rule_engine/sdl_rule_engine');

var sdlcRuleEngine = new SDLCRuleEngine().getInstance();
const SPRING_SERVICE_PORT = process.env.SPRING_SERIVE_PORT || 8888;
const SPRING_SERVICE_URL = process.env.SPRING_SERVICE_URL || `http://localhost:${SPRING_SERVICE_PORT}`;


exports.createControlCatalog = (req, mainres, next) => {
    request('http://localhost:8888/client-config/sdlcatalog', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let sdlcCatalogData = body.propertySources[0].source;
        SdlControlCatalog
            .findOne({ where: { key: 'sdlc_catalog' } })
            .then(function (obj) {
                if (obj) {
                    let updateSdlcCatalog = obj.update({
                        metadata: sdlcCatalogData
                    });
                    createOrUpdateCatalog(updateSdlcCatalog, mainres);
                } else {
                    let createSdlcCatalog = SdlControlCatalog.create({
                        key: 'sdlc_catalog',
                        metadata: sdlcCatalogData
                    })
                    createOrUpdateCatalog(createSdlcCatalog, mainres);
                }
            })
    });
}
function createOrUpdateCatalog(modelPromise, mainres) {    
    return modelPromise.then(result => {
        sdlcRuleEngine.sdlcCatalogData = result.metadata;
        mainres.status(201).json({
            message: "Data Saved Successfully!",
            result: result
        });
    })
        .catch(err => {
            console.log(err);
            mainres.status(500).json({
                message: "An error occurred. Please try again later!"
            });
        });
}
