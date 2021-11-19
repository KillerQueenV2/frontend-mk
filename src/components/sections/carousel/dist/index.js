"use strict";
exports.__esModule = true;
exports.Carousel = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var react_1 = require("react");
var md_1 = require("react-icons/md");
var md_2 = require("react-icons/md");
function Carousel() {
    var _a = react_1.useState(0), slideIndex = _a[0], setSlideIndex = _a[1];
    react_1.useEffect(function () {
        slideIndex > 300 && setSlideIndex(0);
        var interval = setInterval(function () {
            setSlideIndex(slideIndex + 100);
        }, 3000);
        return function () { return clearInterval(interval); };
    }, [slideIndex]);
    var slideData = [
        {
            banner: 'https://i.imgur.com/I4IfRQa.png'
        },
        {
            banner: 'https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/non-4k/original/14.jpg'
        },
        {
            banner: 'https://i.imgur.com/UbzgFRd.jpg'
        },
        {
            banner: 'https://wallpaperaccess.com/full/3513781.jpg'
        }
    ];
    return (React.createElement("div", { className: styles_module_scss_1["default"].container },
        React.createElement("div", { className: styles_module_scss_1["default"].slider }, slideData.map(function (slide, i) { return (React.createElement("div", { className: styles_module_scss_1["default"].item, key: i, style: { right: slideIndex + "%" } },
            React.createElement("img", { src: slide.banner, alt: "random banner" }))); })),
        React.createElement("button", { className: styles_module_scss_1["default"].previousBtnCarousel, onClick: function () { return setSlideIndex(slideIndex - 100); }, disabled: slideIndex === 0 ? true : false },
            React.createElement(md_1.MdKeyboardArrowLeft, null)),
        React.createElement("button", { className: styles_module_scss_1["default"].nextBtnCarousel, onClick: function () { return setSlideIndex(slideIndex + 100); }, disabled: slideIndex === 300 ? true : false },
            React.createElement(md_2.MdKeyboardArrowRight, null))));
}
exports.Carousel = Carousel;
