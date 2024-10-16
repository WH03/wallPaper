"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const rateValue = common_vendor.ref(3.5);
    const userScore = common_vendor.ref(0);
    const scorePopup = common_vendor.ref(null);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const closePopup = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      scorePopup.value.open();
    };
    const closeScorePopup = () => {
      scorePopup.value.close();
    };
    const submitScore = () => {
      console.log("评分...");
    };
    const onChange = () => {
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(8, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$2,
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        j: common_vendor.p({
          type: "info",
          size: "28"
        }),
        k: common_vendor.o(clickInfo),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickScore),
        n: common_vendor.p({
          type: "info",
          size: "23"
        })
      } : {}, {
        o: common_vendor.p({
          type: "closeempty",
          size: "23"
        }),
        p: common_vendor.o(closePopup),
        q: common_vendor.o(onChange),
        r: common_vendor.o(($event) => rateValue.value = $event),
        s: common_vendor.p({
          readonly: true,
          touchalbe: true,
          size: "16",
          modelValue: rateValue.value
        }),
        t: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        v: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        w: common_vendor.p({
          type: "bottom"
        }),
        x: common_vendor.p({
          type: "closeempty",
          size: "23"
        }),
        y: common_vendor.o(closeScorePopup),
        z: common_vendor.o(onChange),
        A: common_vendor.o(($event) => userScore.value = $event),
        B: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        C: common_vendor.t(userScore.value),
        D: !userScore.value,
        E: common_vendor.o(submitScore),
        F: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        G: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
