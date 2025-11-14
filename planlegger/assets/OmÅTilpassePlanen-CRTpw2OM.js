import{j as e,V as i,W as l,ab as d,X as n,ar as u,a9 as F,aR as _,ah as H,U as m,a2 as A}from"./iframe-BQDkJM2E.js";import{c as w,b as p,e as j,h as B,H as v}from"./HvemPlanleggerUtils-DJhrsKii.js";import{e as q}from"./barnetUtils-CVXLy-Sj.js";import{u as M}from"./hvemHarRettUtils-Cj_DnCuX.js";import{l as S}from"./umamiUtils-DYttlg2n.js";import{S as O}from"./BabyWrapped-DmqREWHG.js";import{S as G}from"./PersonPregnant-AzHPPLcA.js";import{S as z,a as E}from"./PencilWriting-D0WSmFJQ.js";const y=()=>e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass.Tekst"})})]})]});y.__docgenInfo={description:"",methods:[],displayName:"Barnehageplass"};const R=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=M(a),o=w(r)&&s==="kunSøker1HarRett";return e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene"})}),e.jsx(u,{children:o?e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.TekstAlenemor"}):e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst",values:{hvem:p(t,r)}})})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"DeFørsteSeksUkene",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const f=({barnet:r,hvemPlanlegger:a})=>{const t=r.antallBarn,s=j(a);return e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin.Tekst",values:{antallBarn:t,erAlenesøker:s}})})]})]})};f.__docgenInfo={description:"",methods:[],displayName:"FørTermin",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const c=()=>e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(_,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig.Tekst"})})]})]});c.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const P=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=j(r),g=M(a)==="kunSøker2HarRett";return e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie"})}),e.jsx(u,{children:g?e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.TekstFar",values:{hvem:p(t,r)}}):e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.Tekst",values:{hvem:p(t,r),erAlenesøker:s}})})]})]})};P.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const k=({erAdopsjon:r=!1})=>e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(H,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig.Tekst",values:{erAdopsjon:r}})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const x=({hvemPlanlegger:r})=>{const a=F();return e.jsxs(i,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel.Tekst",values:{hvem:p(a,r)}})})]})]})};x.__docgenInfo={description:"",methods:[],displayName:"ToUkerRundtFødsel",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const D=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:t})=>{const s=j(r),o=B(r),g=M(a),h=g!=="beggeHarRett",b=g==="kunSøker2HarRett"&&(r.type===v.MOR_OG_MEDMOR||r.type===v.MOR_OG_FAR),T=g==="beggeHarRett"||g==="kunSøker1HarRett";return e.jsxs(m,{"aria-label":"Expansion card",onToggle:S("toggle-tilpasse-planen"),size:"small",children:[e.jsx(m.Header,{children:e.jsxs(i,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(E,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(m.Title,{size:"small",children:e.jsx(n,{id:"OmÅTilpassePlanen.Oversikt.OmÅTilpassePlanen"})})})]})}),e.jsx(m.Content,{children:e.jsxs(A,{gap:"space-20",children:[e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Tekst"})}),!q(t)&&e.jsxs(e.Fragment,{children:[T&&!o&&r.type!==v.FAR&&e.jsx(f,{hvemPlanlegger:r,barnet:t}),T&&!o&&!s&&e.jsx(R,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(y,{}),b&&e.jsx(x,{hvemPlanlegger:r}),e.jsx(P,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(c,{}),(!s||!o)&&!h&&e.jsx(k,{})]}),q(t)&&e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx(P,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(c,{}),(!s||!o)&&!h&&e.jsx(k,{erAdopsjon:!0})]})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"OmÅTilpassePlanen",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
