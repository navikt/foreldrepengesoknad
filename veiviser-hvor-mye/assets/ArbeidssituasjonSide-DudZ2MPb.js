import{b as R,e as k,k as P,d as V,f as x,m as z,u as B,j as r,g as L,V as j,c as E,o as f,M as l,B as h,I as Y,L as D,l as H,a as F,i as G}from"./FrontPage-BOtYLOzR.js";import{u as K,S as $,H as W}from"./useVeiviserNavigator-DWI881lc.js";import{a as J,b as Q,d as A,e as w}from"./RhfTextField-CgRDyzFQ.js";import{r as o,R as p}from"./index-CTjT7uj6.js";import{f as I}from"./Kroner-D6g7xE0I.js";import{H as X}from"./HarIkkeRettTilFpInfobox-DYa_7CjO.js";import{S as Z,H as ee}from"./HøyInntektInfobox-BoSPZDbq.js";const re=()=>{const e=o.useRef(null),[i,s]=o.useState(0),n=()=>s(i+1);return o.useEffect(()=>{window.scrollTo(0,0)},[]),o.useEffect(()=>{e.current&&i>0&&e.current.scrollIntoView({behavior:"smooth",block:"nearest"})},[i]),{ref:e,scrollToBottom:n}},M=e=>e.charAt(0).toUpperCase()+e.slice(1);function _(e,i=[]){const s=o.useRef(e);return o.useEffect(()=>{s.current=e}),o.useCallback((...n)=>{var t;return(t=s.current)===null||t===void 0?void 0:t.call(s,...n)},i)}function ne({value:e,defaultValue:i,onChange:s}){const n=_(s),[t,d]=o.useState(i),m=e!==void 0,a=m?e:t,b=_(u=>{const c=typeof u=="function"?u(a):u;m||d(c),n(c)},[m,n,a]);return[a,b]}var te=function(e,i){var s={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&i.indexOf(n)<0&&(s[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)i.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(s[n[t]]=e[n[t]]);return s};const se=o.forwardRef((e,i)=>{var{title:s,titleId:n}=e,t=te(e,["title","titleId"]);let d=R();return d=s?n||"title-"+d:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":d},t),s?o.createElement("title",{id:d},s):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06",clipRule:"evenodd"}))});var ie=function(e,i){var s={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&i.indexOf(n)<0&&(s[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)i.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(s[n[t]]=e[n[t]]);return s};const ae=o.forwardRef((e,i)=>{var{title:s,titleId:n}=e,t=ie(e,["title","titleId"]);let d=R();return d=s?n||"title-"+d:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":d},t),s?o.createElement("title",{id:d},s):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),le=()=>p.createElement("span",{className:"navds-stack__spacer"});var de=function(e,i){var s={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&i.indexOf(n)<0&&(s[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)i.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(s[n[t]]=e[n[t]]);return s};const oe=o.forwardRef((e,i)=>{var{className:s,header:n,children:t,open:d,defaultOpen:m=!1,onClick:a,size:b="medium",onOpenChange:u}=e,g=de(e,["className","header","children","open","defaultOpen","onClick","size","onOpenChange"]);const[c,y]=ne({defaultValue:m,value:d,onChange:u});return p.createElement("div",{className:k("navds-read-more",`navds-read-more--${b}`,s,{"navds-read-more--open":c})},p.createElement("button",Object.assign({},g,{ref:i,type:"button",className:k("navds-read-more__button","navds-body-short",{"navds-body-short--small":b==="small"}),onClick:P(a,()=>y(S=>!S)),"aria-expanded":c}),p.createElement(se,{className:"navds-read-more__expand-icon","aria-hidden":!0}),p.createElement("span",null,n)),p.createElement(V,{as:"div","aria-hidden":!c,className:k("navds-read-more__content",{"navds-read-more__content--closed":!c}),size:b},t))}),q=e=>{if(e==null)throw Error("Data er ikke oppgitt");return e},ue=e=>e==null||e.toString().trim().length===0,ce=/^\d+([,.]\d+)?$/,C=e=>ce.test(e.toString()),N=e=>i=>ue(i)||C(i)?null:e;x.extend(z);x().add(18,"week").add(3,"day").startOf("day").toDate();x().startOf("day").subtract(21,"days");x().add(1,"year").startOf("day").toDate();const me=e=>q(e.grunnbeløp[0]).verdi,we=e=>q(e.engangstønad[0]).verdi,be="_widthTextInput_kozrb_1",ge="_description_kozrb_5",v={widthTextInput:be,description:ge},fe=e=>(e==null?void 0:e.erArbeidstakerEllerFrilanser)||(e==null?void 0:e.harUtbetalingFraNav)||(e==null?void 0:e.erSelvstendigNæringsdrivende),O=e=>e&&C(e),ve=e=>{const{lønnMåned1:i,lønnMåned2:s,lønnMåned3:n}=e,t=O(i)?parseFloat(i):0,d=O(s)?parseFloat(s):0,m=O(n)?parseFloat(n):0,a=(t+d+m)/3;return a>0?a.toFixed(0):void 0},pe=({arbeidssituasjon:e,setArbeidssituasjon:i,satser:s})=>{const n=B(),{goToRoute:t}=K(),d=J({defaultValues:e}),m=U=>{i(U),t(W.OPPSUMMERING)},a=d.watch(),b=x().subtract(1,"month"),u=ve(a),g=u?parseFloat(u)*12:void 0,c=me(s),y=c/2,S=c*6,{ref:T}=re();return r.jsx(L,{ref:T,label:n.formatMessage({id:"Tittel"}),icon:r.jsx($,{height:28,width:28,fontSize:"1.5rem","aria-hidden":!0}),children:r.jsx(Q,{formMethods:d,onSubmit:m,shouldUseFlexbox:!0,children:r.jsxs(j,{gap:"10",style:{flex:1},children:[r.jsxs(E,{isDarkBlue:!fe(a),shouldFadeIn:!0,children:[r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.Arbeidssituasjon"})}),r.jsx(h,{className:v.description,children:r.jsx(l,{id:"ArbeidssituasjonSide.VelgAlternativ"})}),r.jsx(A,{name:"erArbeidstakerEllerFrilanser",label:r.jsx(l,{id:"ArbeidssituasjonSide.ArbeidEllerFrilans"})}),r.jsx(A,{name:"harUtbetalingFraNav",label:r.jsx(l,{id:"ArbeidssituasjonSide.UtbetalingNav"})}),r.jsx(A,{name:"erSelvstendigNæringsdrivende",label:r.jsx(l,{id:"ArbeidssituasjonSide.SelvstendigNæringsdrivende"})})]}),a.erSelvstendigNæringsdrivende&&r.jsx(Y,{icon:r.jsx(Z,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:r.jsxs(j,{gap:"6",children:[r.jsx(h,{children:r.jsx(l,{id:"ArbeidssituasjonSide.SNKanIkkeBruke"})}),r.jsxs(h,{children:[r.jsx(l,{id:"ArbeidssituasjonSide.LesOm"}),r.jsx(D,{inlineText:!0,href:H.selvstendigNæringsdrivendeHvorMye,className:"lenke",rel:"noreferrer",children:r.jsx(l,{id:"ArbeidssituasjonSide.Lenke"})})]})]})}),!a.erSelvstendigNæringsdrivende&&(a.erArbeidstakerEllerFrilanser||a.harUtbetalingFraNav)&&r.jsxs(j,{gap:"2",children:[r.jsx(E,{isDarkBlue:u===void 0,shouldFadeIn:!0,children:r.jsxs(j,{gap:"6",children:[a.erArbeidstakerEllerFrilanser&&!a.harUtbetalingFraNav&&r.jsxs("div",{children:[r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.TreSisteMåneder"})}),r.jsx(h,{className:v.description,children:r.jsx(l,{id:"ArbeidssituasjonSide.LønnFørSkatt"})})]}),a.harUtbetalingFraNav&&!a.erArbeidstakerEllerFrilanser&&r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),a.erArbeidstakerEllerFrilanser&&a.harUtbetalingFraNav&&r.jsxs("div",{children:[r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),r.jsx(h,{className:v.description,children:r.jsx(l,{id:"ArbeidssituasjonSide.LønnOgUtbetaling"})})]}),r.jsxs(j,{gap:"4",children:[r.jsx(w,{name:"lønnMåned1",label:M(b.subtract(2,"month").format("MMMM YYYY")),className:v.widthTextInput,validate:[N(n.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]}),r.jsx(w,{name:"lønnMåned2",label:M(b.subtract(1,"month").format("MMMM YYYY")),className:v.widthTextInput,validate:[N(n.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]}),r.jsx(w,{name:"lønnMåned3",label:M(b.format("MMMM YYYY")),className:v.widthTextInput,validate:[N(n.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]})]}),r.jsxs("div",{children:[r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.Gjennomsnitt"})}),r.jsx(F,{size:"large",children:u?I(u):"-"})]}),r.jsxs("div",{children:[r.jsx(f,{children:r.jsx(l,{id:"ArbeidssituasjonSide.GjennomsnittÅrslønn"})}),r.jsx(F,{size:"large",children:u?I(parseInt(u,10)*12):"-"})]})]})}),r.jsxs(oe,{header:r.jsx(l,{id:"ArbeidssituasjonSide.GirRett"}),children:[r.jsx(l,{id:"ArbeidssituasjonSide.EnAvDisse"}),r.jsxs("ul",{children:[r.jsx("li",{children:r.jsx(l,{id:"ArbeidssituasjonSide.Sykepenger"})}),r.jsx("li",{children:r.jsx(l,{id:"ArbeidssituasjonSide.Foreldrepenger"})}),r.jsx("li",{children:r.jsx(l,{id:"ArbeidssituasjonSide.Arbeidsavklaring"})}),r.jsx("li",{children:r.jsx(l,{id:"ArbeidssituasjonSide.Dagpenger"})}),r.jsx("li",{children:r.jsx(l,{id:"ArbeidssituasjonSide.OmsorgOgPleie"})})]})]})]}),a.erArbeidstakerEllerFrilanser&&g!==void 0&&g<y&&r.jsx(X,{antattÅrslønn:g,minÅrslønn:y,showKrIcon:!0}),a.erArbeidstakerEllerFrilanser&&g!==void 0&&g>S&&r.jsx(ee,{maxÅrslønnDekket:S,showKrIcon:!0}),r.jsx(le,{}),u&&r.jsx(G,{icon:r.jsx(ae,{"aria-hidden":!0}),iconPosition:"right",type:"submit",style:{flex:1},children:r.jsx(l,{id:"ArbeidssituasjonSide.SeResultatet"})})]})})})};pe.__docgenInfo={description:"",methods:[],displayName:"ArbeidssituasjonSide",props:{arbeidssituasjon:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
    lønnMåned1: string;
    lønnMåned2: string;
    lønnMåned3: string;
}`,signature:{properties:[{key:"erArbeidstakerEllerFrilanser",value:{name:"boolean",required:!0}},{key:"harUtbetalingFraNav",value:{name:"boolean",required:!0}},{key:"erSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}},{key:"lønnMåned1",value:{name:"string",required:!0}},{key:"lønnMåned2",value:{name:"string",required:!0}},{key:"lønnMåned3",value:{name:"string",required:!0}}]}},description:""},setArbeidssituasjon:{required:!0,tsType:{name:"signature",type:"function",raw:"(arbeidssituasjon: Arbeidssituasjon) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
    lønnMåned1: string;
    lønnMåned2: string;
    lønnMåned3: string;
}`,signature:{properties:[{key:"erArbeidstakerEllerFrilanser",value:{name:"boolean",required:!0}},{key:"harUtbetalingFraNav",value:{name:"boolean",required:!0}},{key:"erSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}},{key:"lønnMåned1",value:{name:"string",required:!0}},{key:"lønnMåned2",value:{name:"string",required:!0}},{key:"lønnMåned3",value:{name:"string",required:!0}}]}},name:"arbeidssituasjon"}],return:{name:"void"}}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};export{pe as A,oe as R,se as S,re as a,ve as b,we as c,M as d,me as f,C as i,q as n,ne as u};
