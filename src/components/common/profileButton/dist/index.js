"use strict";
exports.__esModule = true;
exports.ProfileButton = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var ai_1 = require("react-icons/ai");
var react_router_dom_1 = require("react-router-dom");
var fa_1 = require("react-icons/fa");
function ProfileButton(props) {
    return (React.createElement(react_router_dom_1.Link, { to: props.userType ? "/config-account" : '/login' },
        React.createElement("div", { className: styles_module_scss_1["default"].container, style: {
                width: props.sidebarState ? '220px' : '80px',
                background: props.userType === 'admin' ? '#ff6348' : '#5352ed'
            } },
            React.createElement("button", { className: styles_module_scss_1["default"].button },
                props.userType ? React.createElement(fa_1.FaRegUserCircle, null) : React.createElement(ai_1.AiOutlineLogin, null),
                React.createElement("span", null, props.userType ? 'Meu perfil' : 'Fazer login')))));
}
exports.ProfileButton = ProfileButton;
