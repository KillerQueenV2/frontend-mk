"use strict";
exports.__esModule = true;
exports.Card = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var md_1 = require("react-icons/md");
var react_router_dom_1 = require("react-router-dom");
function Card(_a) {
    var id = _a.id, image = _a.image, title = _a.title, price = _a.price, quantidade = _a.quantidade, handleAddToCart = _a.handleAddToCart, addedToCart = _a.addedToCart, handleRemoveToCart = _a.handleRemoveToCart;
    return (React.createElement("div", { className: styles_module_scss_1["default"].card },
        React.createElement(react_router_dom_1.Link, { to: "/product-details/" + id },
            React.createElement("div", { className: styles_module_scss_1["default"].productImage },
                React.createElement("img", { src: image, alt: "product" })),
            React.createElement("div", { className: styles_module_scss_1["default"].productInfo },
                React.createElement("div", { className: styles_module_scss_1["default"].productName }, title.length > 15 ? title.slice(0, 13) + '...' : title),
                React.createElement("div", { className: styles_module_scss_1["default"].productPrice, style: { fontSize: price.length > 9 ? '18px' : '24px' } }, price),
                !addedToCart ?
                    React.createElement("button", { className: styles_module_scss_1["default"].addToCart, onClick: function (e) { return handleAddToCart(e, id); }, disabled: quantidade < 1 },
                        React.createElement(md_1.MdAddShoppingCart, null))
                    :
                        React.createElement("button", { className: styles_module_scss_1["default"].removeFromCart, onClick: function (e) { return handleRemoveToCart(e, id); }, disabled: quantidade < 1 },
                            React.createElement(md_1.MdAddShoppingCart, null))))));
}
exports.Card = Card;
