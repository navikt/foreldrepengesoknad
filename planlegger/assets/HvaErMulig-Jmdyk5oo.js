import{a9 as P,j as e,V as g,W as p,ab as v,X as n,a2 as f,ar as s,a4 as _,aR as T,ah as A,U as y}from"./iframe-Ukjo43Q8.js";import{d as h,h as R,b as c,H as S,e as x,c as q,f as w}from"./HvemPlanleggerUtils-CRywlFpI.js";import{e as b}from"./barnetUtils-BsgHdzze.js";import{u as H,b as E}from"./hvemHarRettUtils-D-LKDzek.js";import{l as G}from"./umamiUtils-DYttlg2n.js";import{S as B}from"./PersonPregnant-Bp9Wp8Z0.js";import{S as z}from"./BabyWrapped-Dv6fgjr1.js";import{S as I,a as D}from"./PencilWriting-DDKPzMd-.js";const O=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=h(r),o=R(r),d=c(i,r),t=H(a),m=t==="beggeHarRett"||t==="kunSøker1HarRett";return e.jsxs(g,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(B,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.KanIkkeEndres"})}),e.jsxs(f,{gap:"space-8",children:[!o&&t!=="kunSøker2HarRett"&&r.type!==S.FAR&&e.jsx(e.Fragment,{children:x(r)&&q(r)?e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin.Alenemor",values:{b:u=>e.jsx("b",{children:u})}})}):e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.TreUkerFørTermin",values:{b:u=>e.jsx("b",{children:u})}})})}),(t==="beggeHarRett"||E(t,r)||t==="kunSøker2HarRett")&&e.jsxs(s,{children:[e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel",values:{b:u=>e.jsx("b",{children:u})}}),m&&!o&&e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"}),e.jsx(n,{id:"HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre",values:{erFar:l,hvem:d}})]})]})]})]})};O.__docgenInfo={description:"",methods:[],displayName:"DetteKanIkkeEndres",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const M=({hvemPlanlegger:r})=>{const a=P();return e.jsxs(g,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.FarFellesperiode",values:{hvem:c(a,r)}})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MorIAktivitet",values:{hvem:_(w(a,r)),erMorHovedsøker:q(r)}})})]})]})};M.__docgenInfo={description:"",methods:[],displayName:"FarFellesperiode",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const k=()=>e.jsxs(g,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(T,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.JobbeSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanJobbeSamtidig"})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const j=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const i=P(),l=x(r),d=H(a)==="kunSøker2HarRett";return e.jsxs(g,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(I,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.LeggeTilFerie"})}),e.jsx(s,{children:d?e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa.Far",values:{hvem:c(i,r)}}):e.jsx(n,{id:"HvaErMulig.HvisIngenSkalHa",values:{hvem:c(i,r),erAlenesøker:l}})})]})]})};j.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const F=({erAdopsjon:r=!1})=>e.jsxs(g,{gap:"space-20",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(A,{height:22,width:22,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(v,{size:"small",children:e.jsx(n,{id:"HvaErMulig.PermisjonSamtidig"})}),e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.ManKanVæreHjemmeSamtidig",values:{erAdopsjon:r}})})]})]});F.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const K=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:i})=>{const l=x(r),o=R(r),d=l&&h(r),t=H(a),m=t!=="beggeHarRett",u=t==="kunSøker2HarRett";return e.jsxs(y,{"aria-label":"Expansion card",onToggle:G("toggle-tilpasse-planen"),size:"small",children:[e.jsx(y.Header,{children:e.jsxs(g,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(p,{color:"lightBlue",size:"medium",children:e.jsx(D,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(y.Title,{size:"small",children:e.jsx(n,{id:"HvaErMulig.Tittel"})})})]})}),e.jsx(y.Content,{children:e.jsxs(f,{gap:"space-20",children:[e.jsx(s,{children:e.jsx(n,{id:"HvaErMulig.MyeManKanEndre"})}),!b(i)&&e.jsxs(e.Fragment,{children:[!d&&e.jsx(O,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),!m&&e.jsx(M,{hvemPlanlegger:r}),!u&&e.jsx(k,{}),(!l||!o)&&!m&&e.jsx(F,{})]}),b(i)&&e.jsxs(e.Fragment,{children:[!d&&e.jsx(M,{hvemPlanlegger:r}),e.jsx(j,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(k,{}),(!l||!o)&&!m&&e.jsx(F,{erAdopsjon:!0})]})]})})]})};K.__docgenInfo={description:"",methods:[],displayName:"HvaErMulig",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{K as H};
