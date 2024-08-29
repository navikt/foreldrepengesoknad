import{g as u}from"./index-uubelm5h.js";var a={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var r={}.hasOwnProperty;function n(){for(var t="",e=0;e<arguments.length;e++){var i=arguments[e];i&&(t=s(t,p(i)))}return t}function p(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return n.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var e="";for(var i in t)r.call(t,i)&&t[i]&&(e=s(e,i));return e}function s(t,e){return e?t?t+" "+e:t+e:t}o.exports?(n.default=n,o.exports=n):window.classNames=n})()})(a);var c=a.exports;const l=u(c),f=o=>({block:o,element:(r,n)=>`${o}__${r}${n?` ${o}__${r}--${n}`:""}`,modifier:r=>`${o}--${r}`,modifierConditional:(r,n)=>n===!0&&r!==void 0?`${o}--${r}`:void 0,child:r=>f(f(o).element(r)),classNames:l});export{f as b};
