import{j as e,W as i,X as l,ab as d,Y as n,ap as u,a9 as F,aK as _,V as m,a2 as H}from"./iframe-BSnBYb0H.js";import{c as A,b as p,e as j,i as w,H as v}from"./HvemPlanleggerUtils-tY-ycf-D.js";import{l as B}from"./amplitudeUtils-1CrV70-o.js";import{e as q}from"./barnetUtils-C4R--m3k.js";import{u as M}from"./hvemHarRettUtils-TmteFj5U.js";import{S as O}from"./BabyWrapped-CUuYZfPB.js";import{S}from"./PersonPregnant-BjLlVHnt.js";import{S as G,a as z}from"./PencilWriting-DpJgjakg.js";import{S as E}from"./PersonGroup-s2foYm7K.js";const y=()=>e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Barnehageplass.Tekst"})})]})]});y.__docgenInfo={description:"",methods:[],displayName:"Barnehageplass"};const f=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=M(a),o=A(r)&&s==="kunSøker1HarRett";return e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene"})}),e.jsx(u,{children:o?e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.TekstAlenemor"}):e.jsx(n,{id:"OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst",values:{hvem:p(t,r)}})})]})]})};f.__docgenInfo={description:"",methods:[],displayName:"DeFørsteSeksUkene",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const R=({barnet:r,hvemPlanlegger:a})=>{const t=r.antallBarn,s=j(a);return e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(S,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.FørTermin.Tekst",values:{antallBarn:t,erAlenesøker:s}})})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"FørTermin",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const c=()=>e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(_,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.JobbeSamtidig.Tekst"})})]})]});c.__docgenInfo={description:"",methods:[],displayName:"JobbeSamtidig"};const P=({hvemPlanlegger:r,arbeidssituasjon:a})=>{const t=F(),s=j(r),g=M(a)==="kunSøker2HarRett";return e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(G,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie"})}),e.jsx(u,{children:g?e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.TekstFar",values:{hvem:p(t,r)}}):e.jsx(n,{id:"OmÅTilpassePlanen.LeggeTilFerie.Tekst",values:{hvem:p(t,r),erAlenesøker:s}})})]})]})};P.__docgenInfo={description:"",methods:[],displayName:"LeggeTilFerie",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const k=({erAdopsjon:r=!1})=>e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(E,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.PermisjonSamtidig.Tekst",values:{erAdopsjon:r}})})]})]});k.__docgenInfo={description:"",methods:[],displayName:"PermisjonSamtidig",props:{erAdopsjon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const x=({hvemPlanlegger:r})=>{const a=F();return e.jsxs(i,{gap:"5",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(O,{height:22,width:22,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0})})}),e.jsxs("div",{children:[e.jsx(d,{size:"small",level:"4",children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel"})}),e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.ToUkerRundtFødsel.Tekst",values:{hvem:p(a,r)}})})]})]})};x.__docgenInfo={description:"",methods:[],displayName:"ToUkerRundtFødsel",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""}}};const D=({hvemPlanlegger:r,arbeidssituasjon:a,barnet:t})=>{const s=j(r),o=w(r),g=M(a),T=g!=="beggeHarRett",b=g==="kunSøker2HarRett"&&(r.type===v.MOR_OG_MEDMOR||r.type===v.MOR_OG_FAR),h=g==="beggeHarRett"||g==="kunSøker1HarRett";return e.jsxs(m,{"aria-label":"Expansion card",onToggle:B("toggle-tilpasse-planen"),size:"small",children:[e.jsx(m.Header,{children:e.jsxs(i,{gap:"6",align:"center",wrap:!1,children:[e.jsx("div",{children:e.jsx(l,{color:"lightBlue",size:"medium",children:e.jsx(z,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})})}),e.jsx("div",{children:e.jsx(m.Title,{size:"small",children:e.jsx(n,{id:"OmÅTilpassePlanen.Oversikt.OmÅTilpassePlanen"})})})]})}),e.jsx(m.Content,{children:e.jsxs(H,{gap:"5",children:[e.jsx(u,{children:e.jsx(n,{id:"OmÅTilpassePlanen.Tekst"})}),!q(t)&&e.jsxs(e.Fragment,{children:[h&&!o&&r.type!==v.FAR&&e.jsx(R,{hvemPlanlegger:r,barnet:t}),h&&!o&&!s&&e.jsx(f,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(y,{}),b&&e.jsx(x,{hvemPlanlegger:r}),e.jsx(P,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(c,{}),(!s||!o)&&!T&&e.jsx(k,{})]}),q(t)&&e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx(P,{hvemPlanlegger:r,arbeidssituasjon:a}),e.jsx(c,{}),(!s||!o)&&!T&&e.jsx(k,{erAdopsjon:!0})]})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"OmÅTilpassePlanen",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
