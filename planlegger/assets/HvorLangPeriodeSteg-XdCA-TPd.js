import{j as e,V as P}from"./VStack-WHXoK350.js";import{u as de,a as ge,b as A,C as j,c as J}from"./usePlanleggerNavigator-BUJeCoY_.js";import{P as D}from"./routes-Cp-2uEwO.js";import{B as le}from"./BlueRadioGroup-BJeS4ZeG.js";import{P as me}from"./PlanleggerStepPage-BUxaMC47.js";import{u as ke,F as pe,R as Q,S as ve}from"./StepButtonsHookForm-CVvicH7s.js";import{u as L,M as r,B as u,H as ye}from"./Label-DMHnewTW.js";import{A as w}from"./Arbeidssituasjon-Bijxu_EQ.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f as H,a as _,e as N,b as ee,S as R,g as W,c as X,d as ce}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as re}from"./hvemHarRettUtils-BOooQ_AO.js";import{f as I,a as Y,b as Z,c as $}from"./uttakUtils-Dlteggxe.js";import{d as h,L as B,l as G}from"./Infobox-ClLisdhQ.js";import"./index-DVXBtNgz.js";import{u as je,i as be}from"./useScrollBehaviour-BRwzlaSf.js";import{n as E}from"./validation-4HO0J-zV.js";import{S as fe}from"./PersonGroup-Cfb_4mVh.js";import{b as Se,e as Re}from"./barnetUtils-Dtg6gkcN.js";import{S as te}from"./Calendar-BZZfWk4Z.js";import{S as Pe}from"./Spacer-CmfZYR-2.js";const ne=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const s=L(),o=n.status===w.INGEN||n.status===w.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:o?H(s,t):_(s,t)}}),icon:e.jsx(fe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:[d&&e.jsxs(P,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:_(s,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:H(s,t),hvem2:_(s,t)}})})]}),o&&e.jsxs(P,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:H(s,t),hvem2:_(s,t)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:a=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),hvem:H(s,t),erMorHovedsøker:N(t)}})})]})]})};ne.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const ae=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:s,valgtStønadskonto:o,uttaksdata100:d,uttaksdata80:a,valgtDekningsgrad:p,antallUkerOgDager:i})=>{const g=L(),b=t.antallBarn,m=Se(t),F=Re(t),v=re(s),T=ee(n)||v==="kunSøker1HarRett"||v==="kunSøker2HarRett",y=I(v,n,o,t),l=g.formatDate(y.familiehendelsedato,{day:"2-digit",month:"long",year:"numeric"}),q=p===k.HUNDRE_PROSENT?d.sluttdatoPeriode1:a.sluttdatoPeriode1,M=p===k.HUNDRE_PROSENT?d.sluttdatoPeriode2:a.sluttdatoPeriode2,x=n.type===R.FAR_OG_FAR&&!m;return e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:g.formatDate(M||q,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsxs(u,{children:[m&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:b,kunEnPartSkalHa:T,dato:l}}),!m&&F&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:b,erMorDelAvSøknaden:N(n),dato:l,kunEnPartSkalHa:T}}),!m&&!F&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:b,erMorDelAvSøknaden:N(n),kunEnPartSkalHa:T}})]}),(v==="kunSøker2HarRett"&&!x||v==="kunSøker1HarRett"&&n.type===R.FAR_OG_FAR&&m)&&e.jsxs(P,{gap:"2",children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Y(o).uker,dager:Y(o).dager,uker2:i.uker,dager2:i.dager,b:c=>e.jsx("b",{children:c}),hvem:W(n,g),hvemPart1:X(n,g)}})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Z(o).uker,dager:Z(o).dager,uker2:i.uker,dager2:i.dager,a:c=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:c}),b:c=>e.jsx("b",{children:c}),hvem:W(n,g),hvemPart1:X(n,g)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Fe=({stønadskontoer:t})=>{const n=L(),s=de(),o=ge(),d=A(j.HVOR_LANG_PERIODE),a=E(A(j.HVEM_PLANLEGGER)),p=E(A(j.OM_BARNET)),i=E(A(j.ARBEIDSSITUASJON)),g=J(j.HVOR_LANG_PERIODE),b=J(j.FORDELING),m=ke({defaultValues:d}),F=ee(a),v=O=>{g(O);const ue=a.type===R.FAR_OG_FAR,z=i.status===w.JOBBER&&!!i.jobberAnnenPart&&!(ue&&p.erFødsel)?D.FORDELING:D.PLANEN_DERES;return z===D.PLANEN_DERES&&b(void 0),s.goToNextStep(z)},y=m.watch("dekningsgrad")||(d==null?void 0:d.dekningsgrad),l=re(i),q=ce(a,l,n),M=t[k.HUNDRE_PROSENT],x=t[k.ÅTTI_PROSENT],c=y===k.HUNDRE_PROSENT?M:x,U=y?c:void 0,C=I(l,a,M,p),K=I(l,a,x,p),f=$(C),S=$(K),se=y===k.HUNDRE_PROSENT?f:S,V=l==="kunSøker1HarRett"||l==="kunSøker2HarRett",{ref:oe,scrollToBottom:ie}=je();return e.jsx(me,{ref:oe,steps:o,children:e.jsx(pe,{formMethods:m,onSubmit:v,shouldUseFlexbox:!0,children:e.jsxs(P,{gap:"10",style:{flex:1},children:[e.jsxs(P,{gap:"8",children:[e.jsx(ye,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(te,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:l==="beggeHarRett",uker100:f.uker,dager100:f.dager,uker80:S.uker,dager80:S.dager}})})}),!F&&V&&a.type!==R.FAR_OG_FAR&&e.jsx(ne,{hvemPlanlegger:a,arbeidssituasjon:i}),V&&a.type===R.FAR_OG_FAR&&e.jsxs(h,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),isGray:!0,children:[e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(u,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(B,{inlineText:!0,href:G.godkjentAktivitet,className:"lenke",rel:"noreferrer",target:"_blank",children:O})}})})]}),e.jsxs(le,{label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:q}}),name:"dekningsgrad",validate:[be(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:q}))],onChange:ie,children:[e.jsx(Q,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:f.uker,dager100:f.dager}})}),e.jsx(Q,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:S.uker,dager80:S.dager}})})]}),U&&e.jsx(ae,{barnet:p,hvemPlanlegger:a,arbeidssituasjon:i,valgtStønadskonto:U,uttaksdata100:C,uttaksdata80:K,valgtDekningsgrad:y,antallUkerOgDager:se},y)]}),e.jsx(Pe,{}),e.jsx(ve,{saveDataOnPreviousClick:g,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
