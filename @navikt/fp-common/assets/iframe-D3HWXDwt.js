const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Attachment.stories-CaYnCGU8.js","./jsx-runtime-Cw0GR0a5.js","./index-CTjT7uj6.js","./Attachment-Cre5Mph2.js","./bemUtils-BssjAfnF.js","./index-D7P32T3h.js","./tslib.es6-BntfKcQG.js","./SlettKnapp-C0vA1gk3.js","./SlettKnapp-C-_lrY4c.css","./intlUtils-C_Owl2LD.js","./Loader-Bk4YieMA.js","./clsx-B-dksMZM.js","./useId-Did2T99i.js","./Link-D0Z4KE89.js","./Attachment-CUNn4jlQ.css","./AttachmentList.stories-euY-31GL.js","./guid-CsArkN6i.js","./BackLink.stories-1gmql94x.js","./index-9r8iugjR.js","./Back-CBmEjlTt.js","./useId-BFxX0aRd.js","./message-HAvjE7nT.js","./Banner.stories-S9O1_iR4.js","./Banner-CgG7fPzd.css","./Block.stories-RlsZGpSv.js","./Block-DQ6Cq2es.js","./Block-BcGJtG4R.css","./AvbrytSoknadDialog.stories-B5fJtx8B.js","./BekreftDialog-CVYK9dgo.js","./Label-UU7-twIW.js","./composeEventHandlers-DeH74NdU.js","./create-context-DOtOKOIE.js","./useId-BHtrcvnP.js","./BekreftDialog.stories-V5rRsBA7.js","./DisplayTextWithLabel.stories-CGszJU6T.js","./Fieldset.stories-DV6TxGBo.js","./Foreldrepar.stories-DuwuL-6N.js","./Foreldrepar-CK8JHewj.css","./InfoBlock.stories-BGKEz2-C.js","./InfoBlock-CMojW6FV.css","./InnholdMedIllustrasjon.stories-BXARaB4m.js","./Sirkelmaske-CU7qWFUD.js","./Sirkelmaske-BnqsN9ck.css","./InnholdMedIllustrasjon-Dq1JbZKO.css","./ItemList.stories-Cm7SNEQq.js","./ItemList-CzKuJ6cz.css","./LanguageToggle.stories-CD1tMXE8.js","./index-BRV0Se7Z.js","./Expand-DBYf7wR3.js","./LanguageToggle-Bdy2HrY-.css","./Personkort.stories-CD64-PRu.js","./Personkort-BNCcUqCE.css","./PictureScanningGuide.stories-rW65_bhb.js","./PictureScanningGuide-CHZB2Lat.css","./ProgressStepper.stories-Bdbsklc0.js","./ProgressStepper-bGOLGbeC.css","./Sidebanner.stories-BGxAxrRS.js","./Sidebanner-DDmd3Qey.css","./Sirkelmaske.stories-DmWRak8n.js","./UtvidetInformasjon.stories-D4PDN6bu.js","./UtvidetInformasjon-Cnu8I54I.css","./entry-preview-DEA8MR3h.js","./react-18-DFEOekEM.js","./entry-preview-docs-BHdljrbe.js","./_getPrototype-BxrpB_Xa.js","./index-DrFu-skq.js","./preview-BJPLiuSt.js","./index-D-8MO0q_.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-DP_xzX2k.js","./preview-DEjlbjwx.js","./preview-DFzzrBIz.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function m(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=m(e);fetch(e.href,r)}})();const R="modulepreload",f=function(o,i){return new URL(o,i).href},d={},t=function(i,m,c){let e=Promise.resolve();if(m&&m.length>0){const r=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),E=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=Promise.all(m.map(_=>{if(_=f(_,c),_ in d)return;d[_]=!0;const a=_.endsWith(".css"),O=a?'[rel="stylesheet"]':"";if(!!c)for(let l=r.length-1;l>=0;l--){const p=r[l];if(p.href===_&&(!a||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${O}`))return;const n=document.createElement("link");if(n.rel=a?"stylesheet":R,a||(n.as="script",n.crossOrigin=""),n.href=_,E&&n.setAttribute("nonce",E),document.head.appendChild(n),a)return new Promise((l,p)=>{n.addEventListener("load",l),n.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${_}`)))})}))}return e.then(()=>i()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:L}=__STORYBOOK_MODULE_CHANNELS__,{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,u=L({page:"preview"});T.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const I={"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-CaYnCGU8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-euY-31GL.js"),__vite__mapDeps([15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16]),import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-1gmql94x.js"),__vite__mapDeps([17,1,2,18,5,6,13,11,19,20,21]),import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-S9O1_iR4.js"),__vite__mapDeps([22,1,2,4,23]),import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-RlsZGpSv.js"),__vite__mapDeps([24,1,2,25,4,26]),import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-B5fJtx8B.js"),__vite__mapDeps([27,1,2,5,6,9,28,25,4,26,18,11,29,30,12,31,10,32,21]),import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-V5rRsBA7.js"),__vite__mapDeps([33,1,2,28,25,4,26,18,11,29,30,12,31,10,32]),import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-CGszJU6T.js"),__vite__mapDeps([34,1,2,29,11]),import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-DV6TxGBo.js"),__vite__mapDeps([35,1,2,29,11]),import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-DuwuL-6N.js"),__vite__mapDeps([36,1,2,4,37]),import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-BGKEz2-C.js"),__vite__mapDeps([38,1,2,4,39]),import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-BXARaB4m.js"),__vite__mapDeps([40,1,2,4,16,29,11,41,42,43]),import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-Cm7SNEQq.js"),__vite__mapDeps([44,1,2,4,13,11,7,8,16,45]),import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-CD1tMXE8.js"),__vite__mapDeps([46,1,2,47,5,6,9,48,20,49]),import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-CD64-PRu.js"),__vite__mapDeps([50,1,2,4,29,11,51]),import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-rW65_bhb.js"),__vite__mapDeps([52,1,2,5,6,4,29,11,9,21,13,53]),import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-Bdbsklc0.js"),__vite__mapDeps([54,1,2,16,29,11,19,20,48,30,31,55]),import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-BGxAxrRS.js"),__vite__mapDeps([56,1,2,4,25,26,11,12,29,57]),import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-DmWRak8n.js"),__vite__mapDeps([58,1,2,41,4,42]),import.meta.url),"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-D4PDN6bu.js"),__vite__mapDeps([59,1,2,16,11,29,30,32,60]),import.meta.url)};async function y(o){return I[o]()}const{composeConfigs:P,PreviewWeb:D,ClientApi:A}=__STORYBOOK_MODULE_PREVIEW_API__,V=async(o=[])=>{const i=await Promise.all([o.at(0)??t(()=>import("./entry-preview-DEA8MR3h.js"),__vite__mapDeps([61,2,62,18]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-BHdljrbe.js"),__vite__mapDeps([63,64,2,47,65]),import.meta.url),o.at(2)??t(()=>import("./preview-BJPLiuSt.js"),__vite__mapDeps([66,67]),import.meta.url),o.at(3)??t(()=>import("./preview-DaTmO4tX.js"),[],import.meta.url),o.at(4)??t(()=>import("./preview-Ct5NkTJf.js"),[],import.meta.url),o.at(5)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([68,65]),import.meta.url),o.at(6)??t(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),o.at(7)??t(()=>import("./preview-Db4Idchh.js"),[],import.meta.url),o.at(8)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([69,65]),import.meta.url),o.at(9)??t(()=>import("./preview-BpcF_O6y.js"),[],import.meta.url),o.at(10)??t(()=>import("./preview-C3avZzhb.js"),[],import.meta.url),o.at(11)??t(()=>import("./preview-DP_xzX2k.js"),__vite__mapDeps([70,5,6,2]),import.meta.url),o.at(12)??t(()=>import("./preview-DEjlbjwx.js"),__vite__mapDeps([71,72]),import.meta.url)]);return P(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new D(y,V);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
