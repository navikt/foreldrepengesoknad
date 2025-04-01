import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as me,a as pe,b as q,C as f,c as V}from"./usePlanleggerNavigator-A72G1pfO.js";import{P as D}from"./routes-Cyl7_Mgv.js";import{B as ke}from"./BlueRadioGroup-DEsHqAbk.js";import{P as ve}from"./PlanleggerStepPage-C5NEoUlk.js";import{u as ye,R as ce,a as z,S as be}from"./StepButtonsHookForm-Dugejak8.js";import{u as I,h,M as r,B as d,L,l as B,H as Pe}from"./VeiviserPage-CZP2D-AH.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as p}from"./Dekningsgrad-Bg_cIyqc.js";import{f as x,a as M,e as N,b as $,g as J,c as Q,d as fe}from"./HvemPlanleggerUtils-DVSnR1d3.js";import{b as ee,e as je}from"./barnetUtils-icZA41Ug.js";import{u as re}from"./hvemHarRettUtils-PL84_TMj.js";import{g as Te,a as W,b as X,f as Y,c as Z}from"./uttakUtils-BofYyS6t.js";import"./index-CR__hKHy.js";import{u as Re}from"./useScrollBehaviour-Dvq8pEsj.js";import{H as S}from"./HvemPlanleggerType-CugjyLV2.js";import{n as E}from"./validation-DYlyn1BB.js";import{i as Fe}from"./dateFormValidation-ZTysAgMu.js";import{S as Se}from"./PersonGroup-B--Zxy9X.js";import{V as y}from"./VStack-2apmvZh_.js";import{S as te}from"./Responsive-B-Uwxu87.js";import{S as He}from"./Spacer-DmBY75Fg.js";const ne=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=I(),i=n.status===w.INGEN||n.status===w.UFØR,c=n.jobberAnnenPart===!1;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:i?x(a,t):M(a,t)}}),icon:e.jsx(Se,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[c&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:M(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:x(a,t),hvem2:M(a,t)}})})]}),i&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:x(a,t),hvem2:M(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:l=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:l}),hvem:x(a,t),erMorHovedsøker:N(t)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ae=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:i,uttaksdata100:c,uttaksdata80:l,valgtDekningsgrad:s,antallUkerOgDager:u})=>{const o=I(),b=t.antallBarn,k=ee(t),j=je(t),P=re(a),T=$(n)||P==="kunSøker1HarRett"||P==="kunSøker2HarRett",H=o.formatDate(Te(t),{day:"2-digit",month:"long",year:"numeric"}),G=s===p.HUNDRE_PROSENT?c.sluttdatoPeriode1:l.sluttdatoPeriode1,v=s===p.HUNDRE_PROSENT?c.sluttdatoPeriode2:l.sluttdatoPeriode2,g=n.type===S.FAR_OG_FAR&&!k;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:o.formatDate(v||G,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(d,{children:[k&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:T,dato:H}}),!k&&j&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:N(n),dato:H,kunEnPartSkalHa:T}}),!k&&!j&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:T}})]}),(P==="kunSøker2HarRett"&&!g||P==="kunSøker1HarRett"&&n.type===S.FAR_OG_FAR&&k)&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:W(i).uker,dager:W(i).dager,uker2:u.uker,dager2:u.dager,b:m=>e.jsx("b",{children:m}),hvem:J(n,o),hvemPart1:Q(n,o)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:X(i).uker,dager:X(i).dager,uker2:u.uker,dager2:u.dager,a:m=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:J(n,o),hvemPart1:Q(n,o)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]}},description:""},uttaksdata100:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},uttaksdata80:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUkerOgDager:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    uker: number;
    dager: number;
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const qe=({stønadskontoer:t,locale:n})=>{const a=I(),i=me(n),c=pe(),l=q(f.HVOR_LANG_PERIODE),s=E(q(f.HVEM_PLANLEGGER)),u=E(q(f.OM_BARNET)),o=E(q(f.ARBEIDSSITUASJON)),b=V(f.HVOR_LANG_PERIODE),k=V(f.FORDELING),j=ye({defaultValues:l}),P=$(s),T=ee(u),H=O=>{b(O);const ge=s.type===S.FAR_OG_FAR,K=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(ge&&u.erFødsel)?D.FORDELING:D.PLANEN_DERES;return K===D.PLANEN_DERES&&k(void 0),i.goToNextStep(K)},v=j.watch("dekningsgrad")||(l==null?void 0:l.dekningsgrad),g=re(o),m=fe(s,g,a),A=t[p.HUNDRE_PROSENT],_=t[p.ÅTTI_PROSENT],se=v===p.HUNDRE_PROSENT?A:_,U=v?se:void 0,oe=Y(g,s,A,u),ie=Y(g,s,_,u),R=Z(A),F=Z(_),ue=v===p.HUNDRE_PROSENT?R:F,C=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",{ref:de,scrollToBottom:le}=Re();return e.jsx(ve,{ref:de,steps:c,goToStep:i.goToNextStep,children:e.jsx(ce,{formMethods:j,onSubmit:H,shouldUseFlexbox:!0,children:e.jsxs(y,{gap:"10",style:{flex:1},children:[e.jsxs(y,{gap:"8",children:[e.jsx(Pe,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:g==="beggeHarRett",uker100:R.uker,dager100:R.dager,uker80:F.uker,dager80:F.dager}})})}),!P&&C&&s.type!==S.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:s,arbeidssituasjon:o}),C&&s.type===S.FAR_OG_FAR&&T&&e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(ke,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:m}}),name:"dekningsgrad",validate:[Fe(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:m}))],onChange:le,children:[e.jsx(z,{value:p.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:R.uker,dager100:R.dager}})}),e.jsx(z,{value:p.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:F.uker,dager80:F.dager}})})]}),U&&e.jsx(y,{gap:"2",children:e.jsx(ae,{barnet:u,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:U,uttaksdata100:oe,uttaksdata80:ie,valgtDekningsgrad:v,antallUkerOgDager:ue},v)})]}),e.jsx(He,{}),e.jsx(be,{saveDataOnPreviousClick:b,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};qe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{qe as H};
