import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as f,H as g,M as n,a as s}from"./composeEventHandlers-CQxkItEI.js";import{k as P,l as b,f as j,S as _,b as S,e as R,a as A}from"./HvemPlanleggerUtils-CRuekH12.js";import{b as h}from"./barnetUtils-DlK2ezHC.js";import{u as x,a as H}from"./hvemHarRettUtils-DaTWCV6h.js";import{l as E}from"./amplitude-CH4nmNK1.js";import{c as d}from"./VeiviserPage-CEALjThC.js";import"./index-CTjT7uj6.js";import{H as m,V as q}from"./VStack-CL9KkpXr.js";import{S as w}from"./PersonPregnant-DiOgii_u.js";import{S as G}from"./BabyWrapped-BmM7oml1.js";import{S as B}from"./Briefcase-DdOvFoVc.js";import{S as T,a as z}from"./PencilWriting-DBZWjI4-.js";import{S as I}from"./PersonGroup-28ji-Imn.js";import{E as v}from"./ExpansionCard-DrG9uKgr.js";const O=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=f(),u=P(r),o=b(r),l=j(i,r),t=x(a),y=t==="beggeHarRett"||t==="kunSøker1HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(w,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(g,{size:"small",children:e.jsx(n,{id:"HvaErMulig.KanIkkeEndres"})}),e.jsxs(q,{gap:"2",children:[!o&&t!=="kunSøker2HarRett"&&r.type!==_.FAR&&e.jsx(e.Fragment,{children:S(r)&&R(r)?e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin.Alenemor",values:{b:p=>e.jsx("b",{children:p})}})}):e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin",values:{b:p=>e.jsx("b",{children:p})}})})}),(t==="beggeHarRett"||H(t,r)||t==="kunSøker2HarRett")&&e.jsxs(s,{children:[e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel",values:{b:p=>e.jsx("b",{children:p})}}),y&&!o&&e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"}),e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre",values:{erFar:u,hvem:l}})]})]})]})]})};O.__docgenInfo={description:"",methods:[],displayName:"DetteKanIkkeEndres",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const c=({hvemPlanlegger:r})=>{const a=f();return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(g,{size:"small",children:e.jsx(n,{id:"HvaErMulig.FarFellesperiode",values:{hvem:j(a,r)}})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MorIAktivitet",values:{hvem:A(a,r),erMorHovedsøker:R(r)}})})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"FarFellesperiode",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const M=()=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(g,{size:"small",children:e.jsx(n,{id:"HvaErMulig.JobbeSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanJobbeSamtidig"})})]})]});M.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const k=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=f(),u=S(r),l=x(a)==="kunSøker2HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(T,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(g,{size:"small",children:e.jsx(n,{id:"HvaErMulig.LeggeTilFerie"})}),e.jsx(s,{children:l?e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa.Far",values:{hvem:j(i,r)}}):e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa",values:{hvem:j(i,r),erAlenesøker:u}})})]})]})};k.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const F=({erAdopsjon:r=!1})=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(I,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(g,{size:"small",children:e.jsx(n,{id:"HvaErMulig.PermisjonSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanVæreHjemmeSamtidig",values:{erAdopsjon:r}})})]})]});F.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const D=r=>{r&&E("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"toggle-tilpasse-planen"})},C=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:i})=>{const u=S(r),o=b(r),l=x(a),t=l!=="beggeHarRett",y=l==="kunSøker2HarRett";return e.jsxs(v,{"aria-label":"Expansion card",onToggle:D,size:"small",children:[e.jsx(v.Header,{children:e.jsxs(m,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(d,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(v.Title,{size:"small",children:e.jsx(n,{id:"HvaErMulig.Tittel"})})})]})}),e.jsx(v.Content,{children:e.jsxs(q,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MyeManKanEndre"})}),!h(i)&&e.jsxs(e.Fragment,{children:[e.jsx(O,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(k,{hvemPlanlegger:r,arbeidssituasjon:a}),!t&&e.jsx(c,{hvemPlanlegger:r}),!y&&e.jsx(M,{}),(!u||!o)&&!t&&e.jsx(F,{})]}),h(i)&&e.jsxs(e.Fragment,{children:[e.jsx(c,{hvemPlanlegger:r}),e.jsx(k,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(M,{}),(!u||!o)&&!t&&e.jsx(F,{erAdopsjon:!0})]})]})})]})};C.__docgenInfo={description:"",methods:[],displayName:"HvaErMulig",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{C as H};
