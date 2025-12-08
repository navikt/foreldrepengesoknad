import{aa as Y,ab as d,aQ as X,j as e,a3 as m,W as y,ac as Z,Y as t,aA as P,aR as I,a2 as L,a4 as S,aS as $,aI as ee,aJ as re,ar as te,aT as ae}from"./iframe-DN35LVIV.js";import{c as ne,e as se,u,C as n,f as _}from"./usePlanleggerNavigator-L6Xh66-e.js";import{P as R}from"./routes-Cyl7_Mgv.js";import{P as oe}from"./PlanleggerStepPage-BpUw_6uF.js";import{g as le,f as ie}from"./FordelingSteg-Vjo8McD3.js";import{H as A,e as K,j as ue,g as ge,a as de,l as me,m as pe}from"./HvemPlanleggerUtils-DRYgFI_s.js";import{u as ke,a as Ee,b as ce}from"./hvemHarRettUtils-D_8Mk0gQ.js";import{d as V,c as N}from"./uttakUtils-D5SnWSir.js";import{u as ve}from"./useLagUttaksplanForslag-D731izpo.js";import{u as Se}from"./useScrollBehaviour-CSaQ_eYz.js";import{m as Re}from"./barnetUtils-CR2x_0yo.js";import{b as Oe}from"./BarnehageplassSteg-BoYGF9rk.js";import{O as De}from"./OmÅTilpassePlanen-DOiWoopC.js";import{U as Fe}from"./UforutsetteEndringer-CRGhcEvO.js";import{S as fe}from"./PersonGroup-DMtllUdR.js";import{T as O}from"./ToggleGroup-Do6XzpXa.js";const be=({stønadskontoer:g})=>{const s=Y(),o=ne(),k=se();Se();const r=d(u(n.HVEM_PLANLEGGER)),l=d(u(n.OM_BARNET)),D=d(u(n.HVOR_LANG_PERIODE)),E=d(u(n.ARBEIDSSITUASJON)),U=u(n.UTTAKSPLAN),p=u(n.FORDELING),F=_(n.FORDELING),q=d(_(n.HVOR_LANG_PERIODE)),f=g[100],b=g[80],M=Oe(l),c=D.dekningsgrad==="100"?f:b,G=V(c),w=a=>{const h=a;q({dekningsgrad:h}),p&&F({antallDagerSøker1:Te(h,g,p)})},i=ke(E),H=r.type===A.FAR_OG_FAR&&(i==="kunSøker1HarRett"||i==="kunSøker2HarRett"),T=N(f),j=N(b),v=K(r),B=Ee(i,r)||ce(i,r),C=ue(r,i),x=ve(c),z=ge(r,s),J=de(r,s),Q=!0,W=X("screen and (min-width: 480)");return e.jsx("form",{children:e.jsx(oe,{steps:k,goToStep:o.goToNextStep,children:e.jsxs(m,{gap:"space-24",children:[e.jsxs(y,{justify:"space-between",children:[e.jsx(Z,{size:"medium",spacing:!0,level:"2",children:e.jsx(t,{id:"OversiktSteg.Tittel",values:{erAleneforsørger:v}})}),e.jsx(m,{gap:"space-4",children:e.jsx(P,{size:"xsmall",variant:"secondary",type:"button",icon:e.jsx(I,{height:24,width:24,fontSize:"1-5rem","aria-hidden":!0}),onClick:()=>{o.goToNextStep(R.TILPASS_PLANEN)},children:e.jsx(t,{id:"OversiktSteg.Infoboks.Tilpass"})})})]}),H&&l.erFødsel&&e.jsx(L,{header:e.jsx(t,{id:"OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt"}),icon:e.jsx(fe,{height:24,width:24,fontSize:"1.5rem",color:"var(--ax-bg-accent-strong)","aria-hidden":!0}),color:"green",children:e.jsxs("div",{children:[e.jsx(S,{children:e.jsx(t,{id:"OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk"})}),e.jsx(S,{children:e.jsx(t,{id:"OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon"})})]})}),e.jsxs(m,{gap:"space-4",children:[e.jsxs(O,{defaultValue:D?.dekningsgrad,size:W?"medium":"small",variant:"neutral",onChange:a=>w(a),style:{width:"100%"},children:[e.jsx(O.Item,{value:"100",children:e.jsx(t,{id:"OversiktSteg.100",values:{uker:T.uker,dager:T.dager}})}),e.jsx(O.Item,{value:"80",children:e.jsx(t,{id:"OversiktSteg.80",values:{uker:j.uker,dager:j.dager}})})]}),i==="beggeHarRett"&&(!l.erFødsel||r.type!==A.FAR_OG_FAR)&&e.jsx($,{defaultValue:p?.antallDagerSøker1,label:"Velg fordeling fellesperiode",hideLabel:!0,name:"antallDagerSøker1",onChange:a=>{F({antallDagerSøker1:Number.parseInt(a.target.value,10)})},children:le(G).map(a=>e.jsx("option",{value:a.antallUkerOgDagerSøker1.totaltAntallDager,children:ie(s,a,r,z,J,Q)},a.antallUkerOgDagerSøker1.totaltAntallDager))})]}),e.jsx(ee,{barn:Re(l),erFarEllerMedmor:C,navnPåForeldre:pe(r,s),modus:"planlegger",valgtStønadskonto:c,aleneOmOmsorg:K(r),erMedmorDelAvSøknaden:me(r),bareFarMedmorHarRett:B,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:p!==void 0,saksperioder:U??[...x.søker1,...x.søker2],children:e.jsx(re,{readOnly:!0,barnehagestartdato:M})}),e.jsx(L,{header:e.jsx(t,{id:"OversiktSteg.Infoboks.Utkast",values:{erAleneforsørger:v}}),color:"gray",icon:e.jsx(I,{height:24,width:24,fontSize:"1-5rem","aria-hidden":!0}),children:e.jsxs(m,{gap:"space-8",children:[e.jsx(te,{children:e.jsx(t,{id:"OversiktSteg.Infoboks.Utkast.Tekst",values:{erAleneforsørger:v}})}),e.jsx(y,{children:e.jsx(P,{variant:"primary",type:"button",onClick:()=>{o.goToNextStep(R.TILPASS_PLANEN)},children:e.jsx(S,{size:"small",children:e.jsx(t,{id:"OversiktSteg.Infoboks.TilpassPlanen"})})})})]})}),e.jsxs(m,{gap:"space-4",children:[e.jsx(De,{arbeidssituasjon:E,barnet:l,hvemPlanlegger:r}),e.jsx(Fe,{arbeidssituasjon:E,hvemPlanlegger:r,barnet:l})]}),e.jsx(ae,{goToPreviousStep:o.goToPreviousDefaultStep,nextButtonOnClick:()=>{o.goToNextStep(R.OPPSUMMERING)},isJumpToEndButton:!0,useSimplifiedTexts:!0})]})})})},Te=(g,s,o)=>{const k=V(g==="100"?s[100]:s[80]);return Math.min(o.antallDagerSøker1,k.totaltAntallDager)};be.__docgenInfo={description:"",methods:[],displayName:"PlanenDeresSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    80: KontoBeregningDto;
    100: KontoBeregningDto;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{be as P};
