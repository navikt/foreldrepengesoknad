import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const d="modulepreload",E=function(_,i){return new URL(_,i).href},O={},o=function(i,s,a){if(!s||s.length===0)return i();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=E(e,a),e in O)return;O[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!a)for(let c=t.length-1;c>=0;c--){const l=t[c];if(l.href===e&&(!r||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const n=document.createElement("link");if(n.rel=r?"stylesheet":d,r||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),r)return new Promise((c,l)=>{n.addEventListener("load",c),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>i()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:p}=__STORYBOOK_MODULE_CHANNELS__,{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,u=p({page:"preview"});f.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const R={"./src/app/AppContainer.stories.tsx":async()=>o(()=>import("./AppContainer.stories-71858b9d.js"),["./AppContainer.stories-71858b9d.js","./index-205ee57c.js","./index-1b03fe98.js","./index-079a54e8.css","./attachmentApi-0212280a.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./EttersendingPage-a5651434.js","./EttersendingPage-0716f261.css","./MinidialogSkjema-7267cafb.js","./MinidialogSkjema-a8d97ede.css","./nb_NO-30e11352.js","./nb_NO-882a6502.css","./AppContainer.stories-e9727dd2.css"],import.meta.url),"./src/app/components/minidialog-skjema/MinidialogSkjema.stories.tsx":async()=>o(()=>import("./MinidialogSkjema.stories-2d4200b2.js"),["./MinidialogSkjema.stories-2d4200b2.js","./index-205ee57c.js","./index-1b03fe98.js","./index-079a54e8.css","./preview-errors-dde4324f.js","./index-356e4a49.js","./attachmentApi-0212280a.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./MinidialogSkjema-7267cafb.js","./MinidialogSkjema-a8d97ede.css"],import.meta.url),"./src/app/pages/ettersending/EttersendingPage.stories.tsx":async()=>o(()=>import("./EttersendingPage.stories-15555a53.js"),["./EttersendingPage.stories-15555a53.js","./index-205ee57c.js","./index-1b03fe98.js","./index-079a54e8.css","./attachmentApi-0212280a.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./EttersendingPage-a5651434.js","./EttersendingPage-0716f261.css"],import.meta.url)};async function w(_){return R[_]()}const{composeConfigs:P,PreviewWeb:T,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,S=async()=>{const _=await Promise.all([o(()=>import("./entry-preview-2845a20c.js"),["./entry-preview-2845a20c.js","./index-1b03fe98.js","./react-18-5df836b6.js","./index-6fd5a17b.js"],import.meta.url),o(()=>import("./entry-preview-docs-f0fb39cf.js"),["./entry-preview-docs-f0fb39cf.js","./_getPrototype-f54012e6.js","./index-1b03fe98.js","./index-f6b105ee.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-c445130c.js"),[],import.meta.url),o(()=>import("./preview-77a968f3.js"),["./preview-77a968f3.js","./preview-errors-dde4324f.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-30b54f76.js"),["./preview-30b54f76.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-c56bf6ac.js"),[],import.meta.url),o(()=>import("./preview-da31036b.js"),["./preview-da31036b.js","./index-356e4a49.js"],import.meta.url),o(()=>import("./preview-0ef86afd.js"),[],import.meta.url),o(()=>import("./preview-0d018cde.js"),[],import.meta.url),o(()=>import("./preview-10fca22c.js"),["./preview-10fca22c.js","./index-205ee57c.js","./index-1b03fe98.js","./index-079a54e8.css","./nb_NO-30e11352.js","./nb_NO-882a6502.css"],import.meta.url)]);return P(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new T;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:w,getProjectAnnotations:S});export{o as _};
