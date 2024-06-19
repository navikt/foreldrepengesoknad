import{j as e,V as b}from"./VStack-WHXoK350.js";import{u as ie,a as ue,b as q,C as j,n as O,c as K,i as de}from"./usePlanleggerNavigator-B67pSNYQ.js";import{P as E}from"./routes-Cp-2uEwO.js";import{G as le}from"./GreenRadioGroup-Dx44FPGB.js";import{P as ge}from"./PlanleggerStepPage-BtPOCpCn.js";import{u as ke,F as me,R as J,S as pe}from"./StepButtonsHookForm-C_347iV_.js";import{u as w,M as r,B as o,H as ve}from"./Label-fr1ceDiJ.js";import{A as D}from"./Arbeidssituasjon-D_CF5PSD.js";import{D as m}from"./Dekningsgrad-Bg_cIyqc.js";import{f as M,a as x,e as N,b as Y,S as H,g as Q,c as W,d as ye}from"./HvemPlanleggerUtils-CBBhcrhA.js";import{u as Z}from"./hvemHarRettUtils-3zT87B9U.js";import{f as I,a as ce,b as je,c as X}from"./uttakUtils-BHa5NTlE.js";import{d as A,L,l as B}from"./Infobox-7mLdiqNb.js";import"./index-DVXBtNgz.js";import{u as Se}from"./useScrollBehaviour-WVMBWXos.js";import{S as fe}from"./PersonGroup-Cfb_4mVh.js";import{b as be,e as Pe}from"./barnetUtils-Dtg6gkcN.js";import{S as $}from"./Calendar-BZZfWk4Z.js";import{S as Re}from"./Spacer-CmfZYR-2.js";const ee=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=w(),l=n.status===D.INGEN||n.status===D.UFØR,i=n.jobberAnnenPart===!1;return e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:l?M(s,t):x(s,t)}}),icon:e.jsx(fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[i&&e.jsxs(b,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:x(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(s,t),hvem2:x(s,t)}})})]}),l&&e.jsxs(b,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(s,t),hvem2:x(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:M(s,t),erMorHovedsøker:N(t)}})})]})]})};ee.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const re=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:l,uttaksdata100:i,uttaksdata80:a,valgtDekningsgrad:p,antallUker:g})=>{const u=w(),S=t.antallBarn,v=be(t),f=Pe(t),y=Z(s),P=Y(n)||y==="kunSøker1HarRett"||y==="kunSøker2HarRett",c=I(y,n,l,t),d=u.formatDate(c.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),R=p===m.HUNDRE_PROSENT?i.sluttdatoPeriode1:a.sluttdatoPeriode1,F=p===m.HUNDRE_PROSENT?i.sluttdatoPeriode2:a.sluttdatoPeriode2;return e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:u.formatDate(F||R,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx($,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(o,{children:[v&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:S,kunEnPartSkalHa:P,dato:d}}),!v&&f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:S,erMorDelAvSøknaden:N(n),dato:d,kunEnPartSkalHa:P}}),!v&&!f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:S,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:P}})]}),(y==="kunSøker2HarRett"||y==="kunSøker1HarRett"&&n.type===H.FAR_OG_FAR&&v)&&e.jsxs(b,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:ce(l),uker2:g,b:k=>e.jsx("b",{children:k}),hvem:Q(n,u),hvemPart1:W(n,u)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:je(l),uker2:g,a:k=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:k}),b:k=>e.jsx("b",{children:k}),hvem:Q(n,u),hvemPart1:W(n,u)}})})]})]})};re.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Fe=({stønadskontoer:t})=>{const n=w(),s=ie(),l=ue(),i=q(j.HVOR_LANG_PERIODE),a=O(q(j.HVEM_PLANLEGGER)),p=O(q(j.OM_BARNET)),g=O(q(j.ARBEIDSSITUASJON)),u=K(j.HVOR_LANG_PERIODE),S=K(j.FORDELING),v=ke({defaultValues:i}),f=Y(a),y=_=>{u(_);const oe=a.type===H.FAR_OG_FAR,z=g.status===D.JOBBER&&!!g.jobberAnnenPart&&!(oe&&p.erFødsel)?E.FORDELING:E.PLANEN_DERES;return z===E.PLANEN_DERES&&S(void 0),s.goToNextStep(z)},c=v.watch("dekningsgrad")||(i==null?void 0:i.dekningsgrad),d=Z(g),R=ye(a,d,n),F=t[m.HUNDRE_PROSENT],k=t[m.ÅTTI_PROSENT],te=c===m.HUNDRE_PROSENT?F:k,G=c?te:void 0,U=I(d,a,F,p),C=I(d,a,k,p),T=X(U),h=X(C),ne=c===m.HUNDRE_PROSENT?T:h,V=d==="kunSøker1HarRett"||d==="kunSøker2HarRett",{ref:ae,scrollToBottom:se}=Se();return e.jsx(ge,{ref:ae,steps:l,children:e.jsx(me,{formMethods:v,onSubmit:y,shouldUseFlexbox:!0,children:e.jsxs(b,{gap:"10",style:{flex:1},children:[e.jsxs(b,{gap:"8",children:[e.jsx(ve,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx($,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:f||d==="ingenHarRett",uker100:T,uker80:h}})})}),!f&&V&&a.type!==H.FAR_OG_FAR&&e.jsx(ee,{hvemPlanlegger:a,arbeidssituasjon:g}),V&&a.type===H.FAR_OG_FAR&&e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:_=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:_})}})})]}),e.jsxs(le,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:R}}),name:"dekningsgrad",validate:[de(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:R}))],onChange:se,children:[e.jsx(J,{value:m.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T}})}),e.jsx(J,{value:m.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:h}})})]}),G&&e.jsx(re,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:g,valgtStønadskonto:G,uttaksdata100:U,uttaksdata80:C,valgtDekningsgrad:c,antallUker:ne},c)]}),e.jsx(Re,{}),e.jsx(pe,{saveDataOnPreviousClick:u,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};export{Fe as H};
