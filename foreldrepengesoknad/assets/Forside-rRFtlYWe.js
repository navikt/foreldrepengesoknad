import{a3 as K,aW as j,l as i,aX as H,aY as x,aZ as F,M as p,T as u,a_ as b,U as J,a$ as Y,b0 as $,r as C,b1 as z,m as W,b2 as X,V as y,b3 as Z,b4 as Q,b5 as ee,a4 as ae,b6 as re,H as P,B as ne,o as te}from"./iframe-BDCwFLu1.js";import{p as q,C as d,q as le,r as ie,s as se,t as c,I as T,v as oe,w as V,x as Ee,y as A,z as ue,A as de}from"./FpDataContext-BUWCvP_0.js";import{g as L,D as me,d as ve,S as I,E as Re,F as ke,G as Ne,I as _e}from"./useFpNavigator-BX7b09LE.js";import{D as ge}from"./DinePlikter-CnhX8moy.js";import{D as Te}from"./DinePersonopplysningerModal-nD8Ffx1p.js";const pe=()=>{const a=q();return{oppdaterSøknadIState:(e,n)=>{a(d.SØKERSITUASJON,e.søkersituasjon),a(d.OM_BARNET,e.barn),a(d.ANNEN_FORELDER,e.annenForelder),a(d.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(d.FRILANS,e.frilans),a(d.EGEN_NÆRING,e.egenNæring),a(d.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(d.UTENLANDSOPPHOLD,e.utenlandsopphold),a(d.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(d.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(d.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(d.UTTAKSPLAN,e.uttaksplan),a(d.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),n&&a(d.EKSISTERENDE_SAK,n)}}};var v=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(v||{});const fe=(a,r)=>a.map(e=>{const n=e.sak?M(e.sak.åpenBehandling===void 0,r):void 0,s=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return i.jsx(F,{value:e.id,description:e.sak?`${s}, ${n}`:s,children:i.jsx(p,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:se(e.antallBarn,r),termin:u(e.termindato).format(b),b:t=>i.jsx("b",{children:t})}})},e.id)}),M=(a,r)=>a?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),De=(a,r)=>a.map(e=>{const n=le(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),s=ie(e.fødselsdatoer),t=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?s:u(e.omsorgsovertagelse).format(b),o=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),E=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",k=e.sak?M(e.sak.åpenBehandling===void 0,r):void 0;return i.jsx(F,{value:e.id,description:k?`${E}, ${k}`:E,children:i.jsx("b",{children:e.alleBarnaLever?`${n} ${o} ${t}`:n})},e.id)}),B=({selectableBarn:a})=>{const r=K(),{control:e}=j();if(a.length===0)return null;const n=a.filter(o=>o.type===v.UFØDT),s=a.filter(o=>o.type!==v.UFØDT);let t=[];return s.length>0&&(t=t.concat(De(s,r))),n.length>0&&(t=t.concat(fe(n,r))),i.jsx(H,{name:"valgteBarn",control:e,label:i.jsx(p,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[x(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:t.concat(i.jsx(F,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:i.jsx(p,{id:"omBarnet.gjelderAnnetBarn",values:{b:o=>i.jsx("b",{children:o})}})},"søknad_gjeder_nytt_barn"))})};B.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    sak?: FpSak_fpoversikt;
    annenForelder?: AnnenForelderDto_fpoversikt;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"ValgtBarnType",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"sortableDato",value:{name:"Date",required:!0}},{key:"fnr",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"termindato",value:{name:"Date",required:!1}},{key:"fødselsdatoer",value:{name:"Array",elements:[{name:"Date"}],raw:"Date[]",required:!1}},{key:"omsorgsovertagelse",value:{name:"Date",required:!1}},{key:"fornavn",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!1}},{key:"sak",value:{name:"signature",type:"object",raw:`{
    annenPart?: Person_fpoversikt;
    barn?: Person_fpoversikt[];
    dekningsgrad?: DekningsgradSak_fpoversikt;
    familiehendelse: Familiehendelse_fpoversikt;
    forelder: BrukerRolleSak_fpoversikt;
    gjeldendeVedtak?: FpVedtak_fpoversikt;
    gjelderAdopsjon: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    oppdatertTidspunkt: string;
    rettighetType: RettighetType_fpoversikt;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    åpenBehandling?: FpÅpenBehandling_fpoversikt;
    ønskerJustertUttakVedFødsel?: boolean;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    aktørId?: string;
    fnr?: string;
}`,signature:{properties:[{key:"aktørId",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    aktørId?: string;
    fnr?: string;
}`,signature:{properties:[{key:"aktørId",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!1}}]},required:!1}],raw:"Person_fpoversikt[]",required:!1}},{key:"dekningsgrad",value:{name:"union",raw:"'ÅTTI' | 'HUNDRE'",elements:[{name:"literal",value:"'ÅTTI'"},{name:"literal",value:"'HUNDRE'"}],required:!1}},{key:"familiehendelse",value:{name:"signature",type:"object",raw:`{
    antallBarn: number;
    fødselsdato?: string;
    omsorgsovertakelse?: string;
    termindato?: string;
}`,signature:{properties:[{key:"antallBarn",value:{name:"number",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"omsorgsovertakelse",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!1}}]},required:!0}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}},{key:"gjeldendeVedtak",value:{name:"signature",type:"object",raw:`{
    perioder: UttakPeriode_fpoversikt[];
    perioderAnnenpartEøs?: UttakPeriodeAnnenpartEøs_fpoversikt[];
}`,signature:{properties:[{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    flerbarnsdager?: boolean;
    fom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: KontoType_fpoversikt;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}}]},required:!0}},{key:"arbeidstidprosent",value:{name:"number",required:!0}}]},required:!1}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
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
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!0}},{key:"trekkerDager",value:{name:"boolean",required:!0}},{key:"trekkerMinsterett",value:{name:"boolean",required:!0}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!0}}]},required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"tom",value:{name:"string",required:!0}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"perioderAnnenpartEøs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    kontoType: KontoType_fpoversikt;
    tom: string;
    trekkdager: number;
    trekkonto: KontoType_fpoversikt;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkdager",value:{name:"number",required:!0}},{key:"trekkonto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}}]}}],raw:"UttakPeriodeAnnenpartEøs_fpoversikt[]",required:!1}}]},required:!1}},{key:"gjelderAdopsjon",value:{name:"boolean",required:!0}},{key:"harAnnenForelderTilsvarendeRettEØS",value:{name:"boolean",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!0}},{key:"morUføretrygd",value:{name:"boolean",required:!0}},{key:"oppdatertTidspunkt",value:{name:"string",required:!0}},{key:"rettighetType",value:{name:"union",raw:"'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT'",elements:[{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'BEGGE_RETT'"},{name:"literal",value:"'BARE_SØKER_RETT'"}],required:!0}},{key:"sakAvsluttet",value:{name:"boolean",required:!0}},{key:"sakTilhørerMor",value:{name:"boolean",required:!0}},{key:"saksnummer",value:{name:"string",required:!0}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    søknadsperioder: UttakPeriode_fpoversikt[];
    tilstand: BehandlingTilstand_fpoversikt;
}`,signature:{properties:[{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    flerbarnsdager?: boolean;
    fom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: KontoType_fpoversikt;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}}]},required:!0}},{key:"arbeidstidprosent",value:{name:"number",required:!0}}]},required:!1}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
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
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!0}},{key:"trekkerDager",value:{name:"boolean",required:!0}},{key:"trekkerMinsterett",value:{name:"boolean",required:!0}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!0}}]},required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"tom",value:{name:"string",required:!0}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'
| 'PROSESSERER'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"},{name:"literal",value:"'PROSESSERER'"}],required:!0}}]},required:!1}},{key:"ønskerJustertUttakVedFødsel",value:{name:"boolean",required:!1}}]},required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]},required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};u.extend($);u.extend(de);const Ae=(a,r,e)=>a?v.ADOPTERT:r.fødselsdato!==void 0||e&&e.length>0?v.FØDT:v.UFØDT,Le=(a,r)=>{const e=a.familiehendelse.termindato;if(Y(e)){const n=u(e).subtract(17,"week"),s=u(e).add(6,"week");return r.filter(t=>u(t.fødselsdato).isBetween(n,s,"day","[]"))}return[]},Oe=(a,r)=>{const e=T(a.familiehendelse.fødselsdato),n=a.barn?a.barn.flatMap(o=>o.fnr):[],s=r.filter(o=>n.includes(o.fnr)),t=e?r.filter(o=>c(o.fødselsdato,e)&&!s.some(E=>E.fnr===o.fnr)):[];return s.concat(t)},Se=(a,r)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=Oe(a,r)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=Le(a,r));const n=T(Ee(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),s=Ae(a.gjelderAdopsjon,a.familiehendelse,e),t=T(a.familiehendelse.fødselsdato);let o;return e&&e.length>0?o=e.map(E=>u.utc(E.fødselsdato).toDate()):t!==void 0&&(o=new Array(a.familiehendelse.antallBarn).fill(t)),{id:L(),type:s,antallBarn:a.familiehendelse.antallBarn,termindato:T(a.familiehendelse.termindato),omsorgsovertagelse:T(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:o,familiehendelsesdato:n,sortableDato:T(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?J(T(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(E=>E.navn.fornavn!==void 0&&E.navn.fornavn.trim()!=="").map(E=>[E.navn.fornavn,E.navn.mellomnavn??""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(E=>E.fnr!==void 0).map(E=>E.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(E=>A(E)):!1}},ye=(a,r)=>{const e=a.navn.mellomnavn?[a.navn.fornavn,a.navn.mellomnavn].join(" "):a.navn.fornavn;return{id:L(),type:v.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[u.utc(a.fødselsdato).toDate()],fornavn:e?[e]:void 0,fnr:[a.fnr],sortableDato:u.utc(a.fødselsdato).toDate(),alleBarnaLever:A(a),annenForelder:r}},Ie=(a,r,e)=>{const n=[a].concat(r).sort(ue);if(!(n.some(t=>!A(t)&&V(t))||n.length==0))return{id:L(),type:v.IKKE_UTFYLT,antallBarn:n.length,fødselsdatoer:n.map(t=>u.utc(t.fødselsdato).toDate()),fornavn:n.map(t=>[t.navn.fornavn,t.navn.mellomnavn??""].join(" ")),fnr:n.map(t=>t.fnr),sortableDato:u.utc(n[0].fødselsdato).toDate(),alleBarnaLever:n.every(t=>A(t)),annenForelder:e}},Fe=(a,r)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Se(e,r)),Ge=(a,r,e)=>{const n=a.filter(l=>!e.some(m=>c(l.fødselsdato,T(m.familiehendelse.fødselsdato)))),s="tempFnr",t=n.map(l=>l.fnr===void 0?{...l,fnr:s+L().toString()}:l),o=r.flatMap(l=>l.fnr),E=r.filter(l=>l.fødselsdatoer!==void 0&&l.fødselsdatoer.length>0).flatMap(l=>l.fødselsdatoer),k=[],O=t.filter(l=>!(l.dødsdato!==void 0&&E.some(m=>u(m).isSame(u.utc(l.fødselsdato),"day"))));for(const l of O)if(!o.includes(l.fnr)&&!me(l.fødselsdato)){const m=oe(l.fnr,l.fødselsdato,t);if(o.push(l.fnr),m.length===0){if(!V(l)){const g=ye(l,l.annenPart);k.push(g)}}else{const g=Ie(l,m,l.annenPart);for(const S of m)o.push(S.fnr);g!==void 0&&k.push(g)}}return k.map(l=>l.fnr&&l.fnr.length>0?{...l,fnr:l.fnr.filter(m=>m&&!m.startsWith(s))}:l)},Pe=(a,r)=>{const e=a.filter(o=>!o.sakAvsluttet),n=a.filter(o=>o.sakAvsluttet),s=Fe(e,r),t=Ge(r,s,n);return s.concat(t)},Ke=(a,r)=>{const e=r.filter(s=>s.sak!==void 0&&s.id!==a.id&&s.familiehendelsesdato!==void 0&&u(s.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(U);const n=e.at(-1);if(n!==void 0)return{familiehendelsesdato:n.familiehendelsesdato,startdatoFørsteStønadsperiode:n.startdatoFørsteStønadsperiode,fnr:n.fnr,annenForelderFnr:n.sak?.annenPart?.fnr}},U=(a,r)=>u(a.sortableDato).isBefore(r.sortableDato,"d")?1:u(a.sortableDato).isAfter(r.sortableDato,"d")?-1:0,be=({saker:a,harGodkjentVilkår:r,søkerInfo:e,setHarGodkjentVilkår:n,setErEndringssøknad:s,setSøknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:o})=>{const E=K(),k=ve(e.arbeidsforhold,o),O=q(),{oppdaterSøknadIState:f}=pe(),l=C.useMemo(()=>[...Pe(a,e.person.barn)].sort(U),[a,e.person.barn]),m=_=>{if(!_.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",_.harForståttRettigheterOgPlikter);return}n(!0);const R=l.find(N=>N.id===_.valgteBarn);if(R===void 0)return s(!1),t(!0),k.goToNextStep(I.SØKERSITUASJON);const G=Ke(R,l);O(d.BARN_FRA_NESTE_SAK,G);const D=!!R.kanSøkeOmEndring?a.find(N=>N.saksnummer===R.sak?.saksnummer):void 0;if(D){const N=Re(D,G?.startdatoFørsteStønadsperiode,R.fødselsdatoer),w=ke(e.person,N,E,D.annenPart,R);return f(w,N),s(!0),t(!1),k.goToNextStep(I.UTTAKSPLAN)}if(R.sak!==void 0&&R.kanSøkeOmEndring===!1){const N=Ne({...R,sak:R.sak},E,e.person.barn,e.person.fnr);f(N)}if(!D){const N=_e(R);f(N)}return s(!1),t(!1),k.goToNextStep(I.SØKERSITUASJON)},g=z({defaultValues:{harForståttRettigheterOgPlikter:r}}),S=g.watch("valgteBarn"),h=l.find(_=>_.id===S)?.kanSøkeOmEndring===!0?E.formatMessage({id:"velkommen.endreSøknad"}):E.formatMessage({id:"velkommen.begynnMedSøknad"});return i.jsx(W,{pageTitle:i.jsx(p,{id:"søknad.pageheading"}),children:i.jsx(X,{formMethods:g,onSubmit:m,children:i.jsxs(y,{gap:"space-32",children:[i.jsx(Z,{poster:!0,children:i.jsxs(y,{gap:"space-8",children:[i.jsx(p,{id:"velkommen.guidepanel.del1"}),i.jsx(p,{id:"velkommen.guidepanel.del2",values:{a:_=>i.jsx(Q,{rel:"noopener noreferrer",href:ee.foreldrepenger,children:_})}})]})}),i.jsx(B,{selectableBarn:l}),i.jsx(ae,{variant:"info",children:i.jsx(p,{id:"velkommen.lagring.info"})}),i.jsx(re,{name:"harForståttRettigheterOgPlikter",control:g.control,label:E.formatMessage({id:"velkommen.samtykke"}),validate:[_=>_?null:E.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"})],children:i.jsx(y,{gap:"space-20",children:i.jsxs(P,{gap:"space-4",children:[i.jsx(ne,{children:i.jsx(p,{id:"velkommen.samtykkeIntro.del1"})}),i.jsx(ge,{})]})})}),i.jsx(P,{justify:"center",children:i.jsx(te,{type:"submit",variant:"primary",children:h})}),i.jsx(Te,{})]})})})};be.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    annenPart?: Person_fpoversikt;
    barn?: Person_fpoversikt[];
    dekningsgrad?: DekningsgradSak_fpoversikt;
    familiehendelse: Familiehendelse_fpoversikt;
    forelder: BrukerRolleSak_fpoversikt;
    gjeldendeVedtak?: FpVedtak_fpoversikt;
    gjelderAdopsjon: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    oppdatertTidspunkt: string;
    rettighetType: RettighetType_fpoversikt;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    åpenBehandling?: FpÅpenBehandling_fpoversikt;
    ønskerJustertUttakVedFødsel?: boolean;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    aktørId?: string;
    fnr?: string;
}`,signature:{properties:[{key:"aktørId",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    aktørId?: string;
    fnr?: string;
}`,signature:{properties:[{key:"aktørId",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!1}}]},required:!1}],raw:"Person_fpoversikt[]",required:!1}},{key:"dekningsgrad",value:{name:"union",raw:"'ÅTTI' | 'HUNDRE'",elements:[{name:"literal",value:"'ÅTTI'"},{name:"literal",value:"'HUNDRE'"}],required:!1}},{key:"familiehendelse",value:{name:"signature",type:"object",raw:`{
    antallBarn: number;
    fødselsdato?: string;
    omsorgsovertakelse?: string;
    termindato?: string;
}`,signature:{properties:[{key:"antallBarn",value:{name:"number",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"omsorgsovertakelse",value:{name:"string",required:!1}},{key:"termindato",value:{name:"string",required:!1}}]},required:!0}},{key:"forelder",value:{name:"union",raw:"'MOR' | 'FAR_MEDMOR'",elements:[{name:"literal",value:"'MOR'"},{name:"literal",value:"'FAR_MEDMOR'"}],required:!1}},{key:"gjeldendeVedtak",value:{name:"signature",type:"object",raw:`{
    perioder: UttakPeriode_fpoversikt[];
    perioderAnnenpartEøs?: UttakPeriodeAnnenpartEøs_fpoversikt[];
}`,signature:{properties:[{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    flerbarnsdager?: boolean;
    fom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: KontoType_fpoversikt;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}}]},required:!0}},{key:"arbeidstidprosent",value:{name:"number",required:!0}}]},required:!1}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
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
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!0}},{key:"trekkerDager",value:{name:"boolean",required:!0}},{key:"trekkerMinsterett",value:{name:"boolean",required:!0}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!0}}]},required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"tom",value:{name:"string",required:!0}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"perioderAnnenpartEøs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    kontoType: KontoType_fpoversikt;
    tom: string;
    trekkdager: number;
    trekkonto: KontoType_fpoversikt;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkdager",value:{name:"number",required:!0}},{key:"trekkonto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}}]}}],raw:"UttakPeriodeAnnenpartEøs_fpoversikt[]",required:!1}}]},required:!1}},{key:"gjelderAdopsjon",value:{name:"boolean",required:!0}},{key:"harAnnenForelderTilsvarendeRettEØS",value:{name:"boolean",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!0}},{key:"morUføretrygd",value:{name:"boolean",required:!0}},{key:"oppdatertTidspunkt",value:{name:"string",required:!0}},{key:"rettighetType",value:{name:"union",raw:"'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT'",elements:[{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'BEGGE_RETT'"},{name:"literal",value:"'BARE_SØKER_RETT'"}],required:!0}},{key:"sakAvsluttet",value:{name:"boolean",required:!0}},{key:"sakTilhørerMor",value:{name:"boolean",required:!0}},{key:"saksnummer",value:{name:"string",required:!0}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    søknadsperioder: UttakPeriode_fpoversikt[];
    tilstand: BehandlingTilstand_fpoversikt;
}`,signature:{properties:[{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    flerbarnsdager?: boolean;
    fom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: KontoType_fpoversikt;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:"'PRIVAT' | 'ORGANISASJON'",elements:[{name:"literal",value:"'PRIVAT'"},{name:"literal",value:"'ORGANISASJON'"}],required:!1}}]},required:!1}},{key:"arbeidsgiverNavn",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET'",elements:[{name:"literal",value:"'FRILANS'"},{name:"literal",value:"'ORDINÆRT_ARBEID'"},{name:"literal",value:"'SELVSTENDIG_NÆRINGSDRIVENDE'"},{name:"literal",value:"'ANNET'"}],required:!0}}]},required:!0}},{key:"arbeidstidprosent",value:{name:"number",required:!0}}]},required:!1}},{key:"kontoType",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"morsAktivitet",value:{name:"union",raw:`| 'ARBEID'
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
| 'IKKE_RETT_ANNEN_FORELDER'
| 'ALENEOMSORG'`,elements:[{name:"literal",value:"'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'"},{name:"literal",value:"'SYKDOM_ANNEN_FORELDER'"},{name:"literal",value:"'IKKE_RETT_ANNEN_FORELDER'"},{name:"literal",value:"'ALENEOMSORG'"}],required:!1}},{key:"resultat",value:{name:"signature",type:"object",raw:`{
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}`,signature:{properties:[{key:"innvilget",value:{name:"boolean",required:!0}},{key:"trekkerDager",value:{name:"boolean",required:!0}},{key:"trekkerMinsterett",value:{name:"boolean",required:!0}},{key:"årsak",value:{name:"union",raw:`| 'ANNET'
| 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
| 'AVSLAG_FRATREKK_PLEIEPENGER'
| 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
| 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'`,elements:[{name:"literal",value:"'ANNET'"},{name:"literal",value:"'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'"},{name:"literal",value:"'AVSLAG_FRATREKK_PLEIEPENGER'"},{name:"literal",value:"'AVSLAG_UTSETTELSE_TILBAKE_I_TID'"},{name:"literal",value:"'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID'"}],required:!0}}]},required:!1}},{key:"samtidigUttak",value:{name:"number",required:!1}},{key:"tom",value:{name:"string",required:!0}},{key:"utsettelseÅrsak",value:{name:"union",raw:`| 'HV_ØVELSE'
| 'ARBEID'
| 'LOVBESTEMT_FERIE'
| 'SØKER_SYKDOM'
| 'SØKER_INNLAGT'
| 'BARN_INNLAGT'
| 'NAV_TILTAK'
| 'FRI'`,elements:[{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'NAV_TILTAK'"},{name:"literal",value:"'FRI'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
| 'VENT_TIDLIG_SØKNAD'
| 'VENT_MELDEKORT'
| 'VENT_DOKUMENTASJON'
| 'VENT_INNTEKTSMELDING'
| 'PROSESSERER'`,elements:[{name:"literal",value:"'UNDER_BEHANDLING'"},{name:"literal",value:"'VENT_TIDLIG_SØKNAD'"},{name:"literal",value:"'VENT_MELDEKORT'"},{name:"literal",value:"'VENT_DOKUMENTASJON'"},{name:"literal",value:"'VENT_INNTEKTSMELDING'"},{name:"literal",value:"'PROSESSERER'"}],required:!0}}]},required:!1}},{key:"ønskerJustertUttakVedFødsel",value:{name:"boolean",required:!1}}]}}],raw:"FpSak_fpoversikt[]"},description:""},harGodkjentVilkår:{required:!0,tsType:{name:"boolean"},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    person: PersonDto_fpoversikt;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]",required:!0}},{key:"person",value:{name:"signature",type:"object",raw:`{
    aktørid?: string;
    bankkonto?: Bankkonto_fpoversikt;
    barn: BarnDto_fpoversikt[];
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    målform?: Målform_fpoversikt;
    navn: Navn_fpoversikt;
    sivilstand?: Sivilstand_fpoversikt;
}`,signature:{properties:[{key:"aktørid",value:{name:"string",required:!1}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    banknavn?: string;
    kontonummer?: string;
}`,signature:{properties:[{key:"banknavn",value:{name:"string",required:!1}},{key:"kontonummer",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    annenPart?: AnnenForelderDto_fpoversikt;
    dødsdato?: string;
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]},required:!1}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]}}],raw:"BarnDto_fpoversikt[]",required:!0}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"målform",value:{name:"union",raw:"'NB' | 'NN' | 'EN' | 'E'",elements:[{name:"literal",value:"'NB'"},{name:"literal",value:"'NN'"},{name:"literal",value:"'EN'"},{name:"literal",value:"'E'"}],required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?: SivilstandType_fpoversikt;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{be as F};
