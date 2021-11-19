"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_module_scss_1 = require("./styles.module.scss");
var saerch_1 = require("../../../providers/saerch");
function InputSearch() {
    var _a = react_1.useContext(saerch_1.SearchContext), search = _a.search, setSearch = _a.setSearch;
    return (React.createElement("input", { className: styles_module_scss_1["default"].container, type: 'text', placeholder: 'Pesquisar produto', value: search, onChange: function (event) { return setSearch(event.target.value); } }));
}
exports["default"] = InputSearch;
