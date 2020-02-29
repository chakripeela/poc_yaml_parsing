class SDLRuleEngine {
    constructor() {
        this._sdlcCatalogs = {};
        this._sdlcCatalogMetadata = {};
    }

    get sdlcCatalogData() {
        return this._sdlcCatalogs;
    }

    set sdlcCatalogData(value) {
        this._sdlcCatalogs = value;
    }
    get sdlcCatalogMetadata() {
        return this._sdlcCatalogMetadata;
    }

    set sdlcCatalogMetadata(value) {
        this._sdlcCatalogMetadata = value;
    }    
}

class Singleton {
    getInstance() {
        if (!Singleton.instance) { Singleton.instance = new SDLRuleEngine(); }
        return Singleton.instance;
    }

}

module.exports = Singleton;