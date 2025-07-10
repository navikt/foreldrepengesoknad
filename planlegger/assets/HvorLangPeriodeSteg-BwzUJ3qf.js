import{aa as N,j as e,a2 as _,a3 as c,a4 as i,Z as r,a6 as I,a7 as L,k as C,ah as Y,ab as D,_ as me,$ as ke,ac as ve,ad as ye,a0 as K,ae as ce}from"./iframe-SYFgyuWa.js";import{c as Pe,e as be,u as A,C as b,f as V}from"./usePlanleggerNavigator-Cb5ENjjV.js";import{P as E}from"./routes-Cyl7_Mgv.js";import{B as fe}from"./BlueRadioGroup-BDOX4BBK.js";import{P as je}from"./PlanleggerStepPage-DGMS0Ft6.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as v}from"./Dekningsgrad-Bg_cIyqc.js";import{f as h,b as M,c as ee,e as re,H as R,d as Te,h as Fe,g as z,a as J,i as Re}from"./HvemPlanleggerUtils-bU3toQpL.js";import{e as te,b as Se}from"./barnetUtils-BFkRSEVg.js";import{u as ne}from"./hvemHarRettUtils-9OVhtej6.js";import{g as Z,a as $,b as Q,f as W,c as X}from"./uttakUtils-BhCSq6F4.js";import{u as He}from"./useScrollBehaviour-Dz-t1lwo.js";import{S as qe}from"./PersonGroup-B51i3TMT.js";import{S as xe}from"./Spacer-CTnqhOhT.js";const ae=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=N(),u=n.status===w.INGEN||n.status===w.UFØR,d=n.jobberAnnenPart===!1;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?M(a,t):h(a,t)}}),icon:e.jsx(qe,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[d&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:h(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:h(a,t)}})})]}),u&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:h(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(I,{inlineText:!0,href:L.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:M(a,t),erMorHovedsøker:ee(t)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const se=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:d,uttaksdata80:s,valgtDekningsgrad:m,antallUkerOgDager:o})=>{const g=N(),f=t.antallBarn,l=te(t),S=Se(t),H=re(n),P=ne(a),q=H||P==="kunSøker1HarRett"||P==="kunSøker2HarRett",y=g.formatDate(Z(t),{day:"2-digit",month:"long",year:"numeric"}),k=m===v.HUNDRE_PROSENT?d.sluttdatoPeriode1:s.sluttdatoPeriode1,x=m===v.HUNDRE_PROSENT?d.sluttdatoPeriode2:s.sluttdatoPeriode2,j=n.type===R.FAR_OG_FAR&&!l;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:g.formatDate(x||k,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(i,{children:[l&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:f,kunEnPartSkalHa:q,dato:y,erOmsorgsovertakelseFremtidig:C(Z(t)).isAfter(C())}}),!l&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:f,erFarOgFar:Fe(n),kunEnPartSkalHa:q,erAlenesøkerValue:H,erFarDelAvSøknaden:Te(n)}}),!l&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:f,erMorDelAvSøknaden:ee(n),kunEnPartSkalHa:q}})]}),(P==="kunSøker2HarRett"&&!j||P==="kunSøker1HarRett"&&n.type===R.FAR_OG_FAR&&l)&&e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:$(u).uker,dager:$(u).dager,uker2:o.uker,dager2:o.dager,b:p=>e.jsx("b",{children:p}),hvem:J(n,g),hvemPart1:z(n,g)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:Q(u).uker,dager:Q(u).dager,uker2:o.uker,dager2:o.dager,a:p=>e.jsx(I,{inlineText:!0,href:L.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:p}),b:p=>e.jsx("b",{children:p}),hvem:J(n,g),hvemPart1:z(n,g)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const Ae=({stønadskontoer:t})=>{const n=N(),a=Pe(),u=be(),d=A(b.HVOR_LANG_PERIODE),s=D(A(b.HVEM_PLANLEGGER)),m=D(A(b.OM_BARNET)),o=D(A(b.ARBEIDSSITUASJON)),g=V(b.HVOR_LANG_PERIODE),f=V(b.FORDELING),l=me({defaultValues:d}),S=re(s),H=te(m),P=O=>{g(O);const pe=s.type===R.FAR_OG_FAR,U=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(pe&&m.erFødsel)?E.FORDELING:E.PLANEN_DERES;return U===E.PLANEN_DERES&&f(void 0),a.goToNextStep(U)},y=l.watch("dekningsgrad")??(d==null?void 0:d.dekningsgrad),k=ne(o),x=Re(s,k,n),j=t[v.HUNDRE_PROSENT],p=t[v.ÅTTI_PROSENT],oe=y===v.HUNDRE_PROSENT?j:p,B=y?oe:void 0,ie=W(k,s,j,m),ue=W(k,s,p,m),T=X(j),F=X(p),de=y===v.HUNDRE_PROSENT?T:F,G=k==="kunSøker1HarRett"||k==="kunSøker2HarRett",{ref:ge,scrollToBottom:le}=He();return e.jsx(je,{ref:ge,steps:u,goToStep:a.goToNextStep,children:e.jsx(ke,{formMethods:l,onSubmit:P,shouldUseFlexbox:!0,children:e.jsxs(c,{gap:"10",style:{flex:1},children:[e.jsxs(c,{gap:"8",children:[e.jsx(ve,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Y,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:k==="beggeHarRett",uker100:T.uker,dager100:T.dager,uker80:F.uker,dager80:F.dager}})})}),!S&&G&&s.type!==R.FAR_OG_FAR&&e.jsx(ae,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===R.FAR_OG_FAR&&H&&e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(c,{gap:"2",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(I,{inlineText:!0,href:L.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(fe,{name:"dekningsgrad",control:l.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:x}}),validate:[ye(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:x}))],onChange:le,children:[e.jsx(K,{value:v.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T.uker,dager100:T.dager}})}),e.jsx(K,{value:v.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:F.uker,dager80:F.dager}})})]}),B&&e.jsx(c,{gap:"2",children:e.jsx(se,{barnet:m,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:B,uttaksdata100:ie,uttaksdata80:ue,valgtDekningsgrad:y,antallUkerOgDager:de},y)})]}),e.jsx(xe,{}),e.jsx(ce,{saveDataOnPreviousClick:g,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Ae.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
