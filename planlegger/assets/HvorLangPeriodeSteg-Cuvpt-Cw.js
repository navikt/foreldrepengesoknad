import{j as e,V as F}from"./VStack-WHXoK350.js";import{u as de,a as le,b as A,C as j,c as J}from"./usePlanleggerNavigator-cg0Qn7-E.js";import{P as E}from"./routes-Cp-2uEwO.js";import{B as ge}from"./BlueRadioGroup-DoPAKPf8.js";import{P as ke}from"./PlanleggerStepPage-Bmj1UvpU.js";import{u as me,F as pe,R as Q,S as ve}from"./StepButtonsHookForm-QmbJQb0t.js";import{u as L,M as r,B as u,H as ye}from"./Label-DMHnewTW.js";import{A as w}from"./Arbeidssituasjon-Dl0pkivn.js";import{D as m}from"./Dekningsgrad-Bg_cIyqc.js";import{f as H,a as _,e as N,b as ee,S as R,g as W,c as X,d as ce}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as re}from"./hvemHarRettUtils-BnuxMhaS.js";import{f as I,a as Y,b as Z,c as $}from"./uttakUtils-Dyc5dHK3.js";import{d as h,L as B,l as G}from"./Infobox-A7T06Spc.js";import"./index-DVXBtNgz.js";import{u as je,i as be}from"./useScrollBehaviour-BRwzlaSf.js";import{n as D}from"./validation-4HO0J-zV.js";import{S as fe}from"./PersonGroup-Cfb_4mVh.js";import{b as Se,e as Pe}from"./barnetUtils-Dtg6gkcN.js";import{S as te}from"./Calendar-BZZfWk4Z.js";import{S as Re}from"./Spacer-CmfZYR-2.js";const ne=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=L(),o=n.status===w.INGEN||n.status===w.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:o?H(s,t):_(s,t)}}),icon:e.jsx(fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[d&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:_(s,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:H(s,t),hvem2:_(s,t)}})})]}),o&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:H(s,t),hvem2:_(s,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:H(s,t),erMorHovedsøker:N(t)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ae=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:o,uttaksdata100:d,uttaksdata80:a,valgtDekningsgrad:p,antallUkerOgDager:i})=>{const l=L(),b=t.antallBarn,k=Se(t),f=Pe(t),v=re(s),T=ee(n)||v==="kunSøker1HarRett"||v==="kunSøker2HarRett",y=I(v,n,o,t),g=l.formatDate(y.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),q=p===m.HUNDRE_PROSENT?d.sluttdatoPeriode1:a.sluttdatoPeriode1,M=p===m.HUNDRE_PROSENT?d.sluttdatoPeriode2:a.sluttdatoPeriode2,x=n.type===R.FAR_OG_FAR&&!k;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:l.formatDate(M||q,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(u,{children:[k&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:T,dato:g}}),!k&&f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:N(n),dato:g,kunEnPartSkalHa:T}}),!k&&!f&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:T}})]}),(v==="kunSøker2HarRett"&&!x||v==="kunSøker1HarRett"&&n.type===R.FAR_OG_FAR&&k)&&e.jsxs(F,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Y(o).uker,dager:Y(o).dager,uker2:i.uker,dager2:i.dager,b:c=>e.jsx("b",{children:c}),hvem:W(n,l),hvemPart1:X(n,l)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Z(o).uker,dager:Z(o).dager,uker2:i.uker,dager2:i.dager,a:c=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:c}),b:c=>e.jsx("b",{children:c}),hvem:W(n,l),hvemPart1:X(n,l)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Fe=({stønadskontoer:t})=>{const n=L(),s=de(),o=le(),d=A(j.HVOR_LANG_PERIODE),a=D(A(j.HVEM_PLANLEGGER)),p=D(A(j.OM_BARNET)),i=D(A(j.ARBEIDSSITUASJON)),l=J(j.HVOR_LANG_PERIODE),b=J(j.FORDELING),k=me({defaultValues:d}),f=ee(a),v=O=>{l(O);const ue=a.type===R.FAR_OG_FAR,z=i.status===w.JOBBER&&!!i.jobberAnnenPart&&!(ue&&p.erFødsel)?E.FORDELING:E.PLANEN_DERES;return z===E.PLANEN_DERES&&b(void 0),s.goToNextStep(z)},y=k.watch("dekningsgrad")||(d==null?void 0:d.dekningsgrad),g=re(i),q=ce(a,g,n),M=t[m.HUNDRE_PROSENT],x=t[m.ÅTTI_PROSENT],c=y===m.HUNDRE_PROSENT?M:x,U=y?c:void 0,C=I(g,a,M,p),K=I(g,a,x,p),S=$(C),P=$(K),se=y===m.HUNDRE_PROSENT?S:P,V=g==="kunSøker1HarRett"||g==="kunSøker2HarRett",{ref:oe,scrollToBottom:ie}=je();return e.jsx(ke,{ref:oe,steps:o,children:e.jsx(pe,{formMethods:k,onSubmit:v,shouldUseFlexbox:!0,children:e.jsxs(F,{gap:"10",style:{flex:1},children:[e.jsxs(F,{gap:"8",children:[e.jsx(ye,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{kunEnPartSkalHa:f||g==="ingenHarRett",uker100:S.uker,dager100:S.dager,uker80:P.uker,dager80:P.dager}})})}),!f&&V&&a.type!==R.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:a,arbeidssituasjon:i}),V&&a.type===R.FAR_OG_FAR&&e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]}),e.jsxs(ge,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[be(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ie,children:[e.jsx(Q,{value:m.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:S.uker,dager100:S.dager}})}),e.jsx(Q,{value:m.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:P.uker,dager80:P.dager}})})]}),U&&e.jsx(ae,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:i,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:K,valgtDekningsgrad:y,antallUkerOgDager:se},y)]}),e.jsx(Re,{}),e.jsx(ve,{saveDataOnPreviousClick:l,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{Fe as H};
