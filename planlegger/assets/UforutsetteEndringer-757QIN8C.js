import{r as F,$ as h,a0 as g,j as e,V as u,W as d,ab as v,X as s,aq as y,a9 as q,U as o,aT as M,a2 as P}from"./iframe-BgUnYUlx.js";import{b as x,A as c,c as B}from"./HvemPlanleggerUtils-BALeCqv3.js";import{l as H}from"./umamiUtils-Bw37iN91.js";import{u as f}from"./hvemHarRettUtils-Dm_gBHHR.js";import{S as R}from"./PersonPregnant-B-YAfR18.js";var O=function(n,i){var r={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&i.indexOf(a)<0&&(r[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,a=Object.getOwnPropertySymbols(n);t<a.length;t++)i.indexOf(a[t])<0&&Object.prototype.propertyIsEnumerable.call(n,a[t])&&(r[a[t]]=n[a[t]]);return r};const k=F.forwardRef((n,i)=>{var{title:r,titleId:a}=n,t=O(n,["title","titleId"]);let l=h();return l=r?a||"title-"+l:void 0,g.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":l},t),r?g.createElement("title",{id:l},r):null,g.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6 3.75c-.14 0-.25.112-.25.249V9c0 1.15.23 1.956.546 2.526.315.567.738.94 1.193 1.193.94.522 2.01.531 2.511.531.5 0 1.572-.009 2.51-.53a3 3 0 0 0 1.194-1.194c.317-.57.546-1.376.546-2.526V3.999A.25.25 0 0 0 14 3.75h-2a.75.75 0 0 1 0-1.5h2c.965 0 1.75.781 1.75 1.749V9c0 1.35-.27 2.419-.735 3.255a4.5 4.5 0 0 1-1.776 1.776c-.883.49-1.819.646-2.489.696V19.5a.75.75 0 0 0 1.5 0V19c0-1.288.886-2.37 2.082-2.668a2.751 2.751 0 1 1 .07 1.57A1.25 1.25 0 0 0 13.75 19v.5a2.25 2.25 0 0 1-4.5 0v-4.773c-.67-.05-1.606-.206-2.49-.696a4.5 4.5 0 0 1-1.775-1.776C4.521 11.419 4.25 10.35 4.25 9V3.999c0-.968.785-1.749 1.75-1.749h2a.75.75 0 0 1 0 1.5zM15.75 17a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0",clipRule:"evenodd"}))}),m=({arbeidssituasjon:n})=>{const r=f(n)!=="beggeHarRett";return e.jsxs(u,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(k,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",level:"4",children:r?e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Alene"}):e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk"})}),e.jsx(y,{children:r?e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.TekstAlene"}):e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Tekst"})})]})]})};m.__docgenInfo={description:"",methods:[],displayName:"HvisManBlirSyk",props:{arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const b=({arbeidssituasjon:n,barnet:i,hvemPlanlegger:r})=>{const a=q(),t=i.antallBarn,j=f(n)!=="beggeHarRett";return e.jsxs(u,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(k,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",level:"4",children:e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk"})}),e.jsx(y,{children:j?e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstAlene",values:{antallBarn:t}}):e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst",values:{antallBarn:t,hvem:x(a,r)}})})]})]})};b.__docgenInfo={description:"",methods:[],displayName:"HvisMorBlirSyk",props:{arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const p=()=>e.jsxs(u,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(R,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",level:"4",children:e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr"})}),e.jsx(y,{children:e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.Tekst"})})]})]});p.__docgenInfo={description:"",methods:[],displayName:"NyttBarnFørTreÅr"};const E=({hvemPlanlegger:n,barnet:i,arbeidssituasjon:r})=>{const a=r.status===c.INGEN||r.status===c.UFØR;return e.jsxs(o,{"aria-label":".",onToggle:H("toggle-uforutsette-endringer"),size:"small",children:[e.jsx(o.Header,{children:e.jsxs(u,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(M,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(o.Title,{size:"small",children:e.jsx(s,{id:"UforutsetteEndringer.UforutsetteEndringer"})})})]})}),e.jsx(o.Content,{children:e.jsx(P,{gap:"space-20",children:B(n)&&!a?e.jsxs(e.Fragment,{children:[e.jsx(m,{arbeidssituasjon:r}),e.jsx(b,{barnet:i,hvemPlanlegger:n,arbeidssituasjon:r}),e.jsx(p,{})]}):e.jsxs(e.Fragment,{children:[e.jsx(m,{arbeidssituasjon:r}),e.jsx(p,{})]})})})]})};E.__docgenInfo={description:"",methods:[],displayName:"UforutsetteEndringer",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};export{E as U};
