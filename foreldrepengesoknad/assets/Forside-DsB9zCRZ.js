import{j as E}from"./jsx-runtime-CLpGMVip.js";import{b as c,C as o}from"./FpDataContext-DWIUkGg8.js";import{e as x,a as Y,S as P}from"./useFpNavigator-B_YX3Tec.js";import{r as C}from"./index-DI2V0i71.js";import{b as $,c as M,u as z,R as W,g as Q}from"./ErrorSummaryHookForm-CYPq3U0u.js";import{u as b,M as D,H as X,b as Z}from"./List-CllE7Dzf.js";import{m as ee,l as ne,a as ae,b as re}from"./eksisterendeSakUtils-Dbo3DbIM.js";import{d,e as q,l as te}from"./dates-AkG-ZPn6.js";import{i as le,G as Ee,U as ie,H as se,L as ue,C as de,J as oe,E as Re}from"./Uttaksplan-D_PrSMFM.js";import{b as Ne,c as me,d as Te,t as _e,e as B,I as A,h as ve,i as U,j as Ae,k as G,s as De}from"./barnUtils-DJoHF4pO.js";import{D as Le}from"./DinePlikter-vEuxPBWy.js";import{g as y}from"./guid-CsArkN6i.js";import{D as Ie}from"./DinePersonopplysningerModal-5l-eiltS.js";import{V as p,H as V,B as Oe}from"./VStack-CblYb0Xi.js";const ke=()=>{const n=c();return{oppdaterSøknadIState:(e,t)=>{n(o.SØKERSITUASJON,e.søkersituasjon),n(o.OM_BARNET,e.barn),n(o.ANNEN_FORELDER,e.annenForelder),n(o.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),n(o.FRILANS,e.frilans),n(o.EGEN_NÆRING,e.egenNæring),n(o.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),n(o.UTENLANDSOPPHOLD,e.utenlandsopphold),n(o.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),n(o.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),n(o.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),n(o.UTTAKSPLAN,e.uttaksplan),n(o.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),t&&n(o.EKSISTERENDE_SAK,t)}}};var N=(n=>(n.FØDT="født",n.UFØDT="ufødt",n.ADOPTERT="adoptert",n.IKKE_UTFYLT="ikkeUtfylt",n))(N||{});const ge=(n,a)=>n.map(e=>{const t=e.sak!==void 0?h(e.sak.åpenBehandling===void 0,a):void 0,i=e.sak!==void 0?a.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return E.jsx(M,{value:e.id,description:e.sak!==void 0?`${i}, ${t}`:i,children:E.jsx(D,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:Ne(e.antallBarn,a),termin:d(e.termindato).format(q),b:r=>E.jsx("b",{children:r})}})},e.id)}),h=(n,a)=>n?a.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):a.formatMessage({id:"velkommen.sak.status.underBehandling"}),fe=(n,a)=>n.map(e=>{const t=me(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,a),i=Te(e.fødselsdatoer),r=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?i:d(e.omsorgsovertagelse).format(q),s=e.type===N.FØDT||e.type===N.IKKE_UTFYLT?a.formatMessage({id:"velkommen.barnVelger.født"}):a.formatMessage({id:"velkommen.barnVelger.adopsjon"}),u=e.sak!==void 0?a.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",v=e.sak!==void 0?h(e.sak.åpenBehandling===void 0,a):void 0;return E.jsx(M,{value:e.id,description:v?`${u}, ${v}`:u,children:E.jsx("b",{children:e.alleBarnaLever?`${t} ${s} ${r}`:t})},e.id)}),j=({selectableBarn:n})=>{const a=b();if(n.length===0)return null;const e=n.filter(r=>r.type===N.UFØDT),t=n.filter(r=>r.type!==N.UFØDT);let i=[];return t.length>0&&(i=i.concat(fe(t,a))),e.length>0&&(i=i.concat(ge(e,a))),E.jsx($,{name:"valgteBarn",label:E.jsx(D,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[le(a.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:i.concat(E.jsx(M,{value:"søknad_gjeder_nytt_barn",description:a.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:E.jsx(D,{id:"omBarnet.gjelderAnnetBarn",values:{b:r=>E.jsx("b",{children:r})}})},"søknad_gjeder_nytt_barn"))})};j.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};d.extend(Ee);d.extend(_e);const Se=(n,a,e)=>n?N.ADOPTERT:a.fødselsdato!==void 0||e&&e.length>0?N.FØDT:N.UFØDT,Fe=(n,a)=>{const e=n.familiehendelse.termindato;if(se(e)){const t=d(e).subtract(17,"week"),i=d(e).add(6,"week");return a.filter(r=>d(r.fødselsdato).isBetween(t,i,"day","[]"))}return[]},pe=(n,a)=>{const e=A(n.familiehendelse.fødselsdato),t=n.barn!==void 0?n.barn.map(s=>s.fnr).flat():[],i=a.filter(s=>t.includes(s.fnr)),r=e!==void 0?a.filter(s=>B(s.fødselsdato,e)&&!i.find(u=>u.fnr===s.fnr)):[];return i.concat(r)},Ge=(n,a)=>{let e;(n.barn||n.familiehendelse.fødselsdato)&&(e=pe(n,a)),n.familiehendelse.termindato&&!n.familiehendelse.fødselsdato&&!n.barn&&(e=Fe(n,a));const t=A(Ae(n.familiehendelse.termindato,n.familiehendelse.fødselsdato,n.familiehendelse.omsorgsovertakelse)),i=Se(n.gjelderAdopsjon,n.familiehendelse,e),r=A(n.familiehendelse.fødselsdato);let s;return e&&e.length>0?s=e.map(u=>d.utc(u.fødselsdato).toDate()):r!==void 0&&(s=Array(n.familiehendelse.antallBarn).fill(r)),{id:y(),type:i,antallBarn:n.familiehendelse.antallBarn,termindato:A(n.familiehendelse.termindato),omsorgsovertagelse:A(n.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:n.kanSøkeOmEndring,sak:n,fødselsdatoer:s,familiehendelsesdato:t,sortableDato:A(n.familiehendelse.termindato),startdatoFørsteStønadsperiode:n.gjeldendeVedtak!==void 0&&n.gjeldendeVedtak.perioder.length>0?ie(A(n.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(u=>u.fornavn!==void 0&&u.fornavn.trim()!=="").map(u=>[u.fornavn,u.mellomnavn!==void 0?u.mellomnavn:""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(u=>u.fnr!==void 0).map(u=>u.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(u=>G(u)):!1}},ye=(n,a)=>{const e=n.mellomnavn!==void 0?[n.fornavn,n.mellomnavn].join(" "):n.fornavn;return{id:y(),type:N.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[d.utc(n.fødselsdato).toDate()],fornavn:e!==void 0?[e]:void 0,fnr:[n.fnr],sortableDato:d.utc(n.fødselsdato).toDate(),alleBarnaLever:G(n),annenForelder:a}},Ke=(n,a,e)=>{const t=[n].concat(a).sort(De);if(!(t.find(r=>!G(r)&&U(r))||t.length==0))return{id:y(),type:N.IKKE_UTFYLT,antallBarn:t.length,fødselsdatoer:t.map(r=>d.utc(r.fødselsdato).toDate()),fornavn:t.map(r=>[r.fornavn,r.mellomnavn!==void 0?r.mellomnavn:""].join(" ")),fnr:t.map(r=>r.fnr),sortableDato:d.utc(t[0].fødselsdato).toDate(),alleBarnaLever:t.every(r=>G(r)),annenForelder:e}},Pe=(n,a)=>n.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Ge(e,a)),Ve=(n,a,e)=>{const t=n.filter(l=>!e.find(R=>B(l.fødselsdato,A(R.familiehendelse.fødselsdato)))),i="tempFnr",r=t.map(l=>l.fnr===void 0?{...l,fnr:i+y().toString()}:l),s=a.map(l=>l.fnr).flat(),u=a.filter(l=>l.fødselsdatoer!==void 0&&l.fødselsdatoer.length>0).map(l=>l.fødselsdatoer).flat(),v=[];return r.filter(l=>!(l.dødsdato!==void 0&&u.find(R=>d(R).isSame(d.utc(l.fødselsdato),"day")))).forEach(l=>{if(!s.includes(l.fnr)&&!x(l.fødselsdato)){const R=ve(l.fnr,l.fødselsdato,r),I=l.annenForelder!==void 0?{fnr:l.annenForelder.fnr,fornavn:l.annenForelder.fornavn,mellomnavn:l.annenForelder.mellomnavn,etternavn:l.annenForelder.etternavn}:void 0;if(s.push(l.fnr),R.length===0){if(!U(l)){const O=ye(l,I);v.push(O)}}else{const O=Ke(l,R,I);R.forEach(g=>{s.push(g.fnr)}),O!==void 0&&v.push(O)}}}),v.map(l=>l.fnr&&l.fnr.length>0?{...l,fnr:l.fnr.filter(R=>R&&!R.startsWith(i))}:l)},Me=(n,a)=>{const e=n.filter(s=>!s.sakAvsluttet),t=n.filter(s=>s.sakAvsluttet),i=Pe(e,a),r=Ve(a,i,t);return i.concat(r)},ce=(n,a)=>{var i,r;const e=a.filter(s=>s.sak!==void 0&&s.id!==n.id&&s.familiehendelsesdato!==void 0&&d(s.familiehendelsesdato).isAfter(n.familiehendelsesdato,"day"));e.sort(w);const t=e[e.length-1];if(t!==void 0)return{familiehendelsesdato:t.familiehendelsesdato,startdatoFørsteStønadsperiode:t.startdatoFørsteStønadsperiode,fnr:t.fnr,annenForelderFnr:(r=(i=t.sak)==null?void 0:i.annenPart)==null?void 0:r.fnr}},w=(n,a)=>d(n.sortableDato).isBefore(a.sortableDato,"d")?1:d(n.sortableDato).isAfter(a.sortableDato,"d")?-1:0,be=({locale:n,saker:a,onChangeLocale:e,harGodkjentVilkår:t,søkerInfo:i,setHarGodkjentVilkår:r,setErEndringssøknad:s,setSøknadGjelderNyttBarn:u,mellomlagreSøknadOgNaviger:v})=>{const L=b(),k=Y(i.arbeidsforhold,v),l=c(),{oppdaterSøknadIState:R}=ke(),I=C.useMemo(()=>[...Me(a,i.søker.barn)].sort(w),[a,i.søker.barn]),O=_=>{if(!_.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",_.harForståttRettigheterOgPlikter);return}r(!0);const m=I.find(T=>T.id===_.valgteBarn);if(m===void 0)return s(!1),u(!0),k.goToNextStep(P.SØKERSITUASJON);const f=ce(m,I);l(o.BARN_FRA_NESTE_SAK,f);const S=!!m.kanSøkeOmEndring?a.find(T=>{var F;return T.saksnummer===((F=m.sak)==null?void 0:F.saksnummer)}):void 0;if(S){const T=ee(S,f==null?void 0:f.startdatoFørsteStønadsperiode,m.fødselsdatoer),F=ne(i.søker,T,L,S.annenPart,m);return R(F,T),s(!0),u(!1),k.goToNextStep(P.UTTAKSPLAN)}if(m.sak!==void 0&&m.kanSøkeOmEndring===!1){const T=ae({...m,sak:m.sak},L,i.søker.barn,i.søker.fnr);R(T)}if(!S){const T=re(m);R(T)}return s(!1),u(!1),k.goToNextStep(P.SØKERSITUASJON)},g=z({defaultValues:{harForståttRettigheterOgPlikter:t}}),H=g.watch("valgteBarn"),K=I.find(_=>_.id===H),J=(K==null?void 0:K.kanSøkeOmEndring)===!0?L.formatMessage({id:"velkommen.endreSøknad"}):L.formatMessage({id:"velkommen.begynnMedSøknad"});return E.jsx(W,{formMethods:g,onSubmit:O,children:E.jsxs(p,{gap:"10",children:[E.jsx(ue,{locale:n,availableLocales:["nb","nn"],toggleLanguage:e}),E.jsx(de,{children:E.jsxs(p,{gap:"8",children:[E.jsx(V,{justify:"center",children:E.jsx(X,{size:"xlarge",children:E.jsx(D,{id:"velkommen.tittel"})})}),E.jsx(oe,{poster:!0,children:E.jsxs(p,{gap:"2",children:[E.jsx(D,{id:"velkommen.guidepanel.del1"}),E.jsx(D,{id:"velkommen.guidepanel.del2",values:{a:_=>E.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:te.foreldrepenger,children:_})}})]})}),E.jsx(j,{selectableBarn:I}),E.jsx(Re,{variant:"info",children:E.jsx(D,{id:"velkommen.lagring.info"})}),E.jsx(Q,{name:"harForståttRettigheterOgPlikter",label:L.formatMessage({id:"velkommen.samtykke"}),validate:[_=>_!==!0?L.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:E.jsx(p,{gap:"5",children:E.jsxs(V,{gap:"1",children:[E.jsx(Z,{children:E.jsx(D,{id:"velkommen.samtykkeIntro.del1"})}),E.jsx(Le,{})]})})}),E.jsx(V,{justify:"center",children:E.jsx(Oe,{type:"submit",variant:"primary",children:J})}),E.jsx(Ie,{})]})})]})})};be.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{be as F};
