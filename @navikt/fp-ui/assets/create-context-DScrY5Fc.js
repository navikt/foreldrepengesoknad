import{R as l,r as f}from"./index-BX3iQpgp.js";function v(e){return o=>{e.forEach(t=>{typeof t=="function"?t(o):t!=null&&(t.current=o)})}}function g(...e){return l.useCallback(v(e),e)}var y=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};function O(e,o){return`${e} returned \`undefined\`. Seems you forgot to wrap component within ${o}`}function E(e={}){const{name:o,hookName:t="useContext",providerName:r="Provider",errorMessage:n,defaultValue:m}=e,s=f.createContext(m),x=f.forwardRef((c,a)=>{var{children:i}=c,u=y(c,["children"]);const p=l.useMemo(()=>u,Object.values(u));return l.createElement(s.Provider,{value:a?Object.assign(Object.assign({},p),{ref:a}):p},i)});function d(c=!0){var a;const i=f.useContext(s);if(!i&&c){const u=new Error(n??O(t,r));throw u.name="ContextError",(a=Error.captureStackTrace)===null||a===void 0||a.call(Error,u,d),u}return i}return s.displayName=o,[x,d]}export{E as c,v as m,g as u};
