import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as me,a as pe,b as x,C as b,c as Q}from"./usePlanleggerNavigator-D6g4VCti.js";import{P as D}from"./routes-Cp-2uEwO.js";import{B as ke}from"./BlueRadioGroup-CbWem8oN.js";import{P as ve}from"./PlanleggerStepPage-DKsuJSsX.js";import{u as ye,R as ce,a as W,S as je}from"./StepButtonsHookForm-B6JLgrCq.js";import{u as L,M as r,B as d,H as be}from"./Label-R9sLPhMW.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as p}from"./Dekningsgrad-Bg_cIyqc.js";import{f as M,a as A,e as N,b as re,S as F,g as X,c as Y,d as fe}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{b as te,e as Se}from"./barnetUtils-Dtg6gkcN.js";import{u as ne}from"./hvemHarRettUtils-BiyQH6Vj.js";import{f as I,a as Z,b as $,c as ee}from"./uttakUtils-XotSIqPP.js";import{d as H,L as B,l as G}from"./VeiviserPage-D3AeDTCR.js";import"./index-CTjT7uj6.js";import{u as Re,i as Pe}from"./dateFormValidation-Bslk1wJI.js";import{n as E}from"./validation-4HO0J-zV.js";import{S as Fe}from"./PersonGroup-D_DyOkqX.js";import{V as T}from"./VStack-BOynvu-T.js";import{S as ae}from"./Calendar-BSTiMy7q.js";import{S as Te}from"./Spacer-BW3tgveW.js";const se=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=L(),s=n.status===w.INGEN||n.status===w.UFØR,c=n.jobberAnnenPart===!1;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:s?M(a,t):A(a,t)}}),icon:e.jsx(Fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[c&&e.jsxs(T,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:A(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:A(a,t)}})})]}),s&&e.jsxs(T,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:A(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:l=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:l}),hvem:M(a,t),erMorHovedsøker:N(t)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const oe=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:s,uttaksdata100:c,uttaksdata80:l,valgtDekningsgrad:o,antallUkerOgDager:u})=>{const i=L(),j=t.antallBarn,k=te(t),f=Se(t),v=ne(a),S=re(n)||v==="kunSøker1HarRett"||v==="kunSøker2HarRett",h=I(v,n,s,t),_=i.formatDate(h.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),y=o===p.HUNDRE_PROSENT?c.sluttdatoPeriode1:l.sluttdatoPeriode1,g=o===p.HUNDRE_PROSENT?c.sluttdatoPeriode2:l.sluttdatoPeriode2,q=n.type===F.FAR_OG_FAR&&!k;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:i.formatDate(g||y,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(ae,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"gray",children:[e.jsxs(d,{children:[k&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:j,kunEnPartSkalHa:S,dato:_}}),!k&&f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:j,erMorDelAvSøknaden:N(n),dato:_,kunEnPartSkalHa:S}}),!k&&!f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:j,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:S}})]}),(v==="kunSøker2HarRett"&&!q||v==="kunSøker1HarRett"&&n.type===F.FAR_OG_FAR&&k)&&e.jsxs(T,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Z(s).uker,dager:Z(s).dager,uker2:u.uker,dager2:u.dager,b:m=>e.jsx("b",{children:m}),hvem:X(n,i),hvemPart1:Y(n,i)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:$(s).uker,dager:$(s).dager,uker2:u.uker,dager2:u.dager,a:m=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:X(n,i),hvemPart1:Y(n,i)}})})]})]})};oe.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const qe=({stønadskontoer:t,locale:n})=>{const a=L(),s=me(n),c=pe(),l=x(b.HVOR_LANG_PERIODE),o=E(x(b.HVEM_PLANLEGGER)),u=E(x(b.OM_BARNET)),i=E(x(b.ARBEIDSSITUASJON)),j=Q(b.HVOR_LANG_PERIODE),k=Q(b.FORDELING),f=ye({defaultValues:l}),v=re(o),S=te(u),h=O=>{j(O);const ge=o.type===F.FAR_OG_FAR,J=i.status===w.JOBBER&&!!i.jobberAnnenPart&&!(ge&&u.erFødsel)?D.FORDELING:D.PLANEN_DERES;return J===D.PLANEN_DERES&&k(void 0),s.goToNextStep(J)},y=f.watch("dekningsgrad")||(l==null?void 0:l.dekningsgrad),g=ne(i),q=fe(o,g,a),m=t[p.HUNDRE_PROSENT],U=t[p.ÅTTI_PROSENT],ie=y===p.HUNDRE_PROSENT?m:U,C=y?ie:void 0,K=I(g,o,m,u),V=I(g,o,U,u),R=ee(K),P=ee(V),ue=y===p.HUNDRE_PROSENT?R:P,z=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",{ref:de,scrollToBottom:le}=Re();return e.jsx(ve,{ref:de,steps:c,goToStep:s.goToNextStep,children:e.jsx(ce,{formMethods:f,onSubmit:h,shouldUseFlexbox:!0,children:e.jsxs(T,{gap:"10",style:{flex:1},children:[e.jsxs(T,{gap:"8",children:[e.jsx(be,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(ae,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:g==="beggeHarRett",uker100:R.uker,dager100:R.dager,uker80:P.uker,dager80:P.dager}})})}),!v&&z&&o.type!==F.FAR_OG_FAR&&e.jsx(se,{hvemPlanlegger:o,arbeidssituasjon:i}),z&&o.type===F.FAR_OG_FAR&&S&&e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]}),e.jsxs(ke,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[Pe(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:le,children:[e.jsx(W,{value:p.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:R.uker,dager100:R.dager}})}),e.jsx(W,{value:p.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:P.uker,dager80:P.dager}})})]}),C&&e.jsx(oe,{barnet:u,hvemPlanlegger:o,arbeidssituasjon:i,valgtStønadskonto:C,uttaksdata100:K,uttaksdata80:V,valgtDekningsgrad:y,antallUkerOgDager:ue},y)]}),e.jsx(Te,{}),e.jsx(je,{saveDataOnPreviousClick:j,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};qe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
