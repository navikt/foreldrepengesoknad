const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Attachment.stories-CaYnCGU8.js","./jsx-runtime-Cw0GR0a5.js","./index-CTjT7uj6.js","./Attachment-Cre5Mph2.js","./bemUtils-BssjAfnF.js","./index-D7P32T3h.js","./tslib.es6-BntfKcQG.js","./SlettKnapp-C0vA1gk3.js","./SlettKnapp-C-_lrY4c.css","./intlUtils-C_Owl2LD.js","./Loader-Bk4YieMA.js","./clsx-B-dksMZM.js","./useId-Did2T99i.js","./Link-D0Z4KE89.js","./Attachment-CUNn4jlQ.css","./AttachmentList.stories-euY-31GL.js","./guid-CsArkN6i.js","./BackLink.stories-gTL6jeDD.js","./index-B7Wol3-5.js","./index-9r8iugjR.js","./Back-CBmEjlTt.js","./useId-BHtrcvnP.js","./message-HAvjE7nT.js","./Banner.stories-rvJjmNNp.js","./Banner-C3G8xbi8.js","./Banner-CgG7fPzd.css","./Block.stories-RlsZGpSv.js","./Block-DQ6Cq2es.js","./Block-BcGJtG4R.css","./AvbrytSoknadDialog.stories-D8iq6AuY.js","./BekreftDialog-BxjCbYQA.js","./Modal-BNQc0mm_.js","./Label-UU7-twIW.js","./composeEventHandlers-DeH74NdU.js","./create-context-DOtOKOIE.js","./useId-BFxX0aRd.js","./BekreftDialog.stories-D4KLI75C.js","./DisplayTextWithLabel.stories-CGszJU6T.js","./Fieldset.stories-DV6TxGBo.js","./Foreldrepar.stories-DuwuL-6N.js","./Foreldrepar-CK8JHewj.css","./InfoBlock.stories-BGKEz2-C.js","./InfoBlock-CMojW6FV.css","./InnholdMedIllustrasjon.stories-BXARaB4m.js","./Sirkelmaske-CU7qWFUD.js","./Sirkelmaske-BnqsN9ck.css","./InnholdMedIllustrasjon-Dq1JbZKO.css","./ItemList.stories-Cm7SNEQq.js","./ItemList-CzKuJ6cz.css","./LanguageToggle.stories-CD1tMXE8.js","./index-BRV0Se7Z.js","./Expand-DBYf7wR3.js","./LanguageToggle-Bdy2HrY-.css","./Personkort.stories-CD64-PRu.js","./Personkort-BNCcUqCE.css","./PictureScanningGuide.stories-rW65_bhb.js","./PictureScanningGuide-CHZB2Lat.css","./ProgressStepper.stories-DefrCuQ2.js","./ProgressStepper-QJi79hs3.js","./ProgressStepper-bGOLGbeC.css","./Sidebanner.stories-BGxAxrRS.js","./Sidebanner-DDmd3Qey.css","./Sirkelmaske.stories-DmWRak8n.js","./Step.stories-lzce0Qbm.js","./Step-DKF0sxHc.css","./UtvidetInformasjon.stories-D4PDN6bu.js","./UtvidetInformasjon-Cnu8I54I.css","./entry-preview-DEA8MR3h.js","./react-18-DFEOekEM.js","./entry-preview-docs-BHdljrbe.js","./_getPrototype-BxrpB_Xa.js","./index-DrFu-skq.js","./preview-BJPLiuSt.js","./index-D-8MO0q_.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-DP_xzX2k.js","./preview-xcv33hiB.js","./preview-C3_r9BKW.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function m(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=m(e);fetch(e.href,r)}})();const R="modulepreload",f=function(o,i){return new URL(o,i).href},d={},t=function(i,m,c){let e=Promise.resolve();if(m&&m.length>0){const r=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),E=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=Promise.all(m.map(_=>{if(_=f(_,c),_ in d)return;d[_]=!0;const a=_.endsWith(".css"),O=a?'[rel="stylesheet"]':"";if(!!c)for(let p=r.length-1;p>=0;p--){const l=r[p];if(l.href===_&&(!a||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${O}`))return;const n=document.createElement("link");if(n.rel=a?"stylesheet":R,a||(n.as="script",n.crossOrigin=""),n.href=_,E&&n.setAttribute("nonce",E),document.head.appendChild(n),a)return new Promise((p,l)=>{n.addEventListener("load",p),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${_}`)))})}))}return e.then(()=>i()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:L}=__STORYBOOK_MODULE_CHANNELS__,{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,u=L({page:"preview"});T.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const I={"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-CaYnCGU8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-euY-31GL.js"),__vite__mapDeps([15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16]),import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-gTL6jeDD.js"),__vite__mapDeps([17,1,2,18,19,5,6,13,11,20,21,22]),import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-rvJjmNNp.js"),__vite__mapDeps([23,1,2,24,4,25]),import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-RlsZGpSv.js"),__vite__mapDeps([26,1,2,27,4,28]),import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-D8iq6AuY.js"),__vite__mapDeps([29,1,2,5,6,9,30,27,4,28,31,19,11,32,33,12,34,10,35,22]),import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-D4KLI75C.js"),__vite__mapDeps([36,1,2,30,27,4,28,31,19,11,32,33,12,34,10,35]),import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-CGszJU6T.js"),__vite__mapDeps([37,1,2,32,11]),import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-DV6TxGBo.js"),__vite__mapDeps([38,1,2,32,11]),import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-DuwuL-6N.js"),__vite__mapDeps([39,1,2,4,40]),import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-BGKEz2-C.js"),__vite__mapDeps([41,1,2,4,42]),import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-BXARaB4m.js"),__vite__mapDeps([43,1,2,4,16,32,11,44,45,46]),import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-Cm7SNEQq.js"),__vite__mapDeps([47,1,2,4,13,11,7,8,16,48]),import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-CD1tMXE8.js"),__vite__mapDeps([49,1,2,50,5,6,9,51,21,52]),import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-CD64-PRu.js"),__vite__mapDeps([53,1,2,4,32,11,54]),import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-rW65_bhb.js"),__vite__mapDeps([55,1,2,5,6,4,32,11,9,22,13,56]),import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-DefrCuQ2.js"),__vite__mapDeps([57,1,2,58,16,32,11,20,21,51,33,34,59]),import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-BGxAxrRS.js"),__vite__mapDeps([60,1,2,4,27,28,11,12,32,61]),import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-DmWRak8n.js"),__vite__mapDeps([62,1,2,44,4,45]),import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-lzce0Qbm.js"),__vite__mapDeps([63,1,2,18,19,4,5,6,9,24,25,32,11,27,28,31,33,12,34,10,35,58,16,20,21,51,59,64]),import.meta.url),"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-D4PDN6bu.js"),__vite__mapDeps([65,1,2,16,11,32,33,35,66]),import.meta.url)};async function y(o){return I[o]()}const{composeConfigs:P,PreviewWeb:D,ClientApi:A}=__STORYBOOK_MODULE_PREVIEW_API__,V=async(o=[])=>{const i=await Promise.all([o.at(0)??t(()=>import("./entry-preview-DEA8MR3h.js"),__vite__mapDeps([67,2,68,19]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-BHdljrbe.js"),__vite__mapDeps([69,70,2,50,71]),import.meta.url),o.at(2)??t(()=>import("./preview-BJPLiuSt.js"),__vite__mapDeps([72,73]),import.meta.url),o.at(3)??t(()=>import("./preview-ClVXUCgi.js"),[],import.meta.url),o.at(4)??t(()=>import("./preview-Ct5NkTJf.js"),[],import.meta.url),o.at(5)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([74,71]),import.meta.url),o.at(6)??t(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),o.at(7)??t(()=>import("./preview-Db4Idchh.js"),[],import.meta.url),o.at(8)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([75,71]),import.meta.url),o.at(9)??t(()=>import("./preview-BpcF_O6y.js"),[],import.meta.url),o.at(10)??t(()=>import("./preview-C3avZzhb.js"),[],import.meta.url),o.at(11)??t(()=>import("./preview-DP_xzX2k.js"),__vite__mapDeps([76,5,6,2]),import.meta.url),o.at(12)??t(()=>import("./preview-xcv33hiB.js"),__vite__mapDeps([77,78]),import.meta.url)]);return P(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new D(y,V);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
