import{i as I,aj as Fe,d as P,ak as W,U as y,c as Y,al as X,am as F,A as p,g as S,I as ce}from"./Tidsperioden-JQeTBW8H.js";import"./jsx-runtime-_e34SzbC.js";import"./index--IHLcpuH.js";import{O as re,F as M,Q as Z,T as ve,P as w,U as c,H as Ae,V as ke,W as Te,X as k,Y as H,Z as V,_ as j,$ as T,a0 as R,a1 as Re,D as K,a2 as Se,a3 as b}from"./useFpNavigator-rXF65Prs.js";import{i as $,g as pe,k as Ie,B as U}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{c as ge}from"./velkommenUtils-CiCCs8jn.js";import{g as te,d as J}from"./dateUtils-Ba7kuucY.js";var x=(e=>(e.ÅTTI_PROSENT="ÅTTI",e.HUNDRE_PROSENT="HUNDRE",e))(x||{}),g=(e=>(e.ADOPSJON="ADPSJN",e.OMSORGSOVERTAKELSE="OMSRGO",e.FØDSEL="FODSL",e.TERM="TERM",e))(g||{}),_=(e=>(e.UttakFellesperiodeAnnenForelder="FELLESPERIODE_ANNEN_FORELDER",e.UttakFedrekvoteAnnenForelder="FEDREKVOTE_ANNEN_FORELDER",e.UttakMødrekvoteAnnenForelder="MØDREKVOTE_ANNEN_FORELDER",e.UttakForeldrepengerAnnenForelder="FORELDREPENGER_ANNEN_FORELDER",e.Ingen="INGEN",e))(_||{}),h=(e=>(e.AVSLAG_FRATREKK_PLEIEPENGER="AVSLAG_FRATREKK_PLEIEPENGER",e.AVSLAG_UTSETTELSE_TILBAKE_I_TID="AVSLAG_UTSETTELSE_TILBAKE_I_TID",e.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID="INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID",e.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER="AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER",e.ANNET="ANNET",e))(h||{}),v=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SØKER_SYKDOM",e.InstitusjonSøker="SØKER_INNLAGT",e.InstitusjonBarnet="BARN_INNLAGT",e.HvØvelse="HV_ØVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(v||{}),B=(e=>(e.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",e.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",e.FRILANS="FRILANS",e.ANNET="ANNET",e))(B||{}),N=(e=>(e.BARE_SØKER_RETT="BARE_SØKER_RETT",e.ALENEOMSORG="ALENEOMSORG",e.BEGGE_RETT="BEGGE_RETT",e))(N||{});const ne=(e,r,t)=>{if(t!==void 0)return g.ADOPSJON;if(e!==void 0)return g.FØDSEL;if(r!==void 0)return g.TERM;throw new Error("Fødselsdato/ termindato/ omsorgsovertakelsedato mangler")},or=(e,r,t)=>e?I(t,"adopsjon"):r?I(t,"fødsel"):I(t,"termin"),q=e=>w(e).getAntallUttaksdager()>0,_e=e=>Fe(e.tidsperiode),Oe=(e,r,t)=>{if(e.length<=1)return e;const n=[],o=e.filter(s=>M(s)),l=[...e.filter(s=>!M(s)),...o];let a={...l[0]};return l.forEach((s,f)=>{if(f!==0){if(a===void 0){a=s;return}if(w(a).erLik(s,!1,!0)&&w(a).erSammenhengende(s)&&!P(s.tidsperiode.fom).isSame(r,"day")&&!(t!==void 0&&P(s.tidsperiode.fom).isSame(t,"day"))){a.tidsperiode.tom=s.tidsperiode.tom;return}else n.push(a);a=s}}),n.push(a),n.sort(re)},Pe=e=>{const{fom:r,tom:t}=e.tidsperiode,n=W(r),o=W(t);return n&&o?e:!n&&!o?{...e,tidsperiode:{fom:y(r).neste(),tom:y(t).forrige()}}:!n&&o?{...e,tidsperiode:{fom:y(r).neste(),tom:t}}:{...e,tidsperiode:{fom:r,tom:y(t).forrige()}}},O=(e,r)=>e.gjelderAnnenPart?r?j.mor:j.farMedmor:r?j.farMedmor:j.mor,oe=e=>{switch(e){case v.Arbeid:return T.Arbeid;case v.Ferie:return T.Ferie;case v.InstitusjonBarnet:return T.InstitusjonBarnet;case v.InstitusjonSøker:return T.InstitusjonSøker;case v.Sykdom:return T.Sykdom;case v.HvØvelse:return T.HvØvelse;case v.NavTiltak:return T.NavTiltak;case v.Fri:return T.Fri;default:return}},Ne=e=>{switch(e.kontoType){case c.Fedrekvote:return R.UttakFedrekvoteAnnenForelder;case c.Fellesperiode:return R.UttakFellesperiodeAnnenForelder;case c.Mødrekvote:return R.UttakMødrekvoteAnnenForelder;case c.Foreldrepenger:return R.UttakForeldrepengerAnnenForelder;case c.ForeldrepengerFørFødsel:return R.ForeldrepengerFørFødsel;default:return}},de=(e,r,t)=>{if(e)return e.toString();if(r)return t?(100-t).toString():"100"},Ue=e=>e?c.AktivitetsfriKvote:c.Foreldrepenger,Le=(e,r,t,n)=>{if(e&&!r.flerbarnsdager&&!r.samtidigUttak&&P(r.periode.fom).isBefore(P(t).add(6,"weeks"),"day")&&n!==c.AktivitetsfriKvote&&r.morsAktivitet!==Re.Uføre)return!0},De=(e,r,t)=>{var L;const n=e.gradering!==void 0&&e.resultat.innvilget,o=F(e.periode),d=r.søkerErFarEllerMedmor&&!r.morHarRett&&!r.farMedmorErAleneOmOmsorg&&!r.harAnnenForelderTilsvarendeRettEØS,l=t!==void 0?t.find(D=>(p(F(D.periode)).erLik(o)||p(F(D.periode)).overlapper(o))&&D.guid!==e.guid):void 0;let a;l&&(a=l.samtidigUttak);const s=de(e.samtidigUttak,a,(L=e.gradering)==null?void 0:L.arbeidstidprosent),f=ie(e),{termindato:m,fødselsdato:i,omsorgsovertakelsesdato:E}=r,A=te(m,i,E),u=d?Ue(e.resultat.trekkerMinsterett):e.kontoType;return{id:S(),type:k.Uttak,konto:u,tidsperiode:o,forelder:O(e,r.søkerErFarEllerMedmor),ønskerSamtidigUttak:e.samtidigUttak!==void 0,gradert:n,samtidigUttakProsent:s,ønskerFlerbarnsdager:r.antallBarn>1?e.flerbarnsdager:void 0,stillingsprosent:n?e.gradering.arbeidstidprosent.toString():void 0,arbeidsformer:n?[He(e.gradering.aktivitet.type)]:void 0,orgnumre:n&&e.gradering.aktivitet.arbeidsgiver!==void 0?[e.gradering.aktivitet.arbeidsgiver.id]:void 0,morsAktivitetIPerioden:e.morsAktivitet,erMorForSyk:Le(r.søkerErFarEllerMedmor,e,A,u),angittAvAnnenPart:e.angittAvAnnenPart,opprinneligSøkt:f}},Me=(e,r)=>({id:S(),type:k.Utsettelse,årsak:oe(e.utsettelseÅrsak),tidsperiode:F(e.periode),forelder:O(e,r),erArbeidstaker:!1,morsAktivitetIPerioden:e.morsAktivitet}),ie=e=>{if(e.resultat.årsak===h.AVSLAG_UTSETTELSE_TILBAKE_I_TID){if(e.utsettelseÅrsak===v.Ferie)return H.Ferie;if(e.utsettelseÅrsak===v.Arbeid)return H.Arbeid}if(e.resultat.årsak===h.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID)return H.Gradering},he=(e,r)=>{const t=ie(e);return{id:S(),type:k.Info,infotype:V.avslåttPeriode,tidsperiode:F(e.periode),avslåttPeriodeType:e.utsettelseÅrsak!==void 0?k.Utsettelse:k.Uttak,kontoType:e.kontoType,forelder:O(e,r),overskrives:!0,visPeriodeIPlan:!0,kanSlettes:e.resultat.årsak!==h.AVSLAG_FRATREKK_PLEIEPENGER,opprinneligSøkt:t}},Ge=(e,r,t,n)=>{var m;const o=F(e.periode);if(e.utsettelseÅrsak!==void 0&&e.resultat.innvilget===!0)return{type:k.Info,infotype:V.utsettelseAnnenPart,id:S(),årsak:oe(e.utsettelseÅrsak),tidsperiode:o,forelder:O(e,r),overskrives:!0,visPeriodeIPlan:!0};const d=n!==void 0&&!n.some(i=>(p(F(i.periode)).erLik(o)||p(F(i.periode)).overlapper(o))&&i.guid!==e.guid),l=Ne(e),a=n!==void 0?n.find(i=>(p(F(i.periode)).erLik(o)||p(F(i.periode)).overlapper(o))&&i.guid!==e.guid):void 0;let s;a&&(s=a.samtidigUttak);const f=de(e.samtidigUttak,s,(m=e.gradering)==null?void 0:m.arbeidstidprosent);return Q(e,t)?{type:k.Info,infotype:V.avslåttPeriode,id:S(),tidsperiode:o,forelder:O(e,r),overskrives:!0,visPeriodeIPlan:d,kontoType:e.kontoType,avslåttPeriodeType:k.Uttak,kanSlettes:!1}:{type:k.Info,infotype:V.uttakAnnenPart,id:S(),årsak:l,tidsperiode:o,forelder:O(e,r),overskrives:!0,gradert:e.gradering!==void 0,ønskerSamtidigUttak:f!==void 0,samtidigUttakProsent:f,stillingsprosent:e.gradering!==void 0?e.gradering.arbeidstidprosent.toString():void 0,visPeriodeIPlan:d}},ye=(e,r)=>({id:S(),forelder:O(e,r),konto:e.kontoType,tidsperiode:F(e.periode),type:k.Overføring,årsak:e.overføringÅrsak}),je=(e,r,t)=>{const n=t.filter(o=>!Q(o,r.termindato));return e.gjelderAnnenPart?Ge(e,r.søkerErFarEllerMedmor,r.termindato,n):e.resultat.innvilget?e.utsettelseÅrsak!==void 0?Me(e,r.søkerErFarEllerMedmor):e.overføringÅrsak!==void 0?ye(e,r.søkerErFarEllerMedmor):De(e,r,n):he(e,r.søkerErFarEllerMedmor)},Q=(e,r)=>r&&e.gjelderAnnenPart&&!e.resultat.innvilget&&e.resultat.trekkerDager&&P(e.periode.tom).isBefore(P(Y(r)),"d")&&e.kontoType!==c.Fedrekvote,Ve=(e,r)=>e.resultat.innvilget?!0:e.gjelderAnnenPart?!!Q(e,r):e.resultat.årsak!==h.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER&&e.resultat.trekkerDager===!0,Ke=(e,r,t)=>{const n=[];return e.forEach(o=>{X(o.tidsperiode,r)&&Ae(o)?ke(o,r).forEach(l=>n.push(l)):t!==void 0&&X(o.tidsperiode,t)?Te(o,t).forEach(l=>n.push(l)):n.push(o)}),n},se=(e,r,t)=>{const n=e.filter(u=>Ve(u,r.termindato)),o=n.map(u=>je(u,r,n)),d=new Date(r.familiehendelseDato),l=Ke(o,d,t),a=Oe([...l].sort(re).filter(q).map(Pe).filter(_e).filter(q),d,t),s=!r.morHarRett&&r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,f=r.familiehendelseType===g.ADOPSJON,m=a.filter(u=>!M(u)),i=a.filter(u=>M(u)),E=!r.erDeltUttak&&s&&!r.farMedmorErAleneOmOmsorg,A=Z(m,E,d,f,s,r.søkerErFarEllerMedmor,t);return Z(ve(A,i,d,t),E,d,f,s,r.søkerErFarEllerMedmor,t)},He=e=>{switch(e){case B.SELVSTENDIG_NÆRINGSDRIVENDE:return b.selvstendignæringsdrivende;case B.FRILANS:return b.frilans;default:return b.arbeidstaker}},z=e=>{switch(e){case _.UttakFedrekvoteAnnenForelder:return c.Fedrekvote;case _.UttakFellesperiodeAnnenForelder:return c.Fellesperiode;case _.UttakMødrekvoteAnnenForelder:return c.Mødrekvote;default:return}},be=e=>{switch(e){case _.UttakFedrekvoteAnnenForelder:return R.UttakFedrekvoteAnnenForelder;case _.UttakFellesperiodeAnnenForelder:return R.UttakFellesperiodeAnnenForelder;case _.UttakMødrekvoteAnnenForelder:return R.UttakMødrekvoteAnnenForelder;default:return}},ae=(e,r)=>{const{oppholdÅrsak:t}=e,n={guid:S(),periode:{fom:e.fom,tom:e.tom},gjelderAnnenPart:r,resultat:e.resultat,kontoType:e.kontoType,flerbarnsdager:e.flerbarnsdager,gradering:e.gradering,utsettelseÅrsak:e.utsettelseÅrsak,overføringÅrsak:e.overføringÅrsak,samtidigUttak:e.samtidigUttak,morsAktivitet:e.morsAktivitet,oppholdÅrsak:be(e.oppholdÅrsak)};return t!==void 0&&r===!1&&(n.gjelderAnnenPart=!0,n.kontoType=z(t)),t!==void 0&&r&&(n.gjelderAnnenPart=!1,n.angittAvAnnenPart=!0,n.kontoType=z(t)),n},C=e=>e.resultat.innvilget,le=(e,r,t)=>{const n=t.filter(d=>e.guid!==d.guid&&p(F(e.periode)).erLik(F(d.periode)));if(n.length===0)return!0;const o=n.filter(C);return!(C(e)===!1&&o.length>0)},dr=e=>{if(!(e===void 0||e===""||Object.keys(e).length===0||e.perioder.length===0))return Y(e.perioder[0].fom)},ir=(e,r,t,n,o)=>{if(e==null)return;const d=!0,l=e.perioder.map(E=>ae(E,d)).filter(le);let a;e.termindato!==void 0?a=e.termindato:($(r)||pe(r))&&r.termindato!==void 0&&(a=r.termindato);const s=$(r)?r.fødselsdatoer[0]:void 0,f=Ie(r)?r.adopsjonsdato:void 0,m={dekningsgrad:e.dekningsgrad===x.HUNDRE_PROSENT?K.HUNDRE_PROSENT:K.ÅTTI_PROSENT,antallBarn:e.antallBarn?e.antallBarn:r.antallBarn,morErAleneOmOmsorg:!1,morErUfør:!1,morHarRett:!0,farMedmorErAleneOmOmsorg:!1,farMedmorHarRett:!0,søkerErFarEllerMedmor:t,termindato:a,fødselsdato:s,omsorgsovertakelsesdato:f,erDeltUttak:!0,erBarnetFødt:s!==void 0,familiehendelseDato:n,familiehendelseType:ne(s,a,f),harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:void 0,barn:[]},i=se(l,m,o);return{saksnummer:"",erAnnenPartsSak:d,grunnlag:m,saksperioder:l,uttaksplan:i.filter(E=>M(E))}},we=(e,r)=>{if(e==null)return;const t=!1,{dekningsgrad:n,familiehendelse:{fødselsdato:o,termindato:d,omsorgsovertakelse:l,antallBarn:a},harAnnenForelderTilsvarendeRettEØS:s,morUføretrygd:f,rettighetType:m,sakTilhørerMor:i,ønskerJustertUttakVedFødsel:E}=e,A=e.gjeldendeVedtak?e.gjeldendeVedtak.perioder:[],u=!i,G={dekningsgrad:n===x.HUNDRE_PROSENT?K.HUNDRE_PROSENT:K.ÅTTI_PROSENT,antallBarn:a,morErAleneOmOmsorg:i&&m===N.ALENEOMSORG,morErUfør:f,morHarRett:i||m===N.BEGGE_RETT,farMedmorErAleneOmOmsorg:!i&&m===N.ALENEOMSORG,farMedmorHarRett:!i||m===N.BEGGE_RETT,søkerErFarEllerMedmor:u,termindato:d,fødselsdato:o,omsorgsovertakelsesdato:l,erDeltUttak:m===N.BEGGE_RETT,erBarnetFødt:o!==void 0,familiehendelseDato:te(d,o,l),familiehendelseType:ne(o,d,l),ønskerJustertUttakVedFødsel:o===void 0?E:void 0,harAnnenForelderTilsvarendeRettEØS:s},L=A.map(ue=>ae(ue,t)).filter(le),D=se(L,G,r);return{saksnummer:e.saksnummer,erAnnenPartsSak:t,grunnlag:G,saksperioder:L,uttaksplan:D}},fe=e=>e===g.TERM||e===g.FØDSEL?"fødsel":"adopsjon",Je=(e,r,t)=>{const{søkerErFarEllerMedmor:n}=t,o=e.kjønn==="K";switch(r){case"fødsel":case"adopsjon":return o?n?"medmor":"mor":"far";default:return}},ee=(e,r)=>e&&e.fødselsdatoer?J(e.fødselsdatoer):r.fødselsdato?Array(r.antallBarn).fill(r.fødselsdato):[],Be=(e,r,t)=>{switch(e){case"fødsel":return r.fødselsdato?{type:U.FØDT,antallBarn:r.antallBarn,fødselsdatoer:ee(t,r),termindato:r.termindato?r.termindato:void 0,fnr:t==null?void 0:t.fnr}:{type:U.UFØDT,antallBarn:r.antallBarn,termindato:r.termindato};case"adopsjon":return{type:U.ADOPTERT_STEBARN,adopsjonsdato:r.omsorgsovertakelsesdato,antallBarn:r.antallBarn,fødselsdatoer:ee(t,r),fnr:t==null?void 0:t.fnr};default:return}},Ye=(e,r,t,n,o)=>{switch(e){case"fødsel":case"adopsjon":return n?{fornavn:t.fornavn!==void 0&&t.fornavn!==""?t.fornavn:I(o,"annen.forelder"),etternavn:t.etternavn,erMorUfør:r.morErUfør,harRettPåForeldrepengerINorge:!!r.morHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:n&&r.farMedmorErAleneOmOmsorg||!n&&r.morErAleneOmOmsorg}:{fornavn:t.fornavn!==void 0&&t.fornavn!==""?t.fornavn:I(o,"annen.forelder"),etternavn:t.etternavn,harRettPåForeldrepengerINorge:!!r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:r.farMedmorErAleneOmOmsorg||r.morErAleneOmOmsorg};default:return}},xe=(e,r,t,n,o,d,l)=>{var m;if(d===void 0&&r===void 0||!l)return;const a=d!==void 0?e.find(i=>d.includes(i.fnr)&&i.annenForelder!==void 0):void 0,s=r!==void 0?e.find(i=>ge(i.fødselsdato,r)&&i.annenForelder!==void 0):void 0,f=a||s;if(f!==void 0&&((m=f.annenForelder)==null?void 0:m.fnr)===l){const i=f.annenForelder,{fornavn:E}=i,A=E!==void 0&&E.trim()!==""?E:I(o,"annen.forelder"),u={...i,fornavn:A};return Ye(n,t,u,t.søkerErFarEllerMedmor,o)}},me=e=>e.fødselsdatoer!==void 0&&e.fødselsdatoer.length>0?{type:U.FØDT,antallBarn:e.antallBarn,fødselsdatoer:J(e.fødselsdatoer),fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0}:e.termindato!==void 0?{type:U.UFØDT,antallBarn:e.antallBarn,termindato:P(e.termindato).format(ce)}:{type:U.IKKE_UTFYLT,antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer?J(e.fødselsdatoer):[],fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0},Qe=e=>e.annenForelder!==void 0?{fornavn:e.annenForelder.fornavn,etternavn:e.annenForelder.etternavn,fnr:e.annenForelder.fnr,kanIkkeOppgis:!1}:{kanIkkeOppgis:!1},We=e=>{const r=Se(e);if(r==="K")return"medmor";if(r==="M")return"far";throw new Error("Kan ikke utlede kjønn fra fødselsnummer.")},sr=e=>{const r=me(e),t=Qe(e);return{barn:r,annenForelder:t,erEndringssøknad:!1}},Ee=(e,r,t,n,o,d)=>{const l=r!==void 0?r.fnr:void 0,a={fornavn:I(e,"annen.forelder"),etternavn:"",fnr:l||"",harRettPåForeldrepengerINorge:t.søkerErFarEllerMedmor?!!t.morHarRett&&!t.harAnnenForelderTilsvarendeRettEØS:!!t.farMedmorHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,harRettPåForeldrepengerIEØS:t.harAnnenForelderTilsvarendeRettEØS,kanIkkeOppgis:!1,erMorUfør:t.søkerErFarEllerMedmor?t.morErUfør:void 0,erAleneOmOmsorg:t.farMedmorErAleneOmOmsorg||t.morErAleneOmOmsorg};return xe(n,Y(t.fødselsdato),t,o,e,d,l)||a},ar=(e,r,t,n)=>{var m;const o=we(e.sak,void 0),{grunnlag:d}=o,l=fe(d.familiehendelseType),a=me(e),s=Ee(r,(m=e.sak)==null?void 0:m.annenPart,d,t,l,e.fnr),f={barn:a,annenForelder:s,erEndringssøknad:!1,dekningsgrad:d.dekningsgrad};if(e.sak!==void 0){const i=e.sak.sakTilhørerMor?"mor":We(n),E={situasjon:e.sak.gjelderAdopsjon?"adopsjon":"fødsel",rolle:i};f.søkersituasjon=E}return f},lr=(e,r,t,n,o)=>{const{grunnlag:d,uttaksplan:l}=r,{dekningsgrad:a,familiehendelseType:s,søkerErFarEllerMedmor:f,ønskerJustertUttakVedFødsel:m}=d,i=fe(s);if(!i)return;const E=Be(i,d,o),A=Je(e,i,d);if(!E||!A)return;const u=Ee(t,n,d,e.barn,i,o==null?void 0:o.fnr);return{søkersituasjon:{situasjon:i,rolle:A},barn:E,annenForelder:{...u,erAleneOmOmsorg:f?d.farMedmorErAleneOmOmsorg:d.morErAleneOmOmsorg},erEndringssøknad:!0,dekningsgrad:a,uttaksplan:l,saksnummer:r.saksnummer,ønskerJustertUttakVedFødsel:m}};export{x as D,N as R,ar as a,sr as b,ir as c,dr as d,or as g,we as m,lr as o};
