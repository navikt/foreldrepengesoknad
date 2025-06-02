import{j as E}from"./jsx-runtime-D_zvdyIk.js";import{b as M,C as R}from"./FpDataContext-DSKr2VRc.js";import{e as H,a as J,S as y}from"./useFpNavigator-CxIe9C0B.js";import{r as x}from"./index-75N07mRN.js";import{b as Y,u as $,R as C,f as z}from"./ErrorSummaryHookForm-CNWOhuiX.js";import{u as q,M as D,H as W,L as Q,a as X}from"./index-BLIM7tmH.js";import{a as Z,l as ee,b as ae,c as ne}from"./eksisterendeSakUtils-DiacyF94.js";import{d as o,e as b,l as re}from"./dates-iBrNYYBq.js";import{i as te,R as P,U as le,N as Ee,O as ie,C as se,Q as ue,J as oe}from"./Uttaksplan-gFl4alCs.js";import{c as Re,d as de,e as Ne,h as c,I as A,i as me,j as B,k as Te,l as p,s as _e,t as ve}from"./barnUtils-fpKvYpHb.js";import{D as Ae}from"./DinePlikter-CwBN-5QC.js";import{g as G}from"./guid-CsArkN6i.js";import{D as De}from"./DinePersonopplysningerModal-DXixQWpO.js";import{V as F,H as K,B as Le}from"./VStack-DI-xS76s.js";const Ie=()=>{const a=M();return{oppdaterSøknadIState:(e,l)=>{a(R.SØKERSITUASJON,e.søkersituasjon),a(R.OM_BARNET,e.barn),a(R.ANNEN_FORELDER,e.annenForelder),a(R.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(R.FRILANS,e.frilans),a(R.EGEN_NÆRING,e.egenNæring),a(R.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(R.UTENLANDSOPPHOLD,e.utenlandsopphold),a(R.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(R.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(R.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(R.UTTAKSPLAN,e.uttaksplan),a(R.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),l&&a(R.EKSISTERENDE_SAK,l)}}};var N=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(N||{});const Oe=(a,n)=>a.map(e=>{const l=e.sak!==void 0?U(e.sak.åpenBehandling===void 0,n):void 0,i=e.sak!==void 0?n.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return E.jsx(P,{value:e.id,description:e.sak!==void 0?`${i}, ${l}`:i,children:E.jsx(D,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:Ne(e.antallBarn,n),termin:o(e.termindato).format(b),b:r=>E.jsx("b",{children:r})}})},e.id)}),U=(a,n)=>a?n.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):n.formatMessage({id:"velkommen.sak.status.underBehandling"}),ke=(a,n)=>a.map(e=>{const l=Re(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,n),i=de(e.fødselsdatoer),r=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?i:o(e.omsorgsovertagelse).format(b),u=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?n.formatMessage({id:"velkommen.barnVelger.født"}):n.formatMessage({id:"velkommen.barnVelger.adopsjon"}),s=e.sak!==void 0?n.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",T=e.sak!==void 0?U(e.sak.åpenBehandling===void 0,n):void 0;return E.jsx(P,{value:e.id,description:T?`${s}, ${T}`:s,children:E.jsx("b",{children:e.alleBarnaLever?`${l} ${u} ${r}`:l})},e.id)}),h=({selectableBarn:a})=>{const n=q();if(a.length===0)return null;const e=a.filter(r=>r.type===N.UFØDT),l=a.filter(r=>r.type!==N.UFØDT);let i=[];return l.length>0&&(i=i.concat(ke(l,n))),e.length>0&&(i=i.concat(Oe(e,n))),E.jsx(Y,{name:"valgteBarn",label:E.jsx(D,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[te(n.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:i.concat(E.jsx(P,{value:"søknad_gjeder_nytt_barn",description:n.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:E.jsx(D,{id:"omBarnet.gjelderAnnetBarn",values:{b:r=>E.jsx("b",{children:r})}})},"søknad_gjeder_nytt_barn"))})};h.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    type: ValgtBarnType;
    antallBarn: number;
    sortableDato: Date;
    fnr?: string[];
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: FpSak;
    annenForelder?: AnnenForelderFrontend;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"ValgtBarnType",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"sortableDato",value:{name:"Date",required:!0}},{key:"fnr",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"termindato",value:{name:"Date",required:!1}},{key:"fødselsdatoer",value:{name:"Array",elements:[{name:"Date"}],raw:"Date[]",required:!1}},{key:"omsorgsovertagelse",value:{name:"Date",required:!1}},{key:"fornavn",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!1}},{key:"sak",value:{name:"signature",type:"object",raw:`{
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel?: boolean;
    rettighetType: 'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT';
    annenPart?: Person;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: FpVedtak;
    åpenBehandling?: FpÅpenBehandling;
    barn?: Person[];
    dekningsgrad?: 'ÅTTI' | 'HUNDRE';
    oppdatertTidspunkt: string;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"saksnummer",value:{name:"string",required:!0}},{key:"sakAvsluttet",value:{name:"boolean",required:!0}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!0}},{key:"sakTilhørerMor",value:{name:"boolean",required:!0}},{key:"gjelderAdopsjon",value:{name:"boolean",required:!0}},{key:"morUføretrygd",value:{name:"boolean",required:!0}},{key:"harAnnenForelderTilsvarendeRettEØS",value:{name:"boolean",required:!1}},{key:"ønskerJustertUttakVedFødsel",value:{name:"boolean",required:!1}},{key:"rettighetType",value:{name:"union",raw:"'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT'",elements:[{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'BEGGE_RETT'"},{name:"literal",value:"'BARE_SØKER_RETT'"}],required:!0}},{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr?: string;
    aktørId?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!1}},{key:"aktørId",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelse",value:{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
    termindato?: string;
    antallBarn: number;
    omsorgsovertakelse?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!1}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"omsorgsovertakelse",value:{name:"string",required:!1}}]},required:!0}},{key:"gjeldendeVedtak",value:{name:"signature",type:"object",raw:`{
    perioder: UttakPeriode[];
}`,signature:{properties:[{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: 'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL';
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?:
        | 'HV_ØVELSE'
        | 'ARBEID'
        | 'LOVBESTEMT_FERIE'
        | 'SØKER_SYKDOM'
        | 'SØKER_INNLAGT'
        | 'BARN_INNLAGT'
        | 'NAV_TILTAK'
        | 'FRI';
    oppholdÅrsak?:
        | 'MØDREKVOTE_ANNEN_FORELDER'
        | 'FEDREKVOTE_ANNEN_FORELDER'
        | 'FELLESPERIODE_ANNEN_FORELDER'
        | 'FORELDREPENGER_ANNEN_FORELDER';
    overføringÅrsak?:
        | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
        | 'SYKDOM_ANNEN_FORELDER'
        | 'IKKE_RETT_ANNEN_FORELDER'
        | 'ALENEOMSORG';
    gradering?: Gradering;
    morsAktivitet?:
        | 'ARBEID'
        | 'UTDANNING'
        | 'KVALPROG'
        | 'INTROPROG'
        | 'TRENGER_HJELP'
        | 'INNLAGT'
        | 'ARBEID_OG_UTDANNING'
        | 'UFØRE'
        | 'IKKE_OPPGITT';
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?:
        | 'ANNET'
        | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
        | 'AVSLAG_FRATREKK_PLEIEPENGER'
        | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
        | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!1}},{key:"trekkerMinsterett",value:{name:"boolean",required:!1}},{key:"trekkerDager",value:{name:"boolean",required:!1}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!1}}]},required:!1}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}},{key:"oppholdÅrsak",value:{name:"union",raw:`| 'MØDREKVOTE_ANNEN_FORELDER'
| 'FEDREKVOTE_ANNEN_FORELDER'
| 'FELLESPERIODE_ANNEN_FORELDER'
| 'FORELDREPENGER_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'MØDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FEDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FELLESPERIODE_ANNEN_FORELDER'"},{name:"literal",value:"'FORELDREPENGER_ANNEN_FORELDER'"}],required:!1}},{key:"overføringÅrsak",value:{name:"union",raw:`| 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
| 'SYKDOM_ANNEN_FORELDER'
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"gradering",value:{name:"signature",type:"object",raw:`{
    arbeidstidprosent: number;
    aktivitet: Aktivitet;
}`,signature:{properties:[{key:"arbeidstidprosent",value:{name:"number",required:!0}},{key:"aktivitet",value:{name:"signature",type:"object",raw:`{
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: 'PRIVAT' | 'ORGANISASJON';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    tilstand:
        | 'UNDER_BEHANDLING'
        | 'VENT_TIDLIG_SØKNAD'
        | 'VENT_MELDEKORT'
        | 'VENT_DOKUMENTASJON'
        | 'VENT_INNTEKTSMELDING';
    søknadsperioder: UttakPeriode[];
}`,signature:{properties:[{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"}],required:!0}},{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: 'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL';
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?:
        | 'HV_ØVELSE'
        | 'ARBEID'
        | 'LOVBESTEMT_FERIE'
        | 'SØKER_SYKDOM'
        | 'SØKER_INNLAGT'
        | 'BARN_INNLAGT'
        | 'NAV_TILTAK'
        | 'FRI';
    oppholdÅrsak?:
        | 'MØDREKVOTE_ANNEN_FORELDER'
        | 'FEDREKVOTE_ANNEN_FORELDER'
        | 'FELLESPERIODE_ANNEN_FORELDER'
        | 'FORELDREPENGER_ANNEN_FORELDER';
    overføringÅrsak?:
        | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
        | 'SYKDOM_ANNEN_FORELDER'
        | 'IKKE_RETT_ANNEN_FORELDER'
        | 'ALENEOMSORG';
    gradering?: Gradering;
    morsAktivitet?:
        | 'ARBEID'
        | 'UTDANNING'
        | 'KVALPROG'
        | 'INTROPROG'
        | 'TRENGER_HJELP'
        | 'INNLAGT'
        | 'ARBEID_OG_UTDANNING'
        | 'UFØRE'
        | 'IKKE_OPPGITT';
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?:
        | 'ANNET'
        | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
        | 'AVSLAG_FRATREKK_PLEIEPENGER'
        | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
        | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!1}},{key:"trekkerMinsterett",value:{name:"boolean",required:!1}},{key:"trekkerDager",value:{name:"boolean",required:!1}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!1}}]},required:!1}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}},{key:"oppholdÅrsak",value:{name:"union",raw:`| 'MØDREKVOTE_ANNEN_FORELDER'
| 'FEDREKVOTE_ANNEN_FORELDER'
| 'FELLESPERIODE_ANNEN_FORELDER'
| 'FORELDREPENGER_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'MØDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FEDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FELLESPERIODE_ANNEN_FORELDER'"},{name:"literal",value:"'FORELDREPENGER_ANNEN_FORELDER'"}],required:!1}},{key:"overføringÅrsak",value:{name:"union",raw:`| 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
| 'SYKDOM_ANNEN_FORELDER'
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"gradering",value:{name:"signature",type:"object",raw:`{
    arbeidstidprosent: number;
    aktivitet: Aktivitet;
}`,signature:{properties:[{key:"arbeidstidprosent",value:{name:"number",required:!0}},{key:"aktivitet",value:{name:"signature",type:"object",raw:`{
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: 'PRIVAT' | 'ORGANISASJON';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr?: string;
    aktørId?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!1}},{key:"aktørId",value:{name:"string",required:!1}}]},required:!1}],raw:"Person[]",required:!1}},{key:"dekningsgrad",value:{name:"union",raw:"'ÅTTI' | 'HUNDRE'",elements:[{name:"literal",value:"'ÅTTI'"},{name:"literal",value:"'HUNDRE'"}],required:!1}},{key:"oppdatertTidspunkt",value:{name:"string",required:!0}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]},required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};o.extend(ie);o.extend(ve);const ge=(a,n,e)=>a?N.ADOPTERT:n.fødselsdato!==void 0||e&&e.length>0?N.FØDT:N.UFØDT,Se=(a,n)=>{const e=a.familiehendelse.termindato;if(Ee(e)){const l=o(e).subtract(17,"week"),i=o(e).add(6,"week");return n.filter(r=>o(r.fødselsdato).isBetween(l,i,"day","[]"))}return[]},fe=(a,n)=>{const e=A(a.familiehendelse.fødselsdato),l=a.barn!==void 0?a.barn.map(u=>u.fnr).flat():[],i=n.filter(u=>l.includes(u.fnr)),r=e!==void 0?n.filter(u=>c(u.fødselsdato,e)&&!i.find(s=>s.fnr===u.fnr)):[];return i.concat(r)},Fe=(a,n)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=fe(a,n)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=Se(a,n));const l=A(Te(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),i=ge(a.gjelderAdopsjon,a.familiehendelse,e),r=A(a.familiehendelse.fødselsdato);let u;return e&&e.length>0?u=e.map(s=>o.utc(s.fødselsdato).toDate()):r!==void 0&&(u=Array(a.familiehendelse.antallBarn).fill(r)),{id:G(),type:i,antallBarn:a.familiehendelse.antallBarn,termindato:A(a.familiehendelse.termindato),omsorgsovertagelse:A(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:u,familiehendelsesdato:l,sortableDato:A(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?le(A(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(s=>s.fornavn!==void 0&&s.fornavn.trim()!=="").map(s=>[s.fornavn,s.mellomnavn!==void 0?s.mellomnavn:""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(s=>s.fnr!==void 0).map(s=>s.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(s=>p(s)):!1}},pe=(a,n)=>{const e=a.mellomnavn!==void 0?[a.fornavn,a.mellomnavn].join(" "):a.fornavn;return{id:G(),type:N.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[o.utc(a.fødselsdato).toDate()],fornavn:e!==void 0?[e]:void 0,fnr:[a.fnr],sortableDato:o.utc(a.fødselsdato).toDate(),alleBarnaLever:p(a),annenForelder:n}},Ge=(a,n,e)=>{const l=[a].concat(n).sort(_e);if(!(l.find(r=>!p(r)&&B(r))||l.length==0))return{id:G(),type:N.IKKE_UTFYLT,antallBarn:l.length,fødselsdatoer:l.map(r=>o.utc(r.fødselsdato).toDate()),fornavn:l.map(r=>[r.fornavn,r.mellomnavn!==void 0?r.mellomnavn:""].join(" ")),fnr:l.map(r=>r.fnr),sortableDato:o.utc(l[0].fødselsdato).toDate(),alleBarnaLever:l.every(r=>p(r)),annenForelder:e}},ye=(a,n)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Fe(e,n)),Ke=(a,n,e)=>{const l=a.filter(t=>!e.find(d=>c(t.fødselsdato,A(d.familiehendelse.fødselsdato)))),i="tempFnr",r=l.map(t=>t.fnr===void 0?{...t,fnr:i+G().toString()}:t),u=n.map(t=>t.fnr).flat(),s=n.filter(t=>t.fødselsdatoer!==void 0&&t.fødselsdatoer.length>0).map(t=>t.fødselsdatoer).flat(),T=[];return r.filter(t=>!(t.dødsdato!==void 0&&s.find(d=>o(d).isSame(o.utc(t.fødselsdato),"day")))).forEach(t=>{if(!u.includes(t.fnr)&&!H(t.fødselsdato)){const d=me(t.fnr,t.fødselsdato,r),I=t.annenForelder!==void 0?{fnr:t.annenForelder.fnr,fornavn:t.annenForelder.fornavn,mellomnavn:t.annenForelder.mellomnavn,etternavn:t.annenForelder.etternavn}:void 0;if(u.push(t.fnr),d.length===0){if(!B(t)){const L=pe(t,I);T.push(L)}}else{const L=Ge(t,d,I);d.forEach(O=>{u.push(O.fnr)}),L!==void 0&&T.push(L)}}}),T.map(t=>t.fnr&&t.fnr.length>0?{...t,fnr:t.fnr.filter(d=>d&&!d.startsWith(i))}:t)},Pe=(a,n)=>{const e=a.filter(u=>!u.sakAvsluttet),l=a.filter(u=>u.sakAvsluttet),i=ye(e,n),r=Ke(n,i,l);return i.concat(r)},Ve=(a,n)=>{var i,r;const e=n.filter(u=>u.sak!==void 0&&u.id!==a.id&&u.familiehendelsesdato!==void 0&&o(u.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(j);const l=e[e.length-1];if(l!==void 0)return{familiehendelsesdato:l.familiehendelsesdato,startdatoFørsteStønadsperiode:l.startdatoFørsteStønadsperiode,fnr:l.fnr,annenForelderFnr:(r=(i=l.sak)==null?void 0:i.annenPart)==null?void 0:r.fnr}},j=(a,n)=>o(a.sortableDato).isBefore(n.sortableDato,"d")?1:o(a.sortableDato).isAfter(n.sortableDato,"d")?-1:0,Me=({saker:a,harGodkjentVilkår:n,søkerInfo:e,setHarGodkjentVilkår:l,setErEndringssøknad:i,setSøknadGjelderNyttBarn:r,mellomlagreSøknadOgNaviger:u})=>{const s=q(),T=J(e.arbeidsforhold,u),V=M(),{oppdaterSøknadIState:k}=Ie(),t=x.useMemo(()=>[...Pe(a,e.søker.barn)].sort(j),[a,e.søker.barn]),d=v=>{if(!v.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",v.harForståttRettigheterOgPlikter);return}l(!0);const m=t.find(_=>_.id===v.valgteBarn);if(m===void 0)return i(!1),r(!0),T.goToNextStep(y.SØKERSITUASJON);const g=Ve(m,t);V(R.BARN_FRA_NESTE_SAK,g);const S=!!m.kanSøkeOmEndring?a.find(_=>{var f;return _.saksnummer===((f=m.sak)==null?void 0:f.saksnummer)}):void 0;if(S){const _=Z(S,g==null?void 0:g.startdatoFørsteStønadsperiode,m.fødselsdatoer),f=ee(e.søker,_,s,S.annenPart,m);return k(f,_),i(!0),r(!1),T.goToNextStep(y.UTTAKSPLAN)}if(m.sak!==void 0&&m.kanSøkeOmEndring===!1){const _=ae({...m,sak:m.sak},s,e.søker.barn,e.søker.fnr);k(_)}if(!S){const _=ne(m);k(_)}return i(!1),r(!1),T.goToNextStep(y.SØKERSITUASJON)},I=$({defaultValues:{harForståttRettigheterOgPlikter:n}}),L=I.watch("valgteBarn"),O=t.find(v=>v.id===L),w=(O==null?void 0:O.kanSøkeOmEndring)===!0?s.formatMessage({id:"velkommen.endreSøknad"}):s.formatMessage({id:"velkommen.begynnMedSøknad"});return E.jsx(C,{formMethods:I,onSubmit:d,children:E.jsx(F,{gap:"10",children:E.jsx(se,{children:E.jsxs(F,{gap:"8",children:[E.jsx(K,{justify:"center",children:E.jsx(W,{size:"xlarge",children:E.jsx(D,{id:"velkommen.tittel"})})}),E.jsx(ue,{poster:!0,children:E.jsxs(F,{gap:"2",children:[E.jsx(D,{id:"velkommen.guidepanel.del1"}),E.jsx(D,{id:"velkommen.guidepanel.del2",values:{a:v=>E.jsx(Q,{rel:"noopener noreferrer",href:re.foreldrepenger,children:v})}})]})}),E.jsx(h,{selectableBarn:t}),E.jsx(oe,{variant:"info",children:E.jsx(D,{id:"velkommen.lagring.info"})}),E.jsx(z,{name:"harForståttRettigheterOgPlikter",label:s.formatMessage({id:"velkommen.samtykke"}),validate:[v=>v!==!0?s.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:E.jsx(F,{gap:"5",children:E.jsxs(K,{gap:"1",children:[E.jsx(X,{children:E.jsx(D,{id:"velkommen.samtykkeIntro.del1"})}),E.jsx(Ae,{})]})})}),E.jsx(K,{justify:"center",children:E.jsx(Le,{type:"submit",variant:"primary",children:w})}),E.jsx(De,{})]})})})})};Me.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel?: boolean;
    rettighetType: 'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT';
    annenPart?: Person;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: FpVedtak;
    åpenBehandling?: FpÅpenBehandling;
    barn?: Person[];
    dekningsgrad?: 'ÅTTI' | 'HUNDRE';
    oppdatertTidspunkt: string;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"saksnummer",value:{name:"string",required:!0}},{key:"sakAvsluttet",value:{name:"boolean",required:!0}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!0}},{key:"sakTilhørerMor",value:{name:"boolean",required:!0}},{key:"gjelderAdopsjon",value:{name:"boolean",required:!0}},{key:"morUføretrygd",value:{name:"boolean",required:!0}},{key:"harAnnenForelderTilsvarendeRettEØS",value:{name:"boolean",required:!1}},{key:"ønskerJustertUttakVedFødsel",value:{name:"boolean",required:!1}},{key:"rettighetType",value:{name:"union",raw:"'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT'",elements:[{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'BEGGE_RETT'"},{name:"literal",value:"'BARE_SØKER_RETT'"}],required:!0}},{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr?: string;
    aktørId?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!1}},{key:"aktørId",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelse",value:{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
    termindato?: string;
    antallBarn: number;
    omsorgsovertakelse?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!1}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"omsorgsovertakelse",value:{name:"string",required:!1}}]},required:!0}},{key:"gjeldendeVedtak",value:{name:"signature",type:"object",raw:`{
    perioder: UttakPeriode[];
}`,signature:{properties:[{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: 'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL';
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?:
        | 'HV_ØVELSE'
        | 'ARBEID'
        | 'LOVBESTEMT_FERIE'
        | 'SØKER_SYKDOM'
        | 'SØKER_INNLAGT'
        | 'BARN_INNLAGT'
        | 'NAV_TILTAK'
        | 'FRI';
    oppholdÅrsak?:
        | 'MØDREKVOTE_ANNEN_FORELDER'
        | 'FEDREKVOTE_ANNEN_FORELDER'
        | 'FELLESPERIODE_ANNEN_FORELDER'
        | 'FORELDREPENGER_ANNEN_FORELDER';
    overføringÅrsak?:
        | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
        | 'SYKDOM_ANNEN_FORELDER'
        | 'IKKE_RETT_ANNEN_FORELDER'
        | 'ALENEOMSORG';
    gradering?: Gradering;
    morsAktivitet?:
        | 'ARBEID'
        | 'UTDANNING'
        | 'KVALPROG'
        | 'INTROPROG'
        | 'TRENGER_HJELP'
        | 'INNLAGT'
        | 'ARBEID_OG_UTDANNING'
        | 'UFØRE'
        | 'IKKE_OPPGITT';
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?:
        | 'ANNET'
        | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
        | 'AVSLAG_FRATREKK_PLEIEPENGER'
        | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
        | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!1}},{key:"trekkerMinsterett",value:{name:"boolean",required:!1}},{key:"trekkerDager",value:{name:"boolean",required:!1}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!1}}]},required:!1}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}},{key:"oppholdÅrsak",value:{name:"union",raw:`| 'MØDREKVOTE_ANNEN_FORELDER'
| 'FEDREKVOTE_ANNEN_FORELDER'
| 'FELLESPERIODE_ANNEN_FORELDER'
| 'FORELDREPENGER_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'MØDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FEDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FELLESPERIODE_ANNEN_FORELDER'"},{name:"literal",value:"'FORELDREPENGER_ANNEN_FORELDER'"}],required:!1}},{key:"overføringÅrsak",value:{name:"union",raw:`| 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
| 'SYKDOM_ANNEN_FORELDER'
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"gradering",value:{name:"signature",type:"object",raw:`{
    arbeidstidprosent: number;
    aktivitet: Aktivitet;
}`,signature:{properties:[{key:"arbeidstidprosent",value:{name:"number",required:!0}},{key:"aktivitet",value:{name:"signature",type:"object",raw:`{
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: 'PRIVAT' | 'ORGANISASJON';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    tilstand:
        | 'UNDER_BEHANDLING'
        | 'VENT_TIDLIG_SØKNAD'
        | 'VENT_MELDEKORT'
        | 'VENT_DOKUMENTASJON'
        | 'VENT_INNTEKTSMELDING';
    søknadsperioder: UttakPeriode[];
}`,signature:{properties:[{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"}],required:!0}},{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: 'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL';
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?:
        | 'HV_ØVELSE'
        | 'ARBEID'
        | 'LOVBESTEMT_FERIE'
        | 'SØKER_SYKDOM'
        | 'SØKER_INNLAGT'
        | 'BARN_INNLAGT'
        | 'NAV_TILTAK'
        | 'FRI';
    oppholdÅrsak?:
        | 'MØDREKVOTE_ANNEN_FORELDER'
        | 'FEDREKVOTE_ANNEN_FORELDER'
        | 'FELLESPERIODE_ANNEN_FORELDER'
        | 'FORELDREPENGER_ANNEN_FORELDER';
    overføringÅrsak?:
        | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
        | 'SYKDOM_ANNEN_FORELDER'
        | 'IKKE_RETT_ANNEN_FORELDER'
        | 'ALENEOMSORG';
    gradering?: Gradering;
    morsAktivitet?:
        | 'ARBEID'
        | 'UTDANNING'
        | 'KVALPROG'
        | 'INTROPROG'
        | 'TRENGER_HJELP'
        | 'INNLAGT'
        | 'ARBEID_OG_UTDANNING'
        | 'UFØRE'
        | 'IKKE_OPPGITT';
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: 'MOR' | 'FAR_MEDMOR';
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?:
        | 'ANNET'
        | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
        | 'AVSLAG_FRATREKK_PLEIEPENGER'
        | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
        | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!1}},{key:"trekkerMinsterett",value:{name:"boolean",required:!1}},{key:"trekkerDager",value:{name:"boolean",required:!1}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!1}}]},required:!1}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}},{key:"oppholdÅrsak",value:{name:"union",raw:`| 'MØDREKVOTE_ANNEN_FORELDER'
| 'FEDREKVOTE_ANNEN_FORELDER'
| 'FELLESPERIODE_ANNEN_FORELDER'
| 'FORELDREPENGER_ANNEN_FORELDER'`,elements:[{name:"literal",value:"'MØDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FEDREKVOTE_ANNEN_FORELDER'"},{name:"literal",value:"'FELLESPERIODE_ANNEN_FORELDER'"},{name:"literal",value:"'FORELDREPENGER_ANNEN_FORELDER'"}],required:!1}},{key:"overføringÅrsak",value:{name:"union",raw:`| 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
| 'SYKDOM_ANNEN_FORELDER'
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"gradering",value:{name:"signature",type:"object",raw:`{
    arbeidstidprosent: number;
    aktivitet: Aktivitet;
}`,signature:{properties:[{key:"arbeidstidprosent",value:{name:"number",required:!0}},{key:"aktivitet",value:{name:"signature",type:"object",raw:`{
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: 'PRIVAT' | 'ORGANISASJON';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr?: string;
    aktørId?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!1}},{key:"aktørId",value:{name:"string",required:!1}}]},required:!1}],raw:"Person[]",required:!1}},{key:"dekningsgrad",value:{name:"union",raw:"'ÅTTI' | 'HUNDRE'",elements:[{name:"literal",value:"'ÅTTI'"},{name:"literal",value:"'HUNDRE'"}],required:!1}},{key:"oppdatertTidspunkt",value:{name:"string",required:!0}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"FpSak[]"},description:""},harGodkjentVilkår:{required:!0,tsType:{name:"boolean"},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: 'M' | 'K' | 'U';
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: 'M' | 'K' | 'U';
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]",required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?:
        | 'UOPPGITT'
        | 'UGIFT'
        | 'GIFT'
        | 'ENKE_ELLER_ENKEMANN'
        | 'SKILT'
        | 'SEPARERT'
        | 'REGISTRERT_PARTNER'
        | 'SEPARERT_PARTNER'
        | 'SKILT_PARTNER'
        | 'GJENLEVENDE_PARTNER';
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{Me as F};
