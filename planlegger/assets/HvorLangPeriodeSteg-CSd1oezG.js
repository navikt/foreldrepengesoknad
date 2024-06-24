import{j as e,V as P}from"./VStack-WHXoK350.js";import{u as ie,a as ue,b as x,C as j,n as E,c as J,i as de}from"./usePlanleggerNavigator-enELjm0Z.js";import{P as D}from"./routes-Cp-2uEwO.js";import{G as le}from"./GreenRadioGroup-whaVc2sY.js";import{P as ge}from"./PlanleggerStepPage-Y_B0UYUu.js";import{u as ke,F as me,R as Q,S as pe}from"./StepButtonsHookForm-D2ARl_z7.js";import{u as L,M as r,B as o,H as ve}from"./Label-8FC7ZTne.js";import{A as N}from"./Arbeidssituasjon-DGPKIgtk.js";import{D as m}from"./Dekningsgrad-Bg_cIyqc.js";import{f as A,a as H,e as I,b as Z,S as b,g as W,c as X,d as ye}from"./HvemPlanleggerUtils-CBBhcrhA.js";import{u as $}from"./hvemHarRettUtils-0reXu60r.js";import{f as w,a as ce,b as je,c as Y}from"./uttakUtils-CJz5obiz.js";import{d as T,L as B,l as G}from"./Infobox-Kqsc7CLm.js";import"./index-DVXBtNgz.js";import{u as Se}from"./useScrollBehaviour-WVMBWXos.js";import{S as fe}from"./PersonGroup-Cfb_4mVh.js";import{b as be,e as Pe}from"./barnetUtils-Dtg6gkcN.js";import{S as ee}from"./Calendar-BZZfWk4Z.js";import{S as Re}from"./Spacer-CmfZYR-2.js";const re=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=L(),l=n.status===N.INGEN||n.status===N.UFØR,i=n.jobberAnnenPart===!1;return e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:l?A(s,t):H(s,t)}}),icon:e.jsx(fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[i&&e.jsxs(P,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:H(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:A(s,t),hvem2:H(s,t)}})})]}),l&&e.jsxs(P,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:A(s,t),hvem2:H(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:A(s,t),erMorHovedsøker:I(t)}})})]})]})};re.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const te=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:l,uttaksdata100:i,uttaksdata80:a,valgtDekningsgrad:p,antallUker:g})=>{const u=L(),S=t.antallBarn,k=be(t),f=Pe(t),v=$(s),R=Z(n)||v==="kunSøker1HarRett"||v==="kunSøker2HarRett",y=w(v,n,l,t),d=u.formatDate(y.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),F=p===m.HUNDRE_PROSENT?i.sluttdatoPeriode1:a.sluttdatoPeriode1,q=p===m.HUNDRE_PROSENT?i.sluttdatoPeriode2:a.sluttdatoPeriode2,M=n.type===b.FAR_OG_FAR&&!k;return e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:u.formatDate(q||F,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(ee,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(o,{children:[k&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:S,kunEnPartSkalHa:R,dato:d}}),!k&&f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:S,erMorDelAvSøknaden:I(n),dato:d,kunEnPartSkalHa:R}}),!k&&!f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:S,erMorDelAvSøknaden:I(n),kunEnPartSkalHa:R}})]}),(v==="kunSøker2HarRett"&&!M||v==="kunSøker1HarRett"&&n.type===b.FAR_OG_FAR&&k)&&e.jsxs(P,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:ce(l),uker2:g,b:c=>e.jsx("b",{children:c}),hvem:W(n,u),hvemPart1:X(n,u)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:je(l),uker2:g,a:c=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:c}),b:c=>e.jsx("b",{children:c}),hvem:W(n,u),hvemPart1:X(n,u)}})})]})]})};te.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Fe=({stønadskontoer:t})=>{const n=L(),s=ie(),l=ue(),i=x(j.HVOR_LANG_PERIODE),a=E(x(j.HVEM_PLANLEGGER)),p=E(x(j.OM_BARNET)),g=E(x(j.ARBEIDSSITUASJON)),u=J(j.HVOR_LANG_PERIODE),S=J(j.FORDELING),k=ke({defaultValues:i}),f=Z(a),v=O=>{u(O);const oe=a.type===b.FAR_OG_FAR,K=g.status===N.JOBBER&&!!g.jobberAnnenPart&&!(oe&&p.erFødsel)?D.FORDELING:D.PLANEN_DERES;return K===D.PLANEN_DERES&&S(void 0),s.goToNextStep(K)},y=k.watch("dekningsgrad")||(i==null?void 0:i.dekningsgrad),d=$(g),F=ye(a,d,n),q=t[m.HUNDRE_PROSENT],M=t[m.ÅTTI_PROSENT],c=y===m.HUNDRE_PROSENT?q:M,U=y?c:void 0,C=w(d,a,q,p),V=w(d,a,M,p),_=Y(C),h=Y(V),ne=y===m.HUNDRE_PROSENT?_:h,z=d==="kunSøker1HarRett"||d==="kunSøker2HarRett",{ref:ae,scrollToBottom:se}=Se();return e.jsx(ge,{ref:ae,steps:l,children:e.jsx(me,{formMethods:k,onSubmit:v,shouldUseFlexbox:!0,children:e.jsxs(P,{gap:"10",style:{flex:1},children:[e.jsxs(P,{gap:"8",children:[e.jsx(ve,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(ee,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:f||d==="ingenHarRett",uker100:_,uker80:h}})})}),!f&&z&&a.type!==b.FAR_OG_FAR&&e.jsx(re,{hvemPlanlegger:a,arbeidssituasjon:g}),z&&a.type===b.FAR_OG_FAR&&e.jsxs(T,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]}),e.jsxs(le,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:F}}),name:"dekningsgrad",validate:[de(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:F}))],onChange:se,children:[e.jsx(Q,{value:m.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:_}})}),e.jsx(Q,{value:m.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:h}})})]}),U&&e.jsx(te,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:g,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:V,valgtDekningsgrad:y,antallUker:ne},y)]}),e.jsx(Re,{}),e.jsx(pe,{saveDataOnPreviousClick:u,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
