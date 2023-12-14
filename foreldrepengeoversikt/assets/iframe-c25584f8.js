import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const E="modulepreload",p=function(n,i){return new URL(n,i).href},O={},o=function(i,s,c){if(!s||s.length===0)return i();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=p(e,c),e in O)return;O[e]=!0;const r=e.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!c)for(let a=t.length-1;a>=0;a--){const l=t[a];if(l.href===e&&(!r||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const _=document.createElement("link");if(_.rel=r?"stylesheet":E,r||(_.as="script",_.crossOrigin=""),_.href=e,document.head.appendChild(_),r)return new Promise((a,l)=>{_.addEventListener("load",a),_.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>i()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:f}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,u=f({page:"preview"});R.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const w={"./src/app/AppContainer.stories.tsx":async()=>o(()=>import("./AppContainer.stories-988c5544.js"),["./AppContainer.stories-988c5544.js","./index-8504a608.js","./_createSet-a1fd5098.js","./_baseToString-53b0dbb2.js","./index-b613d0ba.js","./v4-a960c1f4.js","./index-b218b220.css","./attachmentApi-4d7e5fa6.js","./attachmentApi-7b7ccbf1.css","./nb_NO-f827bb52.js","./nb_NO-882a6502.css","./EttersendingPage-919b1f28.js","./EttersendingPage-0716f261.css","./MinidialogSkjema-70512268.js","./MinidialogSkjema-a8d97ede.css","./AppContainer.stories-18d0778d.css"],import.meta.url),"./src/app/pages/ettersending/EttersendingPage.stories.tsx":async()=>o(()=>import("./EttersendingPage.stories-4da8d061.js"),["./EttersendingPage.stories-4da8d061.js","./index-8504a608.js","./_createSet-a1fd5098.js","./_baseToString-53b0dbb2.js","./index-b613d0ba.js","./v4-a960c1f4.js","./index-b218b220.css","./attachmentApi-4d7e5fa6.js","./attachmentApi-7b7ccbf1.css","./EttersendingPage-919b1f28.js","./EttersendingPage-0716f261.css"],import.meta.url),"./src/app/components/minidialog-skjema/MinidialogSkjema.stories.tsx":async()=>o(()=>import("./MinidialogSkjema.stories-f9a7baa7.js"),["./MinidialogSkjema.stories-f9a7baa7.js","./index-8504a608.js","./_createSet-a1fd5098.js","./_baseToString-53b0dbb2.js","./index-b613d0ba.js","./v4-a960c1f4.js","./index-b218b220.css","./chunk-AY7I2SME-331d03ca.js","./attachmentApi-4d7e5fa6.js","./attachmentApi-7b7ccbf1.css","./MinidialogSkjema-70512268.js","./MinidialogSkjema-a8d97ede.css"],import.meta.url)};async function m(n){return w[n]()}m.__docgenInfo={description:"",methods:[],displayName:"importFn"};const{composeConfigs:P,PreviewWeb:T,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,S=async()=>{const n=await Promise.all([o(()=>import("./config-6f8efb31.js"),["./config-6f8efb31.js","./index-d475d2ea.js","./_baseToString-53b0dbb2.js","./_getPrototype-70826e8a.js","./index-b613d0ba.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-61c40d8e.js"),[],import.meta.url),o(()=>import("./preview-549a8605.js"),["./preview-549a8605.js","./chunk-AY7I2SME-331d03ca.js","./v4-a960c1f4.js"],import.meta.url),o(()=>import("./preview-770cc08b.js"),["./preview-770cc08b.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-25cb0eda.js"),["./preview-25cb0eda.js","./index-d475d2ea.js"],import.meta.url),o(()=>import("./preview-d8c963a4.js"),["./preview-d8c963a4.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-b79ea209.js"),["./preview-b79ea209.js","./index-d475d2ea.js"],import.meta.url),o(()=>import("./preview-c17b6e73.js"),[],import.meta.url),o(()=>import("./preview-5ebb96a7.js"),["./preview-5ebb96a7.js","./index-8504a608.js","./_createSet-a1fd5098.js","./_baseToString-53b0dbb2.js","./index-b613d0ba.js","./v4-a960c1f4.js","./index-b218b220.css","./nb_NO-f827bb52.js","./nb_NO-882a6502.css"],import.meta.url)]);return P(n)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new T;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:m,getProjectAnnotations:S});export{o as _};
//# sourceMappingURL=iframe-c25584f8.js.map