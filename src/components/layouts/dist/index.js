"use strict";
exports.__esModule = true;
exports.Layout = void 0;
var header_1 = require("../sections/header");
var sidebar_1 = require("../sections/sidebar");
var main_1 = require("../sections/main");
var footer_1 = require("../sections/footer");
function Layout(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(header_1.Header, null),
        React.createElement(sidebar_1.Sidebar, null),
        React.createElement(main_1.Main, null, props.children),
        React.createElement(footer_1.Footer, null)));
}
exports.Layout = Layout;
