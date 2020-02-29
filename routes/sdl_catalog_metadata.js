const express = require("express");

const SdlControlCatelogQueryController = require("../controllers/sdl_control_catalog_metadata/query_service");
const SdlControlCatelogCommandController = require("../controllers/sdl_control_catalog_metadata/command_service");

const router = express.Router();

router.post("/", SdlControlCatelogCommandController.createControlCatalogMetadata);
router.get("/", SdlControlCatelogQueryController.getControlCatalogMetadata);


module.exports = router;