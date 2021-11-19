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
exports.__esModule = true;
exports.Input = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var core_1 = require("@unform/core");
var react_1 = require("react");
var react_2 = require("react");
function Input(_a) {
    var name = _a.name, className = _a.className, rest = __rest(_a, ["name", "className"]);
    var inputRef = react_1.useRef(null);
    var _b = core_1.useField(name), fieldName = _b.fieldName, registerField = _b.registerField, defaultValue = _b.defaultValue;
    react_2.useEffect(function () {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);
    return (React.createElement("input", __assign({ className: className || styles_module_scss_1["default"].customInput, ref: inputRef, defaultValue: defaultValue }, rest)));
}
exports.Input = Input;
