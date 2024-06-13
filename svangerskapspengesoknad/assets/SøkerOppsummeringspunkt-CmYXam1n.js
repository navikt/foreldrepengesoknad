import{c as b,o as $,d as M,e as z,H as T,j as o,u as h,B as p,M as y}from"./Button-uluYPR4k.js";import{r as i,R as m}from"./index-DVXBtNgz.js";import"./apiInterceptor-DZtTMO6M.js";import{a as U,S as V,e as H,B as J}from"./infobox.module-BUPPViCw.js";import{j as P,V as g,E as w,F as I,J as Y,u as K,d as O}from"./Uttaksdagen-BhZsPxay.js";import{C as W}from"./ConfirmationPanel-DGcPraZd.js";import{n as C}from"./dateFormValidation--aNpoRrd.js";import{u as G}from"./useControllableState-cgc7bYZe.js";const Q=()=>{const e=i.useRef(new AbortController);return i.useEffect(()=>()=>{e.current.abort()},[]),e.current.signal},N=i.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var X=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};const E=i.createContext(null),Z=i.forwardRef((e,r)=>{var{children:t,className:n,open:a,defaultOpen:s=!1,onOpenChange:d}=e,l=X(e,["children","className","open","defaultOpen","onOpenChange"]);const[u,S]=G({defaultValue:s,value:a,onChange:d}),c=i.useContext(N),v=i.useRef(!(a||s)),x=()=>{S(j=>!j),v.current=!0};return c!=null&&c.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),m.createElement("div",Object.assign({className:b("navds-accordion__item",n,{"navds-accordion__item--open":u,"navds-accordion__item--neutral":(c==null?void 0:c.variant)==="neutral","navds-accordion__item--no-animation":!v.current}),ref:r},$(l,["onClick"])),m.createElement(E.Provider,{value:{open:u,toggleOpen:x}},t))});var ee=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};const ne=i.forwardRef((e,r)=>{var{children:t,className:n}=e,a=ee(e,["children","className"]);const s=i.useContext(E);return s===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):m.createElement(M,Object.assign({},a,{as:"div",ref:r,className:b("navds-accordion__content",{"navds-accordion__content--closed":!s.open},n),"aria-hidden":!s.open||void 0}),t)});var te=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};const re=i.forwardRef((e,r)=>{var t,{children:n,className:a,onClick:s}=e,d=te(e,["children","className","onClick"]);const l=i.useContext(E),u=i.useContext(N);return l===null?(console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null):m.createElement("button",Object.assign({ref:r},d,{className:b("navds-accordion__header",a),onClick:z(s,l.toggleOpen),"aria-expanded":l.open,type:"button"}),m.createElement("span",{className:"navds-accordion__icon-wrapper"},m.createElement(U,{className:"navds-accordion__header-chevron",title:"Vis mer","aria-hidden":!0})),m.createElement(T,{size:(t=u==null?void 0:u.headingSize)!==null&&t!==void 0?t:"small",as:"span",className:"navds-accordion__header-content"},n))});var ae=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};const f=i.forwardRef((e,r)=>{var{className:t,variant:n="default",headingSize:a="small",size:s="medium",indent:d=!0}=e,l=ae(e,["className","variant","headingSize","size","indent"]);return m.createElement(N.Provider,{value:{variant:n,headingSize:a,size:s,mounted:!0}},m.createElement("div",Object.assign({},l,{className:b("navds-accordion",t,`navds-accordion--${s}`,{"navds-accordion--indent":d}),ref:r})))});f.Header=re;f.Content=ne;f.Item=Z;const k=({tittel:e,hide:r=!1,children:t})=>{const[n,a]=i.useState(!1);return r?null:o.jsxs(f.Item,{children:[o.jsx(f.Header,{className:n?P("accordian_header").block:void 0,onClick:()=>a(s=>!s),children:o.jsx(T,{level:"3",size:"small",children:e})}),o.jsx(f.Content,{children:o.jsx("div",{className:P("content_margin").block,children:t})})]})};k.__docgenInfo={description:"",methods:[],displayName:"Oppsummeringspunkt",props:{tittel:{required:!0,tsType:{name:"string"},description:""},hide:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const oe=(e,r,t)=>{if(r==="Engangsstønad")return e.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(r==="Foreldrepenger"&&t!==void 0)return e.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(t);if(r==="Svangerskapspenger")return e.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${r} not supported`)},R=({sendSøknad:e,cancelApplication:r,onContinueLater:t,goToPreviousStep:n,stepConfig:a,children:s,appName:d,ekstraSamtykketekst:l})=>{const u=h(),S=Q(),[c,v]=i.useState(!1),[x,j]=i.useState(!1),[q,D]=i.useState(!1),F=()=>{c?(j(!0),e(S)):D(!0)};return o.jsx(V,{onCancel:r,onContinueLater:t,steps:a,children:o.jsxs(g,{gap:"10",children:[s,o.jsx(W,{label:oe(u,d,l),onChange:()=>v(L=>!L),checked:c,error:q&&!c&&u.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),o.jsx(H,{goToPreviousStep:n,nextButtonOnClick:F,isDisabledAndLoading:x,isSendButton:!0})]})})};R.Punkt=k;R.__docgenInfo={description:"",methods:[{name:"Punkt",docblock:null,modifiers:["static"],params:[{name:"{ tittel, hide = false, children }: Props",optional:!1,type:{name:"Props",alias:"Props"}}],returns:null}],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(abortSignal: AbortSignal) => Promise<void>",signature:{arguments:[{type:{name:"AbortSignal"},name:"abortSignal"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label?: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"union",raw:"ReactElement[] | ReactElement",elements:[{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"},{name:"ReactElement"}]},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const B=(e,r)=>Y(e)?r.formatMessage({id:"LandOppsummering.IDag"}):K(e),se=(e,r)=>O(e.fom).isAfter(r.fom,"day")?1:0,_=({utenlandsoppholdListe:e})=>{const r=h();return o.jsx(o.Fragment,{children:e.sort(se).map(t=>o.jsx(J,{padding:"4",background:"surface-alt-3-subtle",borderRadius:"medium",children:o.jsxs(g,{gap:"1",children:[o.jsxs(p,{style:{fontWeight:"bold"},children:[w(t.fom)&&o.jsx(y,{id:"LandOppsummering.HarBodd",values:{country:I.getName(t.landkode,"nb")}}),!w(t.fom)&&o.jsx(y,{id:"LandOppsummering.SkalBo",values:{country:I.getName(t.landkode,"nb")}})]}),o.jsxs(M,{children:[B(t.fom,r)," - ",B(t.tom,r)]})]})},`${t.landkode}${t.fom}`))})};_.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering"};const A=(e,r,t)=>O(e).isBetween(O(r),O(t),"day","[]"),ie=(e,r,t)=>{if(r==="TERMIN")return e.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Text.OgKommerPåFødselstidspunktet"},t);if(r==="FØDSEL")return e.formatMessage({id:"BoIUtlandetOppsummeringspunkt.VarPåFødselstidspunktet"},t);if(r==="ADOPSJON")return e.formatMessage({id:"BoIUtlandetOppsummeringspunkt.VarPåOmsorgsovertakelsepunktet"},t);throw new Error("Function not implemented.")},de=(e,r=[],t=[])=>r.some(n=>A(e,n.fom,n.tom))||t.some(n=>A(e,n.fom,n.tom));var ce=(e=>(e.ADOPSJON="ADOPSJON",e.FØDSEL="FØDSEL",e.TERMIN="TERMIN",e))(ce||{});const le=({familiehendelseDato:e,hendelseType:r,utenlandsopphold:t,tidligereUtenlandsopphold:n,senereUtenlandsopphold:a,hide:s=!1})=>{const d=h();return s?null:o.jsx(k,{tittel:d.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Utenlandsopphold"}),children:o.jsxs(g,{gap:"5",children:[o.jsxs(g,{gap:"2",children:[t.harBoddUtenforNorgeSiste12Mnd&&o.jsx(_,{utenlandsoppholdListe:C(n).utenlandsoppholdSiste12Mnd}),t.skalBoUtenforNorgeNeste12Mnd&&o.jsx(_,{utenlandsoppholdListe:C(a).utenlandsoppholdNeste12Mnd})]}),t.harBoddUtenforNorgeSiste12Mnd===!1&&o.jsx(p,{children:o.jsx(y,{id:"BoIUtlandetOppsummeringspunkt.BoddSisteTolv",values:{country:d.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Norge"})}})}),t.skalBoUtenforNorgeNeste12Mnd===!1&&o.jsx(p,{children:o.jsx(y,{id:"BoIUtlandetOppsummeringspunkt.BoNesteTolv",values:{country:d.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Norge"})}})}),o.jsx(p,{children:ie(d,r,{country:de(e,n==null?void 0:n.utenlandsoppholdSiste12Mnd,a==null?void 0:a.utenlandsoppholdNeste12Mnd)?d.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Utlandet"}):d.formatMessage({id:"BoIUtlandetOppsummeringspunkt.Norge"})})})]})})};le.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummeringspunkt",props:{hide:{defaultValue:{value:"false",computed:!1},required:!1}}};const ue=(e,r,t)=>t?`${e} ${t} ${r}`:`${e} ${r}`,me=({søker:e})=>{const r=h();return o.jsx(k,{tittel:r.formatMessage({id:"DegOppsummeringspunkt.OmDeg"}),children:o.jsxs(g,{gap:"4",children:[o.jsx(p,{children:ue(e.fornavn,e.etternavn,e.mellomnavn)}),o.jsx(p,{children:e.fnr})]})})};me.__docgenInfo={description:"",methods:[],displayName:"SøkerOppsummeringspunkt"};export{f as A,le as B,ce as H,R as O,me as S};
