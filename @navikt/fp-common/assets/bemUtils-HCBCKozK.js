import{g as c}from"./_commonjsHelpers-4gQjN7DL.js";var u={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var e={}.hasOwnProperty;function s(){for(var n=[],i=0;i<arguments.length;i++){var t=arguments[i];if(t){var r=typeof t;if(r==="string"||r==="number")n.push(t);else if(Array.isArray(t)){if(t.length){var f=s.apply(null,t);f&&n.push(f)}}else if(r==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){n.push(t.toString());continue}for(var a in t)e.call(t,a)&&t[a]&&n.push(a)}}}return n.join(" ")}o.exports?(s.default=s,o.exports=s):window.classNames=s})()})(u);var p=u.exports;const m=c(p),l=o=>({block:o,element:(e,s)=>`${o}__${e}${s?` ${o}__${e}--${s}`:""}`,modifier:e=>`${o}--${e}`,modifierConditional:(e,s)=>s===!0&&e!==void 0?`${o}--${e}`:void 0,child:e=>l(l(o).element(e)),classNames:m});export{l as b,m as c};
