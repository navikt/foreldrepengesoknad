import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as se,a as oe,b as M,C as j,n as O,c as J,i as ie}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{P as _}from"./routes-DI-Woyga.js";import{I as H}from"./Infobox-2dY1MjSC.js";import{G as ue}from"./GreenRadioGroup-DxUftn9i.js";import{P as de}from"./PlanleggerStepPage-CgQnGAng.js";import{u as le,F as ge,R as Q,S as me}from"./StepButtonsHookForm-DUdbmqm8.js";import{u as w,F as r}from"./index-e2vXP8VC.js";import{A as D}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f,a as x,e as R,b as X,g as ke,S as E}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as Y}from"./hvemHarRettUtils-Dvw973AZ.js";import{u as pe}from"./useScrollBehaviour-BhOrFi8k.js";import{f as I,a as ve,b as ye,c as W}from"./uttakUtils-ViXZh0qG.js";import{L as N,l as L}from"./links-BAR-PZvy.js";import"./dateUtils-C_C2kvi-.js";import"./index-Dl6G-zuu.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{P as ce}from"./PersonGroup-5deYFPGw.js";import{V as F}from"./VStack-C-EA7mzX.js";import{B as i,H as je}from"./Label-DKKZxAV5.js";import{b as fe,e as Se}from"./barnetUtils-Dtg6gkcN.js";import{C as Z}from"./Calendar-In9Ft7th.js";import{S as be}from"./Spacer-DYbme5k_.js";const $=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=w(),u=n.status===D.INGEN||n.status===D.UFØR,y=n.jobberAnnenPart===!1;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?f(a,t):x(a,t)}}),icon:e.jsx(ce,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[y&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:f(a,t),hvem2:x(a,t)}})})]}),u&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:f(a,t),hvem2:x(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:d=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:d}),hvem:f(a,t),erMorHovedsøker:R(t)}})})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ee=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:y,uttaksdata80:d,valgtDekningsgrad:s,antallUker:p})=>{const o=w(),c=t.antallBarn,S=fe(t),b=Se(t),v=Y(a),P=X(n)||v==="kunSøker1HarRett"||v==="kunSøker2HarRett",B=I(v,n,u,t),l=o.formatDate(B.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),g=s===k.HUNDRE_PROSENT?y.sluttdatoPeriode1:d.sluttdatoPeriode1,q=s===k.HUNDRE_PROSENT?y.sluttdatoPeriode2:d.sluttdatoPeriode2;return e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:o.formatDate(q||g,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Z,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(i,{children:[S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:c,kunEnPartSkalHa:P,dato:l}}),!S&&b&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:c,erMorDelAvSøknaden:R(n),dato:l,kunEnPartSkalHa:P}}),!S&&!b&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:c,erMorDelAvSøknaden:R(n),kunEnPartSkalHa:P}})]}),v!=="kunSøker1HarRett"&&e.jsxs(F,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:ve(u),uker2:p,b:m=>e.jsx("b",{children:m}),hvem:f(o,n),erMorHovedsøker:R(n)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:ye(u),uker2:p,a:m=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:f(o,n),erMorHovedsøker:R(n)}})})]})]})};ee.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Pe=({stønadskontoer:t,locale:n})=>{const a=w(),u=se(n),y=oe(),d=M(j.HVOR_LANG_PERIODE),s=O(M(j.HVEM_PLANLEGGER)),p=O(M(j.OM_BARNET)),o=O(M(j.ARBEIDSSITUASJON)),c=J(j.HVOR_LANG_PERIODE),S=J(j.FORDELING),b=le({defaultValues:d}),v=X(s),P=A=>{c(A);const ae=s.type===E.FAR_OG_FAR,z=o.status===D.JOBBER&&!!o.jobberAnnenPart&&!(ae&&p.erFødsel)?_.FORDELING:_.OVERSIKT;return z===_.OVERSIKT&&S(void 0),u.goToNextStep(z)},l=b.watch("dekningsgrad")||(d==null?void 0:d.dekningsgrad),g=Y(o),q=ke(s,g,a),m=t[k.HUNDRE_PROSENT],G=t[k.ÅTTI_PROSENT],U=l?l===k.HUNDRE_PROSENT?m:G:void 0,C=I(g,s,m,p),V=I(g,s,G,p),T=W(C),h=W(V),re=l===k.HUNDRE_PROSENT?T:h,K=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",{ref:te,scrollToBottom:ne}=pe();return e.jsx(de,{ref:te,steps:y,children:e.jsx(ge,{formMethods:b,onSubmit:P,shouldUseFlexbox:!0,children:e.jsxs(F,{gap:"10",style:{flex:1},children:[e.jsxs(F,{gap:"8",children:[e.jsx(je,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Z,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:v||g==="ingenHarRett",uker100:T,uker80:h}})})}),!v&&K&&s.type!==E.FAR_OG_FAR&&e.jsx($,{hvemPlanlegger:s,arbeidssituasjon:o}),K&&s.type===E.FAR_OG_FAR&&e.jsxs(H,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:A=>e.jsx(N,{inlineText:!0,href:L.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:A})}})})]}),e.jsxs(ue,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[ie(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ne,children:[e.jsx(Q,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T}})}),e.jsx(Q,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:h}})})]}),U&&e.jsx(ee,{barnet:p,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:V,valgtDekningsgrad:l,antallUker:re},l)]}),e.jsx(be,{}),e.jsx(me,{saveDataOnPreviousClick:c,goToPreviousStep:u.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Pe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
