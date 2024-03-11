import"../sb-preview/runtime.js";(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const m="modulepreload",E=function(i,_){return new URL(i,_).href},d={},r=function(_,s,l){if(!s||s.length===0)return _();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=E(e,l),e in d)return;d[e]=!0;const o=e.endsWith(".css"),O=o?'[rel="stylesheet"]':"";if(!!l)for(let a=t.length-1;a>=0;a--){const c=t[a];if(c.href===e&&(!o||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${O}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":m,o||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),o)return new Promise((a,c)=>{n.addEventListener("load",a),n.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>_()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})},{createBrowserChannel:p}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,u=p({page:"preview"});R.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const f={"./src/utenlandsopphold/UtenlandsoppholdPanel.stories.tsx":async()=>r(()=>import("./UtenlandsoppholdPanel.stories-09677a41.js"),["./UtenlandsoppholdPanel.stories-09677a41.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./useUtenlandsoppholdIntl-287c87d4.js","./preview-errors-dde4324f.js","./index-356e4a49.js","./isNativeReflectConstruct-554b52b6.js","./index-d3ea75b5.js","./index-ff53cee2.js","./provider-595edeb0.js","./index-9d475cdf.js","./useUtenlandsoppholdIntl-06839890.css"],import.meta.url),"./src/utenlandsoppholdSenere/SenereUtenlandsoppholdPanel.stories.tsx":async()=>r(()=>import("./SenereUtenlandsoppholdPanel.stories-a884caad.js"),["./SenereUtenlandsoppholdPanel.stories-a884caad.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./useUtenlandsoppholdIntl-287c87d4.js","./preview-errors-dde4324f.js","./index-356e4a49.js","./isNativeReflectConstruct-554b52b6.js","./index-d3ea75b5.js","./index-ff53cee2.js","./provider-595edeb0.js","./index-9d475cdf.js","./useUtenlandsoppholdIntl-06839890.css","./HorizontalLine-461a0439.js"],import.meta.url),"./src/utenlandsoppholdTidligere/TidligereUtenlandsoppholdPanel.stories.tsx":async()=>r(()=>import("./TidligereUtenlandsoppholdPanel.stories-bc569182.js"),["./TidligereUtenlandsoppholdPanel.stories-bc569182.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./useUtenlandsoppholdIntl-287c87d4.js","./preview-errors-dde4324f.js","./index-356e4a49.js","./isNativeReflectConstruct-554b52b6.js","./index-d3ea75b5.js","./index-ff53cee2.js","./provider-595edeb0.js","./index-9d475cdf.js","./useUtenlandsoppholdIntl-06839890.css","./HorizontalLine-461a0439.js"],import.meta.url)};async function P(i){return f[i]()}const{composeConfigs:T,PreviewWeb:w,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,h=async()=>{const i=await Promise.all([r(()=>import("./entry-preview-1f5c28fc.js"),["./entry-preview-1f5c28fc.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./react-18-988a5df2.js","./index-d3ea75b5.js"],import.meta.url),r(()=>import("./entry-preview-docs-70a7bd42.js"),["./entry-preview-docs-70a7bd42.js","./_getPrototype-1e53b583.js","./_commonjsHelpers-de833af9.js","./index-9d475cdf.js","./index-356e4a49.js","./index-76fb7be0.js"],import.meta.url),r(()=>import("./preview-73104b77.js"),["./preview-73104b77.js","./index-11d98b33.js"],import.meta.url),r(()=>import("./preview-8aa1d5d5.js"),[],import.meta.url),r(()=>import("./preview-77a968f3.js"),["./preview-77a968f3.js","./preview-errors-dde4324f.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-30b54f76.js"),["./preview-30b54f76.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-c56bf6ac.js"),[],import.meta.url),r(()=>import("./preview-da31036b.js"),["./preview-da31036b.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-0ef86afd.js"),[],import.meta.url),r(()=>import("./preview-21802b0a.js"),["./preview-21802b0a.js","./_commonjsHelpers-de833af9.js"],import.meta.url),r(()=>import("./preview-dc4e77b5.js"),["./preview-dc4e77b5.js","./index-ff53cee2.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./provider-595edeb0.js"],import.meta.url),r(()=>import("./preview-8fea90e6.js"),["./preview-8fea90e6.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-ff53cee2.js","./preview-f4bc5bbd.css"],import.meta.url)]);return T(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new w;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:P,getProjectAnnotations:h});export{r as _};
