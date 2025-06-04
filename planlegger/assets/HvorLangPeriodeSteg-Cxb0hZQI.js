import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as le,a as me,b as q,C as b,c as K}from"./usePlanleggerNavigator-B8T5xkBt.js";import{P as D}from"./routes-Cyl7_Mgv.js";import{B as pe}from"./BlueRadioGroup-CFQ4anrj.js";import{P as ke}from"./PlanleggerStepPage-jjtvH2XP.js";import{u as ve,R as ye,a as V,S as ce}from"./StepButtonsHookForm-DAMtOG3B.js";import{u as I,h,B as i,M as r,L,l as B,H as Pe}from"./VeiviserPage-_pnwesxq.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as v}from"./Dekningsgrad-Bg_cIyqc.js";import{f as x,a as M,e as N,b as Z,H as F,g as z,c as J,d as be}from"./HvemPlanleggerUtils-CID24uWy.js";import{b as $,e as fe}from"./barnetUtils-Dt6imNNn.js";import{u as ee}from"./hvemHarRettUtils-D25Zomat.js";import{g as je,a as Q,b as W,f as X,c as Y}from"./uttakUtils-B8z5A6Uh.js";import"./index-DQLiH3RP.js";import{u as Te}from"./useScrollBehaviour-CPpBIkgK.js";import{n as E}from"./validation-Dy1ue2_T.js";import{i as Re}from"./dateFormValidation-CtPPetz8.js";import{V as c}from"./VStack-05Ww9A8B.js";import{S as Fe}from"./PersonGroup-_nGe72we.js";import{S as re}from"./Responsive-CnWLTDCQ.js";import{S as Se}from"./Spacer-C5GDfzOr.js";const te=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=I(),u=n.status===w.INGEN||n.status===w.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?M(a,t):x(a,t)}}),icon:e.jsx(Fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[d&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:x(a,t)}})})]}),u&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:M(a,t),erMorHovedsøker:N(t)}})})]})]})};te.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ne=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:d,uttaksdata80:s,valgtDekningsgrad:m,antallUkerOgDager:o})=>{const g=I(),f=t.antallBarn,p=$(t),S=fe(t),P=ee(a),j=Z(n)||P==="kunSøker1HarRett"||P==="kunSøker2HarRett",A=g.formatDate(je(t),{day:"2-digit",month:"long",year:"numeric"}),y=m===v.HUNDRE_PROSENT?d.sluttdatoPeriode1:s.sluttdatoPeriode1,k=m===v.HUNDRE_PROSENT?d.sluttdatoPeriode2:s.sluttdatoPeriode2,H=n.type===F.FAR_OG_FAR&&!p;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:g.formatDate(k||y,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(re,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(i,{children:[p&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:f,kunEnPartSkalHa:j,dato:A}}),!p&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:f,erMorDelAvSøknaden:N(n),dato:A,kunEnPartSkalHa:j}}),!p&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:f,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:j}})]}),(P==="kunSøker2HarRett"&&!H||P==="kunSøker1HarRett"&&n.type===F.FAR_OG_FAR&&p)&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Q(u).uker,dager:Q(u).dager,uker2:o.uker,dager2:o.dager,b:l=>e.jsx("b",{children:l}),hvem:J(n,g),hvemPart1:z(n,g)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:W(u).uker,dager:W(u).dager,uker2:o.uker,dager2:o.dager,a:l=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:l}),b:l=>e.jsx("b",{children:l}),hvem:J(n,g),hvemPart1:z(n,g)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const He=({stønadskontoer:t})=>{const n=I(),a=le(),u=me(),d=q(b.HVOR_LANG_PERIODE),s=E(q(b.HVEM_PLANLEGGER)),m=E(q(b.OM_BARNET)),o=E(q(b.ARBEIDSSITUASJON)),g=K(b.HVOR_LANG_PERIODE),f=K(b.FORDELING),p=ve({defaultValues:d}),S=Z(s),P=$(m),j=O=>{g(O);const ge=s.type===F.FAR_OG_FAR,C=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(ge&&m.erFødsel)?D.FORDELING:D.PLANEN_DERES;return C===D.PLANEN_DERES&&f(void 0),a.goToNextStep(C)},y=p.watch("dekningsgrad")??(d==null?void 0:d.dekningsgrad),k=ee(o),H=be(s,k,n),l=t[v.HUNDRE_PROSENT],_=t[v.ÅTTI_PROSENT],ae=y===v.HUNDRE_PROSENT?l:_,G=y?ae:void 0,se=X(k,s,l,m),oe=X(k,s,_,m),T=Y(l),R=Y(_),ie=y===v.HUNDRE_PROSENT?T:R,U=k==="kunSøker1HarRett"||k==="kunSøker2HarRett",{ref:ue,scrollToBottom:de}=Te();return e.jsx(ke,{ref:ue,steps:u,goToStep:a.goToNextStep,children:e.jsx(ye,{formMethods:p,onSubmit:j,shouldUseFlexbox:!0,children:e.jsxs(c,{gap:"10",style:{flex:1},children:[e.jsxs(c,{gap:"8",children:[e.jsx(Pe,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(re,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:k==="beggeHarRett",uker100:T.uker,dager100:T.dager,uker80:R.uker,dager80:R.dager}})})}),!S&&U&&s.type!==F.FAR_OG_FAR&&e.jsx(te,{hvemPlanlegger:s,arbeidssituasjon:o}),U&&s.type===F.FAR_OG_FAR&&P&&e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(pe,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:H}}),name:"dekningsgrad",validate:[Re(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:H}))],onChange:de,children:[e.jsx(V,{value:v.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T.uker,dager100:T.dager}})}),e.jsx(V,{value:v.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:R.uker,dager80:R.dager}})})]}),G&&e.jsx(c,{gap:"2",children:e.jsx(ne,{barnet:m,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:G,uttaksdata100:se,uttaksdata80:oe,valgtDekningsgrad:y,antallUkerOgDager:ie},y)})]}),e.jsx(Se,{}),e.jsx(ce,{saveDataOnPreviousClick:g,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};He.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{He as H};
