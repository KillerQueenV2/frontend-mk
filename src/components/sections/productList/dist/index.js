"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductList = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var react_1 = require("react");
var products_1 = require("../../../providers/products");
var spinner_1 = require("../../common/spinner");
var card_1 = require("../../common/card");
var saerch_1 = require("../../../providers/saerch");
function ProductList() {
    var _a = react_1.useContext(products_1.ProductsContext), activeProducts = _a.activeProducts, setActiveProducts = _a.setActiveProducts, isLoaded = _a.isLoaded;
    var _b = react_1.useState([]), amountsFieldValues = _b[0], setAmountsFieldValues = _b[1];
    var _c = react_1.useState([]), storedProductsId = _c[0], setStoredProductsId = _c[1];
    var search = react_1.useContext(saerch_1.SearchContext).search;
    var getContainerHeight = !isLoaded ? { height: '80vh' } : {};
    react_1.useEffect(function () {
        var amountsFieldValues = localStorage.getItem('amountsFieldValues');
        var storedProductsId = localStorage.getItem('storedProductsId');
        amountsFieldValues && setAmountsFieldValues(JSON.parse(amountsFieldValues));
        storedProductsId && setStoredProductsId(JSON.parse(storedProductsId));
    }, []);
    react_1.useEffect(function () {
        localStorage.setItem('storedProductsId', JSON.stringify(storedProductsId));
        localStorage.setItem('amountsFieldValues', JSON.stringify(amountsFieldValues));
    }, [storedProductsId, amountsFieldValues]);
    var productsFound = (activeProducts === null || activeProducts === void 0 ? void 0 : activeProducts.filter(function (product) {
        var _a;
        var researched = (_a = product === null || product === void 0 ? void 0 : product.nome) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(search);
        return researched && product;
    }));
    function handleAddToCart(event, id) {
        event.preventDefault();
        var index = activeProducts.findIndex(function (product) { return product.id === id; });
        var addedProducts = __assign({}, activeProducts[index]);
        addedProducts.addedToCart = true;
        addedProducts.quantidadeSelecionada = '1';
        handleUpdateState(addedProducts, index);
        var selectedIds = __spreadArrays(storedProductsId);
        selectedIds.push(id);
        setStoredProductsId(selectedIds);
        var addedAmounts = __spreadArrays(amountsFieldValues, [1]);
        setAmountsFieldValues(addedAmounts);
    }
    function handleRemoveToCart(event, id) {
        event.preventDefault();
        var index = activeProducts.findIndex(function (product) { return product.id === id; });
        var addedProducts = __assign({}, activeProducts[index]);
        var addedToCart = addedProducts.addedToCart, quantidadeSelecionada = addedProducts.quantidadeSelecionada, removedFromCart = __rest(addedProducts, ["addedToCart", "quantidadeSelecionada"]);
        handleUpdateState(removedFromCart, index);
        var amountsValues = __spreadArrays(amountsFieldValues);
        var selectedIds = __spreadArrays(storedProductsId);
        amountsValues.splice(selectedIds.indexOf(id), 1);
        setAmountsFieldValues(amountsValues);
        selectedIds.splice(selectedIds.indexOf(id), 1);
        setStoredProductsId(selectedIds);
    }
    function handleUpdateState(product, index) {
        var updatedProductsState = __spreadArrays(activeProducts);
        updatedProductsState[index] = product;
        setActiveProducts(updatedProductsState);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { className: styles_module_scss_1["default"].advertising }, productsFound.length === activeProducts.length && activeProducts.length !== 0
            ? 'Confira os nossos produtos'
            : productsFound.length === 0
                ? 'Nenhum produto encontrado'
                : "Produtos encontrados: " + productsFound.length),
        React.createElement("div", { className: styles_module_scss_1["default"].productList, style: getContainerHeight },
            !isLoaded && React.createElement(spinner_1.Spinner, null),
            productsFound
                .map(function (product, i) { return (React.createElement("div", { className: styles_module_scss_1["default"].cardContainer, key: i * Math.random() },
                React.createElement(card_1.Card, { image: product.imagem, title: product.nome, quantidade: product.quantidade, price: product.preco, id: product.id, handleAddToCart: handleAddToCart, handleRemoveToCart: handleRemoveToCart, addedToCart: product.addedToCart ? true : false }))); }))));
}
exports.ProductList = ProductList;
