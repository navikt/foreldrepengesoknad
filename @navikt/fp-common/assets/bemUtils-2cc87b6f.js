import{g as u}from"./_commonjsHelpers-de833af9.js";var a={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var r={}.hasOwnProperty;function n(){for(var t="",e=0;e<arguments.length;e++){var s=arguments[e];s&&(t=i(t,p(s)))}return t}function p(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return n.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var e="";for(var s in t)r.call(t,s)&&t[s]&&(e=i(e,s));return e}function i(t,e){return e?t?t+" "+e:t+e:t}o.exports?(n.default=n,o.exports=n):window.classNames=n})()})(a);var c=a.exports;const l=u(c),f=o=>({block:o,element:(r,n)=>`${o}__${r}${n?` ${o}__${r}--${n}`:""}`,modifier:r=>`${o}--${r}`,modifierConditional:(r,n)=>n===!0&&r!==void 0?`${o}--${r}`:void 0,child:r=>f(f(o).element(r)),classNames:l});export{f as b,l as c};