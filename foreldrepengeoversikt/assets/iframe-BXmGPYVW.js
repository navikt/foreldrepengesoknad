function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./AppContainer.stories-CcwflkHg.js","./index-Cmv8OFop.js","./index-BBkUAzwr.js","./index-Q75-b4lV.css","./attachmentApi-REiYrTSQ.js","./index-PqR-_bA4.js","./nb_NO-ByI5GFql.js","./stepFooter-Cgl20CZ_.js","./index-_4_hgnnR.js","./stepFooter-Dh1QBGMq.css","./nb_NO-sp6CbUW8.css","./Ytelse-C5aoEp6i.js","./EttersendingPage-CqI9juZe.js","./useId-4vqqPgaI.js","./EttersendingPage-B8mQMwck.css","./lodash-C5xI8lPW.js","./BekreftelseSendtSøknad-BygminOq.js","./useControllableState-juGbKuZB.js","./BekreftelseSendtSøknad-DkVEiy7s.css","./MinidialogSkjema-cKvDXAmy.js","./MinidialogSkjema-DYPARKkg.css","./AppContainer-DY3JFtzj.css","./BekreftelseSendtSøknad.stories-HdNSxpmP.js","./MinidialogSkjema.stories-yImCWn5t.js","./v4-D8aEg3BZ.js","./EttersendingPage.stories-BOvNgOcQ.js","./entry-preview-kGuIN3g4.js","./react-18-B-OKcmzb.js","./entry-preview-docs-2F5fHK9m.js","./_getPrototype-QNcgTGLk.js","./index-DrFu-skq.js","./preview-K4_qCkL4.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-ZCqx-POQ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function _(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=_(e);fetch(e.href,t)}})();const E="modulepreload",O=function(i,n){return new URL(i,n).href},d={},o=function(n,_,a){let e=Promise.resolve();if(_&&_.length>0){const t=document.getElementsByTagName("link");e=Promise.all(_.map(r=>{if(r=O(r,a),r in d)return;d[r]=!0;const l=r.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(!!a)for(let c=t.length-1;c>=0;c--){const m=t[c];if(m.href===r&&(!l||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${p}`))return;const s=document.createElement("link");if(s.rel=l?"stylesheet":E,l||(s.as="script",s.crossOrigin=""),s.href=r,document.head.appendChild(s),l)return new Promise((c,m)=>{s.addEventListener("load",c),s.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})}))}return e.then(()=>n()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})},{createBrowserChannel:f}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,u=f({page:"preview"});R.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const P={"./src/app/AppContainer.stories.tsx":async()=>o(()=>import("./AppContainer.stories-CcwflkHg.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]),import.meta.url),"./src/app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad.stories.tsx":async()=>o(()=>import("./BekreftelseSendtSøknad.stories-HdNSxpmP.js"),__vite__mapDeps([22,1,2,3,16,11,13,17,18]),import.meta.url),"./src/app/components/minidialog-skjema/MinidialogSkjema.stories.tsx":async()=>o(()=>import("./MinidialogSkjema.stories-yImCWn5t.js"),__vite__mapDeps([23,1,2,3,24,4,5,11,19,7,8,9,17,20]),import.meta.url),"./src/app/pages/ettersending/EttersendingPage.stories.tsx":async()=>o(()=>import("./EttersendingPage.stories-BOvNgOcQ.js"),__vite__mapDeps([25,1,2,3,4,5,12,7,8,9,11,13,14]),import.meta.url)};async function T(i){return P[i]()}const{composeConfigs:L,PreviewWeb:w,ClientApi:A}=__STORYBOOK_MODULE_PREVIEW_API__,v=async()=>{const i=await Promise.all([o(()=>import("./entry-preview-kGuIN3g4.js"),__vite__mapDeps([26,2,27,5]),import.meta.url),o(()=>import("./entry-preview-docs-2F5fHK9m.js"),__vite__mapDeps([28,29,2,8,30]),import.meta.url),o(()=>import("./preview-D2mTgpUD.js"),__vite__mapDeps([]),import.meta.url),o(()=>import("./preview-K4_qCkL4.js"),__vite__mapDeps([31,24]),import.meta.url),o(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([32,30]),import.meta.url),o(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),o(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),o(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([33,30]),import.meta.url),o(()=>import("./preview-Cv3rAi2i.js"),__vite__mapDeps([]),import.meta.url),o(()=>import("./preview-ZCqx-POQ.js"),__vite__mapDeps([34,1,2,3,6,7,8,9,10]),import.meta.url)]);return L(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new w(T,v);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{o as _};
