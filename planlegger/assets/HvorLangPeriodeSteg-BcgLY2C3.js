import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as se,a as oe,b as H,C as j,n as O,c as z,i as ie}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{P as E}from"./routes-DI-Woyga.js";import{I as T}from"./Infobox-BU2nfHQM.js";import{G as ue}from"./GreenRadioGroup-BphnEWR6.js";import{P as de}from"./PlanleggerStepPage-h6LOHlbT.js";import{u as le,F as ge,R as J,S as me}from"./StepButtonsHookForm-CewIG5kA.js";import{u as N,F as r}from"./index-e2vXP8VC.js";import{A as D}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f,a as S,e as I,b as W,S as M,g as ke}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as X}from"./hvemHarRettUtils-Dvw973AZ.js";import{u as pe}from"./useScrollBehaviour-CDJE6G12.js";import{f as w,a as ve,b as ye,c as Q}from"./uttakUtils-BkryVa93.js";import{L,l as B}from"./links-BpMlpHhY.js";import"./dateUtils-C_C2kvi-.js";import"./index-Dl6G-zuu.js";import"./calendarLabel.module-WmgcNkkl.js";import"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{P as ce}from"./PersonGroup-5deYFPGw.js";import{V as R}from"./VStack-C-EA7mzX.js";import{B as o,H as je}from"./Label-DKKZxAV5.js";import{b as fe,e as Se}from"./barnetUtils-Dtg6gkcN.js";import{C as Y}from"./Calendar-In9Ft7th.js";import{S as be}from"./Spacer-DYbme5k_.js";const Z=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=N(),l=n.status===D.INGEN||n.status===D.UFØR,i=n.jobberAnnenPart===!1;return e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:l?f(s,t):S(s,t)}}),icon:e.jsx(ce,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[i&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:S(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:f(s,t),hvem2:S(s,t)}})})]}),l&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:f(s,t),hvem2:S(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:f(s,t),erMorHovedsøker:I(t)}})})]})]})};Z.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const $=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:l,uttaksdata100:i,uttaksdata80:a,valgtDekningsgrad:p,antallUker:g})=>{const u=N(),b=t.antallBarn,v=fe(t),P=Se(t),y=X(s),F=W(n)||y==="kunSøker1HarRett"||y==="kunSøker2HarRett",c=w(y,n,l,t),d=u.formatDate(c.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),q=p===k.HUNDRE_PROSENT?i.sluttdatoPeriode1:a.sluttdatoPeriode1,x=p===k.HUNDRE_PROSENT?i.sluttdatoPeriode2:a.sluttdatoPeriode2;return e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:u.formatDate(x||q,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(o,{children:[v&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:F,dato:d}}),!v&&P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:I(n),dato:d,kunEnPartSkalHa:F}}),!v&&!P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:I(n),kunEnPartSkalHa:F}})]}),(y==="kunSøker2HarRett"||y==="kunSøker1HarRett"&&n.type===M.FAR_OG_FAR&&v)&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:ve(l),uker2:g,b:m=>e.jsx("b",{children:m}),hvem:f(u,n),hvemPart1:S(u,n)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:ye(l),uker2:g,a:m=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:f(u,n),hvemPart1:S(u,n)}})})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Pe=({stønadskontoer:t})=>{const n=N(),s=se(),l=oe(),i=H(j.HVOR_LANG_PERIODE),a=O(H(j.HVEM_PLANLEGGER)),p=O(H(j.OM_BARNET)),g=O(H(j.ARBEIDSSITUASJON)),u=z(j.HVOR_LANG_PERIODE),b=z(j.FORDELING),v=le({defaultValues:i}),P=W(a),y=_=>{u(_);const ae=a.type===M.FAR_OG_FAR,K=g.status===D.JOBBER&&!!g.jobberAnnenPart&&!(ae&&p.erFødsel)?E.FORDELING:E.OVERSIKT;return K===E.OVERSIKT&&b(void 0),s.goToNextStep(K)},c=v.watch("dekningsgrad")||(i==null?void 0:i.dekningsgrad),d=X(g),q=ke(a,d,n),x=t[k.HUNDRE_PROSENT],m=t[k.ÅTTI_PROSENT],ee=c===k.HUNDRE_PROSENT?x:m,G=c?ee:void 0,U=w(d,a,x,p),C=w(d,a,m,p),h=Q(U),A=Q(C),re=c===k.HUNDRE_PROSENT?h:A,V=d==="kunSøker1HarRett"||d==="kunSøker2HarRett",{ref:te,scrollToBottom:ne}=pe();return e.jsx(de,{ref:te,steps:l,children:e.jsx(ge,{formMethods:v,onSubmit:y,shouldUseFlexbox:!0,children:e.jsxs(R,{gap:"10",style:{flex:1},children:[e.jsxs(R,{gap:"8",children:[e.jsx(je,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:P||d==="ingenHarRett",uker100:h,uker80:A}})})}),!P&&V&&a.type!==M.FAR_OG_FAR&&e.jsx(Z,{hvemPlanlegger:a,arbeidssituasjon:g}),V&&a.type===M.FAR_OG_FAR&&e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:_=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:_})}})})]}),e.jsxs(ue,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[ie(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ne,children:[e.jsx(J,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:h}})}),e.jsx(J,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:A}})})]}),G&&e.jsx($,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:g,valgtStønadskonto:G,uttaksdata100:U,uttaksdata80:C,valgtDekningsgrad:c,antallUker:re},c)]}),e.jsx(be,{}),e.jsx(me,{saveDataOnPreviousClick:u,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Pe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};export{Pe as H};
