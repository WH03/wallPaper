"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({ url: "/homeBanner" });
}
function apiGetDayRandom() {
  return utils_request.request({ url: "/randomWall" });
}
exports.apiGetBanner = apiGetBanner;
exports.apiGetDayRandom = apiGetDayRandom;
