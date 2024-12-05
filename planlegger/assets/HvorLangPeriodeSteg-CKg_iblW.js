import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as me,a as pe,b as x,C as f,c as V}from"./usePlanleggerNavigator-BlNZLooZ.js";import{P as D}from"./routes-gnI_NAHe.js";import{B as ke}from"./BlueRadioGroup-CSc-GVL_.js";import{P as ve}from"./PlanleggerStepPage-4fo2lw1v.js";import{u as ye,R as ce,a as z,S as je}from"./StepButtonsHookForm-DRMXlWgh.js";import{u as I,M as r,B as d,H as be}from"./UttaksdagenString-CIHKv-n2.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as p}from"./Dekningsgrad-Bg_cIyqc.js";import{f as M,a as A,e as N,b as $,S as T,g as J,c as Q,d as fe}from"./HvemPlanleggerUtils-CRuekH12.js";import{b as ee,e as Se}from"./barnetUtils-DSW5SWB3.js";import{u as re}from"./hvemHarRettUtils-DaTWCV6h.js";import{g as Re,a as W,b as X,f as Y,c as Z}from"./uttakUtils-BRAKr2Qe.js";import{d as h,L,l as B}from"./VeiviserPage-DMWh4IvO.js";import"./index-CTjT7uj6.js";import{u as Pe}from"./useScrollBehaviour-DHGEE0Vi.js";import{n as E}from"./validation-DdAZ_Aa2.js";import{i as Fe}from"./dateFormValidation-dNhenV-l.js";import{S as Te}from"./PersonGroup-28ji-Imn.js";import{V as y}from"./VStack-CL9KkpXr.js";import{S as te}from"./Responsive-DXvSXsD0.js";import{S as qe}from"./Spacer-BW3tgveW.js";const ne=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=I(),i=n.status===w.INGEN||n.status===w.UFØR,c=n.jobberAnnenPart===!1;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:i?M(a,t):A(a,t)}}),icon:e.jsx(Te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[c&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:A(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:A(a,t)}})})]}),i&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:A(a,t)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:l=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:l}),hvem:M(a,t),erMorHovedsøker:N(t)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ae=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:i,uttaksdata100:c,uttaksdata80:l,valgtDekningsgrad:s,antallUkerOgDager:u})=>{const o=I(),j=t.antallBarn,k=ee(t),S=Se(t),b=re(a),R=$(n)||b==="kunSøker1HarRett"||b==="kunSøker2HarRett",q=o.formatDate(Re(t),{day:"2-digit",month:"long",year:"numeric"}),G=s===p.HUNDRE_PROSENT?c.sluttdatoPeriode1:l.sluttdatoPeriode1,v=s===p.HUNDRE_PROSENT?c.sluttdatoPeriode2:l.sluttdatoPeriode2,g=n.type===T.FAR_OG_FAR&&!k;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:o.formatDate(v||G,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(d,{children:[k&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:j,kunEnPartSkalHa:R,dato:q}}),!k&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:j,erMorDelAvSøknaden:N(n),dato:q,kunEnPartSkalHa:R}}),!k&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:j,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:R}})]}),(b==="kunSøker2HarRett"&&!g||b==="kunSøker1HarRett"&&n.type===T.FAR_OG_FAR&&k)&&e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:W(i).uker,dager:W(i).dager,uker2:u.uker,dager2:u.dager,b:m=>e.jsx("b",{children:m}),hvem:J(n,o),hvemPart1:Q(n,o)}})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:X(i).uker,dager:X(i).dager,uker2:u.uker,dager2:u.dager,a:m=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:m}),b:m=>e.jsx("b",{children:m}),hvem:J(n,o),hvemPart1:Q(n,o)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const xe=({stønadskontoer:t,locale:n})=>{const a=I(),i=me(n),c=pe(),l=x(f.HVOR_LANG_PERIODE),s=E(x(f.HVEM_PLANLEGGER)),u=E(x(f.OM_BARNET)),o=E(x(f.ARBEIDSSITUASJON)),j=V(f.HVOR_LANG_PERIODE),k=V(f.FORDELING),S=ye({defaultValues:l}),b=$(s),R=ee(u),q=O=>{j(O);const ge=s.type===T.FAR_OG_FAR,K=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(ge&&u.erFødsel)?D.FORDELING:D.PLANEN_DERES;return K===D.PLANEN_DERES&&k(void 0),i.goToNextStep(K)},v=S.watch("dekningsgrad")||(l==null?void 0:l.dekningsgrad),g=re(o),m=fe(s,g,a),H=t[p.HUNDRE_PROSENT],_=t[p.ÅTTI_PROSENT],se=v===p.HUNDRE_PROSENT?H:_,U=v?se:void 0,oe=Y(g,s,H,u),ie=Y(g,s,_,u),P=Z(H),F=Z(_),ue=v===p.HUNDRE_PROSENT?P:F,C=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",{ref:de,scrollToBottom:le}=Pe();return e.jsx(ve,{ref:de,steps:c,goToStep:i.goToNextStep,children:e.jsx(ce,{formMethods:S,onSubmit:q,shouldUseFlexbox:!0,children:e.jsxs(y,{gap:"10",style:{flex:1},children:[e.jsxs(y,{gap:"8",children:[e.jsx(be,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:g==="beggeHarRett",uker100:P.uker,dager100:P.dager,uker80:F.uker,dager80:F.dager}})})}),!b&&C&&s.type!==T.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:s,arbeidssituasjon:o}),C&&s.type===T.FAR_OG_FAR&&R&&e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(y,{gap:"2",children:[e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(d,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(ke,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:m}}),name:"dekningsgrad",validate:[Fe(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:m}))],onChange:le,children:[e.jsx(z,{value:p.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:P.uker,dager100:P.dager}})}),e.jsx(z,{value:p.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:F.uker,dager80:F.dager}})})]}),U&&e.jsx(y,{gap:"2",children:e.jsx(ae,{barnet:u,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:U,uttaksdata100:oe,uttaksdata80:ie,valgtDekningsgrad:v,antallUkerOgDager:ue},v)})]}),e.jsx(qe,{}),e.jsx(je,{saveDataOnPreviousClick:j,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};xe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{xe as H};
