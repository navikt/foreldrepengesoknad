import{j as s}from"./jsx-runtime-Cw0GR0a5.js";import{R as l,r as d}from"./index-CTjT7uj6.js";import{h as u,b as E,H as T,X as N,m as I,u as O,S as q,V as g,Y as B,Z as A,M as o,_ as L,f as F,d as R}from"./dateFormValidation-CNuHCVUP.js";import{C}from"./ConfirmationPanel-BXjX3dde.js";var H=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const V=l.forwardRef((e,a)=>{var{children:t,className:r}=e,n=H(e,["children","className"]);return l.createElement("div",Object.assign({ref:a},n,{className:u("navds-form-summary__answer",r)}),t)});var U=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const M=d.forwardRef((e,a)=>{var{children:t,className:r}=e,n=U(e,["children","className"]);return l.createElement("dl",Object.assign({ref:a},n,{className:u("navds-form-summary__answers",r)}),t)});var $=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const Y=d.forwardRef((e,a)=>{var{children:t="Endre svar",className:r,as:n="a"}=e,m=$(e,["children","className","as"]);return l.createElement(E,Object.assign({ref:a,as:n},m,{className:u("navds-form-summary__edit",r)}),t)});var D=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const z=d.forwardRef((e,a)=>{var{children:t,className:r}=e,n=D(e,["children","className"]);return l.createElement("header",Object.assign({ref:a},n,{className:u("navds-form-summary__header",r)}),t)}),X=d.forwardRef((e,a)=>l.createElement(T,Object.assign({ref:a},e,{size:"medium"})));var Z=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const G=d.forwardRef((e,a)=>{var{children:t}=e,r=Z(e,["children"]);return l.createElement(N,Object.assign({ref:a},r,{as:"dt"}),t)});var J=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const K=d.forwardRef((e,a)=>{var{children:t,className:r}=e,n=J(e,["children","className"]);return l.createElement(I,Object.assign({ref:a},n,{as:"dd",className:u("navds-form-summary__value",r)}),t)});var Q=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const i=d.forwardRef((e,a)=>{var{children:t,className:r}=e,n=Q(e,["children","className"]);return l.createElement("div",Object.assign({ref:a},n,{className:u("navds-form-summary",r)}),t)});i.Header=z;i.Heading=X;i.EditLink=Y;i.Answers=M;i.Answer=V;i.Label=G;i.Value=K;const W=(e,a,t)=>{if(a==="Engangsstønad")return e.formatMessage({id:"OppsummeringPanel.SamtykkeEs"});if(a==="Foreldrepenger"&&t!==void 0)return e.formatMessage({id:"OppsummeringPanel.SamtykkeFp"}).concat(t);if(a==="Svangerskapspenger")return e.formatMessage({id:"OppsummeringPanel.SamtykkeSvp"});throw new Error(`appName ${a} not supported`)},ee=({sendSøknad:e,cancelApplication:a,onContinueLater:t,goToPreviousStep:r,onStepChange:n,stepConfig:m,children:v,appName:j,ekstraSamtykketekst:b})=>{const f=O(),[c,h]=d.useState(!1),[w,x]=d.useState(!1),[k,S]=d.useState(!1),P=()=>{c?(x(!0),e()):S(!0)};return s.jsx(q,{onCancel:a,onContinueLater:t,steps:m,onStepChange:n,noFieldsRequired:!0,children:s.jsxs(g,{gap:"10",children:[s.jsx(g,{gap:"3",children:v}),s.jsx(C,{label:W(f,j,b),onChange:()=>h(_=>!_),checked:c,error:k&&!c&&f.formatMessage({id:"OppsummeringPanel.Validering.BekrefteOpplysninger"})}),s.jsx(B,{goToPreviousStep:r,nextButtonOnClick:P,isDisabledAndLoading:w,isSendButton:!0})]})})};ee.__docgenInfo={description:"",methods:[],displayName:"OppsummeringPanel",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},appName:{required:!0,tsType:{name:"union",raw:"'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""},ekstraSamtykketekst:{required:!1,tsType:{name:"string"},description:""}}};const y=(e,a)=>L(e)?a.formatMessage({id:"LandOppsummering.IDag"}):F(e),re=(e,a)=>R(e.fom).isAfter(a.fom,"day")?1:0,p=({utenlandsoppholdListe:e})=>{const a=O();return s.jsx(i.Answers,{children:e.sort(re).map(t=>s.jsxs(i.Answer,{children:[s.jsx(i.Label,{children:A.getName(t.landkode,"nb")}),s.jsx(i.Value,{children:s.jsx(o,{id:"LandOppsummering.periode",values:{fra:y(t.fom,a),til:y(t.tom,a)}})})]},t.landkode))})};p.__docgenInfo={description:"",methods:[],displayName:"LandOppsummering",props:{utenlandsoppholdListe:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""}}};const ne=({onVilEndreSvar:e,tidligereUtenlandsopphold:a,senereUtenlandsopphold:t})=>s.jsxs(i,{children:[s.jsxs(i.Header,{children:[s.jsx(i.Heading,{level:"2",children:s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.tittel"})}),s.jsx(i.EditLink,{onClick:e,children:s.jsx(o,{id:"EndreSvar"})})]}),s.jsx(i.Answers,{children:s.jsxs(i.Answer,{children:[s.jsx(i.Label,{children:s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel"})}),s.jsx(i.Value,{children:a.length>0?s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet"}):s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge"})})]})}),a.length>0&&s.jsx(i.Answers,{children:s.jsxs(i.Answer,{children:[s.jsx(i.Label,{children:s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label",values:{antall:a.length}})}),s.jsx(i.Value,{children:s.jsx(p,{utenlandsoppholdListe:a})})]})}),s.jsx(i.Answers,{children:s.jsxs(i.Answer,{children:[s.jsx(i.Label,{children:s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel"})}),s.jsx(i.Value,{children:t.length>0?s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet"}):s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge"})})]})}),t.length>0&&s.jsx(i.Answers,{children:s.jsxs(i.Answer,{children:[s.jsx(i.Label,{children:s.jsx(o,{id:"BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label",values:{antall:t.length}})}),s.jsx(i.Value,{children:s.jsx(p,{utenlandsoppholdListe:t})})]})})]});ne.__docgenInfo={description:"",methods:[],displayName:"BoIUtlandetOppsummering",props:{tidligereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},senereUtenlandsopphold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]"},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{ne as B,i as F,ee as O};
