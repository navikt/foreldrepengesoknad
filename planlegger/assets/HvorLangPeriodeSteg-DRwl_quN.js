import{aa as I,j as e,a2 as x,a3 as k,a4 as i,Y as r,a6 as N,a7 as w,k as V,ah as X,ab as h,Z as pe,_ as ve,ac as ke,ad as ye,$ as U,ae as Re}from"./iframe-XGK4EWHO.js";import{c as Ee,e as ce,u as q,C as c,f as C}from"./usePlanleggerNavigator-D5BlZ87I.js";import{P as M}from"./routes-Cyl7_Mgv.js";import{B as Fe}from"./BlueRadioGroup-BjN0quEc.js";import{P as Pe}from"./PlanleggerStepPage-DcZC-mzf.js";import{A as L}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as v}from"./Dekningsgrad-Bg_cIyqc.js";import{f as H,b as D,c as ee,e as re,H as T,d as be,h as fe,g as z,a as J,i as Te}from"./HvemPlanleggerUtils-Bb38QmLx.js";import{e as te,b as je}from"./barnetUtils-Be6XyooX.js";import{u as ae}from"./hvemHarRettUtils-B4mbOgxC.js";import{g as Y,a as Z,b as $,f as Q,c as W}from"./uttakUtils-LkQAyLc0.js";import{u as _e}from"./useScrollBehaviour-5MXSj2uO.js";import{S as Oe}from"./PersonGroup-BpuZnAWh.js";import{S as Se}from"./Spacer-0Tk3fNS1.js";const ne=({hvemPlanlegger:t,arbeidssituasjon:a})=>{const n=I(),u=a.status===L.INGEN||a.status===L.UFØR,y=a.jobberAnnenPart===!1;return e.jsxs(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?D(n,t):H(n,t)}}),icon:e.jsx(Oe,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[y&&e.jsxs(k,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:H(n,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:D(n,t),hvem2:H(n,t)}})})]}),u&&e.jsxs(k,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:D(n,t),hvem2:H(n,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(N,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:D(n,t),erMorHovedsøker:ee(t)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const se=({barnet:t,hvemPlanlegger:a,arbeidssituasjon:n,valgtStønadskonto:u,uttaksdata100:y,uttaksdata80:s,valgtDekningsgrad:m,antallUkerOgDager:o})=>{const l=I(),F=t.antallBarn,d=te(t),j=je(t),_=re(a),E=ae(n),O=_||E==="kunSøker1HarRett"||E==="kunSøker2HarRett",R=l.formatDate(Y(t),{day:"2-digit",month:"long",year:"numeric"}),p=m===v.HUNDRE_PROSENT?y.sluttdatoPeriode1:s.sluttdatoPeriode1,S=m===v.HUNDRE_PROSENT?y.sluttdatoPeriode2:s.sluttdatoPeriode2,P=a.type===T.FAR_OG_FAR&&!d;return e.jsxs(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:l.formatDate(S||p,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(X,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(k,{paddingBlock:"0 2",children:e.jsxs(i,{children:[d&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:F,kunEnPartSkalHa:O,dato:R,erOmsorgsovertakelseFremtidig:V(Y(t)).isAfter(V())}}),!d&&j&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:F,erFarOgFar:fe(a),kunEnPartSkalHa:O,erAlenesøkerValue:_,erFarDelAvSøknaden:be(a)}}),!d&&!j&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:F,erMorDelAvSøknaden:ee(a),kunEnPartSkalHa:O}})]})}),(E==="kunSøker2HarRett"&&!P||E==="kunSøker1HarRett"&&a.type===T.FAR_OG_FAR&&d)&&e.jsxs(k,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Z(u).uker,dager:Z(u).dager,uker2:o.uker,dager2:o.dager,b:g=>e.jsx("b",{children:g}),hvem:J(a,l),hvemPart1:z(a,l)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:$(u).uker,dager:$(u).dager,uker2:o.uker,dager2:o.dager,a:g=>e.jsx(N,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:g}),b:g=>e.jsx("b",{children:g}),hvem:J(a,l),hvemPart1:z(a,l)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
    kontoer: KontoDto_fpoversikt[];
    minsteretter: Minsteretter_fpoversikt;
    tillegg?: Tillegg_fpoversikt;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak_fpoversikt;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto_fpoversikt[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]}},description:""},uttaksdata100:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const qe=({stønadskontoer:t})=>{const a=I(),n=Ee(),u=ce(),y=q(c.HVOR_LANG_PERIODE),s=h(q(c.HVEM_PLANLEGGER)),m=h(q(c.OM_BARNET)),o=h(q(c.ARBEIDSSITUASJON)),l=C(c.HVOR_LANG_PERIODE),F=C(c.FORDELING),d=pe({defaultValues:y}),j=re(s),_=te(m),E=A=>{l(A);const me=s.type===T.FAR_OG_FAR,B=o.status===L.JOBBER&&!!o.jobberAnnenPart&&!(me&&m.erFødsel)?M.FORDELING:M.PLANEN_DERES;return B===M.PLANEN_DERES&&F(void 0),n.goToNextStep(B)},R=d.watch("dekningsgrad")??y?.dekningsgrad,p=ae(o),S=Te(s,p,a),P=t[v.HUNDRE_PROSENT],g=t[v.ÅTTI_PROSENT],oe=R===v.HUNDRE_PROSENT?P:g,K=R?oe:void 0,ie=Q(p,s,P,m),ue=Q(p,s,g,m),b=W(P),f=W(g),le=R===v.HUNDRE_PROSENT?b:f,G=p==="kunSøker1HarRett"||p==="kunSøker2HarRett",{ref:de,scrollToBottom:ge}=_e();return e.jsx(Pe,{ref:de,steps:u,goToStep:n.goToNextStep,children:e.jsx(ve,{formMethods:d,onSubmit:E,shouldUseFlexbox:!0,children:e.jsxs(k,{gap:"space-40",style:{flex:1},children:[e.jsxs(k,{gap:"space-32",children:[e.jsx(ke,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(X,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:p==="beggeHarRett",uker100:b.uker,dager100:b.dager,uker80:f.uker,dager80:f.dager}})})}),!j&&G&&s.type!==T.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===T.FAR_OG_FAR&&_&&e.jsx(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(k,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:A=>e.jsx(N,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:A})}})})]})}),e.jsxs(Fe,{name:"dekningsgrad",control:d.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:S}}),validate:[ye(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:S}))],onChange:ge,children:[e.jsx(U,{value:v.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:b.uker,dager100:b.dager}})}),e.jsx(U,{value:v.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:f.uker,dager80:f.dager}})})]}),K&&e.jsx(k,{gap:"space-8",children:e.jsx(se,{barnet:m,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:K,uttaksdata100:ie,uttaksdata80:ue,valgtDekningsgrad:R,antallUkerOgDager:le},R)})]}),e.jsx(Se,{}),e.jsx(Re,{saveDataOnPreviousClick:l,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};qe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto_fpoversikt; '80': KontoBeregningDto_fpoversikt }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto_fpoversikt[];
    minsteretter: Minsteretter_fpoversikt;
    tillegg?: Tillegg_fpoversikt;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak_fpoversikt;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto_fpoversikt[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto_fpoversikt[];
    minsteretter: Minsteretter_fpoversikt;
    tillegg?: Tillegg_fpoversikt;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak_fpoversikt;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto_fpoversikt[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{qe as H};
