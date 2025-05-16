import{j as E}from"./jsx-runtime-D_zvdyIk.js";import{b,C as R}from"./FpDataContext-DSKr2VRc.js";import{e as x,a as Y,S as P}from"./useFpNavigator-Brwxf4PD.js";import{r as C}from"./index-75N07mRN.js";import{b as $,u as z,R as W,f as Q}from"./ErrorSummaryHookForm-BSLurYZK.js";import{u as c,M as D,H as X,a as Z,b as ee}from"./index-WbI2dTMN.js";import{m as ae,l as ne,a as re,b as te}from"./eksisterendeSakUtils-B4nAMmO8.js";import{d as o,e as q,l as le}from"./dates-iBrNYYBq.js";import{i as Ee,R as M,U as ie,F as se,G as ue,L as oe,C as Re,H as de,A as Ne}from"./Uttaksplan-B3Cee6gS.js";import{b as me,c as Te,d as ve,e as B,I as A,h as _e,i as U,j as Ae,k as G,s as De,t as Le}from"./barnUtils-C8116O_8.js";import{D as Ie}from"./DinePlikter-B7EGWXMT.js";import{g as y}from"./guid-CsArkN6i.js";import{D as Oe}from"./DinePersonopplysningerModal-DRhWrNM-.js";import{V as p,H as V,B as ke}from"./VStack-BnVFMHqA.js";const ge=()=>{const a=b();return{oppdaterSøknadIState:(e,t)=>{a(R.SØKERSITUASJON,e.søkersituasjon),a(R.OM_BARNET,e.barn),a(R.ANNEN_FORELDER,e.annenForelder),a(R.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(R.FRILANS,e.frilans),a(R.EGEN_NÆRING,e.egenNæring),a(R.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(R.UTENLANDSOPPHOLD,e.utenlandsopphold),a(R.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(R.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(R.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(R.UTTAKSPLAN,e.uttaksplan),a(R.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),t&&a(R.EKSISTERENDE_SAK,t)}}};var N=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(N||{});const Se=(a,n)=>a.map(e=>{const t=e.sak!==void 0?h(e.sak.åpenBehandling===void 0,n):void 0,i=e.sak!==void 0?n.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return E.jsx(M,{value:e.id,description:e.sak!==void 0?`${i}, ${t}`:i,children:E.jsx(D,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:ve(e.antallBarn,n),termin:o(e.termindato).format(q),b:r=>E.jsx("b",{children:r})}})},e.id)}),h=(a,n)=>a?n.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):n.formatMessage({id:"velkommen.sak.status.underBehandling"}),fe=(a,n)=>a.map(e=>{const t=me(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,n),i=Te(e.fødselsdatoer),r=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?i:o(e.omsorgsovertagelse).format(q),s=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?n.formatMessage({id:"velkommen.barnVelger.født"}):n.formatMessage({id:"velkommen.barnVelger.adopsjon"}),u=e.sak!==void 0?n.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",_=e.sak!==void 0?h(e.sak.åpenBehandling===void 0,n):void 0;return E.jsx(M,{value:e.id,description:_?`${u}, ${_}`:u,children:E.jsx("b",{children:e.alleBarnaLever?`${t} ${s} ${r}`:t})},e.id)}),j=({selectableBarn:a})=>{const n=c();if(a.length===0)return null;const e=a.filter(r=>r.type===N.UFØDT),t=a.filter(r=>r.type!==N.UFØDT);let i=[];return t.length>0&&(i=i.concat(fe(t,n))),e.length>0&&(i=i.concat(Se(e,n))),E.jsx($,{name:"valgteBarn",label:E.jsx(D,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[Ee(n.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:i.concat(E.jsx(M,{value:"søknad_gjeder_nytt_barn",description:n.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:E.jsx(D,{id:"omBarnet.gjelderAnnetBarn",values:{b:r=>E.jsx("b",{children:r})}})},"søknad_gjeder_nytt_barn"))})};j.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};o.extend(ue);o.extend(Le);const Fe=(a,n,e)=>a?N.ADOPTERT:n.fødselsdato!==void 0||e&&e.length>0?N.FØDT:N.UFØDT,pe=(a,n)=>{const e=a.familiehendelse.termindato;if(se(e)){const t=o(e).subtract(17,"week"),i=o(e).add(6,"week");return n.filter(r=>o(r.fødselsdato).isBetween(t,i,"day","[]"))}return[]},Ge=(a,n)=>{const e=A(a.familiehendelse.fødselsdato),t=a.barn!==void 0?a.barn.map(s=>s.fnr).flat():[],i=n.filter(s=>t.includes(s.fnr)),r=e!==void 0?n.filter(s=>B(s.fødselsdato,e)&&!i.find(u=>u.fnr===s.fnr)):[];return i.concat(r)},ye=(a,n)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=Ge(a,n)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=pe(a,n));const t=A(Ae(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),i=Fe(a.gjelderAdopsjon,a.familiehendelse,e),r=A(a.familiehendelse.fødselsdato);let s;return e&&e.length>0?s=e.map(u=>o.utc(u.fødselsdato).toDate()):r!==void 0&&(s=Array(a.familiehendelse.antallBarn).fill(r)),{id:y(),type:i,antallBarn:a.familiehendelse.antallBarn,termindato:A(a.familiehendelse.termindato),omsorgsovertagelse:A(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:s,familiehendelsesdato:t,sortableDato:A(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?ie(A(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(u=>u.fornavn!==void 0&&u.fornavn.trim()!=="").map(u=>[u.fornavn,u.mellomnavn!==void 0?u.mellomnavn:""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(u=>u.fnr!==void 0).map(u=>u.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(u=>G(u)):!1}},Ke=(a,n)=>{const e=a.mellomnavn!==void 0?[a.fornavn,a.mellomnavn].join(" "):a.fornavn;return{id:y(),type:N.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[o.utc(a.fødselsdato).toDate()],fornavn:e!==void 0?[e]:void 0,fnr:[a.fnr],sortableDato:o.utc(a.fødselsdato).toDate(),alleBarnaLever:G(a),annenForelder:n}},Pe=(a,n,e)=>{const t=[a].concat(n).sort(De);if(!(t.find(r=>!G(r)&&U(r))||t.length==0))return{id:y(),type:N.IKKE_UTFYLT,antallBarn:t.length,fødselsdatoer:t.map(r=>o.utc(r.fødselsdato).toDate()),fornavn:t.map(r=>[r.fornavn,r.mellomnavn!==void 0?r.mellomnavn:""].join(" ")),fnr:t.map(r=>r.fnr),sortableDato:o.utc(t[0].fødselsdato).toDate(),alleBarnaLever:t.every(r=>G(r)),annenForelder:e}},Ve=(a,n)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>ye(e,n)),Me=(a,n,e)=>{const t=a.filter(l=>!e.find(d=>B(l.fødselsdato,A(d.familiehendelse.fødselsdato)))),i="tempFnr",r=t.map(l=>l.fnr===void 0?{...l,fnr:i+y().toString()}:l),s=n.map(l=>l.fnr).flat(),u=n.filter(l=>l.fødselsdatoer!==void 0&&l.fødselsdatoer.length>0).map(l=>l.fødselsdatoer).flat(),_=[];return r.filter(l=>!(l.dødsdato!==void 0&&u.find(d=>o(d).isSame(o.utc(l.fødselsdato),"day")))).forEach(l=>{if(!s.includes(l.fnr)&&!x(l.fødselsdato)){const d=_e(l.fnr,l.fødselsdato,r),I=l.annenForelder!==void 0?{fnr:l.annenForelder.fnr,fornavn:l.annenForelder.fornavn,mellomnavn:l.annenForelder.mellomnavn,etternavn:l.annenForelder.etternavn}:void 0;if(s.push(l.fnr),d.length===0){if(!U(l)){const O=Ke(l,I);_.push(O)}}else{const O=Pe(l,d,I);d.forEach(g=>{s.push(g.fnr)}),O!==void 0&&_.push(O)}}}),_.map(l=>l.fnr&&l.fnr.length>0?{...l,fnr:l.fnr.filter(d=>d&&!d.startsWith(i))}:l)},be=(a,n)=>{const e=a.filter(s=>!s.sakAvsluttet),t=a.filter(s=>s.sakAvsluttet),i=Ve(e,n),r=Me(n,i,t);return i.concat(r)},ce=(a,n)=>{var i,r;const e=n.filter(s=>s.sak!==void 0&&s.id!==a.id&&s.familiehendelsesdato!==void 0&&o(s.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(w);const t=e[e.length-1];if(t!==void 0)return{familiehendelsesdato:t.familiehendelsesdato,startdatoFørsteStønadsperiode:t.startdatoFørsteStønadsperiode,fnr:t.fnr,annenForelderFnr:(r=(i=t.sak)==null?void 0:i.annenPart)==null?void 0:r.fnr}},w=(a,n)=>o(a.sortableDato).isBefore(n.sortableDato,"d")?1:o(a.sortableDato).isAfter(n.sortableDato,"d")?-1:0,qe=({locale:a,saker:n,onChangeLocale:e,harGodkjentVilkår:t,søkerInfo:i,setHarGodkjentVilkår:r,setErEndringssøknad:s,setSøknadGjelderNyttBarn:u,mellomlagreSøknadOgNaviger:_})=>{const L=c(),k=Y(i.arbeidsforhold,_),l=b(),{oppdaterSøknadIState:d}=ge(),I=C.useMemo(()=>[...be(n,i.søker.barn)].sort(w),[n,i.søker.barn]),O=v=>{if(!v.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",v.harForståttRettigheterOgPlikter);return}r(!0);const m=I.find(T=>T.id===v.valgteBarn);if(m===void 0)return s(!1),u(!0),k.goToNextStep(P.SØKERSITUASJON);const S=ce(m,I);l(R.BARN_FRA_NESTE_SAK,S);const f=!!m.kanSøkeOmEndring?n.find(T=>{var F;return T.saksnummer===((F=m.sak)==null?void 0:F.saksnummer)}):void 0;if(f){const T=ae(f,S==null?void 0:S.startdatoFørsteStønadsperiode,m.fødselsdatoer),F=ne(i.søker,T,L,f.annenPart,m);return d(F,T),s(!0),u(!1),k.goToNextStep(P.UTTAKSPLAN)}if(m.sak!==void 0&&m.kanSøkeOmEndring===!1){const T=re({...m,sak:m.sak},L,i.søker.barn,i.søker.fnr);d(T)}if(!f){const T=te(m);d(T)}return s(!1),u(!1),k.goToNextStep(P.SØKERSITUASJON)},g=z({defaultValues:{harForståttRettigheterOgPlikter:t}}),H=g.watch("valgteBarn"),K=I.find(v=>v.id===H),J=(K==null?void 0:K.kanSøkeOmEndring)===!0?L.formatMessage({id:"velkommen.endreSøknad"}):L.formatMessage({id:"velkommen.begynnMedSøknad"});return E.jsx(W,{formMethods:g,onSubmit:O,children:E.jsxs(p,{gap:"10",children:[E.jsx(oe,{locale:a,availableLocales:["nb","nn"],toggleLanguage:e}),E.jsx(Re,{children:E.jsxs(p,{gap:"8",children:[E.jsx(V,{justify:"center",children:E.jsx(X,{size:"xlarge",children:E.jsx(D,{id:"velkommen.tittel"})})}),E.jsx(de,{poster:!0,children:E.jsxs(p,{gap:"2",children:[E.jsx(D,{id:"velkommen.guidepanel.del1"}),E.jsx(D,{id:"velkommen.guidepanel.del2",values:{a:v=>E.jsx(Z,{rel:"noopener noreferrer",href:le.foreldrepenger,children:v})}})]})}),E.jsx(j,{selectableBarn:I}),E.jsx(Ne,{variant:"info",children:E.jsx(D,{id:"velkommen.lagring.info"})}),E.jsx(Q,{name:"harForståttRettigheterOgPlikter",label:L.formatMessage({id:"velkommen.samtykke"}),validate:[v=>v!==!0?L.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:E.jsx(p,{gap:"5",children:E.jsxs(V,{gap:"1",children:[E.jsx(ee,{children:E.jsx(D,{id:"velkommen.samtykkeIntro.del1"})}),E.jsx(Ie,{})]})})}),E.jsx(V,{justify:"center",children:E.jsx(ke,{type:"submit",variant:"primary",children:J})}),E.jsx(Oe,{})]})})]})})};qe.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    kjønn: 'M' | 'K';
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: string;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{qe as F};
