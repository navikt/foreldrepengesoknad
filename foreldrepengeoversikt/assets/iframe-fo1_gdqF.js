function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./AppContainer.stories-C8P6SDIF.js","./Link-ChSI4wEa.js","./index-DVXBtNgz.js","./Link-OZ3BDj_V.css","./ScrollToTop-Bt4lKqOY.js","./index-Cbx7Fas8.js","./nb_NO-Cp6KsK1W.js","./infobox.module-Cqovk6pe.js","./tslib.es6-CMwweBXX.js","./index-Dcs0RV0A.js","./infobox-BLZ2E1yR.css","./nb_NO-sp6CbUW8.css","./EttersendingPage-DFukE6fT.js","./Ytelse-CGhtBwhY.js","./useId-DbilmxAP.js","./EttersendingPage-B8mQMwck.css","./_getTag-Dppzj2yo.js","./BekreftelseSendtSøknad-D9cxySDv.js","./useControllableState-cgc7bYZe.js","./BekreftelseSendtSøknad-DkVEiy7s.css","./MinidialogSkjema-DsYgCoMc.js","./MinidialogSkjema-DYPARKkg.css","./AppContainer-AZj4Pjog.css","./BekreftelseSendtSøknad.stories-T1bhjXFh.js","./MinidialogSkjema.stories-B_7DmcRi.js","./v4-CQkTLCs1.js","./EttersendingPage.stories-Bc1469wj.js","./entry-preview-B4L7F0XH.js","./react-18-CPpMsYPv.js","./entry-preview-docs-B2v8WoKj.js","./_getPrototype-D917Qe-_.js","./index-DrFu-skq.js","./preview-CVycp9di.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-CNUjOMTj.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const O="modulepreload",d=function(t,i){return new URL(t,i).href},u={},_=function(i,n,a){let e=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link");e=Promise.all(n.map(o=>{if(o=d(o,a),o in u)return;u[o]=!0;const c=o.endsWith(".css"),E=c?'[rel="stylesheet"]':"";if(!!a)for(let l=r.length-1;l>=0;l--){const m=r[l];if(m.href===o&&(!c||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${E}`))return;const s=document.createElement("link");if(s.rel=c?"stylesheet":O,c||(s.as="script",s.crossOrigin=""),s.href=o,document.head.appendChild(s),c)return new Promise((l,m)=>{s.addEventListener("load",l),s.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${o}`)))})}))}return e.then(()=>i()).catch(r=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r})},{createBrowserChannel:f}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,p=f({page:"preview"});R.setChannel(p);window.__STORYBOOK_ADDONS_CHANNEL__=p;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=p);const T={"./src/app/AppContainer.stories.tsx":async()=>_(()=>import("./AppContainer.stories-C8P6SDIF.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]),import.meta.url),"./src/app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad.stories.tsx":async()=>_(()=>import("./BekreftelseSendtSøknad.stories-T1bhjXFh.js"),__vite__mapDeps([23,1,2,3,17,14,13,18,19]),import.meta.url),"./src/app/components/minidialog-skjema/MinidialogSkjema.stories.tsx":async()=>_(()=>import("./MinidialogSkjema.stories-B_7DmcRi.js"),__vite__mapDeps([24,1,2,3,25,4,5,13,20,7,8,9,10,18,21]),import.meta.url),"./src/app/pages/ettersending/EttersendingPage.stories.tsx":async()=>_(()=>import("./EttersendingPage.stories-Bc1469wj.js"),__vite__mapDeps([26,1,2,3,4,5,12,7,8,9,10,13,14,15]),import.meta.url)};async function L(t){return T[t]()}const{composeConfigs:P,PreviewWeb:S,ClientApi:V}=__STORYBOOK_MODULE_PREVIEW_API__,I=async(t=[])=>{const i=await Promise.all([t.at(0)??_(()=>import("./entry-preview-B4L7F0XH.js"),__vite__mapDeps([27,2,28,5]),import.meta.url),t.at(1)??_(()=>import("./entry-preview-docs-B2v8WoKj.js"),__vite__mapDeps([29,30,2,16,9,31]),import.meta.url),t.at(2)??_(()=>import("./preview-BM0t77Ik.js"),__vite__mapDeps([]),import.meta.url),t.at(3)??_(()=>import("./preview-CVycp9di.js"),__vite__mapDeps([32,25]),import.meta.url),t.at(4)??_(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([33,31]),import.meta.url),t.at(5)??_(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),t.at(6)??_(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),t.at(7)??_(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([34,31]),import.meta.url),t.at(8)??_(()=>import("./preview-BpcF_O6y.js"),__vite__mapDeps([]),import.meta.url),t.at(9)??_(()=>import("./preview-_7HYsTXB.js"),__vite__mapDeps([]),import.meta.url),t.at(10)??_(()=>import("./preview-CNUjOMTj.js"),__vite__mapDeps([35,1,2,3,6,7,8,9,10,11]),import.meta.url)]);return P(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new S(L,I);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{_};
