const express = require("express");

const SdlControlCatelogQueryService = require("../controllers/sdl_control_catalog/query_service");

const router = express.Router();

router.post("/", SdlControlCatelogQueryService.createControlCatalog);
//router.get("/getControlCatalog", SdlControlCatelogController.getControlCatalog);


module.exports = router;