import{W as b,aW as H,X as i,aX as x,aY as J,aZ as F,$ as _,H as o,a_ as q,U as Y,a$ as $,b0 as C,r as W,b1 as z,ap as X,b2 as Z,Z as S,b3 as Q,b4 as ee,b5 as ae,_ as re,b6 as ne,a3 as K,a4 as te,a5 as le}from"./iframe-1izrllO-.js";import{e as c,C as d}from"./FpDataContext-CzRJELeu.js";import{n as ie,b as se,S as y}from"./useFpNavigator-BiDIuJIZ.js";import{g as p,b as Ee,l as ue,c as oe,d as de}from"./eksisterendeSakUtils-DCC4dl4Q.js";import{l as me,m as Re,n as ve,o as V,I as T,p as Ne,q as M,r as ke,s as O,t as ge,u as Te}from"./annenForelderUtils-DVugfc9c.js";import{D as _e}from"./DinePlikter-CilU7IOF.js";import{D as Ae}from"./DinePersonopplysningerModal-DvmFDRxX.js";const De=()=>{const a=c();return{oppdaterSøknadIState:(e,t)=>{a(d.SØKERSITUASJON,e.søkersituasjon),a(d.OM_BARNET,e.barn),a(d.ANNEN_FORELDER,e.annenForelder),a(d.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(d.FRILANS,e.frilans),a(d.EGEN_NÆRING,e.egenNæring),a(d.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(d.UTENLANDSOPPHOLD,e.utenlandsopphold),a(d.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(d.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(d.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(d.UTTAKSPLAN,e.uttaksplan),a(d.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),t&&a(d.EKSISTERENDE_SAK,t)}}};var R=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(R||{});const fe=(a,r)=>a.map(e=>{const t=e.sak?B(e.sak.åpenBehandling===void 0,r):void 0,s=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return i.jsx(F,{value:e.id,description:e.sak?`${s}, ${t}`:s,children:i.jsx(_,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:ve(e.antallBarn,r),termin:o(e.termindato).format(q),b:l=>i.jsx("b",{children:l})}})},e.id)}),B=(a,r)=>a?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),Le=(a,r)=>a.map(e=>{const t=me(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),s=Re(e.fødselsdatoer),l=e.type===R.FØDT||e.type===R.IKKE_UTFYLT?s:o(e.omsorgsovertagelse).format(q),E=e.type===R.FØDT||e.type===R.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),u=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",N=e.sak?B(e.sak.åpenBehandling===void 0,r):void 0;return i.jsx(F,{value:e.id,description:N?`${u}, ${N}`:u,children:i.jsx("b",{children:e.alleBarnaLever?`${t} ${E} ${l}`:t})},e.id)}),U=({selectableBarn:a})=>{const r=b(),{control:e}=H();if(a.length===0)return null;const t=a.filter(E=>E.type===R.UFØDT),s=a.filter(E=>E.type!==R.UFØDT);let l=[];return s.length>0&&(l=l.concat(Le(s,r))),t.length>0&&(l=l.concat(fe(t,r))),i.jsx(x,{name:"valgteBarn",control:e,label:i.jsx(_,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[J(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:l.concat(i.jsx(F,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:i.jsx(_,{id:"omBarnet.gjelderAnnetBarn",values:{b:E=>i.jsx("b",{children:E})}})},"søknad_gjeder_nytt_barn"))})};U.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioderAnnenpartEøs?: UttakPeriodeAnnenpartEøs[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
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
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}},{key:"perioderAnnenpartEøs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    trekkonto: KontoType;
    kontoType: KontoType;
    trekkdager: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkonto",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"trekkdager",value:{name:"number",required:!0}}]}}],raw:"UttakPeriodeAnnenpartEøs[]",required:!1}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};o.extend(C);o.extend(Te);const Oe=(a,r,e)=>a?R.ADOPTERT:r.fødselsdato!==void 0||e&&e.length>0?R.FØDT:R.UFØDT,pe=(a,r)=>{const e=a.familiehendelse.termindato;if($(e)){const t=o(e).subtract(17,"week"),s=o(e).add(6,"week");return r.filter(l=>o(l.fødselsdato).isBetween(t,s,"day","[]"))}return[]},Ie=(a,r)=>{const e=T(a.familiehendelse.fødselsdato),t=a.barn?a.barn.flatMap(E=>E.fnr):[],s=r.filter(E=>t.includes(E.fnr)),l=e?r.filter(E=>V(E.fødselsdato,e)&&!s.some(u=>u.fnr===E.fnr)):[];return s.concat(l)},Se=(a,r)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=Ie(a,r)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=pe(a,r));const t=T(ke(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),s=Oe(a.gjelderAdopsjon,a.familiehendelse,e),l=T(a.familiehendelse.fødselsdato);let E;return e&&e.length>0?E=e.map(u=>o.utc(u.fødselsdato).toDate()):l!==void 0&&(E=new Array(a.familiehendelse.antallBarn).fill(l)),{id:p(),type:s,antallBarn:a.familiehendelse.antallBarn,termindato:T(a.familiehendelse.termindato),omsorgsovertagelse:T(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:E,familiehendelsesdato:t,sortableDato:T(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?Y(T(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(u=>u.fornavn!==void 0&&u.fornavn.trim()!=="").map(u=>[u.fornavn,u.mellomnavn??""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(u=>u.fnr!==void 0).map(u=>u.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(u=>O(u)):!1}},ye=(a,r)=>{const e=a.mellomnavn?[a.fornavn,a.mellomnavn].join(" "):a.fornavn;return{id:p(),type:R.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[o.utc(a.fødselsdato).toDate()],fornavn:e?[e]:void 0,fnr:[a.fnr],sortableDato:o.utc(a.fødselsdato).toDate(),alleBarnaLever:O(a),annenForelder:r}},Fe=(a,r,e)=>{const t=[a].concat(r).sort(ge);if(!(t.some(l=>!O(l)&&M(l))||t.length==0))return{id:p(),type:R.IKKE_UTFYLT,antallBarn:t.length,fødselsdatoer:t.map(l=>o.utc(l.fødselsdato).toDate()),fornavn:t.map(l=>[l.fornavn,l.mellomnavn??""].join(" ")),fnr:t.map(l=>l.fnr),sortableDato:o.utc(t[0].fødselsdato).toDate(),alleBarnaLever:t.every(l=>O(l)),annenForelder:e}},Ge=(a,r)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Se(e,r)),Pe=(a,r,e)=>{const t=a.filter(n=>!e.some(m=>V(n.fødselsdato,T(m.familiehendelse.fødselsdato)))),s="tempFnr",l=t.map(n=>n.fnr===void 0?{...n,fnr:s+p().toString()}:n),E=r.flatMap(n=>n.fnr),u=r.filter(n=>n.fødselsdatoer!==void 0&&n.fødselsdatoer.length>0).flatMap(n=>n.fødselsdatoer),N=[],I=l.filter(n=>!(n.dødsdato!==void 0&&u.some(m=>o(m).isSame(o.utc(n.fødselsdato),"day"))));for(const n of I)if(!E.includes(n.fnr)&&!ie(n.fødselsdato)){const m=Ne(n.fnr,n.fødselsdato,l),A=n.annenForelder?{fnr:n.annenForelder.fnr,fornavn:n.annenForelder.fornavn,mellomnavn:n.annenForelder.mellomnavn,etternavn:n.annenForelder.etternavn}:void 0;if(E.push(n.fnr),m.length===0){if(!M(n)){const D=ye(n,A);N.push(D)}}else{const D=Fe(n,m,A);for(const G of m)E.push(G.fnr);D!==void 0&&N.push(D)}}return N.map(n=>n.fnr&&n.fnr.length>0?{...n,fnr:n.fnr.filter(m=>m&&!m.startsWith(s))}:n)},Ke=(a,r)=>{const e=a.filter(E=>!E.sakAvsluttet),t=a.filter(E=>E.sakAvsluttet),s=Ge(e,r),l=Pe(r,s,t);return s.concat(l)},be=(a,r)=>{const e=r.filter(s=>s.sak!==void 0&&s.id!==a.id&&s.familiehendelsesdato!==void 0&&o(s.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(h);const t=e.at(-1);if(t!==void 0)return{familiehendelsesdato:t.familiehendelsesdato,startdatoFørsteStønadsperiode:t.startdatoFørsteStønadsperiode,fnr:t.fnr,annenForelderFnr:t.sak?.annenPart?.fnr}},h=(a,r)=>o(a.sortableDato).isBefore(r.sortableDato,"d")?1:o(a.sortableDato).isAfter(r.sortableDato,"d")?-1:0,qe=({saker:a,harGodkjentVilkår:r,søkerInfo:e,setHarGodkjentVilkår:t,setErEndringssøknad:s,setSøknadGjelderNyttBarn:l,mellomlagreSøknadOgNaviger:E})=>{const u=b(),N=se(e.arbeidsforhold,E),I=c(),{oppdaterSøknadIState:f}=De(),n=W.useMemo(()=>[...Ke(a,e.søker.barn)].sort(h),[a,e.søker.barn]),m=g=>{if(!g.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",g.harForståttRettigheterOgPlikter);return}t(!0);const v=n.find(k=>k.id===g.valgteBarn);if(v===void 0)return s(!1),l(!0),N.goToNextStep(y.SØKERSITUASJON);const P=be(v,n);I(d.BARN_FRA_NESTE_SAK,P);const L=!!v.kanSøkeOmEndring?a.find(k=>k.saksnummer===v.sak?.saksnummer):void 0;if(L){const k=Ee(L,P?.startdatoFørsteStønadsperiode,v.fødselsdatoer),j=ue(e.søker,k,u,L.annenPart,v);return f(j,k),s(!0),l(!1),N.goToNextStep(y.UTTAKSPLAN)}if(v.sak!==void 0&&v.kanSøkeOmEndring===!1){const k=oe({...v,sak:v.sak},u,e.søker.barn,e.søker.fnr);f(k)}if(!L){const k=de(v);f(k)}return s(!1),l(!1),N.goToNextStep(y.SØKERSITUASJON)},A=z({defaultValues:{harForståttRettigheterOgPlikter:r}}),D=A.watch("valgteBarn"),w=n.find(g=>g.id===D)?.kanSøkeOmEndring===!0?u.formatMessage({id:"velkommen.endreSøknad"}):u.formatMessage({id:"velkommen.begynnMedSøknad"});return i.jsx(X,{pageTitle:i.jsx(_,{id:"søknad.pageheading"}),children:i.jsx(Z,{formMethods:A,onSubmit:m,children:i.jsxs(S,{gap:"space-32",children:[i.jsx(Q,{poster:!0,children:i.jsxs(S,{gap:"space-8",children:[i.jsx(_,{id:"velkommen.guidepanel.del1"}),i.jsx(_,{id:"velkommen.guidepanel.del2",values:{a:g=>i.jsx(ee,{rel:"noopener noreferrer",href:ae.foreldrepenger,children:g})}})]})}),i.jsx(U,{selectableBarn:n}),i.jsx(re,{variant:"info",children:i.jsx(_,{id:"velkommen.lagring.info"})}),i.jsx(ne,{name:"harForståttRettigheterOgPlikter",control:A.control,label:u.formatMessage({id:"velkommen.samtykke"}),validate:[g=>g?null:u.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"})],children:i.jsx(S,{gap:"space-20",children:i.jsxs(K,{gap:"space-4",children:[i.jsx(te,{children:i.jsx(_,{id:"velkommen.samtykkeIntro.del1"})}),i.jsx(_e,{})]})})}),i.jsx(K,{justify:"center",children:i.jsx(le,{type:"submit",variant:"primary",children:w})}),i.jsx(Ae,{})]})})})};qe.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioderAnnenpartEøs?: UttakPeriodeAnnenpartEøs[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
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
| 'IKKE_OPPGITT'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'UTDANNING'"},{name:"literal",value:"'KVALPROG'"},{name:"literal",value:"'INTROPROG'"},{name:"literal",value:"'TRENGER_HJELP'"},{name:"literal",value:"'INNLAGT'"},{name:"literal",value:"'ARBEID_OG_UTDANNING'"},{name:"literal",value:"'UFØRE'"},{name:"literal",value:"'IKKE_OPPGITT'"}],required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"flerbarnsdager",value:{name:"boolean",required:!1}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}}]}}],raw:"UttakPeriode[]",required:!0}},{key:"perioderAnnenpartEøs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    trekkonto: KontoType;
    kontoType: KontoType;
    trekkdager: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkonto",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"trekkdager",value:{name:"number",required:!0}}]}}],raw:"UttakPeriodeAnnenpartEøs[]",required:!1}}]},required:!1}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:"'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL'",elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{qe as F};
