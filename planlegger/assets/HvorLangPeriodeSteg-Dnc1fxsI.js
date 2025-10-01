import{ad as N,j as e,a5 as _,a6 as v,a7 as i,_ as r,a9 as I,aa as B,k as K,ak as Z,ae as E,$ as me,a0 as ke,af as ve,ag as ye,a1 as C,ah as ce}from"./iframe-LXTMV3rR.js";import{c as be,e as Pe,u as h,C as P,f as V}from"./usePlanleggerNavigator-yDL4ZAL4.js";import{P as D}from"./routes-Cyl7_Mgv.js";import{B as fe}from"./BlueRadioGroup-BzghiFCa.js";import{P as je}from"./PlanleggerStepPage-CWoQRx6r.js";import{A as w}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{f as A,b as M,c as ee,e as re,H as R,d as Te,h as Fe,g as z,a as J,i as Re}from"./HvemPlanleggerUtils-DakUotk6.js";import{e as te,b as Se}from"./barnetUtils-BAvddyKH.js";import{u as ne}from"./hvemHarRettUtils-CpKXA2I4.js";import{g as $,a as Q,b as W,f as X,c as Y}from"./uttakUtils-BdMOp_OT.js";import{u as He}from"./useScrollBehaviour-Dp3Ll2VL.js";import{S as qe}from"./PersonGroup-CgcduDqo.js";import{S as xe}from"./Spacer-B1hEFNF8.js";const ae=({hvemPlanlegger:t,arbeidssituasjon:n})=>{const a=N(),u=n.status===w.INGEN||n.status===w.UFØR,y=n.jobberAnnenPart===!1;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett",values:{hvem:u?M(a,t):A(a,t)}}),icon:e.jsx(qe,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:[y&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden",values:{hvem:A(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar",values:{hvem:M(a,t),hvem2:A(a,t)}})})]}),u&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden",values:{hvem:M(a,t),hvem2:A(a,t)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor",values:{a:s=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:s}),hvem:M(a,t),erMorHovedsøker:ee(t)}})})]})]})};ae.__docgenInfo={description:"",methods:[],displayName:"NårBareEnPartHarRettInfoboks",props:{hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""}}};const se=({barnet:t,hvemPlanlegger:n,arbeidssituasjon:a,valgtStønadskonto:u,uttaksdata100:y,uttaksdata80:s,valgtDekningsgrad:p,antallUkerOgDager:o})=>{const d=N(),f=t.antallBarn,g=te(t),S=Se(t),H=re(n),b=ne(a),q=H||b==="kunSøker1HarRett"||b==="kunSøker2HarRett",c=d.formatDate($(t),{day:"2-digit",month:"long",year:"numeric"}),m=p===k.HUNDRE_PROSENT?y.sluttdatoPeriode1:s.sluttdatoPeriode1,x=p===k.HUNDRE_PROSENT?y.sluttdatoPeriode2:s.sluttdatoPeriode2,j=n.type===R.FAR_OG_FAR&&!g;return e.jsxs(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTittel",values:{dato:d.formatDate(x||m,{day:"2-digit",month:"long",year:"numeric",weekday:"long"})}}),icon:e.jsx(Z,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(v,{paddingBlock:"0 2",children:e.jsxs(i,{children:[g&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon",values:{antallBarn:f,kunEnPartSkalHa:q,dato:c,erOmsorgsovertakelseFremtidig:K($(t)).isAfter(K())}}),!g&&S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel",values:{antallBarn:f,erFarOgFar:Fe(n),kunEnPartSkalHa:q,erAlenesøkerValue:H,erFarDelAvSøknaden:Te(n)}}),!g&&!S&&e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin",values:{antallBarn:f,erMorDelAvSøknaden:ee(n),kunEnPartSkalHa:q}})]})}),(b==="kunSøker2HarRett"&&!j||b==="kunSøker1HarRett"&&n.type===R.FAR_OG_FAR&&g)&&e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker",values:{uker:Q(u).uker,dager:Q(u).dager,uker2:o.uker,dager2:o.dager,b:l=>e.jsx("b",{children:l}),hvem:J(n,d),hvemPart1:z(n,d)}})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker",values:{uker:W(u).uker,dager:W(u).dager,uker2:o.uker,dager2:o.dager,a:l=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:l}),b:l=>e.jsx("b",{children:l}),hvem:J(n,d),hvemPart1:z(n,d)}})})]})]})};se.__docgenInfo={description:"",methods:[],displayName:"ValgtDekningsgradInfoboks",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"uker",value:{name:"number",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}},description:""}}};const he=({stønadskontoer:t})=>{const n=N(),a=be(),u=Pe(),y=h(P.HVOR_LANG_PERIODE),s=E(h(P.HVEM_PLANLEGGER)),p=E(h(P.OM_BARNET)),o=E(h(P.ARBEIDSSITUASJON)),d=V(P.HVOR_LANG_PERIODE),f=V(P.FORDELING),g=me({defaultValues:y}),S=re(s),H=te(p),b=O=>{d(O);const pe=s.type===R.FAR_OG_FAR,U=o.status===w.JOBBER&&!!o.jobberAnnenPart&&!(pe&&p.erFødsel)?D.FORDELING:D.PLANEN_DERES;return U===D.PLANEN_DERES&&f(void 0),a.goToNextStep(U)},c=g.watch("dekningsgrad")??y?.dekningsgrad,m=ne(o),x=Re(s,m,n),j=t[k.HUNDRE_PROSENT],l=t[k.ÅTTI_PROSENT],oe=c===k.HUNDRE_PROSENT?j:l,L=c?oe:void 0,ie=X(m,s,j,p),ue=X(m,s,l,p),T=Y(j),F=Y(l),de=c===k.HUNDRE_PROSENT?T:F,G=m==="kunSøker1HarRett"||m==="kunSøker2HarRett",{ref:ge,scrollToBottom:le}=He();return e.jsx(je,{ref:ge,steps:u,goToStep:a.goToNextStep,children:e.jsx(ke,{formMethods:g,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(v,{gap:"space-40",style:{flex:1},children:[e.jsxs(v,{gap:"space-32",children:[e.jsx(ve,{size:"medium",spacing:!0,level:"2",children:e.jsx(r,{id:"HvorLangPeriodeSteg.Tittel"})}),e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel"}),icon:e.jsx(Z,{height:24,width:24,color:"var(--ax-bg-neutral-strong)",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst",values:{beggeHarRett:m==="beggeHarRett",uker100:T.uker,dager100:T.dager,uker80:F.uker,dager80:F.dager}})})}),!S&&G&&s.type!==R.FAR_OG_FAR&&e.jsx(ae,{hvemPlanlegger:s,arbeidssituasjon:o}),G&&s.type===R.FAR_OG_FAR&&H&&e.jsx(_,{header:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett"}),color:"gray",children:e.jsxs(v,{gap:"space-8",children:[e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett"})}),e.jsx(i,{children:e.jsx(r,{id:"HvorLangPeriodeSteg.Infoboks.ManFårEnDel",values:{a:O=>e.jsx(I,{inlineText:!0,href:B.godkjentAktivitet,rel:"noreferrer",target:"_blank",children:O})}})})]})}),e.jsxs(fe,{name:"dekningsgrad",control:g.control,label:e.jsx(r,{id:"HvorLangPeriodeSteg.HvorLangPeriode",values:{deSomHarRett:x}}),validate:[ye(n.formatMessage({id:"HvorLangPeriodeSteg.HvorLangPeriode.Required"},{deSomHarRett:x}))],onChange:le,children:[e.jsx(C,{value:k.HUNDRE_PROSENT,autoFocus:!0,children:e.jsx(r,{id:"HvorLangPeriodeSteg.100",values:{uker100:T.uker,dager100:T.dager}})}),e.jsx(C,{value:k.ÅTTI_PROSENT,children:e.jsx(r,{id:"HvorLangPeriodeSteg.80",values:{uker80:F.uker,dager80:F.dager}})})]}),L&&e.jsx(v,{gap:"space-8",children:e.jsx(se,{barnet:p,hvemPlanlegger:s,arbeidssituasjon:o,valgtStønadskonto:L,uttaksdata100:ie,uttaksdata80:ue,valgtDekningsgrad:c,antallUkerOgDager:de},c)})]}),e.jsx(xe,{}),e.jsx(ce,{saveDataOnPreviousClick:d,goToPreviousStep:a.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};he.__docgenInfo={description:"",methods:[],displayName:"HvorLangPeriodeSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{he as H};
