import{a9 as L,j as e,a1 as x,a2 as v,a3 as i,X as r,a5 as I,a6 as w,i as B,ah as W,aa as A,Y as ge,Z as me,ab as pe,ac as ve,_ as V,ad as ke,ae as ye}from"./iframe-BWOWJR_M.js";import{c as ce,e as Re,u as S,C as R,f as U}from"./usePlanleggerNavigator-Cm-f4w7_.js";import{P as h}from"./routes-Cyl7_Mgv.js";import{B as Ee}from"./BlueRadioGroup-C5etcT4A.js";import{P as Fe}from"./PlanleggerStepPage-C1WEMAKF.js";import{A as M,f as H,b as D,c as $,e as ee,H as f,d as be,h as Pe,g as C,a as z,i as fe}from"./HvemPlanleggerUtils-CngptWpL.js";import{e as re,b as Te}from"./barnetUtils-CLRQZdeT.js";import{u as ae}from"./hvemHarRettUtils-CXdnv9ms.js";import{g as J,a as X,b as Y,f as Z,c as Q}from"./uttakUtils-B4DVbPbG.js";import{u as je}from"./useScrollBehaviour-uhFbgHkp.js";import{S as qe}from"./PersonGroup-C9N3R7v-.js";const ne=({hvemPlanlegger:a,arbeidssituasjon:n})=>{const t=L(),u=n.status===M.INGEN||n.status===M.UFØR,k=n.jobberAnnenPart===!1;return e.jsxs(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?D(t,a):H(t,a)}}),icon:e.jsx(qe,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[k&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:H(t,a)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:D(t,a),hvem2:H(t,a)}})})]}),u&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:D(t,a),hvem2:H(t,a)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:D(t,a),erMorHovedsøker:$(a)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const te=({barnet:a,hvemPlanlegger:n,arbeidssituasjon:t,valgtStønadskonto:u,uttaksdata100:k,uttaksdata80:s,valgtDekningsgrad:m,antallUkerOgDager:o})=>{const l=L(),E=a.antallBarn,d=re(a),T=Te(a),j=ee(n),c=ae(t),q=j||c==="kunSøker1HarRett"||c==="kunSøker2HarRett",y=l.formatDate(J(a),{day:"2-digit",month:"long",year:"numeric"}),p=m==="100"?k.sluttdatoPeriode1:s.sluttdatoPeriode1,O=m==="100"?k.sluttdatoPeriode2:s.sluttdatoPeriode2,F=n.type===f.FAR_OG_FAR&&!d;return e.jsxs(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:l.formatDate(O||p,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(W,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(v,{paddingBlock:"0 2",children:e.jsxs(i,{children:[d&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:E,kunEnPartSkalHa:q,dato:y,erOmsorgsovertakelseFremtidig:B(J(a)).isAfter(B())}}),!d&&T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:E,erFarOgFar:Pe(n),kunEnPartSkalHa:q,erAlenesøkerValue:j,erFarDelAvSøknaden:be(n)}}),!d&&!T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:E,erMorDelAvSøknaden:$(n),kunEnPartSkalHa:q}})]})}),(c==="kunSøker2HarRett"&&!F||c==="kunSøker1HarRett"&&n.type===f.FAR_OG_FAR&&d)&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:X(u).uker,dager:X(u).dager,uker2:o.uker,dager2:o.dager,b:g=>e.jsx("b",{children:g}),hvem:z(n,l),hvemPart1:C(n,l)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Y(u).uker,dager:Y(u).dager,uker2:o.uker,dager2:o.dager,a:g=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:g}),b:g=>e.jsx("b",{children:g}),hvem:z(n,l),hvemPart1:C(n,l)}})})]})]})};te.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"union",raw:"'80' | '100'",elements:[{name:"literal",value:"'80'"},{name:"literal",value:"'100'"}]},description:""},antallUkerOgDager:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    uker: number;
    dager: number;
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Oe=({stønadskontoer:a})=>{const n=L(),t=ce(),u=Re(),k=S(R.HVOR_LANG_PERIODE),s=A(S(R.HVEM_PLANLEGGER)),m=A(S(R.OM_BARNET)),o=A(S(R.ARBEIDSSITUASJON)),l=U(R.HVOR_LANG_PERIODE),E=U(R.FORDELING),d=ge({defaultValues:k}),T=ee(s),j=re(m),c=_=>{l(_);const de=s.type===f.FAR_OG_FAR,N=o.status===M.JOBBER&&!!o.jobberAnnenPart&&!(de&&m.erFødsel)?h.FORDELING:h.PLANEN_DERES;return N===h.PLANEN_DERES&&E(void 0),t.goToNextStep(N)},y=d.watch("dekningsgrad")??k?.dekningsgrad,p=ae(o),O=fe(s,p,n),F=a[100],g=a[80],K=y?y==="100"?F:g:void 0,se=Z(p,s,F,m),oe=Z(p,s,g,m),b=Q(F),P=Q(g),ie=y==="100"?b:P,G=p==="kunSøker1HarRett"||p==="kunSøker2HarRett",{ref:ue,scrollToBottom:le}=je();return e.jsx(Fe,{ref:ue,steps:u,goToStep:t.goToNextStep,children:e.jsx(me,{formMethods:d,onSubmit:c,shouldUseFlexbox:!0,children:e.jsxs(v,{gap:"space-40",style:{flex:1},children:[e.jsxs(v,{gap:"space-32",children:[e.jsx(pe,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(W,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:p==="beggeHarRett",uker100:b.uker,dager100:b.dager,uker80:P.uker,dager80:P.dager}})})}),!T&&G&&s.type!==f.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===f.FAR_OG_FAR&&j&&e.jsx(x,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:_=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:_})}})})]})}),e.jsxs(Ee,{name:"dekningsgrad",control:d.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:O}}),validate:[ve(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:O}))],onChange:le,children:[e.jsx(V,{value:"100",autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:b.uker,dager100:b.dager}})}),e.jsx(V,{value:"80",children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:P.uker,dager80:P.dager}})})]}),K&&e.jsx(v,{gap:"space-8",children:e.jsx(te,{barnet:m,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:K,uttaksdata100:se,uttaksdata80:oe,valgtDekningsgrad:y,antallUkerOgDager:ie},y)})]}),e.jsx(ke,{}),e.jsx(ye,{saveDataOnPreviousClick:l,goToPreviousStep:t.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Oe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{Oe as H};
