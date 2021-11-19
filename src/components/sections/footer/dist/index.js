"use strict";
exports.__esModule = true;
exports.Footer = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var ai_1 = require("react-icons/ai");
function Footer() {
    return (React.createElement("footer", null,
        React.createElement("div", { className: styles_module_scss_1["default"].container },
            React.createElement("div", { className: styles_module_scss_1["default"].socialNetworks },
                React.createElement(ai_1.AiFillFacebook, null),
                React.createElement(ai_1.AiFillTwitterSquare, null),
                React.createElement(ai_1.AiFillInstagram, null)),
            React.createElement("div", { className: styles_module_scss_1["default"].footerMessage }, "Acompanhe as nossas redes sociais"),
            React.createElement("div", { className: styles_module_scss_1["default"].diviser }),
            "M",
            React.createElement("div", { className: styles_module_scss_1["default"].copyright },
                "COPYRIGHT \u00A9 2021 MK INFO.",
                React.createElement("br", null),
                "TODOS OS DIREITOS RESERVADOS."))));
}
exports.Footer = Footer;
