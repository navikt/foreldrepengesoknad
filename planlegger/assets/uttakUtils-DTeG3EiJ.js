import{U as p,p as l,e as n,q as W,o as F,r as T,t as Y}from"./VeiviserPage-BmJqjC0L.js";import{S as y,i as q,j as z}from"./HvemPlanleggerUtils-BBpqtc-K.js";import"./index-CR__hKHy.js";import{b as A,a as C,e as J}from"./barnetUtils-Cd0JkyfR.js";import{S as c,F as P,s as h,b as I}from"./KvoteOppsummering-_hJnlJQo.js";const Q=({famDato:e,tilgjengeligeStønadskontoer:t,fellesperiodeDagerMor:r,startdato:o})=>{if(r===void 0)return{søker1:[],søker2:[]};const s=p(o??e).denneEllerNeste(),a=[],g=[],i=t.find(d=>d.konto===c.Fellesperiode).dager-r,u=t.find(d=>d.konto===c.ForeldrepengerFørFødsel),f=t.find(d=>d.konto===c.Mødrekvote),D=t.find(d=>d.konto===c.Fedrekvote);let k=s;if(u!==void 0){const d=l(p(k).trekkFra(15),u.dager),m={forelder:P.mor,kontoType:c.ForeldrepengerFørFødsel,fom:d.fom,tom:d.tom};a.push(m),k=p(m.tom).neste()}if(f!==void 0){const d=l(k,f.dager),m={forelder:P.mor,kontoType:c.Mødrekvote,fom:d.fom,tom:d.tom};a.push(m),k=p(m.tom).neste()}if(r!==void 0&&r>0){const d=l(k,r),m={forelder:P.mor,kontoType:c.Fellesperiode,fom:d.fom,tom:d.tom};a.push(m),k=p(m.tom).neste()}if(i!==void 0&&i>0){const d=l(k,i),m={forelder:P.farMedmor,kontoType:c.Fellesperiode,fom:d.fom,tom:d.tom};g.push(m),k=p(m.tom).neste()}if(D!==void 0){const d=l(k,D.dager),m={forelder:P.farMedmor,kontoType:c.Fedrekvote,fom:d.fom,tom:d.tom};g.push(m)}return{søker1:[...a.sort(h)],søker2:[...g.sort(h)]}},V=(e,t,r,o,s)=>{const a=p(e).denneEllerNeste(),g=[];if(r!==!0){let i=a;if(I(e)&&s&&o){const f={kontoType:c.AktivitetsfriKvote,fom:l(a,o.dager).fom,tom:l(a,o.dager).tom};g.push(f),i=p(f.tom).neste()}const u={kontoType:t.konto,fom:l(i,t.dager).fom,tom:l(i,t.dager).tom};g.push(u)}else{const i={kontoType:c.AktivitetsfriKvote,fom:l(a,o.dager).fom,tom:l(a,o.dager).tom};g.push(i);const u={kontoType:c.Foreldrepenger,fom:l(p(i.tom).neste(),t.dager).fom,tom:l(p(i.tom).neste(),t.dager).tom};g.push(u)}return{søker1:g,søker2:[]}},X=(e,t)=>{const r=p(e).denneEllerNeste();return{søker1:[{kontoType:t.konto,fom:l(r,t.dager).fom,tom:l(r,t.dager).tom}],søker2:[]}},Z=(e,t,r,o,s,a)=>t?V(e,r,o,s,a):X(e,r),$=(e,t,r)=>{const o=p(e).denneEllerNeste(),s=[];if(r!==void 0){const i={kontoType:r.konto,fom:p(o).trekkFra(15),tom:p(o).forrige()};s.push(i)}const a=l(o,t.dager),g={kontoType:t.konto,fom:a.fom,tom:a.tom};return s.push(g),{søker1:[...s].sort(h),søker2:[]}},H=(e,t,r,o,s,a,g)=>{const i=p(g??e).denneEllerNeste(),u=[];if(r!==!0){let f=i;if(I(e)&&s&&!a&&o){const k={kontoType:c.AktivitetsfriKvote,fom:l(i,o.dager).fom,tom:l(i,o.dager).tom};u.push(k),f=p(k.tom).neste()}const D={kontoType:t.konto,fom:l(f,t.dager).fom,tom:l(f,t.dager).tom};u.push(D)}else if(a){const f={kontoType:c.Foreldrepenger,fom:l(i,t.dager).fom,tom:l(i,t.dager).tom};u.push(f)}else{const f={kontoType:c.AktivitetsfriKvote,fom:l(i,o.dager).fom,tom:l(i,o.dager).tom};u.push(f);const D={kontoType:c.Foreldrepenger,fom:l(p(f.tom).neste(),t.dager).fom,tom:l(p(f.tom).neste(),t.dager).tom};u.push(D)}return{søker1:[...u].sort(h),søker2:[]}},K=(e,t,r,o,s,a,g,i,u)=>t?H(e,r,s,a,g,i,u):$(e,r,o),b=({situasjon:e,famDato:t,erFarEllerMedmor:r,tilgjengeligeStønadskontoer:o,erMorUfør:s,bareFarMedmorHarRett:a,erAleneOmOmsorg:g,startdato:i})=>{const u=o.find(k=>k.konto===c.Foreldrepenger),f=o.find(k=>k.konto===c.ForeldrepengerFørFødsel),D=o.find(k=>k.konto===c.AktivitetsfriKvote);return e==="adopsjon"?Z(t,r,u,s,D,a):K(t,r,u,f,s,D,a,g,i)},ce=e=>Object.values(e.kontoer).reduce((t,r)=>{const o=v(r.dager);return{uker:t.uker+o.uker,dager:t.dager+o.dager}},{uker:0,dager:0}),v=e=>{const t=Math.floor(e/5);return{uker:t,dager:e-t*5,totaltAntallDager:e}},_=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?r.dager:0},w=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?v(r.dager):{uker:0,dager:0,totaltAntallDager:0}},S=e=>_(e,c.ForeldrepengerFørFødsel),ee=e=>_(e,c.Mødrekvote),te=e=>_(e,c.Fedrekvote),ue=e=>w(e,c.AktivitetsfriKvote),R=e=>_(e,c.AktivitetsfriKvote),re=e=>w(e,c.Fellesperiode),M=e=>w(e,c.Foreldrepenger);n.extend(W);const oe=3,O=e=>n(e).isoWeekday(),B=e=>O(e)!==6&&O(e)!==7,U=e=>{const t=n(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(O(e)){case 6:return n.utc(r).add(48,"hours").format(F);case 7:return n.utc(r).add(24,"hours").format(F);default:return e}},E=e=>{const t=n(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(O(e)){case 6:return n.utc(r).subtract(24,"hours").format(F);case 7:return n.utc(r).subtract(48,"hours").format(F);default:return e}},se=(e,t)=>{if(B(e)===!1)throw new Error("trekkUttaksdagerFraDato: Dato må være uttaksdag");let r=e,o=0,s=0;for(;s<Math.abs(t);){const a=n.utc(e).add(--o*24,"hours").format(F);B(a)&&(r=a,s++)}return r},N=e=>A(e)?e.overtakelsesdato:C(e)?e.termindato:e.fødselsdato,x=e=>{if(A(e))throw new Error("Kan ikke være adoptert");const t=N(e);return J(e)&&e.termindato&&n(t).isBefore(n(Y(e.termindato)))?t:se(U(t),oe*5)},ae=(e,t,r,o=0)=>{const s=parseInt(o.toString(),10),a=re(t).totaltAntallDager,g=v(s),i=v(a-s),u=S(t),f=ee(t),D=te(t),k=N(r),d=A(r)||e.type===y.FAR_OG_FAR?U(U(k)):x(r),m=e.type===y.FAR_OG_FAR?T(n(d).toDate()).leggTil(f+g.totaltAntallDager-1):T(n(d).toDate()).leggTil(u+f+g.totaltAntallDager-1),G=U(n(m).add(1,"day").format(F)),j=T(n(G).toDate()).leggTil(i.totaltAntallDager+D-1);return e.type===y.FAR_OG_FAR&&!A(r)?{familiehendelsedato:k,startdatoPeriode1:d,sluttdatoPeriode1:n(j).format(F),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}:{familiehendelsedato:k,startdatoPeriode1:d,startdatoPeriode2:G,sluttdatoPeriode1:n(m).format(F),sluttdatoPeriode2:n(j).format(F)}},L=(e,t,r,o)=>{const s=N(r);if(e.type===y.FAR_OG_FAR){const D=R(t),k=M(t),d=T(n(E(s)).toDate()).leggTil(D+(A(r)?0:6*5-1)),m=A(r)?n(s):n(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:U(m.format(F)),sluttdatoPeriode1:E(n(d).format(F)),startdatoPeriode2:U(n(d).add(1,"day").format(F)),sluttdatoPeriode2:n(T(d).leggTil(k.totaltAntallDager)).format(F)}}if(o==="kunSøker2HarRett"&&(q(e)||z(e))){const D=R(t),k=M(t),d=T(n(E(s)).toDate()).leggTil(D+(A(r)?0:6*5-1)),m=A(r)?n(s):n(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:U(m.format(F)),sluttdatoPeriode1:n(d).format(F),startdatoPeriode2:U(n(d).add(1,"day").format(F)),sluttdatoPeriode2:n(T(d).leggTil(k.totaltAntallDager)).format(F)}}const a=M(t),g=R(t),i=S(t),u=A(r)||e.type===y.FAR?U(s):x(r),f=T(n(u).toDate()).leggTil(a.totaltAntallDager+g+i-1);return{familiehendelsedato:s,startdatoPeriode1:u,sluttdatoPeriode1:n(f).format(F),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}},fe=(e,t,r,o,s)=>t.type===y.FAR_OG_FAR&&!A(o)?L(t,r,o,e):e==="beggeHarRett"?ae(t,r,o,s):L(t,r,o,e),ge=e=>{const{kontoer:t}=e;return{uker:t.reduce((r,o)=>Math.round(o.dager/5)+r,0),dager:t.reduce((r,o,s)=>{const a=o.dager+r;return s===t.length-1?a%5:a},0)}},me=({erDeltUttak:e,famDato:t,tilgjengeligeStønadskontoer:r,fellesperiodeDagerMor:o,erAdopsjon:s,erFarEllerMedmor:a,erMorUfør:g,bareFarMedmorHarRett:i,erAleneOmOmsorg:u,startdato:f})=>e?Q({famDato:t,tilgjengeligeStønadskontoer:r,fellesperiodeDagerMor:o,startdato:f}):b({situasjon:s?"adopsjon":"fødsel",famDato:t,erFarEllerMedmor:a,tilgjengeligeStønadskontoer:r,erMorUfør:g,bareFarMedmorHarRett:i,erAleneOmOmsorg:u,startdato:f});export{ue as a,M as b,ge as c,re as d,E as e,fe as f,N as g,v as h,ce as i,me as l};
