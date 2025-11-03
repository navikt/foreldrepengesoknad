import{r as L,a1 as K,a2 as S,ab as x,j as e,a3 as q,a4 as j,a5 as k,Y as i,a6 as h,ai as N,ac as b,Z as V,_ as G,ad as U,ag as C,aO as z,ae as J,af as W}from"./iframe-DP_t9eBI.js";import{c as Y,e as Z,u as f,C as v,f as Q}from"./usePlanleggerNavigator-HIxNafAn.js";import{P as X}from"./PlanleggerStepPage-smRU_v4S.js";import{D as $}from"./Dekningsgrad-Bg_cIyqc.js";import{c as T,e as ee,g as re,a as te,H as ae,f as ne,b as oe}from"./HvemPlanleggerUtils-B1CZvnnv.js";import{f as se}from"./customErrorFormatter-mERXjlIT.js";import{u as ie}from"./hvemHarRettUtils-DhODSxxA.js";import{d as le,f as _}from"./uttakUtils-B4VmJN73.js";import{u as ue}from"./useScrollBehaviour-B3xlcG3h.js";import{b as de}from"./barnetUtils-CzGrketS.js";import{S as ge}from"./Spacer-CqudP2l5.js";var me=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const pe=L.forwardRef((r,t)=>{var{title:a,titleId:n}=r,s=me(r,["title","titleId"]);let o=K();return o=a?n||"title-"+o:void 0,S.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},s),a?S.createElement("title",{id:o},a):null,S.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.624 2.385a.75.75 0 0 0-.874.74V10.5a.75.75 0 0 0 .75.75h7.376a.75.75 0 0 0 .74-.874 9.76 9.76 0 0 0-7.992-7.991m.626 7.365V4.06a8.27 8.27 0 0 1 5.69 5.69zm-3.265-7.198a.75.75 0 0 1 .265.573v17.75a.75.75 0 0 1-.874.74C5.764 20.842 2.25 16.832 2.25 12s3.514-8.841 8.126-9.615a.75.75 0 0 1 .609.167M9.75 4.06a8.254 8.254 0 0 0 0 15.88zm3 9.44a.75.75 0 0 1 .75-.75h7.376a.75.75 0 0 1 .74.874 9.76 9.76 0 0 1-7.992 7.991.75.75 0 0 1-.874-.74zm1.5.75v5.69a8.27 8.27 0 0 0 5.69-5.69z",clipRule:"evenodd"}))}),I=({barnet:r,hvemPlanlegger:t,uttaksdata:a,fornavnSøker1:n,fornavnSøker2:s})=>{const o=x(),l=r.antallBarn,g=r.erFødsel,d=de(r),{startdatoPeriode1:F,sluttdatoPeriode1:c,startdatoPeriode2:E,sluttdatoPeriode2:m,familiehendelsedato:R}=a,p=o.formatDate(R,{day:"numeric",month:"short",year:"numeric"});return e.jsxs(q,{header:e.jsx(i,{id:"FordelingsdetaljerPanel.InfoboksTittel"}),icon:e.jsx(N,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(j,{gap:"space-8",children:[g&&e.jsxs(e.Fragment,{children:[e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnet",values:{erFødt:d,dato:p,erMorDelAvSøknaden:T(t),erFlereBarn:l!=="1"}})}),e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisBarnetDel2",values:{erAlenesøker:ee(t)}})})]}),!g&&e.jsxs(e.Fragment,{children:[e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjon",values:{antallBarn:l,dato:p,erMorDelAvSøknaden:T(t)}})}),e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.HvisAdopsjonDel2",values:{dato:p}})})]}),e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:h(n),fom:o.formatDate(F,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(c,{day:"numeric",month:"short",year:"numeric"}),b:u=>e.jsx("b",{children:u})}})})]}),s&&m&&e.jsx(k,{children:e.jsx(i,{id:"FordelingsdetaljerPanel.Infoboks.Periode",values:{hvem:h(s),fom:o.formatDate(E,{day:"numeric",month:"short",year:"numeric"}),tom:o.formatDate(m,{day:"numeric",month:"short",year:"numeric"}),b:u=>e.jsx("b",{children:u})}})})]})};I.__docgenInfo={description:"",methods:[],displayName:"FordelingsdetaljerPanel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},uttaksdata:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},fornavnSøker1:{required:!0,tsType:{name:"string"},description:""},fornavnSøker2:{required:!1,tsType:{name:"string"},description:""}}};const ke=r=>{const t=[];for(let a=0;a<=r.uker;a++){const n=r.uker-a>=a,s=n?r.dager:0,o=n?0:r.dager;t.push({antallUkerOgDagerSøker1:{uker:r.uker-a,dager:n?r.dager:0,totaltAntallDager:(r.uker-a)*5+s},antallUkerOgDagerSøker2:{uker:a,dager:n?0:r.dager,totaltAntallDager:a*5+o}})}return t},M=(r,t,a,n,s,o)=>{const l=a.type===ae.FAR_OG_FAR,g=l&&n?n:ne(r,a),d=l&&s?s:oe(r,a);return t.antallUkerOgDagerSøker1.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:d,uker:t.antallUkerOgDagerSøker2.uker,dager:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}}):t.antallUkerOgDagerSøker2.uker===0?e.jsx(i,{id:"FordelingSteg.FordelingOptionAlt",values:{hvem:g,uker:t.antallUkerOgDagerSøker1.uker,dager:t.antallUkerOgDagerSøker1.dager,erOversiktSteg:o}}):e.jsx(i,{id:"FordelingSteg.FordelingOptions",values:{hvem:g,hvem2:d,uker:t.antallUkerOgDagerSøker1.uker,dagerS1:t.antallUkerOgDagerSøker1.dager,uker2:t.antallUkerOgDagerSøker2.uker,dagerS2:t.antallUkerOgDagerSøker2.dager,erOversiktSteg:o}})},ve=({stønadskontoer:r})=>{const t=x(),a=Y(),n=Z(),s=f(v.FORDELING),{dekningsgrad:o}=b(f(v.HVOR_LANG_PERIODE)),l=b(f(v.HVEM_PLANLEGGER)),g=b(f(v.ARBEIDSSITUASJON)),d=b(f(v.OM_BARNET)),F=Q(v.FORDELING),c=V({defaultValues:s}),E=c.watch("antallDagerSøker1"),m=E?Number.parseInt(E.toString(),10):void 0,R=y=>{F(y),a.goToNextDefaultStep()},p=r[o],u=le(p),P=ie(g),w=_(P,l,p,d,m),A=_(P,l,p,d,m),D=re(l,t),O=te(l,t),{ref:B,scrollToBottom:H}=ue();return e.jsx(X,{ref:B,steps:n,goToStep:a.goToNextStep,children:e.jsx(G,{formMethods:c,onSubmit:R,shouldUseFlexbox:!0,children:e.jsxs(j,{gap:"space-40",style:{flex:1},children:[e.jsxs(j,{gap:"space-32",children:[e.jsx(U,{size:"medium",spacing:!0,level:"2",children:e.jsx(i,{id:"FordelingSteg.Tittel"})}),e.jsx(q,{header:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTittel"}),icon:e.jsx(pe,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(k,{children:e.jsx(i,{id:"FordelingSteg.Infoboks.HvordanFordeleTekst",values:{uker:u.uker,dager:u.dager,prosent:o}})})}),e.jsx(C,{isDarkBlue:s===void 0,children:e.jsx(z,{name:"antallDagerSøker1",control:c.control,label:e.jsx(i,{id:"FordelingSteg.FordelingTittel",values:{uker:u.uker,dager:u.dager}}),autofocusWhenEmpty:!0,validate:[J(t.formatMessage({id:"FordelingSteg.FordelingTittel.Required"}))],customErrorFormatter:se,onChange:H,children:ke(u).map(y=>e.jsx("option",{value:y.antallUkerOgDagerSøker1.totaltAntallDager,children:M(t,y,l,D,O)},y.antallUkerOgDagerSøker1.totaltAntallDager))})}),m!==void 0&&e.jsx(I,{barnet:d,hvemPlanlegger:l,fornavnSøker1:D,fornavnSøker2:O,uttaksdata:o===$.HUNDRE_PROSENT?w:A},m)]}),e.jsx(ge,{}),e.jsx(W,{saveDataOnPreviousClick:F,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};M.__docgenInfo={description:"",methods:[],displayName:"finnFellesperiodeFordelingOptionTekst"};ve.__docgenInfo={description:"",methods:[],displayName:"FordelingSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto_fpoversikt; '80': KontoBeregningDto_fpoversikt }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto_fpoversikt[];
    minsteretter: Minsteretter_fpoversikt;
    tillegg?: Tillegg_fpoversikt;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak_fpoversikt;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto_fpoversikt[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto_fpoversikt[];
    minsteretter: Minsteretter_fpoversikt;
    tillegg?: Tillegg_fpoversikt;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak_fpoversikt;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto_fpoversikt[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{ve as F,M as f,ke as g};
