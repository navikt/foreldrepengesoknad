import{c as P,v as ve,b as B,w as be,H as ie,j as n,B as o,u as S,a as H,F as X}from"./Modal-5f6515f6.js";import{r as l,R as j}from"./index-f1f2c4b1.js";import{O as je,h as xe,C as ye,B as d,f as p,e as y,I as Ne,P as ae,g as _e,i as m,d as q,w as Oe,K as se,S as ke,j as Se}from"./fridagerUtils-57eeeb7b.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./attachmentApi-1d2d61fa.js";import{n as w}from"./validation-631bcf6e.js";import{l as ee}from"./dateFormValidation-78b19ee9.js";import{A as E,ad as te,u as Ie,ac as Ee,a7 as Te,ae as Ae,af as we,f as Ve}from"./useFortsettSøknadSenere-e239225e.js";import{e as Fe}from"./egenNæringFormUtils-6726c048.js";import{u as b,C as f,a as Pe}from"./routes-345f7acb.js";import{b as Be,g as Ce}from"./dateUtils-8d85eca7.js";import{A as Re}from"./ArbeidsforholdInformasjon-52cce638.js";import{H as De}from"./HStack-13158dfb.js";import{B as Me}from"./BackButton-f80f5ffe.js";const K=l.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var Le=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const Y=l.createContext(null),He=l.forwardRef((e,a)=>{var{children:i,className:t,open:r,defaultOpen:s=!1,onOpenChange:c}=e,g=Le(e,["children","className","open","defaultOpen","onOpenChange"]);const[h,R]=je({defaultValue:s,value:r,onChange:c}),x=l.useContext(K),u=l.useRef(!(r||s)),T=()=>{R(A=>!A),u.current=!0};return x!=null&&x.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),j.createElement("div",Object.assign({className:P("navds-accordion__item",t,{"navds-accordion__item--open":h,"navds-accordion__item--neutral":(x==null?void 0:x.variant)==="neutral","navds-accordion__item--no-animation":!u.current}),ref:a},ve(g,["onClick"])),j.createElement(Y.Provider,{value:{open:h,toggleOpen:T}},i))}),qe=He;var $e=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const Ue=l.forwardRef((e,a)=>{var{children:i,className:t}=e,r=$e(e,["children","className"]);const s=l.useContext(Y);return s===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):j.createElement(xe,Object.assign({},r,{as:"div",ref:a,className:P("navds-accordion__content",{"navds-accordion__content--closed":!s.open},t),"aria-hidden":!s.open||void 0}),i)}),Ge=Ue;var Ze=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const ze=l.forwardRef((e,a)=>{var{title:i,titleId:t}=e,r=Ze(e,["title","titleId"]);let s=B();return s=i?t||"title-"+s:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},r),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.5 3.25c-.69 0-1.25.56-1.25 1.25v15c0 .69.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25V8a.75.75 0 0 0-.22-.53l-4-4a.75.75 0 0 0-.53-.22H6.5Zm6.75 4.25c0 .69.56 1.25 1.25 1.25h2.75v10.5H6.75V4.75h6.5V7.5Zm2.94-.25-1.44-1.44v1.44h1.44Z",fill:"currentColor"}))}),Je=ze;var Ke=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const Ye=l.forwardRef((e,a)=>{var{title:i,titleId:t}=e,r=Ke(e,["title","titleId"]);let s=B();return s=i?t||"title-"+s:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},r),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36l-15-7Zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5H9.029Z",fill:"currentColor"}))}),We=Ye;var Qe=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const Xe=l.forwardRef((e,a)=>{var{title:i,titleId:t}=e,r=Qe(e,["title","titleId"]);let s=B();return s=i?t||"title-"+s:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},r),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.97 4.47a3.198 3.198 0 0 1 4.562.001c1.26 1.27 1.268 3.368-.002 4.637l-8.5 8.5a.75.75 0 0 1-.38.204l-4.5.922a.75.75 0 0 1-.882-.897l1-4.5a.75.75 0 0 1 .202-.367l8.5-8.5Zm3.498 1.058a1.698 1.698 0 0 0-2.438.002l-.97.97 2.479 2.478.93-.93c.68-.68.681-1.832-.001-2.52ZM7.685 13.876 14 7.56l2.478 2.478-6.35 6.35-3.145.644.702-3.157ZM3.5 20.25a.75.75 0 0 0 0 1.5h17a.75.75 0 0 0 0-1.5h-17Z",fill:"currentColor"}))}),et=Xe;var tt=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const nt=l.forwardRef((e,a)=>{var{title:i,titleId:t}=e,r=tt(e,["title","titleId"]);let s=B();return s=i?t||"title-"+s:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},r),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.5 6.25a.75.75 0 0 0 0 1.5h.805l.876 11.384a1.75 1.75 0 0 0 1.745 1.616h8.148a1.75 1.75 0 0 0 1.745-1.616l.876-11.384h.805a.75.75 0 0 0 0-1.5h-2.75V6A2.75 2.75 0 0 0 14 3.25h-4A2.75 2.75 0 0 0 7.25 6v.25H4.5Zm5.5-1.5c-.69 0-1.25.56-1.25 1.25v.25h6.5V6c0-.69-.56-1.25-1.25-1.25h-4Zm-3.19 3 .867 11.27c.01.13.118.23.249.23h8.148c.13 0 .24-.1.25-.23l.866-11.27H6.81Zm3.19 2a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z",fill:"currentColor"}))}),rt=nt;var it=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const at=l.forwardRef((e,a)=>{var i,{children:t,className:r,onClick:s}=e,c=it(e,["children","className","onClick"]);const g=l.useContext(Y),h=l.useContext(K);return g===null?(console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null):j.createElement("button",Object.assign({ref:a},c,{className:P("navds-accordion__header",r),onClick:be(s,g.toggleOpen),"aria-expanded":g.open,type:"button"}),j.createElement("span",{className:"navds-accordion__icon-wrapper"},j.createElement(ye,{className:"navds-accordion__header-chevron",title:"Vis mer","aria-hidden":!0})),j.createElement(ie,{size:(i=h==null?void 0:h.headingSize)!==null&&i!==void 0?i:"small",as:"span",className:"navds-accordion__header-content"},t))}),st=at;var ot=globalThis&&globalThis.__rest||function(e,a){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const C=l.forwardRef((e,a)=>{var{className:i,variant:t="default",headingSize:r="small",size:s="medium",indent:c=!0}=e,g=ot(e,["className","variant","headingSize","size","indent"]);return j.createElement(K.Provider,{value:{variant:t,headingSize:r,size:s,mounted:!0}},j.createElement("div",Object.assign({},g,{className:P("navds-accordion",i,`navds-accordion--${s}`,{"navds-accordion--indent":c}),ref:a})))});C.Header=st;C.Content=Ge;C.Item=qe;const V=C,lt=()=>{const e=l.useRef(new AbortController);return l.useEffect(()=>()=>{e.current.abort()},[]),e.current.signal};const $=({frilans:e})=>{const a=y("frilans-visning"),i="Arbeid som frilanser",t=e.jobberFremdelesSomFrilans?"(Pågående)":"(Avsluttet)";return n.jsx(d,{padBottom:"l",children:n.jsxs("div",{className:a.block,children:[n.jsx(o,{className:a.element("tittel"),children:i}),n.jsx(o,{className:a.element("dato"),children:`Startet: ${p(e.oppstart)} ${t}`})]})})};try{$.displayName="FrilansVisning",$.__docgenInfo={description:"",displayName:"FrilansVisning",props:{frilans:{defaultValue:null,description:"",name:"frilans",required:!0,type:{name:"Frilans"}}}}}catch{}const dt=({næring:e})=>{const a=S(),i=y("egen-næring-visning"),t=!e.pågående&&e.tidsperiode.tom?p(e.tidsperiode.tom):"Pågående",r=Fe(Ne(e.tidsperiode.fom));return n.jsx("div",{children:n.jsx(d,{padBottom:"l",children:n.jsxs("div",{className:i.block,children:[n.jsxs("div",{className:i.element("data"),children:[n.jsx(o,{className:i.element("tittel"),children:e.navnPåNæringen}),e.registrertINorge&&n.jsx(o,{className:i.element("orgnr"),children:a.formatMessage({id:"egenNæring.visning.orgnr"},{orgnr:e.organisasjonsnummer})}),!e.registrertINorge&&e.registrertILand&&n.jsx(o,{className:i.element("orgnr"),children:ae(e.registrertILand,a.locale)}),n.jsxs(o,{className:i.element("dato"),children:[p(e.tidsperiode.fom)," - ",t]}),e.næringsinntekt&&n.jsx(o,{className:i.element("inntekt"),children:a.formatMessage({id:"egenNæring.visning.inntekt"},{inntekt:e.næringsinntekt})})]}),!r&&e.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&n.jsxs("div",{children:[n.jsx(o,{children:a.formatMessage({id:"egenNæring.visning.varigEndring"},{dato:e.varigEndringDato?p(e.varigEndringDato):"-",inntekt:e.varigEndringInntektEtterEndring})}),n.jsx(o,{children:a.formatMessage({id:"egenNæring.visning.varigEndring.beskrivelse"},{beskrivelse:e.varigEndringBeskrivelse})})]}),!r&&!e.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&n.jsx("div",{children:n.jsx(o,{children:a.formatMessage({id:"egenNæring.visning.varigEndring.ingen"},{})})}),r&&e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene&&n.jsx("div",{children:n.jsx(o,{children:a.formatMessage({id:"egenNæring.visning.yrkesaktivSiste3år"},{dato:e.oppstartsdato?p(e.oppstartsdato):"-"})})}),r&&!e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene&&n.jsx("div",{children:n.jsx(o,{children:a.formatMessage({id:"egenNæring.visning.ikkeYrkesaktivSiste3år"})})})]})})})};try{EgenNringVisning.displayName="EgenNringVisning",EgenNringVisning.__docgenInfo={description:"",displayName:"EgenNringVisning",props:{næring:{defaultValue:null,description:"",name:"næring",required:!0,type:{name:"EgenNæring"}},setSelectedNæring:{defaultValue:null,description:"",name:"setSelectedNæring",required:!1,type:{name:"Dispatch<SetStateAction<EgenNæring>>"}},deleteNæring:{defaultValue:null,description:"",name:"deleteNæring",required:!1,type:{name:"((næring: EgenNæring) => void)"}}}}}catch{}const ct=e=>!e.pågående&&e.tidsperiode.tom?p(e.tidsperiode.tom):"Pågående",U=({arbeidIUtlandet:e,setSelectedAnnenInntekt:a,deleteAnnenInntekt:i})=>{const t=S(),r=y("arbeidIUtlandetVisning");return n.jsx("div",{children:n.jsx(d,{padBottom:"l",children:n.jsxs("div",{className:r.block,children:[n.jsx(o,{className:r.element("tittel"),children:e.arbeidsgiverNavn}),n.jsx(o,{className:r.element("land"),children:ae(e.land,t.locale)}),n.jsxs(o,{className:r.element("dato"),children:[p(e.tidsperiode.fom)," - ",ct(e)]}),a&&n.jsx(H,{"aria-label":"rediger informasjon om arbeid i utlandet",variant:"secondary",className:r.element("rediger"),icon:n.jsx(et,{"aria-hidden":!0}),onClick:()=>a(e)}),i&&n.jsx(H,{"aria-label":"slett informasjon om arbeid i utlandet",variant:"secondary",className:r.element("slett"),icon:n.jsx(rt,{"aria-hidden":!0}),onClick:()=>i(e)})]})})})};try{U.displayName="ArbeidIUtlandetVisning",U.__docgenInfo={description:"",displayName:"ArbeidIUtlandetVisning",props:{arbeidIUtlandet:{defaultValue:null,description:"",name:"arbeidIUtlandet",required:!0,type:{name:"ArbeidIUtlandet"}},setSelectedAnnenInntekt:{defaultValue:null,description:"",name:"setSelectedAnnenInntekt",required:!1,type:{name:"Dispatch<SetStateAction<ArbeidIUtlandet>>"}},deleteAnnenInntekt:{defaultValue:null,description:"",name:"deleteAnnenInntekt",required:!1,type:{name:"((arbeidIUtlandet: ArbeidIUtlandet) => void)"}}}}}catch{}const O=({title:e,children:a})=>{const i=y("accordion"),[t,r]=l.useState(!1),s=l.useCallback(()=>r(c=>!c),[]);return n.jsxs(V.Item,{className:i.element("specificity"),children:[n.jsx(V.Header,{className:t?"accordion_headerOpen":"accordion_header",onClick:s,children:n.jsx(ie,{level:"3",size:"small",children:e})}),n.jsx(V.Content,{children:a})]})};try{AccordionItem.displayName="AccordionItem",AccordionItem.__docgenInfo={description:"",displayName:"AccordionItem",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const k=({visible:e,children:a})=>n.jsx(d,{className:"content_margin",padBottom:"l",visible:e,children:a});try{AccordionContent.displayName="AccordionContent",AccordionContent.__docgenInfo={description:"",displayName:"AccordionContent",props:{visible:{defaultValue:null,description:"",name:"visible",required:!1,type:{name:"boolean"}}}}}catch{}var oe=(e=>(e.harGodkjentOppsummering="harGodkjentOppsummering",e))(oe||{});const mt={harGodkjentOppsummering:!1},pt=()=>mt,L=_e(),gt=e=>a=>{if(a!==!0)return m(e,"valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd")};const F=({utenlandsopphold:e,tidligereOpphold:a})=>{const i=y("utenlandsoppholdOppsummering");return n.jsx(n.Fragment,{children:e.map((t,r)=>n.jsx(d,{padBottom:r!==e.length-1?"l":"none",children:n.jsxs("div",{className:i.block,children:[n.jsx(d,{padBottom:"m",children:a?n.jsx(o,{className:i.element("title"),children:n.jsx(X,{id:"oppsummering.utenlandsopphold.harBoddINorge.utenlands",values:{land:ee.getName(t.land,"nb")}})}):n.jsx(o,{className:i.element("title"),children:n.jsx(X,{id:"oppsummering.utenlandsopphold.skalBoINorge.utenlands",values:{land:ee.getName(t.land,"nb")}})})}),n.jsxs(o,{children:[p(t.tidsperiode.fom)," - ",p(t.tidsperiode.tom)]})]})},r))})};try{F.displayName="UtenlandsoppholdOppsummeringListe",F.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummeringListe",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!0,type:{name:"UtenlandsoppholdPeriode[]"}},tidligereOpphold:{defaultValue:null,description:"",name:"tidligereOpphold",required:!0,type:{name:"boolean"}}}}}catch{}const ne=[],ut=(e,a=ne,i=ne)=>{let t=!0;return a.forEach(r=>{q(e).isBetween(r.tidsperiode.fom,r.tidsperiode.tom,"day","[]")&&(t=!1)}),i.forEach(r=>{q(e).isBetween(r.tidsperiode.fom,r.tidsperiode.tom,"day","[]")&&(t=!1)}),t},G=({barn:e,utenlandsopphold:a,tidligereUtenlandsopphold:i,senereUtenlandsopphold:t})=>{const r=S(),s=e.erBarnetFødt?e.fødselsdato:e.termindato,c=ut(s,i==null?void 0:i.tidligereOpphold,t==null?void 0:t.senereOpphold);return n.jsxs(n.Fragment,{children:[!a.iNorgeSiste12Mnd&&i&&n.jsx(d,{padBottom:"l",children:n.jsx(F,{utenlandsopphold:i.tidligereOpphold,tidligereOpphold:!0})}),!a.iNorgeNeste12Mnd&&t&&n.jsx(d,{padBottom:"l",children:n.jsx(F,{utenlandsopphold:t.senereOpphold,tidligereOpphold:!1})}),a.iNorgeSiste12Mnd&&n.jsx(d,{padBottom:"l",children:n.jsxs(o,{children:[m(r,"oppsummering.boddINorge")," "]})}),a.iNorgeNeste12Mnd&&n.jsx(d,{padBottom:"l",children:n.jsxs(o,{children:[m(r,"oppsummering.skalboINorge")," "]})}),(!a.iNorgeSiste12Mnd||!a.iNorgeNeste12Mnd)&&n.jsx(d,{children:n.jsx(o,{children:c?m(r,"oppsummering.iNorgePåHendelsestidspunktet"):m(r,"oppsummering.ikkeINorgePåHendelsestidspunktet")})})]})};try{G.displayName="UtenlandsoppholdOppsummering",G.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummering",props:{barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!0,type:{name:"Utenlandsopphold"}},tidligereUtenlandsopphold:{defaultValue:null,description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdTidligere"}},senereUtenlandsopphold:{defaultValue:null,description:"",name:"senereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdSenere"}}}}}catch{}const ft=(e,a,i,t)=>q(i.tom).isSame(a,"d")?t?e.formatMessage({id:"oppsummering.periode.fremTilTreUkerFørTermin"},{fraDato:p(i.fom)}):e.formatMessage({id:"oppsummering.periode.fremTilFødsel"},{fraDato:p(i.fom)}):e.formatMessage({id:"oppsummering.periode.fraTil"},{fraDato:p(i.fom),tilDato:p(i.tom)}),ht=(e,a)=>e.type===te.HEL?a.formatMessage({id:"oppsummering.periode.tilbakeIFullJobb"}):e.type===te.INGEN?a.formatMessage({id:"oppsummering.periode.ikkeJobbe"}):a.formatMessage({id:"oppsummering.periode.stillingsprosent"},{stillingsprosent:e.stillingsprosent}),Z=({periode:e,sisteDagForSvangerskapspenger:a,kanHaSvpFremTilTreUkerFørTermin:i})=>{const t=S(),r=ft(t,a,e,i),s=ht(e,t),c=y("periodeVisningInfoBox"),g=e.arbeidsforhold.type===E.SELVSTENDIG&&e.arbeidsforhold.navn.trim().length===0?t.formatMessage({id:"egenNæring"}):e.arbeidsforhold.navn;return n.jsxs("div",{className:c.block,children:[n.jsxs("div",{className:c.element("topRow"),children:[n.jsx(o,{className:c.element("label"),children:r}),n.jsx("div",{className:c.element("arbeidsgiverNavn"),children:n.jsx(o,{children:g.toUpperCase()})})]}),n.jsx(d,{padBottom:"m",children:n.jsx(o,{className:c.element("stillingsprosent"),children:s})})]})};try{Z.displayName="PeriodeVisning",Z.__docgenInfo={description:"",displayName:"PeriodeVisning",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"TilretteleggingPeriode"}},sisteDagForSvangerskapspenger:{defaultValue:null,description:"",name:"sisteDagForSvangerskapspenger",required:!0,type:{name:"Date"}},kanHaSvpFremTilTreUkerFørTermin:{defaultValue:null,description:"",name:"kanHaSvpFremTilTreUkerFørTermin",required:!0,type:{name:"boolean"}}}}}catch{}const z=({perioder:e,sisteDagForSvangerskapspenger:a,barn:i})=>{const t=Be(i);return e.map((r,s)=>n.jsx(Z,{periode:r,sisteDagForSvangerskapspenger:a,kanHaSvpFremTilTreUkerFørTermin:t},s))};try{z.displayName="PeriodeOppsummering",z.__docgenInfo={description:"",displayName:"PeriodeOppsummering",props:{perioder:{defaultValue:null,description:"",name:"perioder",required:!0,type:{name:"TilretteleggingPeriode[]"}},sisteDagForSvangerskapspenger:{defaultValue:null,description:"",name:"sisteDagForSvangerskapspenger",required:!0,type:{name:"Date"}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}}}}}catch{}const vt=(e,a)=>{switch(e.type){case E.FRILANSER:return m(a,"oppsummering.skjema.frilanser");case E.SELVSTENDIG:return m(a,"oppsummering.skjema.selvstendig");default:return`${m(a,"oppsummering.skjema.virksomhet")} for ${e.navn}`}},J=({tilrettelegging:e})=>{const a=S(),i=y("vedlegg-oppsummering");return e.map(t=>{const r=vt(t.arbeidsforhold,a);return n.jsxs("div",{className:i.element("tilrettelegging"),children:[n.jsx(o,{className:i.element("tittel"),children:r}),t.vedlegg.map(s=>n.jsx("div",{children:n.jsx(De,{children:n.jsxs(Oe,{className:i.element("link"),href:s.url,target:"_blank",children:[n.jsx(Je,{className:i.element("icon"),title:"Opplastet fil"}),n.jsxs(o,{children:[" ",s.filename]})]})})},se()))]},t.id)})};try{J.displayName="VedleggOppsummering",J.__docgenInfo={description:"",displayName:"VedleggOppsummering",props:{tilrettelegging:{defaultValue:null,description:"",name:"tilrettelegging",required:!0,type:{name:"Tilrettelegging[]"}}}}}catch{}const re=({sendSøknad:e,mellomlagreSøknadOgNaviger:a,avbrytSøknad:i,søkerInfo:t})=>{const r=S(),s=Ie(r,t.arbeidsforhold),c=y("oppsummering"),g=Ve(),[h,R]=l.useState(!1),x=lt(),u=w(b(f.INNTEKTSINFORMASJON)),T=b(f.FRILANS),A=b(f.EGEN_NÆRING),W=b(f.ARBEID_I_UTLANDET),_=w(b(f.TILRETTELEGGINGER)),v=w(b(f.OM_BARNET)),le=w(b(f.UTENLANDSOPPHOLD)),de=b(f.UTENLANDSOPPHOLD_SENERE),ce=b(f.UTENLANDSOPPHOLD_TIDLIGERE),me=Pe(f.VALGT_TILRETTELEGGING_ID),D=Ce(v),pe=l.useMemo(()=>Ee(_,D),[_,D]),Q=Te(t.arbeidsforhold,v.termindato),M=_.find(N=>N.arbeidsforhold.type===E.FRILANSER),I=_.find(N=>N.arbeidsforhold.type===E.SELVSTENDIG),{previousRoute:ge,previousTilretteleggingId:ue}=Ae(_),fe=()=>(me(ue),a()),he=async N=>{N.harGodkjentOppsummering&&(R(!0),await e(x))};return n.jsx(L.FormikWrapper,{initialValues:pt(),onSubmit:he,renderForm:()=>n.jsx(L.Form,{includeButtons:!1,children:n.jsx(ke,{bannerTitle:m(r,"søknad.pageheading"),activeStepId:"oppsummering",pageTitle:"Oppsummering",steps:s,onCancel:i,onContinueLater:g,children:n.jsx(d,{padBottom:"l",children:n.jsxs("div",{className:c.block,children:[n.jsxs(V,{children:[n.jsx(O,{title:m(r,"oppsummering.omDeg"),children:n.jsxs(k,{children:[n.jsx(d,{padBottom:"m",children:n.jsx(o,{children:`${t.person.fornavn} ${t.person.etternavn}`})}),n.jsx(d,{children:n.jsx(o,{children:t.person.fnr})})]})}),n.jsx(O,{title:m(r,"oppsummering.omBarnet"),children:n.jsxs(k,{children:[n.jsx(o,{children:`Termindato: ${p(v.termindato)}`}),v.erBarnetFødt&&v.fødselsdato&&n.jsx(d,{margin:"m",children:n.jsx(o,{children:`Fødselsdato: ${v.fødselsdato?p(v.fødselsdato):void 0}`})})]})}),n.jsx(O,{title:m(r,"oppsummering.omUtenlandsopphold"),children:n.jsx(k,{children:n.jsx(G,{barn:v,utenlandsopphold:le,senereUtenlandsopphold:de,tidligereUtenlandsopphold:ce})})}),n.jsx(O,{title:m(r,"oppsummering.omArbeidsforhold"),children:n.jsx(k,{children:n.jsxs(d,{padBottom:"xl",children:[Q.length>0&&n.jsx(Re,{visManglerInfo:!1,arbeidsforhold:Q}),u.harJobbetSomFrilans&&T&&n.jsx($,{frilans:T}),u.harJobbetSomSelvstendigNæringsdrivende&&A&&n.jsx(dt,{næring:A}),u.harHattAnnenInntekt&&W&&W.map(N=>n.jsx(U,{arbeidIUtlandet:N},se())),(!u.harJobbetSomFrilans||!u.harJobbetSomSelvstendigNæringsdrivende||!u.harHattAnnenInntekt)&&n.jsx(d,{padBottom:"m",children:n.jsx(o,{children:we(u,r)})})]})})}),n.jsx(O,{title:m(r,"oppsummering.skjema"),children:n.jsx(k,{children:n.jsx(J,{tilrettelegging:_})})}),n.jsx(O,{title:m(r,"oppsummering.periodeMedSvangerskapspenger"),children:n.jsxs(k,{children:[M&&n.jsxs(n.Fragment,{children:[n.jsxs(d,{padBottom:"l",children:[n.jsx(o,{className:c.element("label"),children:"Risikofaktorer i jobben din som frilanser:"}),n.jsx(o,{children:M.risikofaktorer})]}),n.jsxs(d,{padBottom:"l",children:[n.jsx(o,{className:c.element("label"),children:"Tilretteleggingstiltak i jobben din som frilanser:"}),n.jsx(o,{children:M.tilretteleggingstiltak})]})]}),I&&n.jsxs(n.Fragment,{children:[n.jsxs(d,{padBottom:"l",children:[n.jsx(o,{className:c.element("label"),children:`Risikofaktorer i ${I.arbeidsforhold.navn}`}),n.jsx(o,{children:I.risikofaktorer})]}),n.jsxs(d,{padBottom:"l",children:[n.jsx(o,{className:c.element("label"),children:`Tilretteleggingstiltak i ${I.arbeidsforhold.navn}`}),n.jsx(o,{children:I.tilretteleggingstiltak})]})]}),n.jsx(z,{perioder:pe,sisteDagForSvangerskapspenger:D,barn:v})]})})]}),n.jsx(d,{margin:"xl",padBottom:"xl",children:n.jsx(L.ConfirmationCheckbox,{name:oe.harGodkjentOppsummering,label:m(r,"oppsummering.bekreft"),validate:gt(r)})}),n.jsx(d,{padBottom:"l",children:n.jsxs(Se,{children:[n.jsx(Me,{mellomlagreSøknadOgNaviger:fe,route:ge}),n.jsx(H,{icon:n.jsx(We,{"aria-hidden":!0}),iconPosition:"right",type:"submit",disabled:h,loading:h,children:m(r,"send.søknad")})]})})]})})})})})};try{re.displayName="Oppsummering",re.__docgenInfo={description:"",displayName:"Oppsummering",props:{sendSøknad:{defaultValue:null,description:"",name:"sendSøknad",required:!0,type:{name:"(abortSignal: AbortSignal) => Promise<void>"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => Promise<void>"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}}}}}catch{}export{re as O};
