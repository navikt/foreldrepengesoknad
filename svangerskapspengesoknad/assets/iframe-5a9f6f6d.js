import"../sb-preview/runtime.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const E="modulepreload",p=function(i,n){return new URL(i,n).href},d={},o=function(n,s,c){if(!s||s.length===0)return n();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=p(e,c),e in d)return;d[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!c)for(let l=t.length-1;l>=0;l--){const a=t[l];if(a.href===e&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const _=document.createElement("link");if(_.rel=r?"stylesheet":E,r||(_.as="script",_.crossOrigin=""),_.href=e,document.head.appendChild(_),r)return new Promise((l,a)=>{_.addEventListener("load",l),_.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>n()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:f}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,O=f({page:"preview"});R.setChannel(O);window.__STORYBOOK_ADDONS_CHANNEL__=O;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=O);const w={"./src/app/connectedComponents/svangerskapspengesoknad/Svangerskapspengesoknad.stories.tsx":async()=>o(()=>import("./Svangerskapspengesoknad.stories-f1df1a94.js"),["./Svangerskapspengesoknad.stories-f1df1a94.js","./jsx-runtime-69eee039.js","./index-7c191284.js","./_baseIteratee-a07492a4.js","./floating-ui.react-dom-b4774fa6.js","./index-b3a39e30.js","./v4-a960c1f4.js","./Svangerskapspengesoknad.stories-26f46e23.css"],import.meta.url)};async function u(i){return w[i]()}u.__docgenInfo={description:"",methods:[],displayName:"importFn"};const{composeConfigs:P,PreviewWeb:T,ClientApi:S}=__STORYBOOK_MODULE_PREVIEW_API__,h=async()=>{const i=await Promise.all([o(()=>import("./config-e8708662.js"),["./config-e8708662.js","./index-d475d2ea.js","./index-7c191284.js","./_getPrototype-99a95966.js","./_baseIteratee-a07492a4.js","./index-b3a39e30.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-d3eec566.js"),[],import.meta.url),o(()=>import("./preview-9ec34bf1.js"),["./preview-9ec34bf1.js","./v4-a960c1f4.js"],import.meta.url),o(()=>import("./preview-770cc08b.js"),["./preview-770cc08b.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-25cb0eda.js"),["./preview-25cb0eda.js","./index-d475d2ea.js"],import.meta.url),o(()=>import("./preview-d8c963a4.js"),["./preview-d8c963a4.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-b79ea209.js"),["./preview-b79ea209.js","./index-d475d2ea.js"],import.meta.url),o(()=>import("./preview-278f5a49.js"),["./preview-278f5a49.js","./jsx-runtime-69eee039.js","./index-7c191284.js"],import.meta.url)]);return P(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new T;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new S({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:u,getProjectAnnotations:h});export{o as _};
//# sourceMappingURL=iframe-5a9f6f6d.js.map