import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const d="modulepreload",E=function(_,i){return new URL(_,i).href},m={},r=function(i,s,a){if(!s||s.length===0)return i();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=E(e,a),e in m)return;m[e]=!0;const o=e.endsWith(".css"),O=o?'[rel="stylesheet"]':"";if(!!a)for(let c=t.length-1;c>=0;c--){const l=t[c];if(l.href===e&&(!o||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${O}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":d,o||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),o)return new Promise((c,l)=>{n.addEventListener("load",c),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>i()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})},{createBrowserChannel:p}=__STORYBOOK_MODULE_CHANNELS__,{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,u=p({page:"preview"});f.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const R={"./src/app/AppContainer.stories.tsx":async()=>r(()=>import("./AppContainer.stories-5484fdd5.js"),["./AppContainer.stories-5484fdd5.js","./index-e995adf2.js","./index-1b03fe98.js","./index-079a54e8.css","./attachmentApi-47b1ac96.js","./Ytelse-ffb4c97d.js","./index-13d55e84.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./EttersendingPage-90345a3e.js","./useId-49f44336.js","./EttersendingPage-0716f261.css","./BekreftelseSendtSøknad-c40d15ac.js","./useControllableState-7d9ed3c3.js","./BekreftelseSendtSøknad-5686e8d7.css","./MinidialogSkjema-9986b970.js","./MinidialogSkjema-a8d97ede.css","./nb_NO-30e11352.js","./nb_NO-882a6502.css","./AppContainer.stories-20f13051.css"],import.meta.url),"./src/app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad.stories.tsx":async()=>r(()=>import("./BekreftelseSendtSøknad.stories-93c819aa.js"),["./BekreftelseSendtSøknad.stories-93c819aa.js","./index-e995adf2.js","./index-1b03fe98.js","./index-079a54e8.css","./BekreftelseSendtSøknad-c40d15ac.js","./Ytelse-ffb4c97d.js","./useId-49f44336.js","./useControllableState-7d9ed3c3.js","./BekreftelseSendtSøknad-5686e8d7.css"],import.meta.url),"./src/app/components/minidialog-skjema/MinidialogSkjema.stories.tsx":async()=>r(()=>import("./MinidialogSkjema.stories-6cf4c0cd.js"),["./MinidialogSkjema.stories-6cf4c0cd.js","./index-e995adf2.js","./index-1b03fe98.js","./index-079a54e8.css","./preview-errors-dde4324f.js","./index-356e4a49.js","./attachmentApi-47b1ac96.js","./Ytelse-ffb4c97d.js","./index-13d55e84.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./MinidialogSkjema-9986b970.js","./useControllableState-7d9ed3c3.js","./MinidialogSkjema-a8d97ede.css"],import.meta.url),"./src/app/pages/ettersending/EttersendingPage.stories.tsx":async()=>r(()=>import("./EttersendingPage.stories-849570e3.js"),["./EttersendingPage.stories-849570e3.js","./index-e995adf2.js","./index-1b03fe98.js","./index-079a54e8.css","./attachmentApi-47b1ac96.js","./Ytelse-ffb4c97d.js","./index-13d55e84.js","./index-f6b105ee.js","./index-6fd5a17b.js","./attachmentApi-7b0908ae.css","./EttersendingPage-90345a3e.js","./useId-49f44336.js","./EttersendingPage-0716f261.css"],import.meta.url)};async function P(_){return R[_]()}const{composeConfigs:w,PreviewWeb:T,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,S=async()=>{const _=await Promise.all([r(()=>import("./entry-preview-2845a20c.js"),["./entry-preview-2845a20c.js","./index-1b03fe98.js","./react-18-5df836b6.js","./index-6fd5a17b.js"],import.meta.url),r(()=>import("./entry-preview-docs-f0fb39cf.js"),["./entry-preview-docs-f0fb39cf.js","./_getPrototype-f54012e6.js","./index-1b03fe98.js","./index-f6b105ee.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-0f0b09ae.js"),[],import.meta.url),r(()=>import("./preview-77a968f3.js"),["./preview-77a968f3.js","./preview-errors-dde4324f.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-30b54f76.js"),["./preview-30b54f76.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-c56bf6ac.js"),[],import.meta.url),r(()=>import("./preview-da31036b.js"),["./preview-da31036b.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-0ef86afd.js"),[],import.meta.url),r(()=>import("./preview-0d018cde.js"),[],import.meta.url),r(()=>import("./preview-4afd9223.js"),["./preview-4afd9223.js","./index-e995adf2.js","./index-1b03fe98.js","./index-079a54e8.css","./index-13d55e84.js","./nb_NO-30e11352.js","./nb_NO-882a6502.css"],import.meta.url)]);return w(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new T;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:P,getProjectAnnotations:S});export{r as _};
