const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./AppContainer.stories-BJu5Cst3.js","./tslib.es6-C_-gbNBy.js","./index-CTjT7uj6.js","./useEsNavigator-3O4wt2tb.js","./dateFormValidation-DWsPbI_J.js","./index-BRV0Se7Z.js","./index-9r8iugjR.js","./dateFormValidation-B70Sai6s.css","./DokumentasjonSteg-BpcEkCSM.js","./ErrorSummaryHookForm-D4beRXNy.js","./OmBarnet-BV6De4cI.js","./apiInterceptor-D9XpNqGK.js","./nn_NO-KsgMEw6-.js","./BoIUtlandetOppsummeringspunkt-lAjw-SDh.js","./ConfirmationPanel-CjrUUv6E.js","./BoIUtlandetOppsummeringspunkt-CCKE4cz3.css","./TidligereUtenlandsoppholdPanel-PGSWBADL.js","./OppsummeringSteg-C6_Qvbmi.js","./OmBarnetSteg-DqB7-fE-.js","./SøkersituasjonSteg-Dvjb_wZX.js","./UtenlandsoppholdSteg-CX4YQK2H.js","./SenereUtenlandsoppholdSteg-8gMvU0Gu.js","./TidligereUtenlandsoppholdSteg-CZwYCVL1.js","./Velkommen-BWdNPlV-.js","./DokumentasjonSteg.stories-FCtaCD_K.js","./chunk-MZXVCX43-CM0pFb8Z.js","./v4-CQkTLCs1.js","./OmBarnetSteg.stories-CsKtzOD9.js","./OppsummeringSteg.stories-DBdb2k64.js","./SøkersituasjonSteg.stories-5raCOetv.js","./UtenlandsoppholdSteg.stories-B5Aap3zM.js","./SenereUtenlandsoppholdSteg.stories-DYE5Rg8G.js","./TidligereUtenlandsoppholdSteg.stories-CzMGG4Uf.js","./Velkommen.stories-DS0L7tdR.js","./entry-preview-DEA8MR3h.js","./react-18-DFEOekEM.js","./entry-preview-docs-BHdljrbe.js","./_getPrototype-BxrpB_Xa.js","./index-DrFu-skq.js","./preview-CVycp9di.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-C9xFGy1k.js","./preview-DFgTcZ7q.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const f="modulepreload",R=function(o,_){return new URL(o,_).href},E={},t=function(_,c,a){let e=Promise.resolve();if(c&&c.length>0){const r=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),d=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=Promise.all(c.map(i=>{if(i=R(i,a),i in E)return;E[i]=!0;const l=i.endsWith(".css"),O=l?'[rel="stylesheet"]':"";if(!!a)for(let m=r.length-1;m>=0;m--){const u=r[m];if(u.href===i&&(!l||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${O}`))return;const n=document.createElement("link");if(n.rel=l?"stylesheet":f,l||(n.as="script",n.crossOrigin=""),n.href=i,d&&n.setAttribute("nonce",d),document.head.appendChild(n),l)return new Promise((m,u)=>{n.addEventListener("load",m),n.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${i}`)))})}))}return e.then(()=>_()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:g}=__STORYBOOK_MODULE_PREVIEW_API__,p=T({page:"preview"});g.setChannel(p);window.__STORYBOOK_ADDONS_CHANNEL__=p;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=p);const L={"./src/AppContainer.stories.tsx":async()=>t(()=>import("./AppContainer.stories-BJu5Cst3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]),import.meta.url),"./src/steg/dokumentasjon/DokumentasjonSteg.stories.tsx":async()=>t(()=>import("./DokumentasjonSteg.stories-FCtaCD_K.js"),__vite__mapDeps([24,1,2,25,26,3,4,5,6,7,8,9,10,11]),import.meta.url),"./src/steg/omBarnet/OmBarnetSteg.stories.tsx":async()=>t(()=>import("./OmBarnetSteg.stories-CsKtzOD9.js"),__vite__mapDeps([27,1,2,25,26,3,4,5,6,7,18,9]),import.meta.url),"./src/steg/oppsummering/OppsummeringSteg.stories.tsx":async()=>t(()=>import("./OppsummeringSteg.stories-DBdb2k64.js"),__vite__mapDeps([28,1,2,25,26,3,4,5,6,7,10,17,13,11,14,15]),import.meta.url),"./src/steg/sokersituasjon/SøkersituasjonSteg.stories.tsx":async()=>t(()=>import("./SøkersituasjonSteg.stories-5raCOetv.js"),__vite__mapDeps([29,1,2,25,26,3,4,5,6,7,19,9]),import.meta.url),"./src/steg/utenlandsopphold/UtenlandsoppholdSteg.stories.tsx":async()=>t(()=>import("./UtenlandsoppholdSteg.stories-B5Aap3zM.js"),__vite__mapDeps([30,1,2,25,26,3,4,5,6,7,20,16,9]),import.meta.url),"./src/steg/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg.stories.tsx":async()=>t(()=>import("./SenereUtenlandsoppholdSteg.stories-DYE5Rg8G.js"),__vite__mapDeps([31,1,2,25,26,3,4,5,6,7,21,16,9]),import.meta.url),"./src/steg/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg.stories.tsx":async()=>t(()=>import("./TidligereUtenlandsoppholdSteg.stories-CzMGG4Uf.js"),__vite__mapDeps([32,1,2,25,26,3,4,5,6,7,22,16,9]),import.meta.url),"./src/velkommen/Velkommen.stories.tsx":async()=>t(()=>import("./Velkommen.stories-DS0L7tdR.js"),__vite__mapDeps([33,1,2,25,26,3,4,5,6,7,23,14]),import.meta.url)};async function S(o){return L[o]()}const{composeConfigs:P,PreviewWeb:y,ClientApi:v}=__STORYBOOK_MODULE_PREVIEW_API__,I=async(o=[])=>{const _=await Promise.all([o.at(0)??t(()=>import("./entry-preview-DEA8MR3h.js"),__vite__mapDeps([34,2,35,6]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-BHdljrbe.js"),__vite__mapDeps([36,37,2,5,38]),import.meta.url),o.at(2)??t(()=>import("./preview-C_OmdfUC.js"),[],import.meta.url),o.at(3)??t(()=>import("./preview-CVycp9di.js"),__vite__mapDeps([39,26]),import.meta.url),o.at(4)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([40,38]),import.meta.url),o.at(5)??t(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),o.at(6)??t(()=>import("./preview-Db4Idchh.js"),[],import.meta.url),o.at(7)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([41,38]),import.meta.url),o.at(8)??t(()=>import("./preview-BpcF_O6y.js"),[],import.meta.url),o.at(9)??t(()=>import("./preview-C9xFGy1k.js"),__vite__mapDeps([42,12,4,2,1,5,6,7,13,11,14,15,16,9,43]),import.meta.url)]);return P(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new y(S,I);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
