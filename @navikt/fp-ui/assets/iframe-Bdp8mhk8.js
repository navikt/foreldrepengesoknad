const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BlueHeading.stories-TKZ_RstD.js","./jsx-runtime-Cw0GR0a5.js","./index-CTjT7uj6.js","./BlueHeading-0eMYdHT7.js","./Box-NsBh_7cn.js","./useId-BGzI-o9Y.js","./BasePrimitive-D4NMUMeT.js","./useMergeRefs-Bb4JH14W.js","./BluePanel.stories-CTrfEhkR.js","./BluePanel-CHSVDVXz.css","./Infobox.stories-DsnSgHxH.js","./IconCircleWrapper-CHmUJkBE.js","./IconCircleWrapper-DVzNWIKE.css","./VStack-Bd1wS6ci.js","./Label-oPV7DuXz.js","./useId-BFxX0aRd.js","./Infobox-1xrdXO0b.css","./ByttBrowserModal.stories-DNaBDZeX.js","./index-Bo6hejM9.js","./UttaksdagenString-Co-3oyWj.js","./dayjs.min-0BeM2qWp.js","./isoWeek-3FZMy8l4.js","./dates-wsUZxpzE.js","./Modal-2D4TrBDl.js","./index-BbmHap-z.js","./Button-DtEqrV14.js","./i18n.context-CjLN2Up4.js","./create-context-DOtOKOIE.js","./XMark-BMlYUUsT.js","./message-Cb07H1bc.js","./Calendar.stories-BnpNHueC.js","./colors-DoU1ogH6.js","./Calendar-DZYJRG_D.css","./CalendarLabel.stories-o0-kCfS1.js","./ExclamationmarkTriangleFill-wzQeSKqj.js","./CalendarLabel-Dr_pkrWO.css","./ErrorPage.stories-bsF4Bay-.js","./chunk-D5ZWXAHU-CGElDDNX.js","./v4-CQkTLCs1.js","./links-Cq4ifjPA.js","./ContentWrapper-D6815Arh.js","./ContentWrapper-D2DhjgHM.css","./Link-Cq_02NdE.js","./SimpleErrorPage.stories-C2zzmFGI.js","./FileUploader.stories-C1YsMLwO.js","./useFormField-BIxwv7Nz.js","./IconCircleWrapper.stories-DKN6wEdp.js","./Calendar-DOhzqje1.js","./LanguageToggle.stories-Bm-N0OgO.js","./ChevronDown-Cwt6cPhU.js","./LanguageToggle.stories-D_E_vvUP.js","./index-BRV0Se7Z.js","./LanguageToggle-Xtnr1ho5.css","./Page.stories-Dn1rJo5q.js","./Page-DcKKEJEq.js","./Page-BHxMcHL7.css","./ScanDocumentInfo.stories-BIsWnzRJ.js","./useControllableState-CZwrAZhD.js","./StepButtons.stories-DlpVyY_M.js","./Step.stories-D3BRNDkC.js","./ProgressStepper-BQsGpWTi.js","./Banner-D4ak9Q03.js","./Banner-DRQxrFQC.css","./Step-BUfEe3xG.css","./Banner.stories-Z0-tVZR3.js","./ProgressStepper.stories-HnYqUf39.js","./Umyndig.stories-mhxvUspm.js","./ArrowRight-B9s6bwDs.js","./VeiviserPage.stories-CgKHD_ZA.js","./AndreVeivisereLinkPanel.stories-vUUMyD8l.js","./AndreVeivisereLinkPanel-D_uRrBqM.css","./FrontPage.stories-B7MzLIyI.js","./FrontPage-BF4-TJh2.css","./entry-preview-DpcPRMm3.js","./chunk-H6MOWX77-DTQOW814.js","./entry-preview-docs-CRBhMBDQ.js","./index-B-hWQ5ss.js","./index-DrFu-skq.js","./preview-BhhEZcNS.js","./index-D-8MO0q_.js","./preview-D0N1Y6iQ.js","./preview-D77C14du.js","./preview-BWzBA1C2.js","./preview-wVQKDxg9.js","./createIntl-ClVbMZ7G.js","./preview-CBhPCqER.js","./preview-CbjXMVqv.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&m(s)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}})();const f="modulepreload",L=function(e,i){return new URL(e,i).href},O={},t=function(i,c,m){let r=Promise.resolve();if(c&&c.length>0){const s=document.getElementsByTagName("link"),_=document.querySelector("meta[property=csp-nonce]"),d=(_==null?void 0:_.nonce)||(_==null?void 0:_.getAttribute("nonce"));r=Promise.allSettled(c.map(n=>{if(n=L(n,m),n in O)return;O[n]=!0;const u=n.endsWith(".css"),R=u?'[rel="stylesheet"]':"";if(!!m)for(let l=s.length-1;l>=0;l--){const p=s[l];if(p.href===n&&(!u||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${R}`))return;const a=document.createElement("link");if(a.rel=u?"stylesheet":f,u||(a.as="script"),a.crossOrigin="",a.href=n,d&&a.setAttribute("nonce",d),document.head.appendChild(a),u)return new Promise((l,p)=>{a.addEventListener("load",l),a.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${n}`)))})}))}function o(s){const _=new Event("vite:preloadError",{cancelable:!0});if(_.payload=s,window.dispatchEvent(_),!_.defaultPrevented)throw s}return r.then(s=>{for(const _ of s||[])_.status==="rejected"&&o(_.reason);return i().catch(o)})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:P}=__STORYBOOK_MODULE_PREVIEW_API__,E=T({page:"preview"});P.setChannel(E);window.__STORYBOOK_ADDONS_CHANNEL__=E;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=E);const g={"./src/boxes/BlueHeading.stories.tsx":async()=>t(()=>import("./BlueHeading.stories-TKZ_RstD.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),"./src/boxes/BluePanel.stories.tsx":async()=>t(()=>import("./BluePanel.stories-CTrfEhkR.js"),__vite__mapDeps([8,1,2,9]),import.meta.url),"./src/boxes/Infobox.stories.tsx":async()=>t(()=>import("./Infobox.stories-DsnSgHxH.js"),__vite__mapDeps([10,1,2,11,12,13,5,6,7,14,15,16]),import.meta.url),"./src/bytt-browser-modal/ByttBrowserModal.stories.tsx":async()=>t(()=>import("./ByttBrowserModal.stories-DNaBDZeX.js"),__vite__mapDeps([17,1,2,18,19,20,21,22,23,24,5,14,25,26,7,27,28,15,29]),import.meta.url),"./src/calendar/Calendar.stories.tsx":async()=>t(()=>import("./Calendar.stories-BnpNHueC.js"),__vite__mapDeps([30,1,2,31,22,20,21,4,5,6,7,14,32]),import.meta.url),"./src/calendar/label/CalendarLabel.stories.tsx":async()=>t(()=>import("./CalendarLabel.stories-o0-kCfS1.js"),__vite__mapDeps([33,1,2,31,22,20,13,5,6,7,15,34,35]),import.meta.url),"./src/error/ErrorPage.stories.tsx":async()=>t(()=>import("./ErrorPage.stories-bsF4Bay-.js"),__vite__mapDeps([36,37,38,1,2,18,39,22,20,40,41,13,5,6,7,14,29,25,26,28,15,34,42,4]),import.meta.url),"./src/error/SimpleErrorPage.stories.tsx":async()=>t(()=>import("./SimpleErrorPage.stories-C2zzmFGI.js"),__vite__mapDeps([43,1,2,18,40,41,4,5,6,7,13,15,14,29,25,26]),import.meta.url),"./src/file-uploader/FileUploader.stories.tsx":async()=>t(()=>import("./FileUploader.stories-C1YsMLwO.js"),__vite__mapDeps([44,1,2,22,20,40,41,18,13,5,6,7,14,27,25,26,45,15,42,29]),import.meta.url),"./src/icon-circle/IconCircleWrapper.stories.tsx":async()=>t(()=>import("./IconCircleWrapper.stories-DKN6wEdp.js"),__vite__mapDeps([46,1,2,11,12,47,15]),import.meta.url),"./src/language-toggle-new/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-Bm-N0OgO.js"),__vite__mapDeps([48,37,38,1,2,18,5,14,15,45,49,29]),import.meta.url),"./src/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-D_E_vvUP.js"),__vite__mapDeps([50,1,2,51,18,29,49,15,52]),import.meta.url),"./src/page/Page.stories.tsx":async()=>t(()=>import("./Page.stories-Dn1rJo5q.js"),__vite__mapDeps([53,1,2,54,55]),import.meta.url),"./src/scan-document-info/ScanDocumentInfo.stories.tsx":async()=>t(()=>import("./ScanDocumentInfo.stories-BIsWnzRJ.js"),__vite__mapDeps([56,1,2,18,39,22,20,5,57,14,26,49,15,29,13,6,7,42]),import.meta.url),"./src/step/StepButtons.stories.tsx":async()=>t(()=>import("./StepButtons.stories-DlpVyY_M.js"),__vite__mapDeps([58,37,38,1,2,18,13,5,6,7,25,26,14,29,15]),import.meta.url),"./src/step/page-step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-D3BRNDkC.js"),__vite__mapDeps([59,1,2,18,60,13,5,6,7,14,25,26,57,27,49,15,61,62,23,24,28,29,63]),import.meta.url),"./src/step/page-step/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-Z0-tVZR3.js"),__vite__mapDeps([64,61,1,2,62]),import.meta.url),"./src/step/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-HnYqUf39.js"),__vite__mapDeps([65,60,1,2,13,5,6,7,14,25,26,57,27,49,15]),import.meta.url),"./src/umyndig/Umyndig.stories.tsx":async()=>t(()=>import("./Umyndig.stories-mhxvUspm.js"),__vite__mapDeps([66,1,2,18,39,22,20,19,21,40,41,13,5,6,7,14,29,25,26,67,15]),import.meta.url),"./src/veivisere/VeiviserPage.stories.tsx":async()=>t(()=>import("./VeiviserPage.stories-CgKHD_ZA.js"),__vite__mapDeps([68,1,2,3,4,5,6,7,11,12,54,55,13,14]),import.meta.url),"./src/veivisere/andre-veivisere/AndreVeivisereLinkPanel.stories.tsx":async()=>t(()=>import("./AndreVeivisereLinkPanel.stories-vUUMyD8l.js"),__vite__mapDeps([69,1,2,18,13,5,6,7,14,29,42,4,70]),import.meta.url),"./src/veivisere/frontpage/FrontPage.stories.tsx":async()=>t(()=>import("./FrontPage.stories-B7MzLIyI.js"),__vite__mapDeps([71,1,2,18,3,4,5,6,7,11,12,54,55,13,47,15,14,25,26,67,29,72]),import.meta.url)};async function v(e){return g[e]()}const{composeConfigs:y,PreviewWeb:I,ClientApi:S}=__STORYBOOK_MODULE_PREVIEW_API__,V=async(e=[])=>{const i=await Promise.all([e.at(0)??t(()=>import("./entry-preview-DpcPRMm3.js"),__vite__mapDeps([73,74,2,24]),import.meta.url),e.at(1)??t(()=>import("./entry-preview-docs-CRBhMBDQ.js"),__vite__mapDeps([75,74,76,2,51,77]),import.meta.url),e.at(2)??t(()=>import("./preview-BhhEZcNS.js"),__vite__mapDeps([78,79]),import.meta.url),e.at(3)??t(()=>import("./preview-tvn2vfOb.js"),[],import.meta.url),e.at(4)??t(()=>import("./preview-D0N1Y6iQ.js"),__vite__mapDeps([80,38]),import.meta.url),e.at(5)??t(()=>import("./preview-D77C14du.js"),__vite__mapDeps([81,77]),import.meta.url),e.at(6)??t(()=>import("./preview-DFmD0pui.js"),[],import.meta.url),e.at(7)??t(()=>import("./preview-CFgKly6U.js"),[],import.meta.url),e.at(8)??t(()=>import("./preview-BWzBA1C2.js"),__vite__mapDeps([82,77]),import.meta.url),e.at(9)??t(()=>import("./preview-DGUiP6tS.js"),[],import.meta.url),e.at(10)??t(()=>import("./preview-DVI_gYQC.js"),[],import.meta.url),e.at(11)??t(()=>import("./preview-wVQKDxg9.js"),__vite__mapDeps([83,18,2,84]),import.meta.url),e.at(12)??t(()=>import("./preview-CBhPCqER.js"),__vite__mapDeps([85,20,2,1,18,84,86]),import.meta.url)]);return y(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new I(v,V);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
