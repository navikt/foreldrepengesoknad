import{r as s}from"./index-BX3iQpgp.js";import{c as l}from"./client-Dtq5pYPT.js";import"./index-B1dLepta.js";var n=new Map;function m(){return globalThis.IS_REACT_ACT_ENVIRONMENT}var a=({callback:e,children:r})=>{let t=s.useRef();return s.useLayoutEffect(()=>{t.current!==e&&(t.current=e,e())},[e]),r};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let e=null,r=null;return{promise:new Promise((t,o)=>{e=t,r=o}),resolve:e,reject:r}});var E=async(e,r,t)=>{let o=await c(r,t);if(m()){o.render(e);return}let{promise:u,resolve:i}=Promise.withResolvers();return o.render(s.createElement(a,{callback:i},e)),u},f=(e,r)=>{let t=n.get(e);t&&(t.unmount(),n.delete(e))},c=async(e,r)=>{let t=n.get(e);return t||(t=l(e,r),n.set(e,t)),t};export{E as renderElement,f as unmountElement};
