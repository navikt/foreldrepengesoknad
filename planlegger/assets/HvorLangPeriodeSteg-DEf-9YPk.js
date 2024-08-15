import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as le,a as me,b as M,C as j,c as J}from"./usePlanleggerNavigator-bfolbdq0.js";import{P as O}from"./routes-Cp-2uEwO.js";import{B as ke}from"./BlueRadioGroup-KpxmQA_m.js";import{P as pe}from"./PlanleggerStepPage-B-k2kdCS.js";import{u as ve,F as ye,R as Q,S as ce}from"./StepButtonsHookForm-Dttpjjrm.js";import{u as I,M as r,B as u,H as je}from"./Label-ne8aFYav.js";import{A as E}from"./Arbeidssituasjon-_4GTl2dJ.js";import{D as y}from"./Dekningsgrad-Bg_cIyqc.js";import{f as A,a as H,e as N,b as ee,S as P,g as W,c as X,d as be}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{b as re,e as fe}from"./barnetUtils-Dtg6gkcN.js";import{u as te}from"./hvemHarRettUtils-uG_MphPR.js";import{f as w,a as Y,b as Z,c as $}from"./uttakUtils-N7tKg55S.js";import{d as _,L,l as B}from"./Infobox-CtPDPZ_e.js";import"./index-CTjT7uj6.js";import{u as Se,i as Re}from"./useScrollBehaviour-CuUH4c1L.js";import{n as D}from"./validation-4HO0J-zV.js";import{S as Pe}from"./PersonGroup-bIWPBeqr.js";import{V as F}from"./useId-Dvu9sbXS.js";import{S as ne}from"./Calendar-CAm_Wfei.js";import{S as Fe}from"./Spacer-BW3tgveW.js";const ae=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=I(),o=n.status===E.INGEN||n.status===E.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:o?A(a,t):H(a,t)}}),icon:e.jsx(Pe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[d&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:H(a,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:A(a,t),hvem2:H(a,t)}})})]}),o&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:A(a,t),hvem2:H(a,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:s}),hvem:A(a,t),erMorHovedsøker:N(t)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const se=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:o,uttaksdata100:d,uttaksdata80:s,valgtDekningsgrad:l,antallUkerOgDager:i})=>{const g=I(),b=t.antallBarn,m=re(t),T=fe(t),c=te(a),f=ee(n)||c==="kunSøker1HarRett"||c==="kunSøker2HarRett",G=w(c,n,o,t),k=g.formatDate(G.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),p=l===y.HUNDRE_PROSENT?d.sluttdatoPeriode1:s.sluttdatoPeriode1,q=l===y.HUNDRE_PROSENT?d.sluttdatoPeriode2:s.sluttdatoPeriode2,x=n.type===P.FAR_OG_FAR&&!m;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:g.formatDate(q||p,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(ne,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"gray",children:[e.jsxs(u,{children:[m&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:f,dato:k}}),!m&&T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:N(n),dato:k,kunEnPartSkalHa:f}}),!m&&!T&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:f}})]}),(c==="kunSøker2HarRett"&&!x||c==="kunSøker1HarRett"&&n.type===P.FAR_OG_FAR&&m)&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Y(o).uker,dager:Y(o).dager,uker2:i.uker,dager2:i.dager,b:v=>e.jsx("b",{children:v}),hvem:W(n,g),hvemPart1:X(n,g)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Z(o).uker,dager:Z(o).dager,uker2:i.uker,dager2:i.dager,a:v=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:v}),b:v=>e.jsx("b",{children:v}),hvem:W(n,g),hvemPart1:X(n,g)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Te=({stønadskontoer:t})=>{const n=I(),a=le(),o=me(),d=M(j.HVOR_LANG_PERIODE),s=D(M(j.HVEM_PLANLEGGER)),l=D(M(j.OM_BARNET)),i=D(M(j.ARBEIDSSITUASJON)),g=J(j.HVOR_LANG_PERIODE),b=J(j.FORDELING),m=ve({defaultValues:d}),T=ee(s),c=re(l),f=h=>{g(h);const ge=s.type===P.FAR_OG_FAR,z=i.status===E.JOBBER&&!!i.jobberAnnenPart&&!(ge&&l.erFødsel)?O.FORDELING:O.PLANEN_DERES;return z===O.PLANEN_DERES&&b(void 0),a.goToNextStep(z)},k=m.watch("dekningsgrad")||(d==null?void 0:d.dekningsgrad),p=te(i),q=be(s,p,n),x=t[y.HUNDRE_PROSENT],v=t[y.ÅTTI_PROSENT],oe=k===y.HUNDRE_PROSENT?x:v,U=k?oe:void 0,C=w(p,s,x,l),K=w(p,s,v,l),S=$(C),R=$(K),ie=k===y.HUNDRE_PROSENT?S:R,V=p==="kunSøker1HarRett"||p==="kunSøker2HarRett",{ref:ue,scrollToBottom:de}=Se();return e.jsx(pe,{ref:ue,steps:o,goToStep:a.goToNextStep,children:e.jsx(ye,{formMethods:m,onSubmit:f,shouldUseFlexbox:!0,children:e.jsxs(F,{gap:"10",style:{flex:1},children:[e.jsxs(F,{gap:"8",children:[e.jsx(je,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(ne,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:p==="beggeHarRett",uker100:S.uker,dager100:S.dager,uker80:R.uker,dager80:R.dager}})})}),!T&&V&&s.type!==P.FAR_OG_FAR&&e.jsx(ae,{hvemPlanlegger:s,arbeidssituasjon:i}),V&&s.type===P.FAR_OG_FAR&&c&&e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:h=>e.jsx(L,{inlineText:!0,href:B.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:h})}})})]}),e.jsxs(ke,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[Re(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:de,children:[e.jsx(Q,{value:y.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:S.uker,dager100:S.dager}})}),e.jsx(Q,{value:y.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:R.uker,dager80:R.dager}})})]}),U&&e.jsx(se,{barnet:l,hvemPlanlegger:s,arbeidssituasjon:i,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:K,valgtDekningsgrad:k,antallUkerOgDager:ie},k)]}),e.jsx(Fe,{}),e.jsx(ce,{saveDataOnPreviousClick:g,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Te.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{Te as H};
