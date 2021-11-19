"use strict";
exports.__esModule = true;
exports.Sidebar = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var react_1 = require("react");
var ai_1 = require("react-icons/ai");
var fi_1 = require("react-icons/fi");
var fa_1 = require("react-icons/fa");
var bi_1 = require("react-icons/bi");
var bs_1 = require("react-icons/bs");
var ri_1 = require("react-icons/ri");
var react_router_dom_1 = require("react-router-dom");
var apiUrl_1 = require("../../../global/apiUrl");
var profileButton_1 = require("../../common/profileButton");
function Sidebar() {
    var _a = react_1.useState(''), userType = _a[0], setUserType = _a[1];
    var _b = react_1.useState(false), sidebarState = _b[0], setsidebarState = _b[1];
    var _c = react_1.useState(''), userId = _c[0], setUser = _c[1];
    react_1.useEffect(function () {
        var id = localStorage.getItem('userId');
        var token = localStorage.getItem('token');
        id && setUser(id);
        token && fetch(apiUrl_1["default"] + "/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (_a) {
            var type = _a.type;
            return setUserType(type);
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: sidebarState ? styles_module_scss_1["default"].sidebarOpened : styles_module_scss_1["default"].sidebar },
            React.createElement("div", { className: styles_module_scss_1["default"].item, id: styles_module_scss_1["default"].burger, onClick: function () { return setsidebarState(!sidebarState); } },
                React.createElement(ai_1.AiOutlineMenu, null)),
            userType === 'admin' ? React.createElement(React.Fragment, null,
                React.createElement(react_router_dom_1.Link, { to: "/admin/user-table" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(fa_1.FaUserFriends, null),
                        React.createElement("span", null, "Usu\u00E1rios"))),
                React.createElement(react_router_dom_1.Link, { to: "/admin/product-table" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(bs_1.BsFillInboxesFill, null),
                        React.createElement("span", null, "Produtos"))),
                React.createElement(react_router_dom_1.Link, { to: "/admin/supplier-table" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(fa_1.FaLuggageCart, null),
                        React.createElement("span", null, "Fornecedores"))),
                React.createElement(react_router_dom_1.Link, { to: "/admin/purchase-table" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(ri_1.RiNotification2Fill, null),
                        React.createElement("span", null, "Pedidos")))) : React.createElement(React.Fragment, null,
                React.createElement(react_router_dom_1.Link, { to: "/" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(fi_1.FiCodesandbox, null),
                        React.createElement("span", null, "Produtos"))),
                React.createElement(react_router_dom_1.Link, { to: userId ? '/meus-pedidos' : '/signup' },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        userId ? React.createElement(bi_1.BiCoinStack, null) : React.createElement(fi_1.FiUserPlus, null),
                        React.createElement("span", null, userId ? 'Compras' : 'Cadastrar-se'))),
                React.createElement(react_router_dom_1.Link, { to: "/carrinho" },
                    React.createElement("div", { className: styles_module_scss_1["default"].item },
                        React.createElement(fi_1.FiShoppingCart, null),
                        React.createElement("span", null, "Carrinho"))))),
        React.createElement(profileButton_1.ProfileButton, { sidebarState: sidebarState, userType: userType })));
}
exports.Sidebar = Sidebar;
