import{a9 as I,j as e,a1 as M,a2 as c,a3 as i,Y as r,a5 as L,a6 as B,ag as W,aa as D,Z as le,_ as pe,ab as me,ac as ke,$ as K,ad as ve}from"./iframe-BSnBYb0H.js";import{c as ye,e as ce,u as q,C as b,f as V}from"./usePlanleggerNavigator-CtW8Zg21.js";import{P as E}from"./routes-Cyl7_Mgv.js";import{B as Pe}from"./BlueRadioGroup-DWZ0_w04.js";import{P as be}from"./PlanleggerStepPage-C3SgeqXX.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as v}from"./Dekningsgrad-Bg_cIyqc.js";import{f as x,b as A,c as N,e as X,H as F,g as z,a as J,d as fe}from"./HvemPlanleggerUtils-tY-ycf-D.js";import{e as ee,b as je}from"./barnetUtils-C4R--m3k.js";import{u as re}from"./hvemHarRettUtils-TmteFj5U.js";import{g as Te,a as Y,b as Z,f as $,c as Q}from"./uttakUtils-Cm-YuDI-.js";import{u as Re}from"./useScrollBehaviour-DBnWHCX4.js";import{S as Fe}from"./PersonGroup-s2foYm7K.js";import{S as Se}from"./Spacer-CYP_imde.js";const te=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=I(),u=n.status===w.INGEN||n.status===w.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(M,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?A(a,t):x(a,t)}}),icon:e.jsx(Fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[d&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:A(a,t),hvem2:x(a,t)}})})]}),u&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:A(a,t),hvem2:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:A(a,t),erMorHovedsøker:N(t)}})})]})]})};te.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ne=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:d,uttaksdata80:s,valgtDekningsgrad:p,antallUkerOgDager:o})=>{const g=I(),f=t.antallBarn,m=ee(t),S=je(t),P=re(a),j=X(n)||P==="kunSøker1HarRett"||P==="kunSøker2HarRett",h=g.formatDate(Te(t),{day:"2-digit",month:"long",year:"numeric"}),y=p===v.HUNDRE_PROSENT?d.sluttdatoPeriode1:s.sluttdatoPeriode1,k=p===v.HUNDRE_PROSENT?d.sluttdatoPeriode2:s.sluttdatoPeriode2,H=n.type===F.FAR_OG_FAR&&!m;return e.jsxs(M,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:g.formatDate(k||y,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(W,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(i,{children:[m&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:f,kunEnPartSkalHa:j,dato:h}}),!m&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:f,erMorDelAvSøknaden:N(n),dato:h,kunEnPartSkalHa:j}}),!m&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:f,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:j}})]}),(P==="kunSøker2HarRett"&&!H||P==="kunSøker1HarRett"&&n.type===F.FAR_OG_FAR&&m)&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Y(u).uker,dager:Y(u).dager,uker2:o.uker,dager2:o.dager,b:l=>e.jsx("b",{children:l}),hvem:J(n,g),hvemPart1:z(n,g)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Z(u).uker,dager:Z(u).dager,uker2:o.uker,dager2:o.dager,a:l=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:l}),b:l=>e.jsx("b",{children:l}),hvem:J(n,g),hvemPart1:z(n,g)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const He=({stønadskontoer:t})=>{const n=I(),a=ye(),u=ce(),d=q(b.HVOR_LANG_PERIODE),s=D(q(b.HVEM_PLANLEGGER)),p=D(q(b.OM_BARNET)),o=D(q(b.ARBEIDSSITUASJON)),g=V(b.HVOR_LANG_PERIODE),f=V(b.FORDELING),m=le({defaultValues:d}),S=X(s),P=ee(p),j=O=>{g(O);const ge=s.type===F.FAR_OG_FAR,C=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(ge&&p.erFødsel)?E.FORDELING:E.PLANEN_DERES;return C===E.PLANEN_DERES&&f(void 0),a.goToNextStep(C)},y=m.watch("dekningsgrad")??(d==null?void 0:d.dekningsgrad),k=re(o),H=fe(s,k,n),l=t[v.HUNDRE_PROSENT],_=t[v.ÅTTI_PROSENT],ae=y===v.HUNDRE_PROSENT?l:_,G=y?ae:void 0,se=$(k,s,l,p),oe=$(k,s,_,p),T=Q(l),R=Q(_),ie=y===v.HUNDRE_PROSENT?T:R,U=k==="kunSøker1HarRett"||k==="kunSøker2HarRett",{ref:ue,scrollToBottom:de}=Re();return e.jsx(be,{ref:ue,steps:u,goToStep:a.goToNextStep,children:e.jsx(pe,{formMethods:m,onSubmit:j,shouldUseFlexbox:!0,children:e.jsxs(c,{gap:"10",style:{flex:1},children:[e.jsxs(c,{gap:"8",children:[e.jsx(me,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(M,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(W,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:k==="beggeHarRett",uker100:T.uker,dager100:T.dager,uker80:R.uker,dager80:R.dager}})})}),!S&&U&&s.type!==F.FAR_OG_FAR&&e.jsx(te,{hvemPlanlegger:s,arbeidssituasjon:o}),U&&s.type===F.FAR_OG_FAR&&P&&e.jsx(M,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(Pe,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:H}}),name:"dekningsgrad",validate:[ke(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:H}))],onChange:de,children:[e.jsx(K,{value:v.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T.uker,dager100:T.dager}})}),e.jsx(K,{value:v.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:R.uker,dager80:R.dager}})})]}),G&&e.jsx(c,{gap:"2",children:e.jsx(ne,{barnet:p,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:G,uttaksdata100:se,uttaksdata80:oe,valgtDekningsgrad:y,antallUkerOgDager:ie},y)})]}),e.jsx(Se,{}),e.jsx(ve,{saveDataOnPreviousClick:g,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};He.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
