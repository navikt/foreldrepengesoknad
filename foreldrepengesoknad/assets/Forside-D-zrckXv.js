import{a5 as b,a$ as w,l as i,b0 as x,b1 as H,b2 as F,M as p,W as u,b3 as G,X as J,b4 as Y,b5 as $,b6 as C,r as z,b7 as W,m as X,b8 as Q,V as O,b9 as Z,ba as ee,bb as ae,a6 as re,bc as ne,H as P,B as te,o as le}from"./iframe-CYRyeYZG.js";import{p as K,C as E,q as ie,r as se,s as oe,t as h,I as N,v as de,w as q,x as ue,y as D,z as Ee}from"./FpDataContext-5I4LczUc.js";import{g as S,C as me,d as ve,S as I,D as ke,E as Re,F as fe,G as ge}from"./useFpNavigator-BE7lOU3L.js";import{D as _e}from"./DinePlikter-DsITxAu_.js";import{D as Ne}from"./DinePersonopplysningerModal-CFsaI0xK.js";const pe=()=>{const a=K();return{oppdaterSøknadIState:(e,n)=>{a(E.SØKERSITUASJON,e.søkersituasjon),a(E.OM_BARNET,e.barn),a(E.ANNEN_FORELDER,e.annenForelder),a(E.ARBEIDSFORHOLD_OG_INNTEKT,e.arbeidsforholdOgInntekt),a(E.FRILANS,e.frilans),a(E.EGEN_NÆRING,e.egenNæring),a(E.ANDRE_INNTEKTSKILDER,e.andreInntektskilder),a(E.UTENLANDSOPPHOLD,e.utenlandsopphold),a(E.UTENLANDSOPPHOLD_TIDLIGERE,e.utenlandsoppholdSiste12Mnd),a(E.UTENLANDSOPPHOLD_SENERE,e.utenlandsoppholdNeste12Mnd),a(E.PERIODE_MED_FORELDREPENGER,e.dekningsgrad),a(E.UTTAKSPLAN,e.uttaksplan),a(E.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),n&&a(E.EKSISTERENDE_SAK,n)}}};var v=(a=>(a.FØDT="født",a.UFØDT="ufødt",a.ADOPTERT="adoptert",a.IKKE_UTFYLT="ikkeUtfylt",a))(v||{});const Te=(a,r)=>a.map(e=>{const n=e.sak?M(e.sak.åpenBehandling===void 0,r):void 0,s=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return i.jsx(F,{value:e.id,description:e.sak?`${s}, ${n}`:s,children:i.jsx(p,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:oe(e.antallBarn,r),termin:u(e.termindato).format(G),b:t=>i.jsx("b",{children:t})}})},e.id)}),M=(a,r)=>a?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),Ae=(a,r)=>a.map(e=>{const n=ie(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),s=se(e.fødselsdatoer),t=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?s:u(e.omsorgsovertagelse).format(G),o=e.type===v.FØDT||e.type===v.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),d=e.sak?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",R=e.sak?M(e.sak.åpenBehandling===void 0,r):void 0;return i.jsx(F,{value:e.id,description:R?`${d}, ${R}`:d,children:i.jsx("b",{children:e.alleBarnaLever?`${n} ${o} ${t}`:n})},e.id)}),B=({selectableBarn:a})=>{const r=b(),{control:e}=w();if(a.length===0)return null;const n=a.filter(o=>o.type===v.UFØDT),s=a.filter(o=>o.type!==v.UFØDT);let t=[];return s.length>0&&(t=t.concat(Ae(s,r))),n.length>0&&(t=t.concat(Te(n,r))),i.jsx(x,{name:"valgteBarn",control:e,label:i.jsx(p,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[H(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:t.concat(i.jsx(F,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:i.jsx(p,{id:"omBarnet.gjelderAnnetBarn",values:{b:o=>i.jsx("b",{children:o})}})},"søknad_gjeder_nytt_barn"))})};B.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"ValgtBarn"}],raw:"ValgtBarn[]"},description:""}}};u.extend(C);u.extend(Ee);const De=(a,r,e)=>a?v.ADOPTERT:r.fødselsdato!==void 0||e&&e.length>0?v.FØDT:v.UFØDT,Se=(a,r)=>{const e=a.familiehendelse.termindato;if($(e)){const n=u(e).subtract(17,"week"),s=u(e).add(6,"week");return r.filter(t=>u(t.fødselsdato).isBetween(n,s,"day","[]"))}return[]},ye=(a,r)=>{const e=N(a.familiehendelse.fødselsdato),n=a.barn?a.barn.flatMap(o=>o.fnr):[],s=r.filter(o=>n.includes(o.fnr)),t=e?r.filter(o=>h(o.fødselsdato,e)&&!s.some(d=>d.fnr===o.fnr)):[];return s.concat(t)},Le=(a,r)=>{let e;(a.barn||a.familiehendelse.fødselsdato)&&(e=ye(a,r)),a.familiehendelse.termindato&&!a.familiehendelse.fødselsdato&&!a.barn&&(e=Se(a,r));const n=N(ue(a.familiehendelse.termindato,a.familiehendelse.fødselsdato,a.familiehendelse.omsorgsovertakelse)),s=De(a.gjelderAdopsjon,a.familiehendelse,e),t=N(a.familiehendelse.fødselsdato);let o;return e&&e.length>0?o=e.map(d=>u.utc(d.fødselsdato).toDate()):t!==void 0&&(o=new Array(a.familiehendelse.antallBarn).fill(t)),{id:S(),type:s,antallBarn:a.familiehendelse.antallBarn,termindato:N(a.familiehendelse.termindato),omsorgsovertagelse:N(a.familiehendelse.omsorgsovertakelse),kanSøkeOmEndring:a.kanSøkeOmEndring,sak:a,fødselsdatoer:o,familiehendelsesdato:n,sortableDato:N(a.familiehendelse.termindato),startdatoFørsteStønadsperiode:a.gjeldendeVedtak!==void 0&&a.gjeldendeVedtak.perioder.length>0?J(N(a.gjeldendeVedtak.perioder[0].fom)).denneEllerNeste():void 0,fornavn:e!==void 0&&e.length>0?e.filter(d=>d.navn?.fornavn!==void 0&&d.navn.fornavn.trim()!=="").map(d=>[d.navn?.fornavn,d.navn?.mellomnavn??""].join(" ")):void 0,fnr:e!==void 0&&e.length>0?e.filter(d=>d.fnr!==void 0).map(d=>d.fnr):void 0,alleBarnaLever:e!==void 0&&e.length>0?e.every(d=>D(d)):!1}},Oe=(a,r)=>{const e=a.navn?.mellomnavn?[a.navn.fornavn,a.navn.mellomnavn].join(" "):a.navn?.fornavn;return{id:S(),type:v.IKKE_UTFYLT,antallBarn:1,fødselsdatoer:[u.utc(a.fødselsdato).toDate()],fornavn:e?[e]:void 0,fnr:[a.fnr],sortableDato:u.utc(a.fødselsdato).toDate(),alleBarnaLever:D(a),annenForelder:r}},Ie=(a,r,e)=>{const n=[a].concat(r).sort(Y);if(!(n.some(t=>!D(t)&&q(t))||n.length==0))return{id:S(),type:v.IKKE_UTFYLT,antallBarn:n.length,fødselsdatoer:n.map(t=>u.utc(t.fødselsdato).toDate()),fornavn:n.map(t=>[t.navn?.fornavn??"",t.navn?.mellomnavn??""].join(" ")),fnr:n.map(t=>t.fnr),sortableDato:u.utc(n[0].fødselsdato).toDate(),alleBarnaLever:n.every(t=>D(t)),annenForelder:e}},Fe=(a,r)=>a.filter(e=>e.barn!==void 0&&e.barn.length>0||e.familiehendelse.termindato!==void 0||e.familiehendelse.fødselsdato!==void 0||e.familiehendelse.omsorgsovertakelse!==void 0).map(e=>Le(e,r)),ce=(a,r,e)=>{const n=a.filter(l=>!e.some(m=>h(l.fødselsdato,N(m.familiehendelse.fødselsdato)))),s="tempFnr",t=n.map(l=>l.fnr===void 0?{...l,fnr:s+S().toString()}:l),o=r.flatMap(l=>l.fnr),d=r.filter(l=>l.fødselsdatoer!==void 0&&l.fødselsdatoer.length>0).flatMap(l=>l.fødselsdatoer),R=[],y=t.filter(l=>!(l.dødsdato!==void 0&&d.some(m=>u(m).isSame(u.utc(l.fødselsdato),"day"))));for(const l of y)if(!o.includes(l.fnr)&&!me(l.fødselsdato)){const m=de(l.fnr,l.fødselsdato,t);if(o.push(l.fnr),m.length===0){if(!q(l)){const _=Oe(l,l.annenPart);R.push(_)}}else{const _=Ie(l,m,l.annenPart);for(const L of m)o.push(L.fnr);_!==void 0&&R.push(_)}}return R.map(l=>l.fnr&&l.fnr.length>0?{...l,fnr:l.fnr.filter(m=>m&&!m.startsWith(s))}:l)},Pe=(a,r)=>{const e=a.filter(o=>!o.sakAvsluttet),n=a.filter(o=>o.sakAvsluttet),s=Fe(e,r),t=ce(r,s,n);return s.concat(t)},be=(a,r)=>{const e=r.filter(s=>s.sak!==void 0&&s.id!==a.id&&s.familiehendelsesdato!==void 0&&u(s.familiehendelsesdato).isAfter(a.familiehendelsesdato,"day"));e.sort(V);const n=e.at(-1);if(n!==void 0)return{familiehendelsesdato:n.familiehendelsesdato,startdatoFørsteStønadsperiode:n.startdatoFørsteStønadsperiode,fnr:n.fnr,annenForelderFnr:n.sak?.annenPart?.fnr}},V=(a,r)=>u(a.sortableDato).isBefore(r.sortableDato,"d")?1:u(a.sortableDato).isAfter(r.sortableDato,"d")?-1:0,Ge=({saker:a,harGodkjentVilkår:r,søkerInfo:e,setHarGodkjentVilkår:n,setErEndringssøknad:s,setSøknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:o})=>{const d=b(),R=ve(e.arbeidsforhold,o),y=K(),{oppdaterSøknadIState:T}=pe(),l=z.useMemo(()=>[...Pe(a,e.person.barn)].sort(V),[a,e.person.barn]),m=g=>{if(!g.harForståttRettigheterOgPlikter){console.error("harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den",g.harForståttRettigheterOgPlikter);return}n(!0);const k=l.find(f=>f.id===g.valgteBarn);if(k===void 0)return s(!1),t(!0),R.goToNextStep(I.SØKERSITUASJON);const c=be(k,l);y(E.BARN_FRA_NESTE_SAK,c);const A=!!k.kanSøkeOmEndring?a.find(f=>f.saksnummer===k.sak?.saksnummer):void 0;if(A){const f=ke(A,c?.startdatoFørsteStønadsperiode,k.fødselsdatoer),j=Re(e.person,f,d,A.annenPart,k);return T(j,f),s(!0),t(!1),R.goToNextStep(I.UTTAKSPLAN)}if(k.sak!==void 0&&k.kanSøkeOmEndring===!1){const f=fe({...k,sak:k.sak},d,e.person.barn,e.person.fnr);T(f)}if(!A){const f=ge(k);T(f)}return s(!1),t(!1),R.goToNextStep(I.SØKERSITUASJON)},_=W({defaultValues:{harForståttRettigheterOgPlikter:r}}),L=_.watch("valgteBarn"),U=l.find(g=>g.id===L)?.kanSøkeOmEndring===!0?d.formatMessage({id:"velkommen.endreSøknad"}):d.formatMessage({id:"velkommen.begynnMedSøknad"});return i.jsx(X,{pageTitle:i.jsx(p,{id:"søknad.pageheading"}),children:i.jsx(Q,{formMethods:_,onSubmit:m,children:i.jsxs(O,{gap:"space-32",children:[i.jsx(Z,{poster:!0,children:i.jsxs(O,{gap:"space-8",children:[i.jsx(p,{id:"velkommen.guidepanel.del1"}),i.jsx(p,{id:"velkommen.guidepanel.del2",values:{a:g=>i.jsx(ee,{rel:"noopener noreferrer",href:ae.foreldrepenger,children:g})}})]})}),i.jsx(B,{selectableBarn:l}),i.jsx(re,{variant:"info",children:i.jsx(p,{id:"velkommen.lagring.info"})}),i.jsx(ne,{name:"harForståttRettigheterOgPlikter",control:_.control,label:d.formatMessage({id:"velkommen.samtykke"}),validate:[g=>g?null:d.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"})],children:i.jsx(O,{gap:"space-20",children:i.jsxs(P,{gap:"space-4",children:[i.jsx(te,{children:i.jsx(p,{id:"velkommen.samtykkeIntro.del1"})}),i.jsx(_e,{})]})})}),i.jsx(P,{justify:"center",children:i.jsx(le,{type:"submit",variant:"primary",children:U})}),i.jsx(Ne,{})]})})})};Ge.__docgenInfo={description:"",methods:[],displayName:"Forside",props:{saker:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'NAV_TILTAK'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'FRI'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'NAV_TILTAK'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"perioderAnnenpartEøs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    kontoType: no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType;
    tom: string;
    trekkdager: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"kontoType",value:{name:"union",raw:`| 'FELLESPERIODE'
| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'`,elements:[{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"}],required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"trekkdager",value:{name:"number",required:!0}}]}}],raw:"UttakPeriodeAnnenpartEøs_fpoversikt[]",required:!1}}]},required:!1}},{key:"gjelderAdopsjon",value:{name:"boolean",required:!0}},{key:"harAnnenForelderTilsvarendeRettEØS",value:{name:"boolean",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!0}},{key:"morUføretrygd",value:{name:"boolean",required:!0}},{key:"oppdatertTidspunkt",value:{name:"string",required:!0}},{key:"rettighetType",value:{name:"union",raw:"'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT'",elements:[{name:"literal",value:"'ALENEOMSORG'"},{name:"literal",value:"'BEGGE_RETT'"},{name:"literal",value:"'BARE_SØKER_RETT'"}],required:!0}},{key:"sakAvsluttet",value:{name:"boolean",required:!0}},{key:"sakTilhørerMor",value:{name:"boolean",required:!0}},{key:"saksnummer",value:{name:"string",required:!0}},{key:"åpenBehandling",value:{name:"signature",type:"object",raw:`{
    søknadsperioder: UttakPeriode_fpoversikt[];
    tilstand: BehandlingTilstand_fpoversikt;
}`,signature:{properties:[{key:"søknadsperioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'NAV_TILTAK'`,elements:[{name:"literal",value:"'ARBEID'"},{name:"literal",value:"'LOVBESTEMT_FERIE'"},{name:"literal",value:"'SØKER_SYKDOM'"},{name:"literal",value:"'FRI'"},{name:"literal",value:"'SØKER_INNLAGT'"},{name:"literal",value:"'BARN_INNLAGT'"},{name:"literal",value:"'HV_ØVELSE'"},{name:"literal",value:"'NAV_TILTAK'"}],required:!1}}]}}],raw:"UttakPeriode_fpoversikt[]",required:!0}},{key:"tilstand",value:{name:"union",raw:`| 'UNDER_BEHANDLING'
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
    fom: string;
    stillingsprosent: number;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]",required:!0}},{key:"person",value:{name:"signature",type:"object",raw:`{
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
    navn?: Navn_fpoversikt;
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
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""},setHarGodkjentVilkår:{required:!0,tsType:{name:"signature",type:"function",raw:"(harGodkjentVilkår: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"harGodkjentVilkår"}],return:{name:"void"}}},description:""},setErEndringssøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(erEndringssøknad: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"erEndringssøknad"}],return:{name:"void"}}},description:""},setSøknadGjelderNyttBarn:{required:!0,tsType:{name:"signature",type:"function",raw:"(søknadGjelderNyttBarn: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"søknadGjelderNyttBarn"}],return:{name:"void"}}},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{Ge as F};
