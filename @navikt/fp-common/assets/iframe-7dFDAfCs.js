function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Attachment.stories-DOJj8nLA.js","./jsx-runtime-Du8NFWEI.js","./index-Dl6G-zuu.js","./Attachment-HtiDJRS1.js","./bemUtils-CenTME4X.js","./index-BQyWxq9a.js","./SlettKnapp-BU6syxGA.js","./SlettKnapp-C-_lrY4c.css","./intlUtils-C_Owl2LD.js","./Loader-DLi21HaR.js","./clsx-B-dksMZM.js","./useId-W0kGORNo.js","./Link-CJX71J_g.js","./Attachment-CUNn4jlQ.css","./AttachmentList.stories-Cd6PYF4g.js","./AttachmentList-CsDBMbzt.js","./guid-CsArkN6i.js","./BackLink.stories-BSMkavHV.js","./index-BZ_3CHlx.js","./index-D1_ZHIBm.js","./Back-1snIBSej.js","./useId-CmCCB0AQ.js","./message-CV2fCRa7.js","./Banner.stories-B7HAWqZZ.js","./Banner-FWcHJ-mZ.js","./Banner-CgG7fPzd.css","./Block.stories-ClDoHmi9.js","./Block-CJiKchoO.js","./Block-BcGJtG4R.css","./AvbrytSoknadDialog.stories-BR-7nbL0.js","./BekreftDialog-CbWitN7u.js","./Modal-DoPcVSNf.js","./Label-DWFI51kd.js","./composeEventHandlers-DeH74NdU.js","./useId-BnKOV0D5.js","./BekreftDialog.stories-CtfUFEsw.js","./DisplayTextWithLabel.stories-CYGb3gpF.js","./Fieldset.stories-uO2MbuQs.js","./Foreldrepar.stories-DW7t199f.js","./Foreldrepar-CK8JHewj.css","./FormikFileUploader.stories-CoB60Klc.js","./PictureScanningGuide-BlGYLMZ2.js","./PictureScanningGuide-CHZB2Lat.css","./ReadMore-pDVysu3N.js","./FormikFileUploader-CKZzh5xi.css","./InfoBlock.stories-DQO2mXCU.js","./InfoBlock-CMojW6FV.css","./InnholdMedIllustrasjon.stories-qWJg4mp2.js","./Sirkelmaske-DhtyqE3J.js","./Sirkelmaske-BnqsN9ck.css","./InnholdMedIllustrasjon-Dq1JbZKO.css","./ItemList.stories-CcFU-msm.js","./ItemList-CzKuJ6cz.css","./LanguageToggle.stories-DhsyOof0.js","./index-BfyspvgH.js","./Expand-CTIIz_jc.js","./LanguageToggle-Bdy2HrY-.css","./Personkort.stories-LTrjHrnC.js","./Personkort-BNCcUqCE.css","./PictureScanningGuide.stories-cx6YnJ5b.js","./ProgressStepper.stories-DUp8g-XU.js","./ProgressStepper-C69e5rTr.js","./ProgressStepper-bGOLGbeC.css","./Sidebanner.stories-Bhz9Xji0.js","./Sidebanner-DDmd3Qey.css","./Sirkelmaske.stories-COGtLo-K.js","./Step.stories-Deu5kzOD.js","./Step-DKF0sxHc.css","./UtvidetInformasjon.stories-XoUN_lAg.js","./UtvidetInformasjon-Cnu8I54I.css","./entry-preview-BCYVHKO2.js","./react-18-Bamk9FSf.js","./entry-preview-docs-B75HmYH4.js","./_getPrototype-Cg4bdWul.js","./index-DrFu-skq.js","./preview-B_0crF9I.js","./index-Bw8VTzHM.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-DfdtDd0A.js","./preview-E8TiuPne.js","./preview-B6JZgCmC.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))m(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&m(r)}).observe(document,{childList:!0,subtree:!0});function _(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function m(o){if(o.ep)return;o.ep=!0;const e=_(o);fetch(o.href,e)}})();const E="modulepreload",O=function(s,i){return new URL(s,i).href},u={},t=function(i,_,m){let o=Promise.resolve();if(_&&_.length>0){const e=document.getElementsByTagName("link");o=Promise.all(_.map(r=>{if(r=O(r,m),r in u)return;u[r]=!0;const c=r.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(!!m)for(let a=e.length-1;a>=0;a--){const l=e[a];if(l.href===r&&(!c||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${d}`))return;const n=document.createElement("link");if(n.rel=c?"stylesheet":E,c||(n.as="script",n.crossOrigin=""),n.href=r,document.head.appendChild(n),c)return new Promise((a,l)=>{n.addEventListener("load",a),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${r}`)))})}))}return o.then(()=>i()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:P}=__STORYBOOK_MODULE_PREVIEW_API__,p=R({page:"preview"});P.setChannel(p);window.__STORYBOOK_ADDONS_CHANNEL__=p;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=p);const f={"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-DOJj8nLA.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-Cd6PYF4g.js"),__vite__mapDeps([14,1,2,15,3,4,5,6,7,8,9,10,11,12,13,16]),import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-BSMkavHV.js"),__vite__mapDeps([17,1,2,18,19,5,12,10,20,21,22]),import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-B7HAWqZZ.js"),__vite__mapDeps([23,1,2,24,4,25]),import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-ClDoHmi9.js"),__vite__mapDeps([26,1,2,27,4,28]),import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-BR-7nbL0.js"),__vite__mapDeps([29,1,2,5,8,30,27,4,28,31,19,10,32,33,11,9,34,22]),import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-CtfUFEsw.js"),__vite__mapDeps([35,1,2,30,27,4,28,31,19,10,32,33,11,9,34]),import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-CYGb3gpF.js"),__vite__mapDeps([36,1,2,32,10]),import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-uO2MbuQs.js"),__vite__mapDeps([37,1,2,32,10]),import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-DW7t199f.js"),__vite__mapDeps([38,1,2,4,39]),import.meta.url),"./src/common/components/formik-file-uploader/FormikFileUploader.stories.tsx":async()=>t(()=>import("./FormikFileUploader.stories-CoB60Klc.js"),__vite__mapDeps([40,1,2,5,15,3,4,6,7,8,9,10,11,12,13,16,27,28,41,32,22,42,34,43,33,44]),import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-DQO2mXCU.js"),__vite__mapDeps([45,1,2,4,46]),import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-qWJg4mp2.js"),__vite__mapDeps([47,1,2,4,16,32,10,48,49,50]),import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-CcFU-msm.js"),__vite__mapDeps([51,1,2,4,12,10,6,7,16,52]),import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-DhsyOof0.js"),__vite__mapDeps([53,1,2,54,5,8,55,21,56]),import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-LTrjHrnC.js"),__vite__mapDeps([57,1,2,4,32,10,58]),import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-cx6YnJ5b.js"),__vite__mapDeps([59,1,2,41,5,4,32,10,8,22,12,42]),import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-DUp8g-XU.js"),__vite__mapDeps([60,1,2,61,16,32,10,20,21,55,33,62]),import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-Bhz9Xji0.js"),__vite__mapDeps([63,1,2,4,27,28,10,11,32,64]),import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-COGtLo-K.js"),__vite__mapDeps([65,1,2,48,4,49]),import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-Deu5kzOD.js"),__vite__mapDeps([66,1,2,18,19,4,5,8,24,25,32,10,27,28,31,33,11,9,34,61,16,20,21,55,62,67]),import.meta.url),"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-XoUN_lAg.js"),__vite__mapDeps([68,1,2,16,43,10,32,33,34,69]),import.meta.url)};async function L(s){return f[s]()}const{composeConfigs:T,PreviewWeb:v,ClientApi:D}=__STORYBOOK_MODULE_PREVIEW_API__,I=async()=>{const s=await Promise.all([t(()=>import("./entry-preview-BCYVHKO2.js"),__vite__mapDeps([70,2,71,19]),import.meta.url),t(()=>import("./entry-preview-docs-B75HmYH4.js"),__vite__mapDeps([72,73,2,54,74]),import.meta.url),t(()=>import("./preview-B_0crF9I.js"),__vite__mapDeps([75,76]),import.meta.url),t(()=>import("./preview-CvOr_OSW.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-DbT1mggi.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([77,74]),import.meta.url),t(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([78,74]),import.meta.url),t(()=>import("./preview-Cv3rAi2i.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-BjivwLRH.js"),__vite__mapDeps([]),import.meta.url),t(()=>import("./preview-DfdtDd0A.js"),__vite__mapDeps([79,5,2]),import.meta.url),t(()=>import("./preview-E8TiuPne.js"),__vite__mapDeps([80,81]),import.meta.url)]);return T(s)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new v(L,I);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
