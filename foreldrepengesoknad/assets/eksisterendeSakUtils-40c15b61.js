import{n as v,S as p,T as F,b as ye,i as Le,C as Ee,s as G,y as W,$ as _e,z as ke,j as je,w as H,f as b,A as q,P as T,d as z,G as ee,o as V,B as ie,I,Z as S,a7 as ve,v as B,U as O,a8 as te,V as Q}from"./dateUtils-becbdc23.js";import{D as Y}from"./Dekningsgrad-fced8842.js";import{g as A,d as k,i as $}from"./validationUtils-00d66cf2.js";import{P as R,s as C}from"./Periodene-072a4b27.js";import{F as w,a0 as h,M as Ge}from"./periodeUtils-8d84f94b.js";import{a as se,c as He,i as Ve,B as _}from"./useSøknad-54892a90.js";import"./jsx-runtime-670450c2.js";import"./index-7e4e529b.js";import"./index-f1f749bf.js";import{f as Ke}from"./velkommenUtils-40bb4bde.js";import{d as X}from"./getTypedFormComponents-a42e978b.js";var re=(e=>(e.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",e.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",e.FRILANS="FRILANS",e.ANNET="ANNET",e))(re||{}),D=(e=>(e.UttakFellesperiodeAnnenForelder="FELLESPERIODE_ANNEN_FORELDER",e.UttakFedrekvoteAnnenForelder="FEDREKVOTE_ANNEN_FORELDER",e.UttakMødrekvoteAnnenForelder="MØDREKVOTE_ANNEN_FORELDER",e.UttakForeldrepengerAnnenForelder="FORELDREPENGER_ANNEN_FORELDER",e.Ingen="INGEN",e))(D||{}),N=(e=>(e.ADOPSJON="ADPSJN",e.OMSORGSOVERTAKELSE="OMSRGO",e.FØDSEL="FODSL",e.TERM="TERM",e))(N||{});const ge=(e,t,r)=>{if(r!==void 0)return N.ADOPSJON;if(e!==void 0)return N.FØDSEL;if(t!==void 0)return N.TERM;throw new Error("Fødselsdato/ termindato/ omsorgsovertakelsedato mangler")};var U=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SØKER_SYKDOM",e.InstitusjonSøker="SØKER_INNLAGT",e.InstitusjonBarnet="BARN_INNLAGT",e.HvØvelse="HV_ØVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(U||{}),Fe=(e=>(e.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER="AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER",e.ANNET="ANNET",e))(Fe||{}),pe=(e=>(e.fridag="fridag",e.avslåttPeriode="avslåttPeriode",e))(pe||{});const be=(e,t)=>{const r=F(e.tidsperiode).getAntallUttaksdager(),o={...e,tidsperiode:{fom:e.tidsperiode.fom,tom:v(t.tidsperiode.fom).forrige()}},n=F(o.tidsperiode).getAntallUttaksdager(),i=r-n,d=v(t.tidsperiode.tom).neste();if(Ee(e)){const l={...e,id:A(),tidsperiode:{fom:t.tidsperiode.fom,tom:e.tidsperiode.tom}};return[o,t,l]}else{const l={...e,id:A(),tidsperiode:{fom:d,tom:v(d).leggTil(i-1)}};return[o,t,l]}},Ae=(e,t)=>{const r={...e,tidsperiode:{fom:e.tidsperiode.fom,tom:v(t).forrige()}},o={...e,id:A(),tidsperiode:{fom:v(r.tidsperiode.tom).neste(),tom:e.tidsperiode.tom}};return[r,o]},we=(e,t)=>{const r={...e,konto:e.konto==p.Foreldrepenger?p.AktivitetsfriKvote:e.konto,morsAktivitetIPerioden:e.konto==p.Foreldrepenger?void 0:e.morsAktivitetIPerioden,erMorForSyk:e.konto==p.Foreldrepenger?void 0:e.erMorForSyk,tidsperiode:{fom:e.tidsperiode.fom,tom:v(t).forrige()}},o={...e,id:A(),tidsperiode:{fom:v(r.tidsperiode.tom).neste(),tom:e.tidsperiode.tom}};return[r,o]},Je=(e,t)=>{if(R([e]).finnOverlappendePerioder(t).length>0){const r=[k(e.tidsperiode.fom),k(e.tidsperiode.tom),k(t.tidsperiode.fom),k(t.tidsperiode.tom)],o=k.min(r),n=k.max(r),i=r.filter(d=>d!==o&&d!==n);return F({fom:k.min(i).toDate(),tom:k.max(i).toDate()}).getAntallUttaksdager()}return 0},Ot=({perioder:e,nyPeriode:t,familiehendelsesdato:r,harAktivitetskravIPeriodeUtenUttak:o,erAdopsjon:n,bareFarHarRett:i,erFarEllerMedmor:d,førsteUttaksdagNesteBarnsSak:l})=>{if(e.length===0)return[t];const s=t.tidsperiode.fom,f=t.tidsperiode.tom;if(k(s).isBefore(r,"day")&&k(f).isSameOrAfter(r,"day"))return[...e];const u=e.find(a=>F(a.tidsperiode).inneholderDato(s));if(u){if(ye(u)||Le(u))return[...e];const a=R(e).finnAlleForegåendePerioder(u),m=R(e).finnAllePåfølgendePerioder(u),c=F(t.tidsperiode).getAntallUttaksdager();if(k(u.tidsperiode.fom).isSame(s))return[...a,t,...R([u,...m]).forskyvPerioder(c)];const E=be(u,t);return Ee(u)?[...a,E[0],E[1],...R([E[2],...m]).forskyvPerioder(c)]:[...a,...E,...R(m).forskyvPerioder(c)]}else{const a=e[0],m=e[e.length-1],c=k(t.tidsperiode.fom),E=k(t.tidsperiode.tom);if(c.isBefore(a.tidsperiode.fom,"day")){const g=de(t.tidsperiode,a.tidsperiode);if(E.isSameOrAfter(a.tidsperiode.fom,"day")){if(c.isBefore(r,"day"))return[...e];const P=Je(a,t);return[t,...R(e).forskyvPerioder(P)]}return g?[t,...x(g,o,r,n,i,d,l),...e]:[t,...e]}else{const g=de(m.tidsperiode,t.tidsperiode);return g?[...e,...x(g,o,r,n,i,d,l),t]:[...e,t].sort(C)}}},Be=(e,t,r,o)=>{if(e.length<=1)return e;const n=[];let i={...e[0]};return e.forEach((d,l)=>{if(l!==0){if(i===void 0){i=d;return}if(H(i).erLik(d,!1,!0)&&H(i).erSammenhengende(d)){if(o&&G(d)&&d.ønskerSamtidigUttak&&G(i)&&i.ønskerSamtidigUttak){const f=R(o).finnOverlappendePerioder(i),u=R(o).finnOverlappendePerioder(d);if(u.length===0&&f.length>0||u.length>0&&f.length===0){n.push(i),i=d;return}}if(k(i.tidsperiode.tom).isBefore(t,"day")&&k(d.tidsperiode.tom).isSameOrAfter(v(t).denneEllerNeste())||r!==void 0&&k(i.tidsperiode.tom).isBefore(r,"day")&&k(d.tidsperiode.fom).isSameOrAfter(v(r).denneEllerNeste(),"day")){n.push(i),i=d;return}const s={fom:i.tidsperiode.fom,tom:d.tidsperiode.tom};i.tidsperiode={...s};return}else n.push(i);i=d}}),n.push(i),n},J=(e,t)=>t!==void 0&&ee(e.tidsperiode,t)?Ae(e,t):[e],x=(e,t,r,o,n,i,d,l=pe.fridag)=>{if(b(r)){const u=v(r).denneEllerNeste(),a=v(u).leggTil(30),m=F(e).erInnenforFørsteSeksUker(r),c=k(e.fom).isBefore(a,"day")&&!o&&(n&&b(r)||i&&q(r));if(t&&!c)return J(j(e,l),d);if(k(e.fom).isBefore(r,"day"))return J(y(e),d);if(m&&!o){if(k(e.tom).isBefore(a,"day"))return n&&b(r)||i&&q(r)?[y(e)]:[j(e,l)];const E=F({fom:e.fom,tom:a}).getAntallUttaksdager()-2,g=F(e).getAntallUttaksdager()-E,P={fom:e.fom,tom:v(a).leggTil(-1)},K={fom:a,tom:v(a).leggTil(g-2)};if(n&&b(r)||i&&q(r)){if(i&&!n)return[y(e)];const Ne=y(P),Me=j(K,l);return[Ne,Me]}const Z=j(P,l),De=y(K);return[Z,De]}return J(y(e),d)}return J(j(e,l),d)},j=(e,t)=>({id:A(),type:T.Hull,tidsperiode:e,årsak:t}),y=e=>({id:A(),type:T.PeriodeUtenUttak,tidsperiode:e}),de=(e,t)=>{const r={fom:v(e.tom).neste(),tom:v(t.fom).forrige()},o=F(r).getAntallUttaksdager();if(z(r)&&o>0)return r},ht=e=>e.reduce((t,r,o)=>o===0&&W(r)?t:o===e.length-1?(ke(r)||W(r)||t.push(r),t):(t.push(r),t),[]),ae=(e,t,r,o,n,i,d)=>e.length===0?e:e.reduce((s,f,u)=>{if(u===0&&i){const E=v(r).denneEllerNeste();if(k(E).isBefore(f.tidsperiode.fom)){const g={fom:E,tom:v(f.tidsperiode.fom).forrige()};F(g).getAntallUttaksdager()>0&&s.push(...x(g,t,r,o,n,i,d))}}if(s.push(f),u===e.length-1)return s;const a=e[u+1],m={fom:v(f.tidsperiode.tom).neste(),tom:v(a.tidsperiode.fom).forrige()};return k(m.tom).isBefore(m.fom,"day")||!i&&k(m.tom).isBefore(r,"day")||F(m).getAntallUttaksdager()>0&&s.push(...x(m,t,r,o,n,i,d)),s},[]),le=(e,t)=>{const r=t.filter(n=>F(e.tidsperiode).inneholderDato(n.dato)),o=[];return r.length===2?[e]:(r.forEach((n,i)=>{if(i===0){o.push({...e,tidsperiode:{fom:n.dato,tom:void 0}});return}o[i-1].tidsperiode.tom=n.erFom?v(n.dato).forrige():n.dato,i<r.length-1&&o.push({...e,id:A(),tidsperiode:{fom:n.erFom?n.dato:v(n.dato).neste(),tom:void 0}})}),o.filter(n=>z(n.tidsperiode)))},Ye=(e,t)=>{const r=e.filter(s=>z(s.tidsperiode)).reduce((s,f)=>(s.push({dato:f.tidsperiode.fom,erFom:!0}),s.push({dato:f.tidsperiode.tom,erFom:!1}),s),[]),o=t.reduce((s,f)=>(s.push({dato:f.tidsperiode.fom,erFom:!0}),s.push({dato:f.tidsperiode.tom,erFom:!1}),s),[]),i=r.concat(o).sort((s,f)=>{if(s.dato.getTime()-f.dato.getTime()===0){if(!s.erFom)return 1;if(!f.erFom)return-1}return s.dato.getTime()-f.dato.getTime()}).filter((s,f,u)=>u.findIndex(a=>a.dato.getTime()===s.dato.getTime()&&a.erFom===s.erFom)===f),d=[],l=[];return e.forEach(s=>{const f=le(s,i);d.push(...f)}),t.forEach(s=>{const f=le(s,i);l.push(...f)}),{normaliserteEgnePerioder:d,normaliserteAnnenPartsPerioder:l}},$e=(e,t,r,o,n=!1)=>{if(t.length===0)return e;if(e.length===0)return t;const{normaliserteEgnePerioder:i,normaliserteAnnenPartsPerioder:d}=Ye(e,t),l=i.reduce((m,c)=>{const E=R(d).finnOverlappendePerioder(c);if(E.length===0)return G(c)&&c.ønskerSamtidigUttak&&n?(m.push({...c,ønskerSamtidigUttak:!1}),m):(m.push(c),m);if(W(c)||_e(c)||ke(c)){const g=E[0];return m.push({...g,visPeriodeIPlan:!0}),m}if(G(c)&&c.ønskerSamtidigUttak){const g=E[0];return m.push(c),je(g)||m.push({...g,visPeriodeIPlan:!1,ønskerSamtidigUttak:!0}),m}else return m.push(c),m},[]);l.sort(C);const s=e[0].tidsperiode.fom,f=d.filter(m=>k(m.tidsperiode.tom).isBefore(s,"day")),u=e[e.length-1].tidsperiode.tom,a=d.filter(m=>k(m.tidsperiode.fom).isAfter(u,"day"));return Be([...f,...l,...a],r,o,t)},fe=e=>H(e).getAntallUttaksdager()>0,xe=e=>z(e.tidsperiode),ze=(e,t,r)=>{if(e.length<=1)return e;const o=[],n=e.filter(s=>V(s)),d=[...e.filter(s=>!V(s)),...n];let l={...d[0]};return d.forEach((s,f)=>{if(f!==0){if(l===void 0){l=s;return}if(H(l).erLik(s,!1,!0)&&H(l).erSammenhengende(s)&&!k(s.tidsperiode.fom).isSame(t,"day")&&!(r!==void 0&&k(s.tidsperiode.fom).isSame(r,"day"))){l.tidsperiode.tom=s.tidsperiode.tom;return}else o.push(l);l=s}}),o.push(l),o.sort(C)},Ce=e=>{const{fom:t,tom:r}=e.tidsperiode,o=ie(t),n=ie(r);return o&&n?e:!o&&!n?{...e,tidsperiode:{fom:v(t).neste(),tom:v(r).forrige()}}:!o&&n?{...e,tidsperiode:{fom:v(t).neste(),tom:r}}:{...e,tidsperiode:{fom:t,tom:v(r).forrige()}}},M=(e,t)=>e.gjelderAnnenPart?t?w.mor:w.farMedmor:t?w.farMedmor:w.mor,Pe=e=>{switch(e){case U.Arbeid:return O.Arbeid;case U.Ferie:return O.Ferie;case U.InstitusjonBarnet:return O.InstitusjonBarnet;case U.InstitusjonSøker:return O.InstitusjonSøker;case U.Sykdom:return O.Sykdom;case U.HvØvelse:return O.HvØvelse;case U.NavTiltak:return O.NavTiltak;case U.Fri:return O.Fri;default:return}},Ze=e=>{switch(e.kontoType){case p.Fedrekvote:return h.UttakFedrekvoteAnnenForelder;case p.Fellesperiode:return h.UttakFellesperiodeAnnenForelder;case p.Mødrekvote:return h.UttakMødrekvoteAnnenForelder;case p.Foreldrepenger:return h.UttakForeldrepengerAnnenForelder;case p.ForeldrepengerFørFødsel:return h.ForeldrepengerFørFødsel;default:return}},Se=(e,t,r)=>{if(e)return e.toString();if(t)return r?(100-r).toString():"100"},qe=e=>e?p.AktivitetsfriKvote:p.Foreldrepenger,Qe=(e,t,r,o)=>{if(e&&!t.flerbarnsdager&&!t.samtidigUttak&&k(t.periode.fom).isBefore(k(r).add(6,"weeks"),"day")&&o!==p.AktivitetsfriKvote&&t.morsAktivitet!==Ge.Uføre)return!0},Xe=(e,t,r)=>{var g;const o=e.gradering!==void 0&&e.resultat.innvilget,n=S(e.periode),i=t.søkerErFarEllerMedmor&&!t.morHarRett&&!t.farMedmorErAleneOmOmsorg&&!t.harAnnenForelderTilsvarendeRettEØS,d=r!==void 0?r.find(P=>(F(S(P.periode)).erLik(n)||F(S(P.periode)).overlapper(n))&&P.guid!==e.guid):void 0;let l;d&&(l=d.samtidigUttak);const s=Se(e.samtidigUttak,l,(g=e.gradering)==null?void 0:g.arbeidstidprosent),{termindato:f,fødselsdato:u,omsorgsovertakelsesdato:a}=t,m=ve(f,u,a),c=i?qe(e.resultat.trekkerMinsterett):e.kontoType;return{id:A(),type:T.Uttak,konto:c,tidsperiode:n,forelder:M(e,t.søkerErFarEllerMedmor),ønskerSamtidigUttak:e.samtidigUttak!==void 0,gradert:o,samtidigUttakProsent:s,ønskerFlerbarnsdager:t.antallBarn>1?e.flerbarnsdager:void 0,stillingsprosent:o?e.gradering.arbeidstidprosent.toString():void 0,arbeidsformer:o?[st(e.gradering.aktivitet.type)]:void 0,orgnumre:o&&e.gradering.aktivitet.arbeidsgiver!==void 0?[e.gradering.aktivitet.arbeidsgiver.id]:void 0,morsAktivitetIPerioden:e.morsAktivitet,erMorForSyk:Qe(t.søkerErFarEllerMedmor,e,m,c),angittAvAnnenPart:e.angittAvAnnenPart}},We=(e,t)=>({id:A(),type:T.Utsettelse,årsak:Pe(e.utsettelseÅrsak),tidsperiode:S(e.periode),forelder:M(e,t),erArbeidstaker:!1,morsAktivitetIPerioden:e.morsAktivitet}),et=(e,t)=>({id:A(),type:T.Info,infotype:B.avslåttPeriode,tidsperiode:S(e.periode),avslåttPeriodeType:e.utsettelseÅrsak!==void 0?T.Utsettelse:T.Uttak,kontoType:e.kontoType,forelder:M(e,t),overskrives:!0,visPeriodeIPlan:!0}),tt=(e,t,r,o)=>{var u;const n=S(e.periode);if(e.utsettelseÅrsak!==void 0&&e.resultat.innvilget===!0)return{type:T.Info,infotype:B.utsettelseAnnenPart,id:A(),årsak:Pe(e.utsettelseÅrsak),tidsperiode:n,forelder:M(e,t),overskrives:!0,visPeriodeIPlan:!0};const i=o!==void 0&&!o.some(a=>(F(S(a.periode)).erLik(n)||F(S(a.periode)).overlapper(n))&&a.guid!==e.guid),d=Ze(e),l=o!==void 0?o.find(a=>(F(S(a.periode)).erLik(n)||F(S(a.periode)).overlapper(n))&&a.guid!==e.guid):void 0;let s;l&&(s=l.samtidigUttak);const f=Se(e.samtidigUttak,s,(u=e.gradering)==null?void 0:u.arbeidstidprosent);return oe(e,r)?{type:T.Info,infotype:B.avslåttPeriode,id:A(),tidsperiode:n,forelder:M(e,t),overskrives:!0,visPeriodeIPlan:i,kontoType:p.Fellesperiode,avslåttPeriodeType:T.Uttak}:{type:T.Info,infotype:B.uttakAnnenPart,id:A(),årsak:d,tidsperiode:n,forelder:M(e,t),overskrives:!0,gradert:e.gradering!==void 0,ønskerSamtidigUttak:f!==void 0,samtidigUttakProsent:f,stillingsprosent:e.gradering!==void 0?e.gradering.arbeidstidprosent.toString():void 0,visPeriodeIPlan:i}},rt=(e,t)=>({id:A(),forelder:M(e,t),konto:e.kontoType,tidsperiode:S(e.periode),type:T.Overføring,årsak:e.overføringÅrsak}),ot=(e,t,r)=>{const o=r.filter(n=>!oe(n,t.termindato));return e.gjelderAnnenPart?tt(e,t.søkerErFarEllerMedmor,t.termindato,o):e.resultat.innvilget?e.utsettelseÅrsak!==void 0?We(e,t.søkerErFarEllerMedmor):e.overføringÅrsak!==void 0?rt(e,t.søkerErFarEllerMedmor):Xe(e,t,o):et(e,t.søkerErFarEllerMedmor)},oe=(e,t)=>t&&e.gjelderAnnenPart&&!e.resultat.innvilget&&k(e.periode.tom).isBefore(k(I(t)),"d")&&e.kontoType!==p.Fedrekvote,nt=(e,t)=>e.resultat.innvilget?!0:e.gjelderAnnenPart?!!oe(e,t):e.resultat.årsak!==Fe.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER&&e.resultat.trekkerDager===!0,it=(e,t,r)=>{const o=[];return e.forEach(n=>{ee(n.tidsperiode,t)&&G(n)?we(n,t).forEach(d=>o.push(d)):r!==void 0&&ee(n.tidsperiode,r)?Ae(n,r).forEach(d=>o.push(d)):o.push(n)}),o},Te=(e,t,r)=>{const o=e.filter(E=>nt(E,t.termindato)),n=o.map(E=>ot(E,t,o)),i=new Date(t.familiehendelseDato),d=it(n,i,r),l=ze([...d].sort(C).filter(fe).map(Ce).filter(xe).filter(fe),i,r),s=!t.morHarRett&&t.farMedmorHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,f=t.familiehendelseType===N.ADOPSJON,u=l.filter(E=>!V(E)),a=l.filter(E=>V(E)),m=!t.erDeltUttak&&s&&!t.farMedmorErAleneOmOmsorg,c=ae(u,m,i,f,s,t.søkerErFarEllerMedmor,r);return ae($e(c,a,i,r),m,i,f,s,t.søkerErFarEllerMedmor,r)};var ne=(e=>(e.ÅTTI_PROSENT="ÅTTI",e.HUNDRE_PROSENT="HUNDRE",e))(ne||{}),L=(e=>(e.BARE_SØKER_RETT="BARE_SØKER_RETT",e.ALENEOMSORG="ALENEOMSORG",e.BEGGE_RETT="BEGGE_RETT",e))(L||{});const st=e=>{switch(e){case re.SELVSTENDIG_NÆRINGSDRIVENDE:return Q.selvstendignæringsdrivende;case re.FRILANS:return Q.frilans;default:return Q.arbeidstaker}},me=e=>{switch(e){case D.UttakFedrekvoteAnnenForelder:return p.Fedrekvote;case D.UttakFellesperiodeAnnenForelder:return p.Fellesperiode;case D.UttakMødrekvoteAnnenForelder:return p.Mødrekvote;default:return}},dt=e=>{switch(e){case D.UttakFedrekvoteAnnenForelder:return h.UttakFedrekvoteAnnenForelder;case D.UttakFellesperiodeAnnenForelder:return h.UttakFellesperiodeAnnenForelder;case D.UttakMødrekvoteAnnenForelder:return h.UttakMødrekvoteAnnenForelder;default:return}},Re=(e,t)=>{const{oppholdÅrsak:r}=e,o={guid:A(),periode:{fom:e.fom,tom:e.tom},gjelderAnnenPart:t,resultat:e.resultat,kontoType:e.kontoType,flerbarnsdager:e.flerbarnsdager,gradering:e.gradering,utsettelseÅrsak:e.utsettelseÅrsak,overføringÅrsak:e.overføringÅrsak,samtidigUttak:e.samtidigUttak,morsAktivitet:e.morsAktivitet,oppholdÅrsak:dt(e.oppholdÅrsak)};return r!==void 0&&t===!1&&(o.gjelderAnnenPart=!0,o.kontoType=me(r)),r!==void 0&&t&&(o.gjelderAnnenPart=!1,o.angittAvAnnenPart=!0,o.kontoType=me(r)),o},ue=e=>e.resultat.innvilget,Ue=(e,t,r)=>{const o=r.filter(i=>e.guid!==i.guid&&F(S(e.periode)).erLik(S(i.periode)));if(o.length===0)return!0;const n=o.filter(ue);return!(ue(e)===!1&&n.length>0)},It=e=>{if(!(e===void 0||e===""||Object.keys(e).length===0||e.perioder.length===0))return I(e.perioder[0].fom)},Dt=(e,t,r,o,n)=>{if(e===void 0||e===""||Object.keys(e).length===0)return;const i=!0,d=e.perioder.map(m=>Re(m,i)).filter(Ue);let l;e.termindato!==void 0?l=e.termindato:(se(t)||He(t))&&t.termindato!==void 0&&(l=X(t.termindato));const s=se(t)?X(t.fødselsdatoer[0]):void 0,f=Ve(t)?X(t.adopsjonsdato):void 0,u={dekningsgrad:e.dekningsgrad===ne.HUNDRE_PROSENT?Y.HUNDRE_PROSENT:Y.ÅTTI_PROSENT,antallBarn:e.antallBarn?e.antallBarn:t.antallBarn,morErAleneOmOmsorg:!1,morErUfør:!1,morHarRett:!0,farMedmorErAleneOmOmsorg:!1,farMedmorHarRett:!0,søkerErFarEllerMedmor:r,termindato:l,fødselsdato:s,omsorgsovertakelsesdato:f,erDeltUttak:!0,erBarnetFødt:s!==void 0,familiehendelseDato:o,familiehendelseType:ge(s,l,f),harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:void 0,barn:[]},a=Te(d,u,n);return{saksnummer:"",erAnnenPartsSak:i,grunnlag:u,saksperioder:d,uttaksplan:a.filter(m=>V(m))}},at=(e,t)=>{if(e===void 0||e===""||Object.keys(e).length===0)return;const r=!1,{dekningsgrad:o,familiehendelse:{fødselsdato:n,termindato:i,omsorgsovertakelse:d,antallBarn:l},harAnnenForelderTilsvarendeRettEØS:s,morUføretrygd:f,rettighetType:u,sakTilhørerMor:a,ønskerJustertUttakVedFødsel:m}=e,c=e.gjeldendeVedtak?e.gjeldendeVedtak.perioder:[],E=!a,g={dekningsgrad:o===ne.HUNDRE_PROSENT?Y.HUNDRE_PROSENT:Y.ÅTTI_PROSENT,antallBarn:l,morErAleneOmOmsorg:a&&u===L.ALENEOMSORG,morErUfør:f,morHarRett:a||u===L.BEGGE_RETT,farMedmorErAleneOmOmsorg:!a&&u===L.ALENEOMSORG,farMedmorHarRett:!a||u===L.BEGGE_RETT,søkerErFarEllerMedmor:E,termindato:i,fødselsdato:n,omsorgsovertakelsesdato:d,erDeltUttak:u===L.BEGGE_RETT,erBarnetFødt:n!==void 0,familiehendelseDato:ve(i,n,d),familiehendelseType:ge(n,i,d),ønskerJustertUttakVedFødsel:n===void 0?m:void 0,harAnnenForelderTilsvarendeRettEØS:s},P=c.map(Z=>Re(Z,r)).filter(Ue),K=Te(P,g,t);return{saksnummer:e.saksnummer,erAnnenPartsSak:r,grunnlag:g,saksperioder:P,uttaksplan:K}},Oe=e=>e===N.TERM||e===N.FØDSEL?"fødsel":"adopsjon",lt=(e,t)=>({erAleneOmOmsorg:t?e.farMedmorErAleneOmOmsorg:e.morErAleneOmOmsorg}),ft=(e,t,r)=>{const{søkerErFarEllerMedmor:o}=r,n=e.kjønn==="K";switch(t){case"fødsel":case"adopsjon":return n?o?"medmor":"mor":"far";default:return}},ce=(e,t)=>e&&e.fødselsdatoer?te(e.fødselsdatoer):t.fødselsdato?Array(t.antallBarn).fill(I(t.fødselsdato)):[],mt=(e,t,r)=>{switch(e){case"fødsel":return t.fødselsdato?{type:_.FØDT,antallBarn:t.antallBarn,fødselsdatoer:ce(r,t),termindato:t.termindato?I(t.termindato):void 0,fnr:r==null?void 0:r.fnr}:{type:_.UFØDT,antallBarn:t.antallBarn,termindato:I(t.termindato),terminbekreftelse:[]};case"adopsjon":return{type:_.ADOPTERT_STEBARN,adopsjonsdato:I(t.omsorgsovertakelsesdato),antallBarn:t.antallBarn,fødselsdatoer:ce(r,t),omsorgsovertakelse:[],fnr:r==null?void 0:r.fnr};default:return}},ut=(e,t,r,o,n)=>{switch(e){case"fødsel":case"adopsjon":return o?{fornavn:r.fornavn!==void 0&&r.fornavn!==""?r.fornavn:$(n,"annen.forelder"),etternavn:r.etternavn,erUfør:t.morErUfør,harRettPåForeldrepengerINorge:!!t.morHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,fnr:r.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:t.harAnnenForelderTilsvarendeRettEØS}:{fornavn:r.fornavn!==void 0&&r.fornavn!==""?r.fornavn:$(n,"annen.forelder"),etternavn:r.etternavn,harRettPåForeldrepengerINorge:!!t.farMedmorHarRett&&!t.harAnnenForelderTilsvarendeRettEØS,fnr:r.fnr,kanIkkeOppgis:!1,harRettPåForeldrepengerIEØS:t.harAnnenForelderTilsvarendeRettEØS};default:return}},ct=(e,t,r,o,n,i,d)=>{var u;if(i===void 0&&t===void 0||!d)return;const l=i!==void 0?e.find(a=>i.includes(a.fnr)&&a.annenForelder!==void 0):void 0,s=t!==void 0?e.find(a=>Ke(a.fødselsdato,t)&&a.annenForelder!==void 0):void 0,f=l||s;if(f!==void 0&&((u=f.annenForelder)==null?void 0:u.fnr)===d){const a=f.annenForelder,{fornavn:m}=a,c=m!==void 0&&m.trim()!==""?m:$(n,"annen.forelder"),E={...a,fornavn:c};return ut(o,r,E,r.søkerErFarEllerMedmor,n)}},he=e=>e.fødselsdatoer!==void 0&&e.fødselsdatoer.length>0?{type:_.FØDT,antallBarn:e.antallBarn,fødselsdatoer:te(e.fødselsdatoer),fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(t=>!!t):void 0}:e.termindato!==void 0?{type:_.UFØDT,antallBarn:e.antallBarn,termindato:e.termindato}:{type:_.IKKE_UTFYLT,antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer?te(e.fødselsdatoer):[],fnr:e.fnr!==void 0&&e.fnr.length>0?e.fnr.filter(t=>!!t):void 0},Et=e=>e.annenForelder!==void 0?{fornavn:e.annenForelder.fornavn,etternavn:e.annenForelder.etternavn,fnr:e.annenForelder.fnr,kanIkkeOppgis:!1}:{kanIkkeOppgis:!1},Nt=e=>{const t=he(e),r=Et(e);return{barn:t,annenForelder:r,erEndringssøknad:!1}},Ie=(e,t,r,o,n,i)=>{const d=t!==void 0?t.fnr:void 0,l={fornavn:$(e,"annen.forelder"),etternavn:"",fnr:d||"",harRettPåForeldrepengerINorge:r.søkerErFarEllerMedmor?!!r.morHarRett&&!r.harAnnenForelderTilsvarendeRettEØS:!!r.farMedmorHarRett&&!r.harAnnenForelderTilsvarendeRettEØS,harRettPåForeldrepengerIEØS:r.harAnnenForelderTilsvarendeRettEØS,kanIkkeOppgis:!1,erUfør:r.søkerErFarEllerMedmor?r.morErUfør:void 0};return ct(o.registrerteBarn,I(r.fødselsdato),r,n,e,i,d)||l},Mt=(e,t,r)=>{var f;const o=at(e.sak,void 0),{grunnlag:n}=o,i=Oe(n.familiehendelseType),d=he(e),l=Ie(t,(f=e.sak)==null?void 0:f.annenPart,n,r,i,e.fnr),s={barn:d,annenForelder:l,erEndringssøknad:!1};if(e.sak!==void 0){const u={situasjon:e.sak.gjelderAdopsjon?"adopsjon":"fødsel",rolle:e.sak.sakTilhørerMor?void 0:"far"};s.søkersituasjon=u}return s},yt=(e,t,r,o,n)=>{const{grunnlag:i,uttaksplan:d}=t,{dekningsgrad:l,familiehendelseType:s,søkerErFarEllerMedmor:f,ønskerJustertUttakVedFødsel:u}=i,a=Oe(s);if(!a)return;const m=lt(i,f),c=mt(a,i,n),E=ft(e.person,a,i);if(!c||!E)return;const g=Ie(r,o,i,e,a,n==null?void 0:n.fnr);return{søker:m,søkersituasjon:{situasjon:a,rolle:E},barn:c,annenForelder:g,erEndringssøknad:!0,dekningsgrad:l,uttaksplan:d,saksnummer:t.saksnummer,ønskerJustertUttakVedFødsel:u}};export{ne as D,L as R,$e as a,ht as b,we as c,Ae as d,It as e,ae as f,x as g,at as h,Mt as i,Nt as j,Ot as l,Dt as m,Ye as n,yt as o,Be as s};
//# sourceMappingURL=eksisterendeSakUtils-40c15b61.js.map
