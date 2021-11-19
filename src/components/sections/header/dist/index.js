"use strict";
exports.__esModule = true;
exports.Header = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var inputSearch_1 = require("../../common/inputSearch");
function Header() {
    var path = window.location.pathname;
    return (React.createElement("header", null,
        React.createElement("div", { className: styles_module_scss_1["default"].logo }, "M"),
        path === '/' && React.createElement(inputSearch_1["default"], null)));
}
exports.Header = Header;
