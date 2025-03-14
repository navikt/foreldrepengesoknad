import{U as D,p as k,e as n,q as W,o as p,r as y,t as Y}from"./VeiviserPage-CwIKt0kk.js";import{S as P,i as q,j as z}from"./HvemPlanleggerUtils-Cqv6rjI4.js";import{S as c,F as U,s as h,b as S}from"./KvoteOppsummering-l5vqms5F.js";import"./index-CR__hKHy.js";import{b as A,a as C,e as J}from"./barnetUtils-DRwiTi7P.js";const Q=({famDato:e,tilgjengeligeStønadskontoer:t,fellesperiodeDagerMor:r,startdato:o})=>{if(r===void 0)return{søker1:[],søker2:[]};const d=D(o??e).denneEllerNeste(),i=[],l=[],m=t.find(s=>s.konto===c.Fellesperiode).dager-r,a=t.find(s=>s.konto===c.ForeldrepengerFørFødsel),u=t.find(s=>s.konto===c.Mødrekvote),f=t.find(s=>s.konto===c.Fedrekvote);let g=d;if(a!==void 0){const s=k(D(g).trekkFra(15),a.dager),F={forelder:U.mor,kontoType:c.ForeldrepengerFørFødsel,fom:s.fom,tom:s.tom};i.push(F),g=D(F.tom).neste()}if(u!==void 0){const s=k(g,u.dager),F={forelder:U.mor,kontoType:c.Mødrekvote,fom:s.fom,tom:s.tom};i.push(F),g=D(F.tom).neste()}if(r!==void 0&&r>0){const s=k(g,r),F={forelder:U.mor,kontoType:c.Fellesperiode,fom:s.fom,tom:s.tom};i.push(F),g=D(F.tom).neste()}if(m!==void 0&&m>0){const s=k(g,m),F={forelder:U.farMedmor,kontoType:c.Fellesperiode,fom:s.fom,tom:s.tom};l.push(F),g=D(F.tom).neste()}if(f!==void 0){const s=k(g,f.dager),F={forelder:U.farMedmor,kontoType:c.Fedrekvote,fom:s.fom,tom:s.tom};l.push(F)}return{søker1:[...i].sort(h),søker2:[...l].sort(h)}},V=(e,t,r,o,d,i)=>{const l=D(e).denneEllerNeste(),m=[];if(r!==!0)if(i){const a={kontoType:c.AktivitetsfriKvote,fom:k(l,o.dager).fom,tom:k(l,o.dager).tom};m.push(a)}else{let a=l;if(S(e)&&d&&o){const f={kontoType:c.AktivitetsfriKvote,fom:k(l,o.dager).fom,tom:k(l,o.dager).tom};m.push(f),a=D(f.tom).neste()}const u={kontoType:t.konto,fom:k(a,t.dager).fom,tom:k(a,t.dager).tom};m.push(u)}else{const a={kontoType:c.AktivitetsfriKvote,fom:k(l,o.dager).fom,tom:k(l,o.dager).tom};m.push(a);const u={kontoType:c.Foreldrepenger,fom:k(D(a.tom).neste(),t.dager).fom,tom:k(D(a.tom).neste(),t.dager).tom};m.push(u)}return{søker1:m,søker2:[]}},X=(e,t)=>{const r=D(e).denneEllerNeste();return{søker1:[{kontoType:t.konto,fom:k(r,t.dager).fom,tom:k(r,t.dager).tom}],søker2:[]}},Z=(e,t,r,o,d,i,l)=>t?V(e,r,o,d,i,l):X(e,r),$=(e,t,r)=>{const o=D(e).denneEllerNeste(),d=[];if(r!==void 0){const m={kontoType:r.konto,fom:D(o).trekkFra(15),tom:D(o).forrige()};d.push(m)}const i=k(o,t.dager),l={kontoType:t.konto,fom:i.fom,tom:i.tom};return d.push(l),{søker1:[...d].sort(h),søker2:[]}},H=(e,t,r,o,d,i,l,m)=>{const a=D(m??e).denneEllerNeste(),u=[];if(r!==!0)if(l){const f={kontoType:c.AktivitetsfriKvote,fom:k(a,o.dager).fom,tom:k(a,o.dager).tom};u.push(f)}else{let f=a;if(S(e)&&d&&!i&&o){const s={kontoType:c.AktivitetsfriKvote,fom:k(a,o.dager).fom,tom:k(a,o.dager).tom};u.push(s),f=D(s.tom).neste()}const g={kontoType:t.konto,fom:k(f,t.dager).fom,tom:k(f,t.dager).tom};u.push(g)}else if(i){const f={kontoType:c.Foreldrepenger,fom:k(a,t.dager).fom,tom:k(a,t.dager).tom};u.push(f)}else{const f={kontoType:c.AktivitetsfriKvote,fom:k(a,o.dager).fom,tom:k(a,o.dager).tom};u.push(f);const g={kontoType:c.Foreldrepenger,fom:k(D(f.tom).neste(),t.dager).fom,tom:k(D(f.tom).neste(),t.dager).tom};u.push(g)}return{søker1:[...u].sort(h),søker2:[]}},K=(e,t,r,o,d,i,l,m,a,u)=>t?H(e,r,d,i,l,m,a,u):$(e,r,o),b=({situasjon:e,famDato:t,erFarEllerMedmor:r,tilgjengeligeStønadskontoer:o,erMorUfør:d,bareFarMedmorHarRett:i,erAleneOmOmsorg:l,startdato:m,farOgFar:a})=>{const u=o.find(s=>s.konto===c.Foreldrepenger),f=o.find(s=>s.konto===c.ForeldrepengerFørFødsel),g=o.find(s=>s.konto===c.AktivitetsfriKvote);return e==="adopsjon"?Z(t,r,u,d,g,i,a):K(t,r,u,f,d,g,i,l,a,m)},ce=e=>Object.values(e.kontoer).reduce((t,r)=>{const o=O(r.dager);return{uker:t.uker+o.uker,dager:t.dager+o.dager}},{uker:0,dager:0}),O=e=>{const t=Math.floor(e/5);return{uker:t,dager:e-t*5,totaltAntallDager:e}},v=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?r.dager:0},w=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?O(r.dager):{uker:0,dager:0,totaltAntallDager:0}},I=e=>v(e,c.ForeldrepengerFørFødsel),ee=e=>v(e,c.Mødrekvote),te=e=>v(e,c.Fedrekvote),ue=e=>w(e,c.AktivitetsfriKvote),M=e=>v(e,c.AktivitetsfriKvote),re=e=>w(e,c.Fellesperiode),R=e=>w(e,c.Foreldrepenger);n.extend(W);const oe=3,_=e=>n(e).isoWeekday(),B=e=>_(e)!==6&&_(e)!==7,T=e=>{const t=n(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(_(e)){case 6:return n.utc(r).add(48,"hours").format(p);case 7:return n.utc(r).add(24,"hours").format(p);default:return e}},E=e=>{const t=n(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(_(e)){case 6:return n.utc(r).subtract(24,"hours").format(p);case 7:return n.utc(r).subtract(48,"hours").format(p);default:return e}},se=(e,t)=>{if(B(e)===!1)throw new Error("trekkUttaksdagerFraDato: Dato må være uttaksdag");let r=e,o=0,d=0;for(;d<Math.abs(t);){const i=n.utc(e).add(--o*24,"hours").format(p);B(i)&&(r=i,d++)}return r},N=e=>A(e)?e.overtakelsesdato:C(e)?e.termindato:e.fødselsdato,x=e=>{if(A(e))throw new Error("Kan ikke være adoptert");const t=N(e);return J(e)&&e.termindato&&n(t).isBefore(n(Y(e.termindato)))?t:se(T(t),oe*5)},de=(e,t,r,o=0)=>{const d=parseInt(o.toString(),10),i=re(t).totaltAntallDager,l=O(d),m=O(i-d),a=I(t),u=ee(t),f=te(t),g=N(r),s=A(r)||e.type===P.FAR_OG_FAR?T(T(g)):x(r),F=e.type===P.FAR_OG_FAR?y(n(s).toDate()).leggTil(u+l.totaltAntallDager-1):y(n(s).toDate()).leggTil(a+u+l.totaltAntallDager-1),G=T(n(F).add(1,"day").format(p)),j=y(n(G).toDate()).leggTil(m.totaltAntallDager+f-1);return e.type===P.FAR_OG_FAR&&!A(r)?{familiehendelsedato:g,startdatoPeriode1:s,sluttdatoPeriode1:n(j).format(p),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}:{familiehendelsedato:g,startdatoPeriode1:s,startdatoPeriode2:G,sluttdatoPeriode1:n(F).format(p),sluttdatoPeriode2:n(j).format(p)}},L=(e,t,r,o)=>{const d=N(r);if(e.type===P.FAR_OG_FAR){const f=M(t),g=R(t),s=y(n(E(d)).toDate()).leggTil(f+(A(r)?0:6*5-1)),F=A(r)?n(d):n(d).add(6,"weeks");return{familiehendelsedato:d,startdatoPeriode1:T(F.format(p)),sluttdatoPeriode1:E(n(s).format(p)),startdatoPeriode2:T(n(s).add(1,"day").format(p)),sluttdatoPeriode2:n(y(s).leggTil(g.totaltAntallDager)).format(p)}}if(o==="kunSøker2HarRett"&&(q(e)||z(e))){const f=M(t),g=R(t),s=y(n(E(d)).toDate()).leggTil(f+(A(r)?0:6*5-1)),F=A(r)?n(d):n(d).add(6,"weeks");return{familiehendelsedato:d,startdatoPeriode1:T(F.format(p)),sluttdatoPeriode1:n(s).format(p),startdatoPeriode2:T(n(s).add(1,"day").format(p)),sluttdatoPeriode2:n(y(s).leggTil(g.totaltAntallDager)).format(p)}}const i=R(t),l=M(t),m=I(t),a=A(r)||e.type===P.FAR?T(d):x(r),u=y(n(a).toDate()).leggTil(i.totaltAntallDager+l+m-1);return{familiehendelsedato:d,startdatoPeriode1:a,sluttdatoPeriode1:n(u).format(p),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}},fe=(e,t,r,o,d)=>t.type===P.FAR_OG_FAR&&!A(o)?L(t,r,o,e):e==="beggeHarRett"?de(t,r,o,d):L(t,r,o,e),me=e=>{const{kontoer:t}=e;return{uker:t.reduce((r,o)=>Math.round(o.dager/5)+r,0),dager:t.reduce((r,o,d)=>{const i=o.dager+r;return d===t.length-1?i%5:i},0)}},ge=({erDeltUttak:e,famDato:t,tilgjengeligeStønadskontoer:r,fellesperiodeDagerMor:o,erAdopsjon:d,erFarEllerMedmor:i,erMorUfør:l,bareFarMedmorHarRett:m,erAleneOmOmsorg:a,startdato:u,farOgFar:f})=>e?Q({famDato:t,tilgjengeligeStønadskontoer:r,fellesperiodeDagerMor:o,startdato:u}):b({situasjon:d?"adopsjon":"fødsel",famDato:t,erFarEllerMedmor:i,tilgjengeligeStønadskontoer:r,erMorUfør:l,bareFarMedmorHarRett:m,erAleneOmOmsorg:a,startdato:u,farOgFar:f}),Fe=(e,t,r)=>e?t.filter(o=>r?o.forelder===U.farMedmor:o.forelder===U.mor):t,pe=(e,t,r)=>e?t.filter(o=>r?o.forelder===U.mor:o.forelder===U.farMedmor):[];export{ue as a,R as b,me as c,re as d,E as e,fe as f,N as g,Fe as h,pe as i,O as j,ce as k,ge as l};
