var f={},c={get exports(){return f},set exports(e){f=e}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var s={}.hasOwnProperty;function n(){for(var o=[],i=0;i<arguments.length;i++){var t=arguments[i];if(t){var r=typeof t;if(r==="string"||r==="number")o.push(t);else if(Array.isArray(t)){if(t.length){var l=n.apply(null,t);l&&o.push(l)}}else if(r==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){o.push(t.toString());continue}for(var a in t)s.call(t,a)&&t[a]&&o.push(a)}}}return o.join(" ")}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(c);const p=f,u=e=>({block:e,element:(s,n)=>`${e}__${s}${n?` ${e}__${s}--${n}`:""}`,modifier:s=>`${e}--${s}`,modifierConditional:(s,n)=>n===!0&&s!==void 0?`${e}--${s}`:void 0,child:s=>u(u(e).element(s)),classNames:p});export{u as b,p as c};
//# sourceMappingURL=bemUtils-f774aeb7.js.map
