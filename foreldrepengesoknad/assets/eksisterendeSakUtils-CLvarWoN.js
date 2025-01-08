import{d as k,I as Se}from"./dates-uONhOBCI.js";import{ag as ne,ah as U,ai as Q,aj as Te,ak as b,al as Re,am as C,U as h,e as c,an as W,ao as pe,ap as ge,aq as Ie,ar as F,as as O,at as T,au as K,av as y,aw as G,ax as p,ay as g,az as Oe,a8 as X,a9 as _e,Q as Pe,D as j,B as M,aA as H}from"./Uttaksplan-D3KRHfzI.js";import"./index-f9CH5uyH.js";import"./jsx-runtime-DCY474Ph.js";import{I as x,j as oe,G as de,H as w,e as Ne}from"./barnUtils-B9wLExDT.js";import{g as I}from"./guid-CsArkN6i.js";import{l as ve}from"./useFpNavigator-C1507vru.js";var B=(e=>(e.ÅTTI_PROSENT="ÅTTI",e.HUNDRE_PROSENT="HUNDRE",e))(B||{}),_=(e=>(e.ADOPSJON="ADPSJN",e.OMSORGSOVERTAKELSE="OMSRGO",e.FØDSEL="FODSL",e.TERM="TERM",e))(_||{}),P=(e=>(e.UttakFellesperiodeAnnenForelder="FELLESPERIODE_ANNEN_FORELDER",e.UttakFedrekvoteAnnenForelder="FEDREKVOTE_ANNEN_FORELDER",e.UttakMødrekvoteAnnenForelder="MØDREKVOTE_ANNEN_FORELDER",e.UttakForeldrepengerAnnenForelder="FORELDREPENGER_ANNEN_FORELDER",e.Ingen="INGEN",e))(P||{}),L=(e=>(e.AVSLAG_FRATREKK_PLEIEPENGER="AVSLAG_FRATREKK_PLEIEPENGER",e.AVSLAG_UTSETTELSE_TILBAKE_I_TID="AVSLAG_UTSETTELSE_TILBAKE_I_TID",e.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID="INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID",e.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER="AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER",e.ANNET="ANNET",e))(L||{}),v=(e=>(e.BARE_SØKER_RETT="BARE_SØKER_RETT",e.ALENEOMSORG="ALENEOMSORG",e.BEGGE_RETT="BEGGE_RETT",e))(v||{}),A=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SØKER_SYKDOM",e.InstitusjonSøker="SØKER_INNLAGT",e.InstitusjonBarnet="BARN_INNLAGT",e.HvØvelse="HV_ØVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(A||{}),J=(e=>(e.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",e.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",e.FRILANS="FRILANS",e.ANNET="ANNET",e))(J||{});const se=(e,r,t)=>{if(t!==void 0)return _.ADOPSJON;if(e!==void 0)return _.FØDSEL;if(r!==void 0)return _.TERM;throw new Error("Fødselsdato/ termindato/ omsorgsovertakelsedato mangler")},sr=(e,r,t)=>e?t.formatMessage({id:"adopsjon"}):r?t.formatMessage({id:"fødsel"}):t.formatMessage({id:"termin"}),Z=e=>b(e).getAntallUttaksdager()>0,Me=e=>Re(e.tidsperiode),Ue=(e,r,t)=>!!(k(e.tidsperiode.tom).isBefore(t)&&k(r.tidsperiode.tom).isBefore(t)||k(e.tidsperiode.fom).isSameOrAfter(t)&&k(r.tidsperiode.fom).isSameOrAfter(t)),Le=(e,r,t)=>{if(e.length<=1)return e;const n=[],o=e.filter(a=>U(a)),f=[...e.filter(a=>!U(a)),...o];let i={...f[0]};return f.forEach((a,l)=>{if(l!==0){if(i===void 0){i=a;return}if(b(i).erLik(a,!1,!0)&&b(i).erSammenhengende(a)&&!k(a.tidsperiode.fom).isSame(r,"day")&&Ue(i,a,r)&&!(t!==void 0&&k(a.tidsperiode.fom).isSame(t,"day"))){i.tidsperiode.tom=a.tidsperiode.tom;return}else n.push(i);i=a}}),n.push(i),n.sort(ne)},De=e=>{const{fom:r,tom:t}=e.tidsperiode,n=C(r),o=C(t);return n&&o?e:!n&&!o?{...e,tidsperiode:{fom:h(r).neste(),tom:h(t).forrige()}}:!n&&o?{...e,tidsperiode:{fom:h(r).neste(),tom:t}}:{...e,tidsperiode:{fom:r,tom:h(t).forrige()}}},N=(e,r)=>e.gjelderAnnenPart?r?G.mor:G.farMedmor:r?G.farMedmor:G.mor,ie=e=>{switch(e){case A.Arbeid:return p.Arbeid;case A.Ferie:return p.Ferie;case A.InstitusjonBarnet:return p.InstitusjonBarnet;case A.InstitusjonSøker:return p.InstitusjonSøker;case A.Sykdom:return p.Sykdom;case A.HvØvelse:return p.HvØvelse;case A.NavTiltak:return p.NavTiltak;case A.Fri:return p.Fri;default:return}},he=e=>{switch(e.kontoType){case c.Fedrekvote:return g.UttakFedrekvoteAnnenForelder;case c.Fellesperiode:return g.UttakFellesperiodeAnnenForelder;case c.Mødrekvote:return g.UttakMødrekvoteAnnenForelder;case c.Foreldrepenger:return g.UttakForeldrepengerAnnenForelder;case c.ForeldrepengerFørFødsel:return g.ForeldrepengerFørFødsel;default:return}},ae=(e,r,t)=>{if(e)return e.toString();if(r)return t?(100-t).toString():"100"},Ge=e=>e?c.AktivitetsfriKvote:c.Foreldrepenger,ye=(e,r,t,n)=>{if(e&&!r.flerbarnsdager&&!r.samtidigUttak&&k(r.periode.fom).isBefore(k(t).add(6,"weeks"),"day")&&n!==c.AktivitetsfriKvote&&r.morsAktivitet!==Oe.Uføre)return!0},je=(e,r,t)=>{var D;const n=e.gradering!==void 0&&e.resultat.innvilget,o=F(e.periode),d=r.søkerErFarEllerMedmor&&!r.morHarRett&&!r.farMedmorErAleneOmOmsorg&&!r.harAnnenForelderTilsvarendeRettEØS,f=t!==void 0?t.find(R=>(O(F(R.periode)).erLik(o)||O(F(R.periode)).overlapper(o))&&R.guid!==e.guid):void 0;let i;f&&(i=f.samtidigUttak);const a=ae(e.samtidigUttak,i,(D=e.gradering)==null?void 0:D.arbeidstidprosent),l=fe(e),{termindato:m,fødselsdato:s,omsorgsovertakelsesdato:u}=r,S=oe(m,s,u),E=d?Ge(e.resultat.trekkerMinsterett):e.kontoType;return{id:I(),type:T.Uttak,konto:E,tidsperiode:o,forelder:N(e,r.søkerErFarEllerMedmor),ønskerSamtidigUttak:e.samtidigUttak!==void 0,gradert:n,samtidigUttakProsent:a,ønskerFlerbarnsdager:r.antallBarn>1?e.flerbarnsdager:void 0,stillingsprosent:n?e.gradering.arbeidstidprosent.toString():void 0,arbeidsformer:n?[Be(e.gradering.aktivitet.type)]:void 0,orgnumre:n&&e.gradering.aktivitet.arbeidsgiver!==void 0?[e.gradering.aktivitet.arbeidsgiver.id]:void 0,morsAktivitetIPerioden:e.morsAktivitet,erMorForSyk:ye(r.søkerErFarEllerMedmor,e,S,E),angittAvAnnenPart:e.angittAvAnnenPart,opprinneligSøkt:l}},Ve=(e,r)=>({id:I(),type:T.Utsettelse,årsak:ie(e.utsettelseÅrsak),tidsperiode:F(e.periode),forelder:N(e,r),erArbeidstaker:!1,morsAktivitetIPerioden:e.morsAktivitet}),fe=e=>{if(e.resultat.årsak===L.AVSLAG_UTSETTELSE_TILBAKE_I_TID){if(e.utsettelseÅrsak===A.Ferie)return K.Ferie;if(e.utsettelseÅrsak===A.Arbeid)return K.Arbeid}if(e.resultat.årsak===L.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID)return K.Gradering},Ke=(e,r)=>{const t=fe(e);return{id:I(),type:T.Info,infotype:y.avslåttPeriode,tidsperiode:F(e.periode),avslåttPeriodeType:e.utsettelseÅrsak!==void 0?T.Utsettelse:T.Uttak,kontoType:e.kontoType,forelder:N(e,r),overskrives:!0,visPeriodeIPlan:!0,kanSlettes:e.resultat.årsak!==L.AVSLAG_FRATREKK_PLEIEPENGER,opprinneligSøkt:t}},He=(e,r,t,n)=>{var m;const o=F(e.periode);if(e.utsettelseÅrsak!==void 0&&e.resultat.innvilget===!0)return{type:T.Info,infotype:y.utsettelseAnnenPart,id:I(),årsak:ie(e.utsettelseÅrsak),tidsperiode:o,forelder:N(e,r),overskrives:!0,visPeriodeIPlan:!0};const d=n!==void 0&&!n.some(s=>(O(F(s.periode)).erLik(o)||O(F(s.periode)).overlapper(o))&&s.guid!==e.guid),f=he(e),i=n!==void 0?n.find(s=>(O(F(s.periode)).erLik(o)||O(F(s.periode)).overlapper(o))&&s.guid!==e.guid):void 0;let a;i&&(a=i.samtidigUttak);const l=ae(e.samtidigUttak,a,(m=e.gradering)==null?void 0:m.arbeidstidprosent);return Y(e,t)?{type:T.Info,infotype:y.avslåttPeriode,id:I(),tidsperiode:o,forelder:N(e,r),overskrives:!0,visPeriodeIPlan:d,kontoType:e.kontoType,avslåttPeriodeType:T.Uttak,kanSlettes:!1}:{type:T.Info,infotype:y.uttakAnnenPart,id:I(),årsak:f,tidsperiode:o,forelder:N(e,r),overskrives:!0,gradert:e.gradering!==void 0,ønskerSamtidigUttak:l!==void 0,samtidigUttakProsent:l,stillingsprosent:e.gradering!==void 0?e.gradering.arbeidstidprosent.toString():void 0,visPeriodeIPlan:d}},be=(e,r)=>({id:I(),forelder:N(e,r),konto:e.kontoType,tidsperiode:F(e.periode),type:T.Overføring,årsak:e.overføringÅrsak}),we=(e,r,t)=>{const n=t.filter(o=>!Y(o,r.termindato));return e.gjelderAnnenPart?He(e,r.søkerErFarEllerMedmor,r.termindato,n):e.resultat.innvilget?e.utsettelseÅrsak!==void 0?Ve(e,r.søkerErFarEllerMedmor):e.overføringÅrsak!==void 0?be(e,r.søkerErFarEllerMedmor):je(e,r,n):Ke(e,r.søkerErFarEllerMedmor)},Y=(e,r)=>r&&e.gjelderAnnenPart&&!e.resultat.innvilget&&e.resultat.trekkerDager&&k(e.periode.tom).isBefore(k(x(r)),"d")&&e.kontoType!==c.Fedrekvote,Je=(e,r)=>e.resultat.innvilget?!0:e.gjelderAnnenPart?!!Y(e,r):e.resultat.årsak!==L.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER&&e.resultat.trekkerDager===!0,xe=(e,r,t)=>{const n=[];return e.forEach(o=>{W(o.tidsperiode,r)&&pe(o)?ge(o,r).forEach(f=>n.push(f)):t!==void 0&&W(o.tidsperiode,t)?Ie(o,t).forEach(f=>n.push(f)):n.push(o)}),n},le=(e,r,t)=>{const n=e.filter(E=>Je(E,r.termindato)),o=n.map(E=>we(E,r,n)),d=new Date(r.familiehendelseDato),f=xe(o,d,t),i=Le([...f].sort(ne).filter(Z).map(De).filter(Me).filter(Z),d,t),a=!r.morHarRett&&r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,l=r.familiehendelseType===_.ADOPSJON,m=i.filter(E=>!U(E)),s=i.filter(E=>U(E)),u=!r.erDeltUttak&&a&&!r.farMedmorErAleneOmOmsorg,S=Q(m,u,d,l,a,r.søkerErFarEllerMedmor,t);return Q(Te(S,s,d,t),u,d,l,a,r.søkerErFarEllerMedmor,t)},Be=e=>{switch(e){case J.SELVSTENDIG_NÆRINGSDRIVENDE:return H.selvstendignæringsdrivende;case J.FRILANS:return H.frilans;default:return H.arbeidstaker}},$=e=>{switch(e){case P.UttakFedrekvoteAnnenForelder:return c.Fedrekvote;case P.UttakFellesperiodeAnnenForelder:return c.Fellesperiode;case P.UttakMødrekvoteAnnenForelder:return c.Mødrekvote;default:return}},Ye=e=>{switch(e){case P.UttakFedrekvoteAnnenForelder:return g.UttakFedrekvoteAnnenForelder;case P.UttakFellesperiodeAnnenForelder:return g.UttakFellesperiodeAnnenForelder;case P.UttakMødrekvoteAnnenForelder:return g.UttakMødrekvoteAnnenForelder;default:return}},ue=(e,r)=>{const{oppholdÅrsak:t}=e,n={guid:I(),periode:{fom:e.fom,tom:e.tom},gjelderAnnenPart:r,resultat:e.resultat,kontoType:e.kontoType,flerbarnsdager:e.flerbarnsdager,gradering:e.gradering,utsettelseÅrsak:e.utsettelseÅrsak,overføringÅrsak:e.overføringÅrsak,samtidigUttak:e.samtidigUttak,morsAktivitet:e.morsAktivitet,oppholdÅrsak:Ye(e.oppholdÅrsak)};return t!==void 0&&r===!1&&(n.gjelderAnnenPart=!0,n.kontoType=$(t)),t!==void 0&&r&&(n.gjelderAnnenPart=!1,n.angittAvAnnenPart=!0,n.kontoType=$(t)),n},ee=e=>e.resultat.innvilget,me=(e,r,t)=>{const n=t.filter(d=>e.guid!==d.guid&&O(F(e.periode)).erLik(F(d.periode)));if(n.length===0)return!0;const o=n.filter(ee);return!(ee(e)===!1&&o.length>0)},ir=e=>{if(!(e===void 0||e===""||Object.keys(e).length===0||e.perioder.length===0))return x(e.perioder[0].fom)},ar=(e,r,t,n,o)=>{if(e==null||e==="")return;const d=!0,f=e.perioder.map(u=>ue(u,d)).filter(me);let i;e.termindato!==void 0?i=e.termindato:(X(r)||_e(r))&&r.termindato!==void 0&&(i=r.termindato);const a=X(r)?r.fødselsdatoer[0]:void 0,l=Pe(r)?r.adopsjonsdato:void 0,m={dekningsgrad:e.dekningsgrad===B.HUNDRE_PROSENT?j.HUNDRE_PROSENT:j.ÅTTI_PROSENT,antallBarn:e.antallBarn?e.antallBarn:r.antallBarn,morErAleneOmOmsorg:!1,morErUfør:!1,morHarRett:!0,farMedmorErAleneOmOmsorg:!1,farMedmorHarRett:!0,søkerErFarEllerMedmor:t,termindato:i,fødselsdato:a,omsorgsovertakelsesdato:l,erDeltUttak:!0,erBarnetFødt:a!==void 0,familiehendelseDato:n,familiehendelseType:se(a,i,l),harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:void 0,barn:[]},s=le(f,m,o);return{saksnummer:"",erAnnenPartsSak:d,grunnlag:m,saksperioder:f,uttaksplan:s.filter(u=>U(u))}},qe=(e,r,t)=>{if(e==null)return;const n=!1,{dekningsgrad:o,familiehendelse:{fødselsdato:d,termindato:f,omsorgsovertakelse:i,antallBarn:a},harAnnenForelderTilsvarendeRettEØS:l,morUføretrygd:m,rettighetType:s,sakTilhørerMor:u,ønskerJustertUttakVedFødsel:S}=e,E=e.gjeldendeVedtak?e.gjeldendeVedtak.perioder:[],V=!u,D=t&&t.length>0?de(t[0]):void 0,R=d||D,q={dekningsgrad:o===B.HUNDRE_PROSENT?j.HUNDRE_PROSENT:j.ÅTTI_PROSENT,antallBarn:a,morErAleneOmOmsorg:u&&s===v.ALENEOMSORG,morErUfør:m,morHarRett:u||s===v.BEGGE_RETT,farMedmorErAleneOmOmsorg:!u&&s===v.ALENEOMSORG,farMedmorHarRett:!u||s===v.BEGGE_RETT,søkerErFarEllerMedmor:V,termindato:f,fødselsdato:R,omsorgsovertakelsesdato:i,erDeltUttak:s===v.BEGGE_RETT,erBarnetFødt:R!==void 0,familiehendelseDato:oe(f,R,i),familiehendelseType:se(R,f,i),ønskerJustertUttakVedFødsel:R===void 0?S:void 0,harAnnenForelderTilsvarendeRettEØS:l},z=E.map(ke=>ue(ke,n)).filter(me),Ae=le(z,q,r);return{saksnummer:e.saksnummer,erAnnenPartsSak:n,grunnlag:q,saksperioder:z,uttaksplan:Ae}},Ee=e=>e===_.TERM||e===_.FØDSEL?"fødsel":"adopsjon",ze=(e,r,t)=>{const{søkerErFarEllerMedmor:n}=t,o=e.kjønn==="K";switch(r){case"fødsel":case"adopsjon":return o?n?"medmor":"mor":"far";default:return}},re=(e,r)=>e!=null&&e.fødselsdatoer?w(e.fødselsdatoer):r.fødselsdato?Array(r.antallBarn).fill(r.fødselsdato):[],Qe=(e,r,t)=>{switch(e){case"fødsel":return r.fødselsdato?{type:M.FØDT,antallBarn:r.antallBarn,fødselsdatoer:re(t,r),termindato:r.termindato?r.termindato:void 0,fnr:t==null?void 0:t.fnr}:{type:M.UFØDT,antallBarn:r.antallBarn,termindato:r.termindato};case"adopsjon":return{type:M.ADOPTERT_STEBARN,adopsjonsdato:r.omsorgsovertakelsesdato,antallBarn:r.antallBarn,fødselsdatoer:re(t,r),fnr:t==null?void 0:t.fnr};default:return}},te=(e,r)=>e.fornavn!==void 0&&e.fornavn!==""?e.fornavn:r.formatMessage({id:"annen.forelder"}),Ce=(e,r,t,n,o)=>{switch(e){case"fødsel":case"adopsjon":return n?{fornavn:te(t,o),etternavn:t.etternavn,erMorUfør:r.morErUfør,harRettPåForeldrepengerINorge:!!r.morHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:r.farMedmorErAleneOmOmsorg}:{fornavn:te(t,o),etternavn:t.etternavn,harRettPåForeldrepengerINorge:!!r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,fnr:t.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,erAleneOmOmsorg:r.farMedmorErAleneOmOmsorg||r.morErAleneOmOmsorg};default:return}},We=(e,r,t,n,o,d,f)=>{var m;if(d===void 0&&r===void 0||!f)return;const i=d!==void 0?e.find(s=>d.includes(s.fnr)&&s.annenForelder!==void 0):void 0,a=r!==void 0?e.find(s=>Ne(s.fødselsdato,r)&&s.annenForelder!==void 0):void 0,l=i||a;if(l!==void 0&&((m=l.annenForelder)==null?void 0:m.fnr)===f){const s=l.annenForelder,{fornavn:u}=s,S=u!==void 0&&u.trim()!==""?u:o.formatMessage({id:"annen.forelder"}),E={...s,fornavn:S};return Ce(n,t,E,t.søkerErFarEllerMedmor,o)}},Fe=e=>e.fødselsdatoer!==void 0&&e.fødselsdatoer.length>0?{type:M.FØDT,antallBarn:e.antallBarn,fødselsdatoer:w(e.fødselsdatoer),termindato:de(e.termindato),fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0}:e.termindato!==void 0?{type:M.UFØDT,antallBarn:e.antallBarn,termindato:k(e.termindato).format(Se)}:{type:M.IKKE_UTFYLT,antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer?w(e.fødselsdatoer):[],fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(r=>!!r):void 0},Xe=e=>e.annenForelder!==void 0?{fornavn:e.annenForelder.fornavn,etternavn:e.annenForelder.etternavn,fnr:e.annenForelder.fnr,kanIkkeOppgis:!1}:{kanIkkeOppgis:!1},Ze=e=>{const r=ve(e);if(r==="K")return"medmor";if(r==="M")return"far";throw new Error("Kan ikke utlede kjønn fra fødselsnummer.")},fr=e=>{const r=Fe(e),t=Xe(e);return{barn:r,annenForelder:t,erEndringssøknad:!1}},ce=(e,r,t,n,o,d)=>{const f=r!==void 0?r.fnr:void 0,i={fornavn:e.formatMessage({id:"annen.forelder"}),etternavn:"",fnr:f??"",harRettPåForeldrepengerINorge:t.søkerErFarEllerMedmor?t.morHarRett&&!t.harAnnenForelderTilsvarendeRettEØS:t.farMedmorHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,harRettPåForeldrepengerIEØS:t.harAnnenForelderTilsvarendeRettEØS,kanIkkeOppgis:!1,erMorUfør:t.søkerErFarEllerMedmor?t.morErUfør:void 0,erAleneOmOmsorg:t.farMedmorErAleneOmOmsorg||t.morErAleneOmOmsorg};return We(n,x(t.fødselsdato),t,o,e,d,f)||i},lr=(e,r,t,n)=>{var m;const o=qe(e.sak,void 0,e.fødselsdatoer),{grunnlag:d}=o,f=Ee(d.familiehendelseType),i=Fe(e),a=ce(r,(m=e.sak)==null?void 0:m.annenPart,d,t,f,e.fnr),l={barn:i,annenForelder:a,erEndringssøknad:!1,dekningsgrad:d.dekningsgrad};if(e.sak!==void 0){const s=e.sak.sakTilhørerMor?"mor":Ze(n),u={situasjon:e.sak.gjelderAdopsjon?"adopsjon":"fødsel",rolle:s};l.søkersituasjon=u}return l},ur=(e,r,t,n,o)=>{const{grunnlag:d,uttaksplan:f}=r,{dekningsgrad:i,familiehendelseType:a,søkerErFarEllerMedmor:l,ønskerJustertUttakVedFødsel:m}=d,s=Ee(a);if(!s)return;const u=Qe(s,d,o),S=ze(e,s,d);if(!u||!S)return;const E=ce(t,n,d,e.barn,s,o==null?void 0:o.fnr);return{søkersituasjon:{situasjon:s,rolle:S},barn:u,annenForelder:{...E,erAleneOmOmsorg:l?d.farMedmorErAleneOmOmsorg:d.morErAleneOmOmsorg},erEndringssøknad:!0,dekningsgrad:i,uttaksplan:f,saksnummer:r.saksnummer,ønskerJustertUttakVedFødsel:m}};export{B as D,v as R,lr as a,fr as b,ar as c,ir as d,sr as g,qe as m,ur as o};
