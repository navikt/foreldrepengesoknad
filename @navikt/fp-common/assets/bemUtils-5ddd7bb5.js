import{g as u}from"./_commonjsHelpers-de833af9.js";var c={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var s={}.hasOwnProperty;function e(){for(var n=[],i=0;i<arguments.length;i++){var t=arguments[i];if(t){var r=typeof t;if(r==="string"||r==="number")n.push(t);else if(Array.isArray(t)){if(t.length){var f=e.apply(null,t);f&&n.push(f)}}else if(r==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){n.push(t.toString());continue}for(var a in t)s.call(t,a)&&t[a]&&n.push(a)}}}return n.join(" ")}o.exports?(e.default=e,o.exports=e):window.classNames=e})()})(c);var p=c.exports;const m=u(p),l=o=>({block:o,element:(s,e)=>`${o}__${s}${e?` ${o}__${s}--${e}`:""}`,modifier:s=>`${o}--${s}`,modifierConditional:(s,e)=>e===!0&&s!==void 0?`${o}--${s}`:void 0,child:s=>l(l(o).element(s)),classNames:m});export{l as b,m as c};
//# sourceMappingURL=bemUtils-5ddd7bb5.js.map
