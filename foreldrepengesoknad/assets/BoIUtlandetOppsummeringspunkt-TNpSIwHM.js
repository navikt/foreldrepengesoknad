import{j as s}from"./jsx-runtime-Cw0GR0a5.js";import{r as i,R as d}from"./index-CTjT7uj6.js";import{u as b}from"./index-DSgjoNiG.js";import"./apiInterceptor-D-WKbiXB.js";import{S as B,b as L}from"./ByttBrowserModal-aPNs2Z13.js";import{W as R}from"./Tidsperioden-Dtf7_zpz.js";import{t as C,v as F,l as H,d as V}from"./Uttaksdagen-CXktmUXL.js";import{b as y}from"./bemUtils-DmNyTjfb.js";import{A as p}from"./Accordion-moKZKf2O.js";import{c as m,H as j,L as U,a as M}from"./Label-C_UMiHsP.js";import{V as O}from"./useId-Dah_zW8v.js";import"./index-CCQ3W5xA.js";import{L as $}from"./Link-D0RLsnK2.js";import{M as l}from"./message-CjkJih2D.js";const Y=()=>{const e=i.useRef(new AbortController);return i.useEffect(()=>()=>{e.current.abort()},[]),e.current.signal};var D=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const z=d.forwardRef((e,a)=>{var{children:t,className:r}=e,n=D(e,["children","className"]);return d.createElement("div",Object.assign({ref:a},n,{className:m("navds-form-summary__answer",r)}),t)});var W=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const G=i.forwardRef((e,a)=>{var{children:t,className:r}=e,n=W(e,["children","className"]);return d.createElement("dl",Object.assign({ref:a},n,{className:m("navds-form-summary__answers",r)}),t)});var J=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const K=i.forwardRef((e,a)=>{var{children:t="Endre svar",className:r}=e,n=J(e,["children","className"]);return d.createElement($,Object.assign({ref:a},n,{className:m("navds-form-summary__edit",r)}),t)});var Q=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const X=i.forwardRef((e,a)=>{var{children:t,className:r}=e,n=Q(e,["children","className"]);return d.createElement("header",Object.assign({ref:a},n,{className:m("navds-form-summary__header",r)}),t)}),Z=i.forwardRef((e,a)=>d.createElement(j,Object.assign({ref:a},e,{size:"medium"})));var ee=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const re=i.forwardRef((e,a)=>{var{children:t}=e,r=ee(e,["children"]);return d.createElement(U,Object.assign({ref:a},r,{as:"dt"}),t)});var ne=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const te=i.forwardRef((e,a)=>{var{children:t,className:r}=e,n=ne(e,["children","className"]);return d.createElement(M,Object.assign({ref:a},n,{as:"dd",className:m("navds-form-summary__value",r)}),t)});var ae=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const o=i.forwardRef((e,a)=>{var{children:t,className:r}=e,n=ae(e,["children","className"]);return d.createElement("div",Object.assign({ref:a},n,{className:m("navds-form-summary",r)}),t)});o.Header=X;o.Heading=Z;o.EditLink=K;o.Answers=G;o.Answer=z;o.Label=re;o.Value=te;const h=({tittel:e,hide:a=!1,children:t})=>{const[r,n]=i.useState(!1);return a?null:s.jsxs(p.Item,{children:[s.jsx(p.Header,{className:r?y("accordian_header").block:void 0,onClick:()=>n(u=>!u),children:s.jsx(j,{level:"3",size:"small",children:e})}),s.jsx(p.Content,{children:s.jsx("div",{className:y("content_margin").block,children:t})})]})};h.__docgenInfo={description:"",methods:[],displayName:"Oppsummeringspunkt",props:{tittel:{required:!0,tsType:{name:"string"},description:""},hide:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const se=(e,a,t)=>{if(a==="Engangsstønad")return e.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(a==="Foreldrepenger"&&t!==void 0)return e.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(t);if(a==="Svangerskapspenger")return e.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${a} not supported`)},k=({sendSøknad:e,cancelApplication:a,onContinueLater:t,goToPreviousStep:r,onStepChange:n,stepConfig:u,children:x,appName:w,ekstraSamtykketekst:S})=>{const g=b(),P=Y(),[c,E]=i.useState(!1),[_,T]=i.useState(!1),[N,I]=i.useState(!1),A=()=>{c?(T(!0),e(P)):I(!0)};return s.jsx(B,{onCancel:a,onContinueLater:t,steps:u,onStepChange:n,children:s.jsxs(O,{gap:"10",children:[s.jsx(O,{gap:"3",children:x}),s.jsx(R,{label:se(g,w,S),onChange:()=>E(q=>!q),checked:c,error:N&&!c&&g.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),s.jsx(L,{goToPreviousStep:r,nextButtonOnClick:A,isDisabledAndLoading:_,isSendButton:!0})]})})};k.Punkt=h;k.__docgenInfo={description:"",methods:[{name:"Punkt",docblock:null,modifiers:["static"],params:[{name:"{ tittel, hide = false, children }: Props",optional:!1,type:{name:"Props",alias:"Props"}}],returns:null}],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(abortSignal: AbortSignal) => Promise<void>",signature:{arguments:[{type:{name:"AbortSignal"},name:"abortSignal"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"union",raw:"ReactElement[] | ReactElement",elements:[{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"},{name:"ReactElement"}]},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const v=(e,a)=>F(e)?a.formatMessage({id:"LandOppsummering.IDag"}):H(e),oe=(e,a)=>V(e.fom).isAfter(a.fom,"day")?1:0,f=({utenlandsoppholdListe:e})=>{const a=b();return s.jsx(o.Answers,{children:e.sort(oe).map(t=>s.jsxs(o.Answer,{children:[s.jsx(o.Label,{children:C.getName(t.landkode,"nb")}),s.jsx(o.Value,{children:s.jsx(l,{id:"LandOppsummering.periode",values:{fra:v(t.fom,a),til:v(t.tom,a)}})})]},t.landkode))})};f.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering",props:{utenlandsoppholdListe:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""}}};const ie=({onVilEndreSvar:e,tidligereUtenlandsopphold:a,senereUtenlandsopphold:t})=>s.jsxs(o,{children:[s.jsxs(o.Header,{children:[s.jsx(o.Heading,{level:"2",children:s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.tittel"})}),s.jsx(o.EditLink,{onClick:e,children:s.jsx(l,{id:"EndreSvar"})})]}),s.jsx(o.Answers,{children:s.jsxs(o.Answer,{children:[s.jsx(o.Label,{children:s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel"})}),s.jsx(o.Value,{children:a.length>0?s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet"}):s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge"})})]})}),a.length>0&&s.jsx(o.Answers,{children:s.jsxs(o.Answer,{children:[s.jsx(o.Label,{children:s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label",values:{antall:a.length}})}),s.jsx(o.Value,{children:s.jsx(f,{utenlandsoppholdListe:a})})]})}),s.jsx(o.Answers,{children:s.jsxs(o.Answer,{children:[s.jsx(o.Label,{children:s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel"})}),s.jsx(o.Value,{children:t.length>0?s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet"}):s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge"})})]})}),t.length>0&&s.jsx(o.Answers,{children:s.jsxs(o.Answer,{children:[s.jsx(o.Label,{children:s.jsx(l,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label",values:{antall:t.length}})}),s.jsx(o.Value,{children:s.jsx(f,{utenlandsoppholdListe:t})})]})})]});ie.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummeringspunkt",props:{tidligereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},senereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{ie as B,k as O};
