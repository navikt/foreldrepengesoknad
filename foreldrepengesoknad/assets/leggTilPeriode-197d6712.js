import{U as p,d as m,D as U,E as h,J as y,g as v,K,N as z}from"./Tidsperioden-bc4aa89e.js";import"./jsx-runtime-69eee039.js";import{a as T,i as I,b as L,c as C,d as G,e as Q,s as R,h as N,P as j,S as F,j as X,k as Y,l as H}from"./Periodene-3e3b4ab3.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";var Z=(t=>(t.ÅTTI_PROSENT="80",t.HUNDRE_PROSENT="100",t))(Z||{}),J=(t=>(t.fridag="fridag",t.avslåttPeriode="avslåttPeriode",t))(J||{});const $=(t,e,o,n)=>{if(t.length<=1)return t;const d=[];let r={...t[0]};return t.forEach((s,c)=>{if(c!==0){if(r===void 0){r=s;return}if(N(r).erLik(s,!1,!0)&&N(r).erSammenhengende(s)){if(n&&I(s)&&s.ønskerSamtidigUttak&&I(r)&&r.ønskerSamtidigUttak){const l=T(n).finnOverlappendePerioder(r),u=T(n).finnOverlappendePerioder(s);if(u.length===0&&l.length>0||u.length>0&&l.length===0){d.push(r),r=s;return}}if(m(r.tidsperiode.tom).isBefore(e,"day")&&m(s.tidsperiode.tom).isSameOrAfter(p(e).denneEllerNeste())||o!==void 0&&m(r.tidsperiode.tom).isBefore(o,"day")&&m(s.tidsperiode.fom).isSameOrAfter(p(o).denneEllerNeste(),"day")){d.push(r),r=s;return}const i={fom:r.tidsperiode.fom,tom:s.tidsperiode.tom};r.tidsperiode={...i};return}else d.push(r);r=s}}),d.push(r),d},O=(t,e)=>e!==void 0&&z(t.tidsperiode,e)?tt(t,e):[t],E=(t,e,o,n,d,r,s,c=J.fridag)=>{if(h(o)){const u=p(o).denneEllerNeste(),a=p(u).leggTil(30),f=U(t).erInnenforFørsteSeksUker(o),g=m(t.fom).isBefore(a,"day")&&!n&&(d&&h(o)||r&&y(o));if(e&&!g)return O(S(t,c),s);if(m(t.fom).isBefore(o,"day"))return O(A(t),s);if(f&&!n){if(m(t.tom).isBefore(a,"day"))return d&&h(o)||r&&y(o)?[A(t)]:[S(t,c)];const P=U({fom:t.fom,tom:a}).getAntallUttaksdager()-2,k=U(t).getAntallUttaksdager()-P,D={fom:t.fom,tom:p(a).leggTil(-1)},_={fom:a,tom:p(a).leggTil(k-2)};if(d&&h(o)||r&&y(o)){if(r&&!d)return[A(t)];const w=A(D),x=S(_,c);return[w,x]}const V=S(D,c),q=A(_);return[V,q]}return O(A(t),s)}return O(S(t,c),s)},S=(t,e)=>({id:v(),type:j.Hull,tidsperiode:t,årsak:e}),A=t=>({id:v(),type:j.PeriodeUtenUttak,tidsperiode:t}),B=(t,e)=>{const o={fom:p(t.tom).neste(),tom:p(e.fom).forrige()},n=U(o).getAntallUttaksdager();if(K(o)&&n>0)return o},lt=t=>t.reduce((e,o,n)=>n===0&&L(o)?e:n===t.length-1?(G(o)||L(o)||e.push(o),e):(e.push(o),e),[]),mt=(t,e,o,n,d,r,s)=>t.length===0?t:t.reduce((i,l,u)=>{if(u===0&&r){const P=p(o).denneEllerNeste();if(m(P).isBefore(l.tidsperiode.fom)){const k={fom:P,tom:p(l.tidsperiode.fom).forrige()};U(k).getAntallUttaksdager()>0&&i.push(...E(k,e,o,n,d,r,s))}}if(i.push(l),u===t.length-1)return i;const a=t[u+1],f={fom:p(l.tidsperiode.tom).neste(),tom:p(a.tidsperiode.fom).forrige()};return m(f.tom).isBefore(f.fom,"day")||!r&&m(f.tom).isBefore(o,"day")||U(f).getAntallUttaksdager()>0&&i.push(...E(f,e,o,n,d,r,s)),i},[]),M=(t,e)=>{const o=e.filter(d=>U(t.tidsperiode).inneholderDato(d.dato)),n=[];return o.length===2?[t]:(o.forEach((d,r)=>{if(r===0){n.push({...t,tidsperiode:{fom:d.dato,tom:void 0}});return}n[r-1].tidsperiode.tom=d.erFom?p(d.dato).forrige():d.dato,r<o.length-1&&n.push({...t,id:v(),tidsperiode:{fom:d.erFom?d.dato:p(d.dato).neste(),tom:void 0}})}),n.filter(d=>K(d.tidsperiode)))},b=(t,e)=>{const o=t.filter(i=>K(i.tidsperiode)).reduce((i,l)=>(i.push({dato:l.tidsperiode.fom,erFom:!0}),i.push({dato:l.tidsperiode.tom,erFom:!1}),i),[]),n=e.reduce((i,l)=>(i.push({dato:l.tidsperiode.fom,erFom:!0}),i.push({dato:l.tidsperiode.tom,erFom:!1}),i),[]),r=o.concat(n).sort((i,l)=>{if(i.dato.getTime()-l.dato.getTime()===0){if(!i.erFom)return 1;if(!l.erFom)return-1}return i.dato.getTime()-l.dato.getTime()}).filter((i,l,u)=>u.findIndex(a=>a.dato.getTime()===i.dato.getTime()&&a.erFom===i.erFom)===l),s=[],c=[];return t.forEach(i=>{const l=M(i,r);s.push(...l)}),e.forEach(i=>{const l=M(i,r);c.push(...l)}),{normaliserteEgnePerioder:s,normaliserteAnnenPartsPerioder:c}},at=(t,e,o,n,d=!1)=>{if(e.length===0)return t;if(t.length===0)return e;const{normaliserteEgnePerioder:r,normaliserteAnnenPartsPerioder:s}=b(t,e),c=r.reduce((f,g)=>{const P=T(s).finnOverlappendePerioder(g);if(P.length===0)return I(g)&&g.ønskerSamtidigUttak&&d?(f.push({...g,ønskerSamtidigUttak:!1}),f):(f.push(g),f);if(L(g)||C(g)||G(g)){const k=P[0];return f.push({...k,visPeriodeIPlan:!0}),f}if(I(g)&&g.ønskerSamtidigUttak){const k=P[0];return f.push(g),Q(k)||f.push({...k,visPeriodeIPlan:!1,ønskerSamtidigUttak:!0}),f}else return f.push(g),f},[]);c.sort(R);const i=t[0].tidsperiode.fom,l=s.filter(f=>m(f.tidsperiode.tom).isBefore(i,"day")),u=t[t.length-1].tidsperiode.tom,a=s.filter(f=>m(f.tidsperiode.fom).isAfter(u,"day"));return $([...l,...c,...a],o,n,e)},W=(t,e)=>{const o=U(t.tidsperiode).getAntallUttaksdager(),n={...t,tidsperiode:{fom:t.tidsperiode.fom,tom:p(e.tidsperiode.fom).forrige()}},d=U(n.tidsperiode).getAntallUttaksdager(),r=o-d,s=p(e.tidsperiode.tom).neste();if(H(t)){const c={...t,id:v(),tidsperiode:{fom:e.tidsperiode.fom,tom:t.tidsperiode.tom}};return[n,e,c]}else{const c={...t,id:v(),tidsperiode:{fom:s,tom:p(s).leggTil(r-1)}};return[n,e,c]}},tt=(t,e)=>{const o={...t,tidsperiode:{fom:t.tidsperiode.fom,tom:p(e).forrige()}},n={...t,id:v(),tidsperiode:{fom:p(o.tidsperiode.tom).neste(),tom:t.tidsperiode.tom}};return[o,n]},ut=(t,e)=>{const o={...t,konto:t.konto==F.Foreldrepenger?F.AktivitetsfriKvote:t.konto,morsAktivitetIPerioden:t.konto==F.Foreldrepenger?void 0:t.morsAktivitetIPerioden,erMorForSyk:t.konto==F.Foreldrepenger?void 0:t.erMorForSyk,tidsperiode:{fom:t.tidsperiode.fom,tom:p(e).forrige()}},n={...t,id:v(),tidsperiode:{fom:p(o.tidsperiode.tom).neste(),tom:t.tidsperiode.tom}};return[o,n]},et=(t,e)=>{if(T([t]).finnOverlappendePerioder(e).length>0){const o=[m(t.tidsperiode.fom),m(t.tidsperiode.tom),m(e.tidsperiode.fom),m(e.tidsperiode.tom)],n=m.min(o),d=m.max(o),r=o.filter(s=>s!==n&&s!==d);return U({fom:m.min(r).toDate(),tom:m.max(r).toDate()}).getAntallUttaksdager()}return 0},gt=({perioder:t,nyPeriode:e,familiehendelsesdato:o,harAktivitetskravIPeriodeUtenUttak:n,erAdopsjon:d,bareFarHarRett:r,erFarEllerMedmor:s,førsteUttaksdagNesteBarnsSak:c})=>{if(t.length===0)return[e];const i=e.tidsperiode.fom,l=e.tidsperiode.tom;if(m(i).isBefore(o,"day")&&m(l).isSameOrAfter(o,"day"))return[...t];const u=t.find(a=>U(a.tidsperiode).inneholderDato(i));if(u){if(X(u)||Y(u))return[...t];const a=T(t).finnAlleForegåendePerioder(u),f=T(t).finnAllePåfølgendePerioder(u),g=U(e.tidsperiode).getAntallUttaksdager();if(m(u.tidsperiode.fom).isSame(i))return[...a,e,...T([u,...f]).forskyvPerioder(g)];const P=W(u,e);return H(u)?[...a,P[0],P[1],...T([P[2],...f]).forskyvPerioder(g)]:[...a,...P,...T(f).forskyvPerioder(g)]}else{const a=t[0],f=t[t.length-1],g=m(e.tidsperiode.fom),P=m(e.tidsperiode.tom);if(g.isBefore(a.tidsperiode.fom,"day")){const k=B(e.tidsperiode,a.tidsperiode);if(P.isSameOrAfter(a.tidsperiode.fom,"day")){if(g.isBefore(o,"day"))return[...t];const D=et(a,e);return[e,...T(t).forskyvPerioder(D)]}return k?[e,...E(k,n,o,d,r,s,c),...t]:[e,...t]}else{const k=B(f.tidsperiode,e.tidsperiode);return k?[...t,...E(k,n,o,d,r,s,c),e]:[...t,e].sort(R)}}};export{Z as D,ut as a,tt as b,$ as c,lt as d,mt as f,E as g,gt as l,b as n,at as s};
//# sourceMappingURL=leggTilPeriode-197d6712.js.map