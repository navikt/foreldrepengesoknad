import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as se,a as oe,b as x,C as f,n as _,c as J,i as ie}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{P as O}from"./routes-DI-Woyga.js";import{I as H}from"./Infobox-2dY1MjSC.js";import{G as ue}from"./GreenRadioGroup-DxUftn9i.js";import{P as de}from"./PlanleggerStepPage-CgQnGAng.js";import{u as le,F as ge,R as Q,S as me}from"./StepButtonsHookForm-DUdbmqm8.js";import{u as w,F as r}from"./index-e2vXP8VC.js";import{A as E}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as p}from"./Dekningsgrad-Bg_cIyqc.js";import{f as S,a as b,e as D,b as X,S as T,g as ke}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as Y}from"./hvemHarRettUtils-Dvw973AZ.js";import{u as pe}from"./useScrollBehaviour-BhOrFi8k.js";import{f as I,a as ve,b as ye,c as W}from"./uttakUtils-CrBM_WY2.js";import{L as N,l as L}from"./links-BAR-PZvy.js";import"./dateUtils-C_C2kvi-.js";import"./index-Dl6G-zuu.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{P as ce}from"./PersonGroup-5deYFPGw.js";import{V as F}from"./VStack-C-EA7mzX.js";import{B as i,H as je}from"./Label-DKKZxAV5.js";import{b as fe,e as Se}from"./barnetUtils-Dtg6gkcN.js";import{C as Z}from"./Calendar-In9Ft7th.js";import{S as be}from"./Spacer-DYbme5k_.js";const $=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=w(),u=n.status===E.INGEN||n.status===E.UFØR,y=n.jobberAnnenPart===!1;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?S(a,t):b(a,t)}}),icon:e.jsx(ce,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[y&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:b(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:S(a,t),hvem2:b(a,t)}})})]}),u&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:S(a,t),hvem2:b(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:d=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:d}),hvem:S(a,t),erMorHovedsøker:D(t)}})})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ee=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:y,uttaksdata80:d,valgtDekningsgrad:s,antallUker:v})=>{const o=w(),c=t.antallBarn,j=fe(t),P=Se(t),l=Y(a),R=X(n)||l==="kunSøker1HarRett"||l==="kunSøker2HarRett",B=I(l,n,u,t),g=o.formatDate(B.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),m=s===p.HUNDRE_PROSENT?y.sluttdatoPeriode1:d.sluttdatoPeriode1,q=s===p.HUNDRE_PROSENT?y.sluttdatoPeriode2:d.sluttdatoPeriode2;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:o.formatDate(q||m,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Z,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(i,{children:[j&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:c,kunEnPartSkalHa:R,dato:g}}),!j&&P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:c,erMorDelAvSøknaden:D(n),dato:g,kunEnPartSkalHa:R}}),!j&&!P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:c,erMorDelAvSøknaden:D(n),kunEnPartSkalHa:R}})]}),(l!=="kunSøker1HarRett"||l==="kunSøker1HarRett"&&n.type===T.FAR_OG_FAR&&!j)&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:ve(u),uker2:v,b:k=>e.jsx("b",{children:k}),hvem:S(o,n),hvemPart1:b(o,n)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:ye(u),uker2:v,a:k=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:k}),b:k=>e.jsx("b",{children:k}),hvem:S(o,n),hvemPart1:b(o,n)}})})]})]})};ee.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},uttaksdata100:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Pe=({stønadskontoer:t,locale:n})=>{const a=w(),u=se(n),y=oe(),d=x(f.HVOR_LANG_PERIODE),s=_(x(f.HVEM_PLANLEGGER)),v=_(x(f.OM_BARNET)),o=_(x(f.ARBEIDSSITUASJON)),c=J(f.HVOR_LANG_PERIODE),j=J(f.FORDELING),P=le({defaultValues:d}),l=X(s),R=A=>{c(A);const ae=s.type===T.FAR_OG_FAR,z=o.status===E.JOBBER&&!!o.jobberAnnenPart&&!(ae&&v.erFødsel)?O.FORDELING:O.OVERSIKT;return z===O.OVERSIKT&&j(void 0),u.goToNextStep(z)},g=P.watch("dekningsgrad")||(d==null?void 0:d.dekningsgrad),m=Y(o),q=ke(s,m,a),k=t[p.HUNDRE_PROSENT],G=t[p.ÅTTI_PROSENT],U=g?g===p.HUNDRE_PROSENT?k:G:void 0,C=I(m,s,k,v),V=I(m,s,G,v),M=W(C),h=W(V),re=g===p.HUNDRE_PROSENT?M:h,K=m==="kunSøker1HarRett"||m==="kunSøker2HarRett",{ref:te,scrollToBottom:ne}=pe();return e.jsx(de,{ref:te,steps:y,children:e.jsx(ge,{formMethods:P,onSubmit:R,shouldUseFlexbox:!0,children:e.jsxs(F,{gap:"10",style:{flex:1},children:[e.jsxs(F,{gap:"8",children:[e.jsx(je,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Z,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:l||m==="ingenHarRett",uker100:M,uker80:h}})})}),!l&&K&&s.type!==T.FAR_OG_FAR&&e.jsx($,{hvemPlanlegger:s,arbeidssituasjon:o}),K&&s.type===T.FAR_OG_FAR&&e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:A=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:A})}})})]}),e.jsxs(ue,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[ie(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ne,children:[e.jsx(Q,{value:p.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:M}})}),e.jsx(Q,{value:p.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:h}})})]}),U&&e.jsx(ee,{barnet:v,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:V,valgtDekningsgrad:g,antallUker:re},g)]}),e.jsx(be,{}),e.jsx(me,{saveDataOnPreviousClick:c,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Pe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{Pe as H};
