import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as P,d as g,H as v,M as n,k as s}from"./VeiviserPage-CHSQEW6u.js";import{k as h,l as b,a as c,b as f,e as R,f as _}from"./HvemPlanleggerUtils-CSaQ6gna.js";import{l as T}from"./amplitudeUtils-1CrV70-o.js";import{b as x}from"./barnetUtils-DYBBskKi.js";import{u as H,a as A}from"./hvemHarRettUtils-CtKbu_BH.js";import"./index-DQLiH3RP.js";import{H as S}from"./HvemPlanleggerType-CugjyLV2.js";import{H as m,V as q}from"./VStack-05Ww9A8B.js";import{S as w}from"./PersonPregnant-DPU01SlN.js";import{S as E}from"./BabyWrapped-DYJcH_DD.js";import{S as G}from"./Briefcase-Cq2QXhIu.js";import{S as B,a as z}from"./PencilWriting-njUDx9TT.js";import{S as I}from"./PersonGroup-_nGe72we.js";import{E as y}from"./ExpansionCard-JzbiwWRh.js";const O=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=h(r),o=b(r),d=c(i,r),t=H(a),p=t==="beggeHarRett"||t==="kunSøker1HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(w,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.KanIkkeEndres"})}),e.jsxs(q,{gap:"2",children:[!o&&t!=="kunSøker2HarRett"&&r.type!==S.FAR&&e.jsx(e.Fragment,{children:f(r)&&R(r)?e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin.Alenemor",values:{b:u=>e.jsx("b",{children:u})}})}):e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin",values:{b:u=>e.jsx("b",{children:u})}})})}),(t==="beggeHarRett"||A(t,r)||t==="kunSøker2HarRett")&&e.jsxs(s,{children:[e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel",values:{b:u=>e.jsx("b",{children:u})}}),p&&!o&&e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"}),e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre",values:{erFar:l,hvem:d}})]})]})]})]})};O.__docgenInfo={description:"",methods:[],displayName:"DetteKanIkkeEndres",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const M=({hvemPlanlegger:r})=>{const a=P();return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(E,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.FarFellesperiode",values:{hvem:c(a,r)}})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MorIAktivitet",values:{hvem:_(a,r),erMorHovedsøker:R(r)}})})]})]})};M.__docgenInfo={description:"",methods:[],displayName:"FarFellesperiode",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const k=()=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.JobbeSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanJobbeSamtidig"})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const j=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=f(r),d=H(a)==="kunSøker2HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.LeggeTilFerie"})}),e.jsx(s,{children:d?e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa.Far",values:{hvem:c(i,r)}}):e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa",values:{hvem:c(i,r),erAlenesøker:l}})})]})]})};j.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const F=({erAdopsjon:r=!1})=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(I,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.PermisjonSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanVæreHjemmeSamtidig",values:{erAdopsjon:r}})})]})]});F.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const D=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:i})=>{const l=f(r),o=b(r),d=l&&h(r),t=H(a),p=t!=="beggeHarRett",u=t==="kunSøker2HarRett";return e.jsxs(y,{"aria-label":"Expansion card",onToggle:T("toggle-tilpasse-planen"),size:"small",children:[e.jsx(y.Header,{children:e.jsxs(m,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(g,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(y.Title,{size:"small",children:e.jsx(n,{id:"HvaErMulig.Tittel"})})})]})}),e.jsx(y.Content,{children:e.jsxs(q,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MyeManKanEndre"})}),!x(i)&&e.jsxs(e.Fragment,{children:[!d&&e.jsx(O,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),!p&&e.jsx(M,{hvemPlanlegger:r}),!u&&e.jsx(k,{}),(!l||!o)&&!p&&e.jsx(F,{})]}),x(i)&&e.jsxs(e.Fragment,{children:[!d&&e.jsx(M,{hvemPlanlegger:r}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(k,{}),(!l||!o)&&!p&&e.jsx(F,{erAdopsjon:!0})]})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"HvaErMulig",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{D as H};
