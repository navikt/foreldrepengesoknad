import{j as e}from"./jsx-runtime-_e34SzbC.js";import{u as se,a as oe,b as x,C as j,n as O,c as K,i as ie}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as E}from"./routes-Cp-2uEwO.js";import{I as A}from"./Infobox-4DkbJ68c.js";import{G as ue}from"./GreenRadioGroup-dZQly406.js";import{P as de}from"./PlanleggerStepPage-CG-Vt2ZG.js";import{u as le,F as ge,R as J,S as me}from"./StepButtonsHookForm-D9EJb97s.js";import{u as w,M as r}from"./index-Bomzi5Jd.js";import{A as D}from"./Arbeidssituasjon-rAW6RSqH.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f as S,a as f,e as N,b as W,S as H,g as ke}from"./HvemPlanleggerUtils-CHTffTZd.js";import{u as X}from"./hvemHarRettUtils-DP-A7Fyr.js";import{f as I,a as pe,b as ve,c as Q}from"./uttakUtils-Bfxqkahw.js";import{L,l as B}from"./links-B0sJFGJm.js";import"./dateUtils--_TJ2jyJ.js";import"./index-DVXBtNgz.js";import"./infobox.module-COlA9bH3.js";import"./dayjs.min-Dkhc0ShP.js";import"./amplitude.esm-BThBy0fb.js";import{u as ye}from"./useScrollBehaviour-WVMBWXos.js";import{S as ce}from"./PersonGroup-DiEFwi66.js";import{V as R}from"./VStack-DzX3uTsq.js";import{B as o,H as je}from"./Label-DFEFJLqZ.js";import{b as Se,e as fe}from"./barnetUtils-Dtg6gkcN.js";import{S as Y}from"./Calendar-DfqO_VWn.js";import{S as be}from"./Spacer-CmfZYR-2.js";const Z=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=w(),l=n.status===D.INGEN||n.status===D.UFØR,i=n.jobberAnnenPart===!1;return e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:l?S(s,t):f(s,t)}}),icon:e.jsx(ce,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[i&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:f(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:S(s,t),hvem2:f(s,t)}})})]}),l&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:S(s,t),hvem2:f(s,t)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:S(s,t),erMorHovedsøker:N(t)}})})]})]})};Z.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const $=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:l,uttaksdata100:i,uttaksdata80:a,valgtDekningsgrad:p,antallUker:g})=>{const u=w(),b=t.antallBarn,v=Se(t),P=fe(t),y=X(s),F=W(n)||y==="kunSøker1HarRett"||y==="kunSøker2HarRett",c=I(y,n,l,t),d=u.formatDate(c.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),q=p===k.HUNDRE_PROSENT?i.sluttdatoPeriode1:a.sluttdatoPeriode1,M=p===k.HUNDRE_PROSENT?i.sluttdatoPeriode2:a.sluttdatoPeriode2;return e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:u.formatDate(M||q,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(o,{children:[v&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:F,dato:d}}),!v&&P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:N(n),dato:d,kunEnPartSkalHa:F}}),!v&&!P&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:F}})]}),(y==="kunSøker2HarRett"||y==="kunSøker1HarRett"&&n.type===H.FAR_OG_FAR&&v)&&e.jsxs(R,{gap:"2",children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:pe(l),uker2:g,b:m=>e.jsx("b",{children:m}),hvem:S(u,n),hvemPart1:f(u,n)}})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:ve(l),uker2:g,a:m=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:S(u,n),hvemPart1:f(u,n)}})})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"Dekningsgrad"},description:""},antallUker:{required:!0,tsType:{name:"number"},description:""}}};const Pe=({stønadskontoer:t})=>{const n=w(),s=se(),l=oe(),i=x(j.HVOR_LANG_PERIODE),a=O(x(j.HVEM_PLANLEGGER)),p=O(x(j.OM_BARNET)),g=O(x(j.ARBEIDSSITUASJON)),u=K(j.HVOR_LANG_PERIODE),b=K(j.FORDELING),v=le({defaultValues:i}),P=W(a),y=_=>{u(_);const ae=a.type===H.FAR_OG_FAR,z=g.status===D.JOBBER&&!!g.jobberAnnenPart&&!(ae&&p.erFødsel)?E.FORDELING:E.PLANEN_DERES;return z===E.PLANEN_DERES&&b(void 0),s.goToNextStep(z)},c=v.watch("dekningsgrad")||(i==null?void 0:i.dekningsgrad),d=X(g),q=ke(a,d,n),M=t[k.HUNDRE_PROSENT],m=t[k.ÅTTI_PROSENT],ee=c===k.HUNDRE_PROSENT?M:m,G=c?ee:void 0,U=I(d,a,M,p),C=I(d,a,m,p),T=Q(U),h=Q(C),re=c===k.HUNDRE_PROSENT?T:h,V=d==="kunSøker1HarRett"||d==="kunSøker2HarRett",{ref:te,scrollToBottom:ne}=ye();return e.jsx(de,{ref:te,steps:l,children:e.jsx(ge,{formMethods:v,onSubmit:y,shouldUseFlexbox:!0,children:e.jsxs(R,{gap:"10",style:{flex:1},children:[e.jsxs(R,{gap:"8",children:[e.jsx(je,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:P||d==="ingenHarRett",uker100:T,uker80:h}})})}),!P&&V&&a.type!==H.FAR_OG_FAR&&e.jsx(Z,{hvemPlanlegger:a,arbeidssituasjon:g}),V&&a.type===H.FAR_OG_FAR&&e.jsxs(A,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(o,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:_=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:_})}})})]}),e.jsxs(ue,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[ie(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ne,children:[e.jsx(J,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T}})}),e.jsx(J,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:h}})})]}),G&&e.jsx($,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:g,valgtStønadskonto:G,uttaksdata100:U,uttaksdata80:C,valgtDekningsgrad:c,antallUker:re},c)]}),e.jsx(be,{}),e.jsx(me,{saveDataOnPreviousClick:u,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Pe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
