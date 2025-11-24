import{r as d,u as k,R as u,j as r,H as A,V as p,B as v,M as R,a as g}from"./iframe-BwdsCY1C.js";import{u as O,U as L,o as T}from"./useUttaksplanBuilder-DjJzyodX.js";import{L as f}from"./LeggTilPeriodePanel-CegZRTgI.js";import{P as D}from"./PeriodeListe-mJowVqL1.js";import{u as I,i as P,a as y}from"./UttaksplanDataContext-BlRGr3iN.js";var S=function(a,t){var n={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&t.indexOf(e)<0&&(n[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,e=Object.getOwnPropertySymbols(a);l<e.length;l++)t.indexOf(e[l])<0&&Object.prototype.propertyIsEnumerable.call(a,e[l])&&(n[e[l]]=a[e[l]]);return n};const F=d.forwardRef((a,t)=>{var{title:n,titleId:e}=a,l=S(a,["title","titleId"]);let E=k();return E=n?e||"title-"+E:void 0,u.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":E},l),n?u.createElement("title",{id:E},n):null,u.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M16.97 2.97a2.871 2.871 0 1 1 4.06 4.06l-1.5 1.5-4.5 4.5a.75.75 0 0 1-.293.181l-4.5 1.5a.75.75 0 0 1-.949-.948l1.5-4.5a.75.75 0 0 1 .182-.293l4.497-4.497.003-.003.003-.003zM16 6.06l-3.844 3.845-.97 2.91 2.909-.97L17.939 8zm3 .88L17.06 5l.97-.97a1.371 1.371 0 0 1 1.94 1.94zM3.25 5c0-.966.784-1.75 1.75-1.75h1.75a.75.75 0 0 1 0 1.5H5a.25.25 0 0 0-.25.25v1.75a.75.75 0 0 1-1.5 0zM9.5 4a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5h-1.75A.75.75 0 0 1 9.5 4M4 9.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 4 9.5m16 1.75a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75M4 16.5a.75.75 0 0 1 .75.75V19c0 .138.112.25.25.25h1.75a.75.75 0 0 1 0 1.5H5A1.75 1.75 0 0 1 3.25 19v-1.75A.75.75 0 0 1 4 16.5m16 0a.75.75 0 0 1 .75.75V19A1.75 1.75 0 0 1 19 20.75h-1.75a.75.75 0 0 1 0-1.5H19a.25.25 0 0 0 .25-.25v-1.75a.75.75 0 0 1 .75-.75M9.5 20a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 9.5 20",clipRule:"evenodd"}))}),c=({oppdaterUttaksplan:a,endreUttaksplan:t})=>{const[n,e]=d.useState(!1),{modus:l,uttaksplan:E}=I(),s=O(),[m,_]=d.useState(!1),N=()=>{_(!m)};return r.jsxs(r.Fragment,{children:[E.length>0&&r.jsx(D,{perioder:E,handleAddPeriode:i=>{o(s.leggTilPeriode(i),a)},handleUpdatePeriode:i=>{o(s.oppdaterPeriode(i),a)},handleDeletePeriode:i=>{o(s.slettPeriode(i),a)},handleDeletePerioder:i=>{o(s.slettPerioder(i),a)},isAllAccordionsOpen:m}),E.length===0&&r.jsxs(A,{gap:"space-12",children:[r.jsx(F,{fontSize:24}),r.jsxs(p,{gap:"space-8",children:[r.jsx(v,{weight:"semibold",size:"large",children:r.jsx(R,{id:"uttaksplan.ingenPerioder.tittel"})}),r.jsx(v,{children:r.jsx(R,{id:"uttaksplan.ingenPerioder.body"})})]})]}),l!=="innsyn"&&!n&&r.jsx(g,{variant:"secondary",onClick:()=>e(!0),children:r.jsx(R,{id:"uttaksplan.leggTilPeriode"})}),n&&a&&r.jsx(f,{onCancel:()=>e(!1),handleAddPeriode:i=>{o(s.leggTilPeriode(i),a),e(!1)}}),a&&t&&r.jsx(L,{toggleAllAccordions:N,visKnapper:!0,angreEndring:()=>t("angre"),tilbakestillPlan:()=>t("tilbakestill"),fjernAltIPlanen:()=>t("fjernAlt")})]})},o=(a,t)=>{const n=a.filter(e=>!P(e)&&!y(e));t?.(n.map(e=>T(e,["id","periodeHullÅrsak","readOnly","skalIkkeHaUttakFørTermin","erAnnenPartEøs"])))};c.__docgenInfo={description:"",methods:[],displayName:"UttaksplanNy",props:{oppdaterUttaksplan:{required:!1,tsType:{name:"signature",type:"function",raw:"(perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"union",raw:"UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt",elements:[{name:"signature",type:"object",raw:`{
    flerbarnsdager?: boolean;
    fom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType;
    morsAktivitet?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_MorsAktivitet;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    overføringÅrsak?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_Overføringsårsak;
    resultat?: UttakPeriodeResultat_fpoversikt;
    samtidigUttak?: number;
    tom: string;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
}`,signature:{properties:[{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"fom",value:{name:"string",required:!0}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}},{key:"gradering",value:{name:"signature",type:"object",raw:`{
    aktivitet: Aktivitet_fpoversikt;
    arbeidstidprosent: number;
}`,signature:{properties:[{key:"aktivitet",value:{name:"signature",type:"object",raw:`{
    arbeidsgiver?: Arbeidsgiver_fpoversikt;
    arbeidsgiverNavn?: string;
    type: AktivitetType_fpoversikt;
}`,signature:{properties:[{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id: string;
    type?: ArbeidsgiverType_fpoversikt;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}}]},required:!0}},{key:"arbeidstidprosent",value:{name:"number",required:!0}}]},required:!1}},{key:"kontoType",value:{name:"union",raw:`| 'FELLESPERIODE'
| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"oppholdÅrsak",value:{name:"union",raw:`| 'MØDREKVOTE_ANNEN_FORELDER'
| 'FEDREKVOTE_ANNEN_FORELDER'
| 'FELLESPERIODE_ANNEN_FORELDER'
| 'FORELDREPENGER_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'MØDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FEDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FELLESPERIODE_ANNEN_FORELDER'"},{name:"literal",value:"'FORELDREPENGER_ANNEN_FORELDER'"}],required:!1}},{key:"overføringÅrsak",value:{name:"union",raw:`| 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
| 'SYKDOM_ANNEN_FORELDER'
| 'ALENEOMSORG'
| 'IKKE_RETT_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!0}},{key:"trekkerDager",value:{name:"boolean",required:!0}},{key:"trekkerMinsterett",value:{name:"boolean",required:!0}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!0}}]},required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"tom",value:{name:"string",required:!0}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'FRI'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'HV_ØVELSE'
| 'NAV_TILTAK'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'FRI'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'NAV_TILTAK'"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fom: string;
    kontoType: no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType;
    tom: string;
    trekkdager: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:`| 'FELLESPERIODE'
| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkdager",value:{name:"number",required:!0}}]}}]}],raw:"Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>"},name:"perioder"}],return:{name:"void"}}},description:""},endreUttaksplan:{required:!1,tsType:{name:"signature",type:"function",raw:"(handling: 'angre' | 'tilbakestill' | 'fjernAlt') => void",signature:{arguments:[{type:{name:"union",raw:"'angre' | 'tilbakestill' | 'fjernAlt'",elements:[{name:"literal",value:"'angre'"},{name:"literal",value:"'tilbakestill'"},{name:"literal",value:"'fjernAlt'"}]},name:"handling"}],return:{name:"void"}}},description:""}}};export{c as U};
