import{a9 as P,j as e,W as g,X as p,ab as v,Y as n,a2 as h,ap as s,a4 as _,aK as T,V as y}from"./iframe-DYD6BlSH.js";import{h as b,i as R,b as c,H as A,e as H,c as q,f as S}from"./HvemPlanleggerUtils-BEUoFL1z.js";import{l as w}from"./amplitudeUtils-1CrV70-o.js";import{e as x}from"./barnetUtils-DTbMt5dp.js";import{u as f,b as E}from"./hvemHarRettUtils-CCEVlIll.js";import{S as G}from"./PersonPregnant-D9RpWBK5.js";import{S as B}from"./BabyWrapped-CmF9ZdUw.js";import{S as z,a as I}from"./PencilWriting-DLxByDT-.js";import{S as D}from"./PersonGroup-C_8BdLWj.js";const O=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=b(r),d=R(r),o=c(i,r),t=f(a),m=t==="beggeHarRett"||t==="kunSøker1HarRett";return e.jsxs(g,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.KanIkkeEndres"})}),e.jsxs(h,{gap:"2",children:[!d&&t!=="kunSøker2HarRett"&&r.type!==A.FAR&&e.jsx(e.Fragment,{children:H(r)&&q(r)?e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin.Alenemor",values:{b:u=>e.jsx("b",{children:u})}})}):e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin",values:{b:u=>e.jsx("b",{children:u})}})})}),(t==="beggeHarRett"||E(t,r)||t==="kunSøker2HarRett")&&e.jsxs(s,{children:[e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel",values:{b:u=>e.jsx("b",{children:u})}}),m&&!d&&e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"}),e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre",values:{erFar:l,hvem:o}})]})]})]})]})};O.__docgenInfo={description:"",methods:[],displayName:"DetteKanIkkeEndres",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const M=({hvemPlanlegger:r})=>{const a=P();return e.jsxs(g,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.FarFellesperiode",values:{hvem:c(a,r)}})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MorIAktivitet",values:{hvem:_(S(a,r)),erMorHovedsøker:q(r)}})})]})]})};M.__docgenInfo={description:"",methods:[],displayName:"FarFellesperiode",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const k=()=>e.jsxs(g,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(T,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.JobbeSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanJobbeSamtidig"})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const j=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=H(r),o=f(a)==="kunSøker2HarRett";return e.jsxs(g,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.LeggeTilFerie"})}),e.jsx(s,{children:o?e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa.Far",values:{hvem:c(i,r)}}):e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa",values:{hvem:c(i,r),erAlenesøker:l}})})]})]})};j.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const F=({erAdopsjon:r=!1})=>e.jsxs(g,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(D,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.PermisjonSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanVæreHjemmeSamtidig",values:{erAdopsjon:r}})})]})]});F.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const C=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:i})=>{const l=H(r),d=R(r),o=l&&b(r),t=f(a),m=t!=="beggeHarRett",u=t==="kunSøker2HarRett";return e.jsxs(y,{"aria-label":"Expansion card",onToggle:w("toggle-tilpasse-planen"),size:"small",children:[e.jsx(y.Header,{children:e.jsxs(g,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(I,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(y.Title,{size:"small",children:e.jsx(n,{id:"HvaErMulig.Tittel"})})})]})}),e.jsx(y.Content,{children:e.jsxs(h,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MyeManKanEndre"})}),!x(i)&&e.jsxs(e.Fragment,{children:[!o&&e.jsx(O,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),!m&&e.jsx(M,{hvemPlanlegger:r}),!u&&e.jsx(k,{}),(!l||!d)&&!m&&e.jsx(F,{})]}),x(i)&&e.jsxs(e.Fragment,{children:[!o&&e.jsx(M,{hvemPlanlegger:r}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(k,{}),(!l||!d)&&!m&&e.jsx(F,{erAdopsjon:!0})]})]})})]})};C.__docgenInfo={description:"",methods:[],displayName:"HvaErMulig",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{C as H};
