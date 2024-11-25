import{d as k,w as q,U as h,T as I,I as ve}from"./UttaksdagenString-BBvBeCjL.js";import{a2 as ne,a3 as U,a4 as z,a5 as Se,a6 as b,a7 as Te,f as c,a8 as C,a9 as Re,aa as pe,ab as ge,ac as F,ad as S,ae as K,af as y,ag as G,ah as R,ai as p,aj as Ie,X as W,Y as Oe,Q as _e,D as j,B as M,ak as H}from"./Uttaksplan-Bzo3h608.js";import"./index-CTjT7uj6.js";import"./jsx-runtime-Cw0GR0a5.js";import{I as B,j as oe,G as de,H as w,e as Pe}from"./barnUtils-Cmf26s4I.js";import{g}from"./guid-CsArkN6i.js";import{l as Ne}from"./useFpNavigator-CWp5w5vB.js";var Y=(e=>(e.ÅTTI_PROSENT="ÅTTI",e.HUNDRE_PROSENT="HUNDRE",e))(Y||{}),O=(e=>(e.ADOPSJON="ADPSJN",e.OMSORGSOVERTAKELSE="OMSRGO",e.FØDSEL="FODSL",e.TERM="TERM",e))(O||{}),_=(e=>(e.UttakFellesperiodeAnnenForelder="FELLESPERIODE_ANNEN_FORELDER",e.UttakFedrekvoteAnnenForelder="FEDREKVOTE_ANNEN_FORELDER",e.UttakMødrekvoteAnnenForelder="MØDREKVOTE_ANNEN_FORELDER",e.UttakForeldrepengerAnnenForelder="FORELDREPENGER_ANNEN_FORELDER",e.Ingen="INGEN",e))(_||{}),L=(e=>(e.AVSLAG_FRATREKK_PLEIEPENGER="AVSLAG_FRATREKK_PLEIEPENGER",e.AVSLAG_UTSETTELSE_TILBAKE_I_TID="AVSLAG_UTSETTELSE_TILBAKE_I_TID",e.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID="INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID",e.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER="AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER",e.ANNET="ANNET",e))(L||{}),A=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SØKER_SYKDOM",e.InstitusjonSøker="SØKER_INNLAGT",e.InstitusjonBarnet="BARN_INNLAGT",e.HvØvelse="HV_ØVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(A||{}),J=(e=>(e.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",e.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",e.FRILANS="FRILANS",e.ANNET="ANNET",e))(J||{}),N=(e=>(e.BARE_SØKER_RETT="BARE_SØKER_RETT",e.ALENEOMSORG="ALENEOMSORG",e.BEGGE_RETT="BEGGE_RETT",e))(N||{});const se=(e,r,t)=>{if(t!==void 0)return O.ADOPSJON;if(e!==void 0)return O.FØDSEL;if(r!==void 0)return O.TERM;throw new Error("Fødselsdato/ termindato/ omsorgsovertakelsedato mangler")},sr=(e,r,t)=>e?t.formatMessage({id:"adopsjon"}):r?t.formatMessage({id:"fødsel"}):t.formatMessage({id:"termin"}),Z=e=>b(e).getAntallUttaksdager()>0,Me=e=>Te(e.tidsperiode),Ue=(e,r,t)=>!!(k(e.tidsperiode.tom).isBefore(t)&&k(r.tidsperiode.tom).isBefore(t)||k(e.tidsperiode.fom).isSameOrAfter(t)&&k(r.tidsperiode.fom).isSameOrAfter(t)),Le=(e,r,t)=>{if(e.length<=1)return e;const n=[],o=e.filter(a=>U(a)),l=[...e.filter(a=>!U(a)),...o];let i={...l[0]};return l.forEach((a,f)=>{if(f!==0){if(i===void 0){i=a;return}if(b(i).erLik(a,!1,!0)&&b(i).erSammenhengende(a)&&!k(a.tidsperiode.fom).isSame(r,"day")&&Ue(i,a,r)&&!(t!==void 0&&k(a.tidsperiode.fom).isSame(t,"day"))){i.tidsperiode.tom=a.tidsperiode.tom;return}else n.push(i);i=a}}),n.push(i),n.sort(ne)},De=e=>{const{fom:r,tom:t}=e.tidsperiode,n=q(r),o=q(t);return n&&o?e:!n&&!o?{...e,tidsperiode:{fom:h(r).neste(),tom:h(t).forrige()}}:!n&&o?{...e,tidsperiode:{fom:h(r).neste(),tom:t}}:{...e,tidsperiode:{fom:r,tom:h(t).forrige()}}},P=(e,r)=>e.gjelderAnnenPart?r?G.mor:G.farMedmor:r?G.farMedmor:G.mor,ie=e=>{switch(e){case A.Arbeid:return R.Arbeid;case A.Ferie:return R.Ferie;case A.InstitusjonBarnet:return R.InstitusjonBarnet;case A.InstitusjonSøker:return R.InstitusjonSøker;case A.Sykdom:return R.Sykdom;case A.HvØvelse:return R.HvØvelse;case A.NavTiltak:return R.NavTiltak;case A.Fri:return R.Fri;default:return}},he=e=>{switch(e.kontoType){case c.Fedrekvote:return p.UttakFedrekvoteAnnenForelder;case c.Fellesperiode:return p.UttakFellesperiodeAnnenForelder;case c.Mødrekvote:return p.UttakMødrekvoteAnnenForelder;case c.Foreldrepenger:return p.UttakForeldrepengerAnnenForelder;case c.ForeldrepengerFørFødsel:return p.ForeldrepengerFørFødsel;default:return}},ae=(e,r,t)=>{if(e)return e.toString();if(r)return t?(100-t).toString():"100"},Ge=e=>e?c.AktivitetsfriKvote:c.Foreldrepenger,ye=(e,r,t,n)=>{if(e&&!r.flerbarnsdager&&!r.samtidigUttak&&k(r.periode.fom).isBefore(k(t).add(6,"weeks"),"day")&&n!==c.AktivitetsfriKvote&&r.morsAktivitet!==Ie.Uføre)return!0},je=(e,r,t)=>{var D;const n=e.gradering!==void 0&&e.resultat.innvilget,o=F(e.periode),d=r.søkerErFarEllerMedmor&&!r.morHarRett&&!r.farMedmorErAleneOmOmsorg&&!r.harAnnenForelderTilsvarendeRettEØS,l=t!==void 0?t.find(T=>(I(F(T.periode)).erLik(o)||I(F(T.periode)).overlapper(o))&&T.guid!==e.guid):void 0;let i;l&&(i=l.samtidigUttak);const a=ae(e.samtidigUttak,i,(D=e.gradering)==null?void 0:D.arbeidstidprosent),f=le(e),{termindato:E,fødselsdato:s,omsorgsovertakelsesdato:m}=r,v=oe(E,s,m),u=d?Ge(e.resultat.trekkerMinsterett):e.kontoType;return{id:g(),type:S.Uttak,konto:u,tidsperiode:o,forelder:P(e,r.søkerErFarEllerMedmor),ønskerSamtidigUttak:e.samtidigUttak!==void 0,gradert:n,samtidigUttakProsent:a,ønskerFlerbarnsdager:r.antallBarn>1?e.flerbarnsdager:void 0,stillingsprosent:n?e.gradering.arbeidstidprosent.toString():void 0,arbeidsformer:n?[Ye(e.gradering.aktivitet.type)]:void 0,orgnumre:n&&e.gradering.aktivitet.arbeidsgiver!==void 0?[e.gradering.aktivitet.arbeidsgiver.id]:void 0,morsAktivitetIPerioden:e.morsAktivitet,erMorForSyk:ye(r.søkerErFarEllerMedmor,e,v,u),angittAvAnnenPart:e.angittAvAnnenPart,opprinneligSøkt:f}},Ve=(e,r)=>({id:g(),type:S.Utsettelse,årsak:ie(e.utsettelseÅrsak),tidsperiode:F(e.periode),forelder:P(e,r),erArbeidstaker:!1,morsAktivitetIPerioden:e.morsAktivitet}),le=e=>{if(e.resultat.årsak===L.AVSLAG_UTSETTELSE_TILBAKE_I_TID){if(e.utsettelseÅrsak===A.Ferie)return K.Ferie;if(e.utsettelseÅrsak===A.Arbeid)return K.Arbeid}if(e.resultat.årsak===L.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID)return K.Gradering},Ke=(e,r)=>{const t=le(e);return{id:g(),type:S.Info,infotype:y.avslåttPeriode,tidsperiode:F(e.periode),avslåttPeriodeType:e.utsettelseÅrsak!==void 0?S.Utsettelse:S.Uttak,kontoType:e.kontoType,forelder:P(e,r),overskrives:!0,visPeriodeIPlan:!0,kanSlettes:e.resultat.årsak!==L.AVSLAG_FRATREKK_PLEIEPENGER,opprinneligSøkt:t}},He=(e,r,t,n)=>{var E;const o=F(e.periode);if(e.utsettelseÅrsak!==void 0&&e.resultat.innvilget===!0)return{type:S.Info,infotype:y.utsettelseAnnenPart,id:g(),årsak:ie(e.utsettelseÅrsak),tidsperiode:o,forelder:P(e,r),overskrives:!0,visPeriodeIPlan:!0};const d=n!==void 0&&!n.some(s=>(I(F(s.periode)).erLik(o)||I(F(s.periode)).overlapper(o))&&s.guid!==e.guid),l=he(e),i=n!==void 0?n.find(s=>(I(F(s.periode)).erLik(o)||I(F(s.periode)).overlapper(o))&&s.guid!==e.guid):void 0;let a;i&&(a=i.samtidigUttak);const f=ae(e.samtidigUttak,a,(E=e.gradering)==null?void 0:E.arbeidstidprosent);return x(e,t)?{type:S.Info,infotype:y.avslåttPeriode,id:g(),tidsperiode:o,forelder:P(e,r),overskrives:!0,visPeriodeIPlan:d,kontoType:e.kontoType,avslåttPeriodeType:S.Uttak,kanSlettes:!1}:{type:S.Info,infotype:y.uttakAnnenPart,id:g(),årsak:l,tidsperiode:o,forelder:P(e,r),overskrives:!0,gradert:e.gradering!==void 0,ønskerSamtidigUttak:f!==void 0,samtidigUttakProsent:f,stillingsprosent:e.gradering!==void 0?e.gradering.arbeidstidprosent.toString():void 0,visPeriodeIPlan:d}},be=(e,r)=>({id:g(),forelder:P(e,r),konto:e.kontoType,tidsperiode:F(e.periode),type:S.Overføring,årsak:e.overføringÅrsak}),we=(e,r,t)=>{const n=t.filter(o=>!x(o,r.termindato));return e.gjelderAnnenPart?He(e,r.søkerErFarEllerMedmor,r.termindato,n):e.resultat.innvilget?e.utsettelseÅrsak!==void 0?Ve(e,r.søkerErFarEllerMedmor):e.overføringÅrsak!==void 0?be(e,r.søkerErFarEllerMedmor):je(e,r,n):Ke(e,r.søkerErFarEllerMedmor)},x=(e,r)=>r&&e.gjelderAnnenPart&&!e.resultat.innvilget&&e.resultat.trekkerDager&&k(e.periode.tom).isBefore(k(B(r)),"d")&&e.kontoType!==c.Fedrekvote,Je=(e,r)=>e.resultat.innvilget?!0:e.gjelderAnnenPart?!!x(e,r):e.resultat.årsak!==L.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER&&e.resultat.trekkerDager===!0,Be=(e,r,t)=>{const n=[];return e.forEach(o=>{C(o.tidsperiode,r)&&Re(o)?pe(o,r).forEach(l=>n.push(l)):t!==void 0&&C(o.tidsperiode,t)?ge(o,t).forEach(l=>n.push(l)):n.push(o)}),n},fe=(e,r,t)=>{const n=e.filter(u=>Je(u,r.termindato)),o=n.map(u=>we(u,r,n)),d=new Date(r.familiehendelseDato),l=Be(o,d,t),i=Le([...l].sort(ne).filter(Z).map(De).filter(Me).filter(Z),d,t),a=!r.morHarRett&&r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,f=r.familiehendelseType===O.ADOPSJON,E=i.filter(u=>!U(u)),s=i.filter(u=>U(u)),m=!r.erDeltUttak&&a&&!r.farMedmorErAleneOmOmsorg,v=z(E,m,d,f,a,r.søkerErFarEllerMedmor,t);return z(Se(v,s,d,t),m,d,f,a,r.søkerErFarEllerMedmor,t)},Ye=e=>{switch(e){case J.SELVSTENDIG_NÆRINGSDRIVENDE:return H.selvstendignæringsdrivende;case J.FRILANS:return H.frilans;default:return H.arbeidstaker}},$=e=>{switch(e){case _.UttakFedrekvoteAnnenForelder:return c.Fedrekvote;case _.UttakFellesperiodeAnnenForelder:return c.Fellesperiode;case _.UttakMødrekvoteAnnenForelder:return c.Mødrekvote;default:return}},xe=e=>{switch(e){case _.UttakFedrekvoteAnnenForelder:return p.UttakFedrekvoteAnnenForelder;case _.UttakFellesperiodeAnnenForelder:return p.UttakFellesperiodeAnnenForelder;case _.UttakMødrekvoteAnnenForelder:return p.UttakMødrekvoteAnnenForelder;default:return}},me=(e,r)=>{const{oppholdÅrsak:t}=e,n={guid:g(),periode:{fom:e.fom,tom:e.tom},gjelderAnnenPart:r,resultat:e.resultat,kontoType:e.kontoType,flerbarnsdager:e.flerbarnsdager,gradering:e.gradering,utsettelseÅrsak:e.utsettelseÅrsak,overføringÅrsak:e.overføringÅrsak,samtidigUttak:e.samtidigUttak,morsAktivitet:e.morsAktivitet,oppholdÅrsak:xe(e.oppholdÅrsak)};return t!==void 0&&r===!1&&(n.gjelderAnnenPart=!0,n.kontoType=$(t)),t!==void 0&&r&&(n.gjelderAnnenPart=!1,n.angittAvAnnenPart=!0,n.kontoType=$(t)),n},ee=e=>e.resultat.innvilget,Ee=(e,r,t)=>{const n=t.filter(d=>e.guid!==d.guid&&I(F(e.periode)).erLik(F(d.periode)));if(n.length===0)return!0;const o=n.filter(ee);return!(ee(e)===!1&&o.length>0)},ir=e=>{if(!(e===void 0||e===""||Object.keys(e).length===0||e.perioder.length===0))return B(e.perioder[0].fom)},ar=(e,r,t,n,o)=>{if(e==null||e==="")return;const d=!0,l=e.perioder.map(m=>me(m,d)).filter(Ee);let i;e.termindato!==void 0?i=e.termindato:(W(r)||Oe(r))&&r.termindato!==void 0&&(i=r.termindato);const a=W(r)?r.fødselsdatoer[0]:void 0,f=_e(r)?r.adopsjonsdato:void 0,E={dekningsgrad:e.dekningsgrad===Y.HUNDRE_PROSENT?j.HUNDRE_PROSENT:j.ÅTTI_PROSENT,antallBarn:e.antallBarn?e.antallBarn:r.antallBarn,morErAleneOmOmsorg:!1,morErUfør:!1,morHarRett:!0,farMedmorErAleneOmOmsorg:!1,farMedmorHarRett:!0,søkerErFarEllerMedmor:t,termindato:i,fødselsdato:a,omsorgsovertakelsesdato:f,erDeltUttak:!0,erBarnetFødt:a!==void 0,familiehendelseDato:n,familiehendelseType:se(a,i,f),harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:void 0,barn:[]},s=fe(l,E,o);return{saksnummer:"",erAnnenPartsSak:d,grunnlag:E,saksperioder:l,uttaksplan:s.filter(m=>U(m))}},Qe=(e,r,t)=>{if(e==null)return;const n=!1,{dekningsgrad:o,familiehendelse:{fødselsdato:d,termindato:l,omsorgsovertakelse:i,antallBarn:a},harAnnenForelderTilsvarendeRettEØS:f,morUføretrygd:E,rettighetType:s,sakTilhørerMor:m,ønskerJustertUttakVedFødsel:v}=e,u=e.gjeldendeVedtak?e.gjeldendeVedtak.perioder:[],V=!m,D=t&&t.length>0?de(t[0]):void 0,T=d||D,Q={dekningsgrad:o===Y.HUNDRE_PROSENT?j.HUNDRE_PROSENT:j.ÅTTI_PROSENT,antallBarn:a,morErAleneOmOmsorg:m&&s===N.ALENEOMSORG,morErUfør:E,morHarRett:m||s===N.BEGGE_RETT,farMedmorErAleneOmOmsorg:!m&&s===N.ALENEOMSORG,farMedmorHarRett:!m||s===N.BEGGE_RETT,søkerErFarEllerMedmor:V,termindato:l,fødselsdato:T,omsorgsovertakelsesdato:i,erDeltUttak:s===N.BEGGE_RETT,erBarnetFødt:T!==void 0,familiehendelseDato:oe(l,T,i),familiehendelseType:se(T,l,i),ønskerJustertUttakVedFødsel:T===void 0?v:void 0,harAnnenForelderTilsvarendeRettEØS:f},X=u.map(ke=>me(ke,n)).filter(Ee),Ae=fe(X,Q,r);return{saksnummer:e.saksnummer,erAnnenPartsSak:n,grunnlag:Q,saksperioder:X,uttaksplan:Ae}},ue=e=>e===O.TERM||e===O.FØDSEL?"fødsel":"adopsjon",Xe=(e,r,t)=>{const{søkerErFarEllerMedmor:n}=t,o=e.kjønn==="K";switch(r){case"fødsel":case"adopsjon":return o?n?"medmor":"mor":"far";default:return}},re=(e,r)=>e!=null&&e.fødselsdatoer?w(e.fødselsdatoer):r.fødselsdato?Array(r.antallBarn).fill(r.fødselsdato):[],qe=(e,r,t)=>{switch(e){case"fødsel":return r.fødselsdato?{type:M.FØDT,antallBarn:r.antallBarn,fødselsdatoer:re(t,r),termindato:r.termindato?r.termindato:void 0,fnr:t==null?void 0:t.fnr}:{type:M.UFØDT,antallBarn:r.antallBarn,termindato:r.termindato};case"adopsjon":return{type:M.ADOPTERT_STEBARN,adopsjonsdato:r.omsorgsovertakelsesdato,antallBarn:r.antallBarn,fødselsdatoer:re(t,r),fnr:t==null?void 0:t.fnr};default:return}},te=(e,r)=>e.fornavn!==void 0&&e.fornavn!==""?e.fornavn:r.formatMessage({id:"annen.forelder"}),ze=(e,r,t,n,o)=>{switch(e){case"fødsel":case"adopsjon":return n?{fornavn:te(t,o),etternavn:t.etternavn,erMorUfør:r.morErUfør,harRettPåForeldrepengerINorge:!!r.morHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:r.farMedmorErAleneOmOmsorg}:{fornavn:te(t,o),etternavn:t.etternavn,harRettPåForeldrepengerINorge:!!r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:r.farMedmorErAleneOmOmsorg||r.morErAleneOmOmsorg};default:return}},Ce=(e,r,t,n,o,d,l)=>{var E;if(d===void 0&&r===void 0||!l)return;const i=d!==void 0?e.find(s=>d.includes(s.fnr)&&s.annenForelder!==void 0):void 0,a=r!==void 0?e.find(s=>Pe(s.fødselsdato,r)&&s.annenForelder!==void 0):void 0,f=i||a;if(f!==void 0&&((E=f.annenForelder)==null?void 0:E.fnr)===l){const s=f.annenForelder,{fornavn:m}=s,v=m!==void 0&&m.trim()!==""?m:o.formatMessage({id:"annen.forelder"}),u={...s,fornavn:v};return ze(n,t,u,t.søkerErFarEllerMedmor,o)}},Fe=e=>e.fødselsdatoer!==void 0&&e.fødselsdatoer.length>0?{type:M.FØDT,antallBarn:e.antallBarn,fødselsdatoer:w(e.fødselsdatoer),termindato:de(e.termindato),fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0}:e.termindato!==void 0?{type:M.UFØDT,antallBarn:e.antallBarn,termindato:k(e.termindato).format(ve)}:{type:M.IKKE_UTFYLT,antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer?w(e.fødselsdatoer):[],fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0},We=e=>e.annenForelder!==void 0?{fornavn:e.annenForelder.fornavn,etternavn:e.annenForelder.etternavn,fnr:e.annenForelder.fnr,kanIkkeOppgis:!1}:{kanIkkeOppgis:!1},Ze=e=>{const r=Ne(e);if(r==="K")return"medmor";if(r==="M")return"far";throw new Error("Kan ikke utlede kjønn fra fødselsnummer.")},lr=e=>{const r=Fe(e),t=We(e);return{barn:r,annenForelder:t,erEndringssøknad:!1}},ce=(e,r,t,n,o,d)=>{const l=r!==void 0?r.fnr:void 0,i={fornavn:e.formatMessage({id:"annen.forelder"}),etternavn:"",fnr:l??"",harRettPåForeldrepengerINorge:t.søkerErFarEllerMedmor?t.morHarRett&&!t.harAnnenForelderTilsvarendeRettEØS:t.farMedmorHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,harRettPåForeldrepengerIEØS:t.harAnnenForelderTilsvarendeRettEØS,kanIkkeOppgis:!1,erMorUfør:t.søkerErFarEllerMedmor?t.morErUfør:void 0,erAleneOmOmsorg:t.farMedmorErAleneOmOmsorg||t.morErAleneOmOmsorg};return Ce(n,B(t.fødselsdato),t,o,e,d,l)||i},fr=(e,r,t,n)=>{var E;const o=Qe(e.sak,void 0,e.fødselsdatoer),{grunnlag:d}=o,l=ue(d.familiehendelseType),i=Fe(e),a=ce(r,(E=e.sak)==null?void 0:E.annenPart,d,t,l,e.fnr),f={barn:i,annenForelder:a,erEndringssøknad:!1,dekningsgrad:d.dekningsgrad};if(e.sak!==void 0){const s=e.sak.sakTilhørerMor?"mor":Ze(n),m={situasjon:e.sak.gjelderAdopsjon?"adopsjon":"fødsel",rolle:s};f.søkersituasjon=m}return f},mr=(e,r,t,n,o)=>{const{grunnlag:d,uttaksplan:l}=r,{dekningsgrad:i,familiehendelseType:a,søkerErFarEllerMedmor:f,ønskerJustertUttakVedFødsel:E}=d,s=ue(a);if(!s)return;const m=qe(s,d,o),v=Xe(e,s,d);if(!m||!v)return;const u=ce(t,n,d,e.barn,s,o==null?void 0:o.fnr);return{søkersituasjon:{situasjon:s,rolle:v},barn:m,annenForelder:{...u,erAleneOmOmsorg:f?d.farMedmorErAleneOmOmsorg:d.morErAleneOmOmsorg},erEndringssøknad:!0,dekningsgrad:i,uttaksplan:l,saksnummer:r.saksnummer,ønskerJustertUttakVedFødsel:E}};export{Y as D,N as R,fr as a,lr as b,ar as c,ir as d,sr as g,Qe as m,mr as o};
