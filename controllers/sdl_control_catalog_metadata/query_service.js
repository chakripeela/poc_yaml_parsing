const SdlControlCatalogMetadata = require("../../models/sdlc_control_catalog_metadata");
const SdlControlCatalog = require("../../models/sdl_control_catalog");
const request = require('request');
const replaceLinksInSdlcMetadata = require('../../utils/catalog_metadata_replace');
const SDLCRuleEngine = require('../../rule_engine/sdl_rule_engine');
var sdlcRuleEngine = new SDLCRuleEngine().getInstance();

function setSdlcCatalogMetaData(getSDLCMetadataCallback) {
    SdlControlCatalogMetadata.findOne({ where: { key: 'sdlc_metadata' } }).
        then((sdlControlCatalogMetadata) => {
            sdlcRuleEngine._sdlcCatalogMetadata = sdlControlCatalogMetadata.metadata;
            getSDLCMetadataCallback(sdlcRuleEngine._sdlcCatalogMetadata);
        }).catch(err => {
            this._sdlcCatalogMetadata = [];
        });
}
function setSdlcCatalogData(getSDLCatalogCallback) {
    SdlControlCatalog.findOne({ where: { key: 'sdlc_catalog' } }).
        then((sdlcCatalogData) => {
            sdlcRuleEngine.sdlcCatalogData = sdlcCatalogData.metadata;
            getSDLCatalogCallback(sdlcRuleEngine.sdlcCatalogData);
        }).catch(err => {
            console.log(err);
        });
}

function getsdlcQuestionnaire(sdlcCatalogData, sdlControlCatalogMetadata, req, res, next) {    
    //replaceLinksInSdlcMetadata(sdlControlCatalogMetadata, sdlcCatalogData);
    try {
        replaceLinksInSdlcMetadata(sdlControlCatalogMetadata, sdlcCatalogData);
        res.status(200).json({
            title: "SDL Catalogs Questionnaire",
            result: sdlControlCatalogMetadata
        });
    }
    catch (err) {
        res.status(500).json({
            title: "SDL Catalogs",
            result: err
        });
    }
}
exports.getControlCatalogMetadata = (req, res, next) => {
    let sdlcdata = sdlcRuleEngine.sdlcCatalogData;    
    if (Object.keys(sdlcdata).length === 0) {
        setSdlcCatalogData((sdlcCallbackData) => {
            let sdlcMetadata = sdlcRuleEngine.sdlcCatalogMetadata;
            if (Object.keys(sdlcMetadata).length === 0) {
                setSdlcCatalogMetaData((sdlcMetadataCallbackData) => {
                    getsdlcQuestionnaire(sdlcCallbackData, sdlcMetadataCallbackData, req, res, next);
                });
            }
            else {
                getsdlcQuestionnaire(sdlcCallbackData, sdlcMetadata, req, res, next);
            }
        });
    }
    else {
        let sdlcMetadata = sdlcRuleEngine.sdlcCatalogMetadata;
        if (Object.keys(sdlcMetadata).length === 0) {
            setSdlcCatalogMetaData((sdlcMetadataCallbackData) => {
                getsdlcQuestionnaire(sdlcRuleEngine.sdlcCatalogData, sdlcMetadataCallbackData, req, res, next);
            });
        }
        else {
            getsdlcQuestionnaire(sdlcRuleEngine.sdlcCatalogData, sdlcRuleEngine.sdlcCatalogMetadata, req, res, next);
        }
    }
}
