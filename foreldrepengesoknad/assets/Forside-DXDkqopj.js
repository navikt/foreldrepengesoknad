import{Z as P,aX as H,_ as i,aY as x,aZ as J,a_ as y,a1 as _,J as E,a$ as K,U as Y,k as $,b0 as C,r as z,b1 as Z,ar as W,b2 as X,$ as I,b3 as Q,b4 as ee,b5 as ae,a0 as re,b6 as ne,a5 as q,a6 as te,a7 as le}from"./iframe-Cz5FuZRO.js";import{e as c,C as d}from"./FpDataContext-YJjAZB7E.js";import{n as ie,b as se,S}from"./useFpNavigator-BaO8GNuX.js";import{a as ue,l as oe,b as Ee,c as de}from"./eksisterendeSakUtils-Cxfhh2r7.js";import{l as me,m as ve,n as Re,o as M,I as g,p as Ne,q as V,r as ke,s as p,t as Te,u as ge}from"./annenForelderUtils-BYq7aJ7z.js";import{D as _e}from"./DinePlikter-DCh7n06s.js";import{g as O}from"./guid-CsArkN6i.js";import{D as Ae}from"./DinePersonopplysningerModal-B72uHm1b.js";const fe=()=>{const a=c();return{oppdaterSøknadIState:(e,l)=>{a(d.SØKERSITUASJON,e.søkersituasjon),a(d.OM_BARNET,e.barn),a(d.ANNEN_FORELDER,e.annenForelder),a(d.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(d.FRILANS,e.frilans),a(d.EGEN_NÆRING,e.egenNæring),a(d.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(d.UTENLANDSOPPHOLD,e.utenlandsopphold),a(d.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(d.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(d.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(d.UTTAKSPLAN,e.uttaksplan),a(d.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),l&&a(d.EKSISTERENDE_SAK,l)}}};var v=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(v||{});const De=(a,r)=>a.map(e=>{const l=e.sak!==void 0?B(e.sak.åpenBehandling===void 0,r):void 0,s=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return i.jsx(y,{value:e.id,description:e.sak!==void 0?`${s}, ${l}`:s,children:i.jsx(_,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:Re(e.antallBarn,r),termin:E(e.termindato).format(K),b:t=>i.jsx("b",{children:t})}})},e.id)}),B=(a,r)=>a?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),Le=(a,r)=>a.map(e=>{const l=me(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),s=ve(e.fødselsdatoer),t=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?s:E(e.omsorgsovertagelse).format(K),u=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),o=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",N=e.sak!==void 0?B(e.sak.åpenBehandling===void 0,r):void 0;return i.jsx(y,{value:e.id,description:N?`${o}, ${N}`:o,children:i.jsx("b",{children:e.alleBarnaLever?`${l} ${u} ${t}`:l})},e.id)}),U=({selectableBarn:a})=>{const r=P(),{control:e}=H();if(a.length===0)return null;const l=a.filter(u=>u.type===v.UFØDT),s=a.filter(u=>u.type!==v.UFØDT);let t=[];return s.length>0&&(t=t.concat(Le(s,r))),l.length>0&&(t=t.concat(De(l,r))),i.jsx(x,{name:"valgteBarn",control:e,label:i.jsx(_,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[J(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:t.concat(i.jsx(y,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:i.jsx(_,{id:"omBarnet.gjelderAnnetBarn",values:{b:u=>i.jsx("b",{children:u})}})},"søknad_gjeder_nytt_barn"))})};U.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    rettighetType: RettighetType;
    annenPart?: Person;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: FpVedtak;
    åpenBehandling?: FpÅpenBehandling;
    barn?: Person[];
    dekningsgrad?: DekningsgradSak;
    oppdatertTidspunkt: string;
    forelder?: BrukerRolleSak;
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
    kontoType?: KontoType;
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?: UttakUtsettelseÅrsak;
    oppholdÅrsak?: UttakOppholdÅrsak;
    overføringÅrsak?: UttakOverføringÅrsak;
    gradering?: Gradering;
    morsAktivitet?: MorsAktivitet;
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: BrukerRolleSak;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?: UttakPeriodeResultatÅrsak;
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
    type: AktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: ArbeidsgiverType;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    tilstand: BehandlingTilstand;
    søknadsperioder: UttakPeriode[];
}`,signature:{properties:[{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"}],required:!0}},{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: KontoType;
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?: UttakUtsettelseÅrsak;
    oppholdÅrsak?: UttakOppholdÅrsak;
    overføringÅrsak?: UttakOverføringÅrsak;
    gradering?: Gradering;
    morsAktivitet?: MorsAktivitet;
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: BrukerRolleSak;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?: UttakPeriodeResultatÅrsak;
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
    type: AktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: ArbeidsgiverType;
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
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};E.extend(C);E.extend(ge);const pe=(a,r,e)=>a?v.ADOPTERT:r.fødselsdato!==void 0||e&&e.length>0?v.FØDT:v.UFØDT,Oe=(a,r)=>{const e=a.familiehendelse.termindato;if($(e)){const l=E(e).subtract(17,"week"),s=E(e).add(6,"week");return r.filter(t=>E(t.fødselsdato).isBetween(l,s,"day","[]"))}return[]},Ie=(a,r)=>{const e=g(a.familiehendelse.fødselsdato),l=a.barn!==void 0?a.barn.map(u=>u.fnr).flat():[],s=r.filter(u=>l.includes(u.fnr)),t=e!==void 0?r.filter(u=>M(u.fødselsdato,e)&&!s.find(o=>o.fnr===u.fnr)):[];return s.concat(t)},Se=(a,r)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=Ie(a,r)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=Oe(a,r));const l=g(ke(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),s=pe(a.gjelderAdopsjon,a.familiehendelse,e),t=g(a.familiehendelse.fødselsdato);let u;return e&&e.length>0?u=e.map(o=>E.utc(o.fødselsdato).toDate()):t!==void 0&&(u=Array(a.familiehendelse.antallBarn).fill(t)),{id:O(),type:s,antallBarn:a.familiehendelse.antallBarn,termindato:g(a.familiehendelse.termindato),omsorgsovertagelse:g(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:u,familiehendelsesdato:l,sortableDato:g(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?Y(g(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(o=>o.fornavn!==void 0&&o.fornavn.trim()!=="").map(o=>[o.fornavn,o.mellomnavn!==void 0?o.mellomnavn:""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(o=>o.fnr!==void 0).map(o=>o.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(o=>p(o)):!1}},ye=(a,r)=>{const e=a.mellomnavn!==void 0?[a.fornavn,a.mellomnavn].join(" "):a.fornavn;return{id:O(),type:v.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[E.utc(a.fødselsdato).toDate()],fornavn:e!==void 0?[e]:void 0,fnr:[a.fnr],sortableDato:E.utc(a.fødselsdato).toDate(),alleBarnaLever:p(a),annenForelder:r}},Fe=(a,r,e)=>{const l=[a].concat(r).sort(Te);if(!(l.find(t=>!p(t)&&V(t))||l.length==0))return{id:O(),type:v.IKKE_UTFYLT,antallBarn:l.length,fødselsdatoer:l.map(t=>E.utc(t.fødselsdato).toDate()),fornavn:l.map(t=>[t.fornavn,t.mellomnavn!==void 0?t.mellomnavn:""].join(" ")),fnr:l.map(t=>t.fnr),sortableDato:E.utc(l[0].fødselsdato).toDate(),alleBarnaLever:l.every(t=>p(t)),annenForelder:e}},Ge=(a,r)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Se(e,r)),be=(a,r,e)=>{const l=a.filter(n=>!e.find(m=>M(n.fødselsdato,g(m.familiehendelse.fødselsdato)))),s="tempFnr",t=l.map(n=>n.fnr===void 0?{...n,fnr:s+O().toString()}:n),u=r.map(n=>n.fnr).flat(),o=r.filter(n=>n.fødselsdatoer!==void 0&&n.fødselsdatoer.length>0).map(n=>n.fødselsdatoer).flat(),N=[];return t.filter(n=>!(n.dødsdato!==void 0&&o.find(m=>E(m).isSame(E.utc(n.fødselsdato),"day")))).forEach(n=>{if(!u.includes(n.fnr)&&!ie(n.fødselsdato)){const m=Ne(n.fnr,n.fødselsdato,t),A=n.annenForelder!==void 0?{fnr:n.annenForelder.fnr,fornavn:n.annenForelder.fornavn,mellomnavn:n.annenForelder.mellomnavn,etternavn:n.annenForelder.etternavn}:void 0;if(u.push(n.fnr),m.length===0){if(!V(n)){const f=ye(n,A);N.push(f)}}else{const f=Fe(n,m,A);m.forEach(G=>{u.push(G.fnr)}),f!==void 0&&N.push(f)}}}),N.map(n=>n.fnr&&n.fnr.length>0?{...n,fnr:n.fnr.filter(m=>m&&!m.startsWith(s))}:n)},qe=(a,r)=>{const e=a.filter(u=>!u.sakAvsluttet),l=a.filter(u=>u.sakAvsluttet),s=Ge(e,r),t=be(r,s,l);return s.concat(t)},Pe=(a,r)=>{const e=r.filter(s=>s.sak!==void 0&&s.id!==a.id&&s.familiehendelsesdato!==void 0&&E(s.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(h);const l=e[e.length-1];if(l!==void 0)return{familiehendelsesdato:l.familiehendelsesdato,startdatoFørsteStønadsperiode:l.startdatoFørsteStønadsperiode,fnr:l.fnr,annenForelderFnr:l.sak?.annenPart?.fnr}},h=(a,r)=>E(a.sortableDato).isBefore(r.sortableDato,"d")?1:E(a.sortableDato).isAfter(r.sortableDato,"d")?-1:0,Ke=({saker:a,harGodkjentVilkår:r,søkerInfo:e,setHarGodkjentVilkår:l,setErEndringssøknad:s,setSøknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:u})=>{const o=P(),N=se(e.arbeidsforhold,u),F=c(),{oppdaterSøknadIState:D}=fe(),n=z.useMemo(()=>[...qe(a,e.søker.barn)].sort(h),[a,e.søker.barn]),m=T=>{if(!T.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",T.harForståttRettigheterOgPlikter);return}l(!0);const R=n.find(k=>k.id===T.valgteBarn);if(R===void 0)return s(!1),t(!0),N.goToNextStep(S.SØKERSITUASJON);const b=Pe(R,n);F(d.BARN_FRA_NESTE_SAK,b);const L=!!R.kanSøkeOmEndring?a.find(k=>k.saksnummer===R.sak?.saksnummer):void 0;if(L){const k=ue(L,b?.startdatoFørsteStønadsperiode,R.fødselsdatoer),w=oe(e.søker,k,o,L.annenPart,R);return D(w,k),s(!0),t(!1),N.goToNextStep(S.UTTAKSPLAN)}if(R.sak!==void 0&&R.kanSøkeOmEndring===!1){const k=Ee({...R,sak:R.sak},o,e.søker.barn,e.søker.fnr);D(k)}if(!L){const k=de(R);D(k)}return s(!1),t(!1),N.goToNextStep(S.SØKERSITUASJON)},A=Z({defaultValues:{harForståttRettigheterOgPlikter:r}}),f=A.watch("valgteBarn"),j=n.find(T=>T.id===f)?.kanSøkeOmEndring===!0?o.formatMessage({id:"velkommen.endreSøknad"}):o.formatMessage({id:"velkommen.begynnMedSøknad"});return i.jsx(W,{pageTitle:i.jsx(_,{id:"søknad.pageheading"}),children:i.jsx(X,{formMethods:A,onSubmit:m,children:i.jsxs(I,{gap:"8",children:[i.jsx(Q,{poster:!0,children:i.jsxs(I,{gap:"2",children:[i.jsx(_,{id:"velkommen.guidepanel.del1"}),i.jsx(_,{id:"velkommen.guidepanel.del2",values:{a:T=>i.jsx(ee,{rel:"noopener noreferrer",href:ae.foreldrepenger,children:T})}})]})}),i.jsx(U,{selectableBarn:n}),i.jsx(re,{variant:"info",children:i.jsx(_,{id:"velkommen.lagring.info"})}),i.jsx(ne,{name:"harForståttRettigheterOgPlikter",control:A.control,label:o.formatMessage({id:"velkommen.samtykke"}),validate:[T=>T!==!0?o.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:i.jsx(I,{gap:"5",children:i.jsxs(q,{gap:"1",children:[i.jsx(te,{children:i.jsx(_,{id:"velkommen.samtykkeIntro.del1"})}),i.jsx(_e,{})]})})}),i.jsx(q,{justify:"center",children:i.jsx(le,{type:"submit",variant:"primary",children:j})}),i.jsx(Ae,{})]})})})};Ke.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel?: boolean;
    rettighetType: RettighetType;
    annenPart?: Person;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: FpVedtak;
    åpenBehandling?: FpÅpenBehandling;
    barn?: Person[];
    dekningsgrad?: DekningsgradSak;
    oppdatertTidspunkt: string;
    forelder?: BrukerRolleSak;
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
    kontoType?: KontoType;
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?: UttakUtsettelseÅrsak;
    oppholdÅrsak?: UttakOppholdÅrsak;
    overføringÅrsak?: UttakOverføringÅrsak;
    gradering?: Gradering;
    morsAktivitet?: MorsAktivitet;
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: BrukerRolleSak;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?: UttakPeriodeResultatÅrsak;
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
    type: AktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: ArbeidsgiverType;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}}]},required:!0}}]},required:!1}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
| 'UTDANNING'
| 'KVALPROG'
| 'INTROPROG'
| 'TRENGER_HJELP'
| 'INNLAGT'
| 'ARBEID_OG_UTDANNING'
| 'UFØRE'
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    tilstand: BehandlingTilstand;
    søknadsperioder: UttakPeriode[];
}`,signature:{properties:[{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"}],required:!0}},{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    kontoType?: KontoType;
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?: UttakUtsettelseÅrsak;
    oppholdÅrsak?: UttakOppholdÅrsak;
    overføringÅrsak?: UttakOverføringÅrsak;
    gradering?: Gradering;
    morsAktivitet?: MorsAktivitet;
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: BrukerRolleSak;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?: UttakPeriodeResultatÅrsak;
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
    type: AktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}},{key:"arbeidsgiver",value:{name:"signature",type:"object",raw:`{
    id?: string;
    type?: ArbeidsgiverType;
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
    kjønn: Kjønn;
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
    kjønn: Kjønn;
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
    type?: SivilstandType;
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{Ke as F};
