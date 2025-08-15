import{ab as N,j as e,a3 as _,a4 as v,a5 as i,Z as r,a7 as I,a8 as B,k as C,ai as Y,ac as D,_ as me,$ as ke,ad as ve,ae as ye,a0 as K,af as ce}from"./iframe-DgOJv59J.js";import{c as Pe,e as be,u as A,C as b,f as V}from"./usePlanleggerNavigator-Cyt7D8Sq.js";import{P as E}from"./routes-Cyl7_Mgv.js";import{B as fe}from"./BlueRadioGroup-Do1AK1tP.js";import{P as je}from"./PlanleggerStepPage-B2LEjRwR.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f as h,b as M,c as ee,e as re,H as R,d as Te,h as Fe,g as z,a as J,i as Re}from"./HvemPlanleggerUtils-DH4lpjzv.js";import{e as te,b as Se}from"./barnetUtils-CDtTXb69.js";import{u as ne}from"./hvemHarRettUtils-CpUjoCfJ.js";import{g as Z,a as $,b as Q,f as W,c as X}from"./uttakUtils-DwM9VdOA.js";import{u as He}from"./useScrollBehaviour-uDpg5_LB.js";import{S as qe}from"./PersonGroup-BsuUbjWU.js";import{S as xe}from"./Spacer-B5tJwySy.js";const ae=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=N(),u=n.status===w.INGEN||n.status===w.UFØR,y=n.jobberAnnenPart===!1;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?M(a,t):h(a,t)}}),icon:e.jsx(qe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[y&&e.jsxs(v,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:h(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:h(a,t)}})})]}),u&&e.jsxs(v,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:h(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:M(a,t),erMorHovedsøker:ee(t)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const se=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:y,uttaksdata80:s,valgtDekningsgrad:p,antallUkerOgDager:o})=>{const d=N(),f=t.antallBarn,g=te(t),S=Se(t),H=re(n),P=ne(a),q=H||P==="kunSøker1HarRett"||P==="kunSøker2HarRett",c=d.formatDate(Z(t),{day:"2-digit",month:"long",year:"numeric"}),m=p===k.HUNDRE_PROSENT?y.sluttdatoPeriode1:s.sluttdatoPeriode1,x=p===k.HUNDRE_PROSENT?y.sluttdatoPeriode2:s.sluttdatoPeriode2,j=n.type===R.FAR_OG_FAR&&!g;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:d.formatDate(x||m,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(v,{paddingBlock:"0 2",children:e.jsxs(i,{children:[g&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:f,kunEnPartSkalHa:q,dato:c,erOmsorgsovertakelseFremtidig:C(Z(t)).isAfter(C())}}),!g&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:f,erFarOgFar:Fe(n),kunEnPartSkalHa:q,erAlenesøkerValue:H,erFarDelAvSøknaden:Te(n)}}),!g&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:f,erMorDelAvSøknaden:ee(n),kunEnPartSkalHa:q}})]})}),(P==="kunSøker2HarRett"&&!j||P==="kunSøker1HarRett"&&n.type===R.FAR_OG_FAR&&g)&&e.jsxs(v,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:$(u).uker,dager:$(u).dager,uker2:o.uker,dager2:o.dager,b:l=>e.jsx("b",{children:l}),hvem:J(n,d),hvemPart1:z(n,d)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Q(u).uker,dager:Q(u).dager,uker2:o.uker,dager2:o.dager,a:l=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:l}),b:l=>e.jsx("b",{children:l}),hvem:J(n,d),hvemPart1:z(n,d)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Ae=({stønadskontoer:t})=>{const n=N(),a=Pe(),u=be(),y=A(b.HVOR_LANG_PERIODE),s=D(A(b.HVEM_PLANLEGGER)),p=D(A(b.OM_BARNET)),o=D(A(b.ARBEIDSSITUASJON)),d=V(b.HVOR_LANG_PERIODE),f=V(b.FORDELING),g=me({defaultValues:y}),S=re(s),H=te(p),P=O=>{d(O);const pe=s.type===R.FAR_OG_FAR,U=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(pe&&p.erFødsel)?E.FORDELING:E.PLANEN_DERES;return U===E.PLANEN_DERES&&f(void 0),a.goToNextStep(U)},c=g.watch("dekningsgrad")??y?.dekningsgrad,m=ne(o),x=Re(s,m,n),j=t[k.HUNDRE_PROSENT],l=t[k.ÅTTI_PROSENT],oe=c===k.HUNDRE_PROSENT?j:l,L=c?oe:void 0,ie=W(m,s,j,p),ue=W(m,s,l,p),T=X(j),F=X(l),de=c===k.HUNDRE_PROSENT?T:F,G=m==="kunSøker1HarRett"||m==="kunSøker2HarRett",{ref:ge,scrollToBottom:le}=He();return e.jsx(je,{ref:ge,steps:u,goToStep:a.goToNextStep,children:e.jsx(ke,{formMethods:g,onSubmit:P,shouldUseFlexbox:!0,children:e.jsxs(v,{gap:"10",style:{flex:1},children:[e.jsxs(v,{gap:"8",children:[e.jsx(ve,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:m==="beggeHarRett",uker100:T.uker,dager100:T.dager,uker80:F.uker,dager80:F.dager}})})}),!S&&G&&s.type!==R.FAR_OG_FAR&&e.jsx(ae,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===R.FAR_OG_FAR&&H&&e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(v,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(fe,{name:"dekningsgrad",control:g.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:x}}),validate:[ye(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:x}))],onChange:le,children:[e.jsx(K,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T.uker,dager100:T.dager}})}),e.jsx(K,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:F.uker,dager80:F.dager}})})]}),L&&e.jsx(v,{gap:"2",children:e.jsx(se,{barnet:p,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:L,uttaksdata100:ie,uttaksdata80:ue,valgtDekningsgrad:c,antallUkerOgDager:de},c)})]}),e.jsx(xe,{}),e.jsx(ce,{saveDataOnPreviousClick:d,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Ae.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{Ae as H};
