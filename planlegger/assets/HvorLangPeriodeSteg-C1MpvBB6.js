import{aa as L,j as e,a2 as D,a3 as v,a4 as i,Y as r,a6 as I,a7 as w,k as B,ah as W,ab as A,Z as ge,_ as me,ac as pe,ad as ve,$ as V,ae as ke}from"./iframe-DwNXJb82.js";import{c as ye,e as ce,u as O,C as R,f as U}from"./usePlanleggerNavigator-CLzasTXJ.js";import{P as h}from"./routes-Cyl7_Mgv.js";import{B as Re}from"./BlueRadioGroup-CSYC_C9J.js";import{P as Ee}from"./PlanleggerStepPage-BgOIIN2Y.js";import{A as M}from"./Arbeidssituasjon-i2z_eSVB.js";import{f as S,b as H,c as X,e as ee,H as P,d as Fe,h as be,g as C,a as z,i as fe}from"./HvemPlanleggerUtils-Dkd7A5y5.js";import{e as re,b as Pe}from"./barnetUtils-CLC2CqSH.js";import{u as te}from"./hvemHarRettUtils-f63VnPec.js";import{g as J,a as Y,b as Z,f as $,c as Q}from"./uttakUtils-DA1-3Kmh.js";import{u as Te}from"./useScrollBehaviour-CsNekJQD.js";import{S as je}from"./PersonGroup-1qL5lUUA.js";import{S as qe}from"./Spacer-COTtzXRU.js";const ae=({hvemPlanlegger:t,arbeidssituasjon:a})=>{const n=L(),u=a.status===M.INGEN||a.status===M.UFØR,k=a.jobberAnnenPart===!1;return e.jsxs(D,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?H(n,t):S(n,t)}}),icon:e.jsx(je,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[k&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:S(n,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:H(n,t),hvem2:S(n,t)}})})]}),u&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:H(n,t),hvem2:S(n,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:H(n,t),erMorHovedsøker:X(t)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ne=({barnet:t,hvemPlanlegger:a,arbeidssituasjon:n,valgtStønadskonto:u,uttaksdata100:k,uttaksdata80:s,valgtDekningsgrad:m,antallUkerOgDager:o})=>{const l=L(),E=t.antallBarn,d=re(t),T=Pe(t),j=ee(a),c=te(n),q=j||c==="kunSøker1HarRett"||c==="kunSøker2HarRett",y=l.formatDate(J(t),{day:"2-digit",month:"long",year:"numeric"}),p=m==="100"?k.sluttdatoPeriode1:s.sluttdatoPeriode1,_=m==="100"?k.sluttdatoPeriode2:s.sluttdatoPeriode2,F=a.type===P.FAR_OG_FAR&&!d;return e.jsxs(D,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:l.formatDate(_||p,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(W,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(v,{paddingBlock:"0 2",children:e.jsxs(i,{children:[d&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:E,kunEnPartSkalHa:q,dato:y,erOmsorgsovertakelseFremtidig:B(J(t)).isAfter(B())}}),!d&&T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:E,erFarOgFar:be(a),kunEnPartSkalHa:q,erAlenesøkerValue:j,erFarDelAvSøknaden:Fe(a)}}),!d&&!T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:E,erMorDelAvSøknaden:X(a),kunEnPartSkalHa:q}})]})}),(c==="kunSøker2HarRett"&&!F||c==="kunSøker1HarRett"&&a.type===P.FAR_OG_FAR&&d)&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Y(u).uker,dager:Y(u).dager,uker2:o.uker,dager2:o.dager,b:g=>e.jsx("b",{children:g}),hvem:z(a,l),hvemPart1:C(a,l)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Z(u).uker,dager:Z(u).dager,uker2:o.uker,dager2:o.dager,a:g=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:g}),b:g=>e.jsx("b",{children:g}),hvem:z(a,l),hvemPart1:C(a,l)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},valgtDekningsgrad:{required:!0,tsType:{name:"union",raw:"'80' | '100'",elements:[{name:"literal",value:"'80'"},{name:"literal",value:"'100'"}]},description:""},antallUkerOgDager:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    uker: number;
    dager: number;
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const _e=({stønadskontoer:t})=>{const a=L(),n=ye(),u=ce(),k=O(R.HVOR_LANG_PERIODE),s=A(O(R.HVEM_PLANLEGGER)),m=A(O(R.OM_BARNET)),o=A(O(R.ARBEIDSSITUASJON)),l=U(R.HVOR_LANG_PERIODE),E=U(R.FORDELING),d=ge({defaultValues:k}),T=ee(s),j=re(m),c=x=>{l(x);const de=s.type===P.FAR_OG_FAR,N=o.status===M.JOBBER&&!!o.jobberAnnenPart&&!(de&&m.erFødsel)?h.FORDELING:h.PLANEN_DERES;return N===h.PLANEN_DERES&&E(void 0),n.goToNextStep(N)},y=d.watch("dekningsgrad")??k?.dekningsgrad,p=te(o),_=fe(s,p,a),F=t[100],g=t[80],K=y?y==="100"?F:g:void 0,se=$(p,s,F,m),oe=$(p,s,g,m),b=Q(F),f=Q(g),ie=y==="100"?b:f,G=p==="kunSøker1HarRett"||p==="kunSøker2HarRett",{ref:ue,scrollToBottom:le}=Te();return e.jsx(Ee,{ref:ue,steps:u,goToStep:n.goToNextStep,children:e.jsx(me,{formMethods:d,onSubmit:c,shouldUseFlexbox:!0,children:e.jsxs(v,{gap:"space-40",style:{flex:1},children:[e.jsxs(v,{gap:"space-32",children:[e.jsx(pe,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(D,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(W,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:p==="beggeHarRett",uker100:b.uker,dager100:b.dager,uker80:f.uker,dager80:f.dager}})})}),!T&&G&&s.type!==P.FAR_OG_FAR&&e.jsx(ae,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===P.FAR_OG_FAR&&j&&e.jsx(D,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:x=>e.jsx(I,{inlineText:!0,href:w.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:x})}})})]})}),e.jsxs(Re,{name:"dekningsgrad",control:d.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:_}}),validate:[ve(a.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:_}))],onChange:le,children:[e.jsx(V,{value:"100",autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:b.uker,dager100:b.dager}})}),e.jsx(V,{value:"80",children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:f.uker,dager80:f.dager}})})]}),K&&e.jsx(v,{gap:"space-8",children:e.jsx(ne,{barnet:m,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:K,uttaksdata100:se,uttaksdata80:oe,valgtDekningsgrad:y,antallUkerOgDager:ie},y)})]}),e.jsx(qe,{}),e.jsx(ke,{saveDataOnPreviousClick:l,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};_e.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto_fpoversikt; '80': KontoBeregningDto_fpoversikt }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""}}};export{_e as H};
