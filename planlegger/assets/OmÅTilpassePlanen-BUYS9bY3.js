import{j as e}from"./jsx-runtime-CLpGMVip.js";import{d as i,H as d,M as n,m as u,u as F}from"./VeiviserPage-BEkP5Xgm.js";import{e as _,f as g,b as M,l as A,S as v}from"./HvemPlanleggerUtils-Bv9Egsad.js";import{l as w}from"./amplitudeUtils-1CrV70-o.js";import{b as q}from"./barnetUtils-CWB0Dy58.js";import{u as O}from"./hvemHarRettUtils-CG2w_MQ5.js";import"./index-CR__hKHy.js";import{H as o,V as T}from"./VStack-2apmvZh_.js";import{S as f}from"./BabyWrapped-DCZKpL80.js";import{S as B}from"./PersonPregnant-D17zo54f.js";import{S as G}from"./Briefcase-Dm7XPCF2.js";import{S as z,a as E}from"./PencilWriting-BJaABnDH.js";import{S as H}from"./PersonGroup-B--Zxy9X.js";import{E as p}from"./ExpansionCard-D1aJY806.js";const y=()=>e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(f,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass.Tekst"})})]})]});y.__docgenInfo={description:"",methods:[],displayName:"Barnehageplass"};const R=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=O(a),l=_(r)&&s==="kunSøker1HarRett";return e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(f,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene"})}),e.jsx(u,{children:l?e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.TekstAlenemor"}):e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst",values:{hvem:g(t,r)}})})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"DeFørsteSeksUkene",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const x=({barnet:r,hvemPlanlegger:a})=>{const t=r.antallBarn,s=M(a);return e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin.Tekst",values:{antallBarn:t,erAlenesøker:s}})})]})]})};x.__docgenInfo={description:"",methods:[],displayName:"FørTermin",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const j=()=>e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig.Tekst"})})]})]});j.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const c=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=M(r),m=O(a)==="kunSøker2HarRett";return e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie"})}),e.jsx(u,{children:m?e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.TekstFar",values:{hvem:g(t,r)}}):e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.Tekst",values:{hvem:g(t,r),erAlenesøker:s}})})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const k=({erAdopsjon:r=!1})=>e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(H,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig.Tekst",values:{erAdopsjon:r}})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const S=({hvemPlanlegger:r})=>{const a=F();return e.jsxs(o,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(f,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel.Tekst",values:{hvem:g(a,r)}})})]})]})};S.__docgenInfo={description:"",methods:[],displayName:"ToUkerRundtFødsel",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const D=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:t})=>{const s=M(r),l=A(r),m=O(a),P=m!=="beggeHarRett",b=m==="kunSøker2HarRett"&&(r.type===v.MOR_OG_MEDMOR||r.type===v.MOR_OG_FAR),h=m==="beggeHarRett"||m==="kunSøker1HarRett";return e.jsxs(p,{"aria-label":"Expansion card",onToggle:w("toggle-tilpasse-planen"),size:"small",children:[e.jsx(p.Header,{children:e.jsxs(o,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(i,{color:"lightBlue",size:"medium",children:e.jsx(E,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(p.Title,{size:"small",children:e.jsx(n,{id:"OmÅTilpassePlanen.Oversikt.OmÅTilpassePlanen"})})})]})}),e.jsx(p.Content,{children:e.jsxs(T,{gap:"5",children:[e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Tekst"})}),!q(t)&&e.jsxs(e.Fragment,{children:[h&&!l&&r.type!==v.FAR&&e.jsx(x,{hvemPlanlegger:r,barnet:t}),h&&!l&&!s&&e.jsx(R,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(y,{}),b&&e.jsx(S,{hvemPlanlegger:r}),e.jsx(c,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(j,{}),(!s||!l)&&!P&&e.jsx(k,{})]}),q(t)&&e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx(c,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(j,{}),(!s||!l)&&!P&&e.jsx(k,{erAdopsjon:!0})]})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"OmÅTilpassePlanen",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{D as O};
