import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as f,d as l,H as v,M as n,m as s}from"./VeiviserPage-BmJqjC0L.js";import{k as b,l as R,f as y,S as _,b as S,e as q,a as A}from"./HvemPlanleggerUtils-BBpqtc-K.js";import{l as H}from"./amplitudeUtils-1CrV70-o.js";import{b as h}from"./barnetUtils-Cd0JkyfR.js";import{u as x,a as w}from"./hvemHarRettUtils-EFarcwZ2.js";import"./index-CR__hKHy.js";import{H as m,V as O}from"./VStack-CmtOnz83.js";import{S as E}from"./PersonPregnant-C-cX5gSr.js";import{S as G}from"./BabyWrapped-CJ6Tb2oe.js";import{S as B}from"./Briefcase-BvUxfac0.js";import{S as T,a as z}from"./PencilWriting-yw3r5-Hh.js";import{S as I}from"./PersonGroup-DCYCHdkN.js";import{E as j}from"./ExpansionCard-g1QpoU5l.js";const P=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=f(),u=b(r),d=R(r),p=y(i,r),t=x(a),g=t==="beggeHarRett"||t==="kunSøker1HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(E,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.KanIkkeEndres"})}),e.jsxs(O,{gap:"2",children:[!d&&t!=="kunSøker2HarRett"&&r.type!==_.FAR&&e.jsx(e.Fragment,{children:S(r)&&q(r)?e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin.Alenemor",values:{b:o=>e.jsx("b",{children:o})}})}):e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin",values:{b:o=>e.jsx("b",{children:o})}})})}),(t==="beggeHarRett"||w(t,r)||t==="kunSøker2HarRett")&&e.jsxs(s,{children:[e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel",values:{b:o=>e.jsx("b",{children:o})}}),g&&!d&&e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"}),e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre",values:{erFar:u,hvem:p}})]})]})]})]})};P.__docgenInfo={description:"",methods:[],displayName:"DetteKanIkkeEndres",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const c=({hvemPlanlegger:r})=>{const a=f();return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.FarFellesperiode",values:{hvem:y(a,r)}})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MorIAktivitet",values:{hvem:A(a,r),erMorHovedsøker:q(r)}})})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"FarFellesperiode",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const M=()=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.JobbeSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanJobbeSamtidig"})})]})]});M.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const k=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=f(),u=S(r),p=x(a)==="kunSøker2HarRett";return e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(T,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.LeggeTilFerie"})}),e.jsx(s,{children:p?e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa.Far",values:{hvem:y(i,r)}}):e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa",values:{hvem:y(i,r),erAlenesøker:u}})})]})]})};k.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const F=({erAdopsjon:r=!1})=>e.jsxs(m,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(I,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.PermisjonSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanVæreHjemmeSamtidig",values:{erAdopsjon:r}})})]})]});F.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const D=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:i})=>{const u=S(r),d=R(r),p=u&&b(r),t=x(a),g=t!=="beggeHarRett",o=t==="kunSøker2HarRett";return e.jsxs(j,{"aria-label":"Expansion card",onToggle:H("toggle-tilpasse-planen"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(m,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"HvaErMulig.Tittel"})})})]})}),e.jsx(j.Content,{children:e.jsxs(O,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MyeManKanEndre"})}),!h(i)&&e.jsxs(e.Fragment,{children:[!p&&e.jsx(P,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(k,{hvemPlanlegger:r,arbeidssituasjon:a}),!g&&e.jsx(c,{hvemPlanlegger:r}),!o&&e.jsx(M,{}),(!u||!d)&&!g&&e.jsx(F,{})]}),h(i)&&e.jsxs(e.Fragment,{children:[e.jsx(c,{hvemPlanlegger:r}),e.jsx(k,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(M,{}),(!u||!d)&&!g&&e.jsx(F,{erAdopsjon:!0})]})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"HvaErMulig",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{D as H};
