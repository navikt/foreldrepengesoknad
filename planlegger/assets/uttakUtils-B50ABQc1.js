import{d as a,a as G,U as k,I as d,t as B}from"./Label-DMHnewTW.js";import{S as O,h as j,i as S}from"./HvemPlanleggerUtils-D1xsqW5u.js";import"./index-DVXBtNgz.js";import{b as i,a as N,e as V}from"./barnetUtils-Dtg6gkcN.js";var c=(e=>(e.Mødrekvote="MØDREKVOTE",e.Fedrekvote="FEDREKVOTE",e.Fellesperiode="FELLESPERIODE",e.Foreldrepenger="FORELDREPENGER",e.ForeldrepengerFørFødsel="FORELDREPENGER_FØR_FØDSEL",e.AktivitetsfriKvote="AKTIVITETSFRI_KVOTE",e))(c||{});const b=e=>Object.values(e.kontoer).reduce((t,r)=>t+r.dager/5,0),ee=e=>Object.values(e.kontoer).reduce((t,r)=>{const o=U(r.dager);return{uker:t.uker+o.uker,dager:t.dager+o.dager}},{uker:0,dager:0}),m=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?r.dager:0},U=e=>{const t=Math.floor(e/5);return{uker:t,dager:e-t*5,totaltAntallDager:e}},v=(e,t)=>{const r=e.kontoer.find(o=>o.konto===t);return r?U(r.dager):{uker:0,dager:0,totaltAntallDager:0}},I=e=>m(e,c.ForeldrepengerFørFødsel),te=e=>v(e,c.ForeldrepengerFørFødsel),W=e=>m(e,c.Mødrekvote),x=e=>m(e,c.Fedrekvote),re=e=>v(e,c.AktivitetsfriKvote),P=e=>m(e,c.AktivitetsfriKvote),Y=e=>v(e,c.Fellesperiode),_=e=>v(e,c.Foreldrepenger);a.extend(G);const H=3,R=e=>a(e).isoWeekday(),T=e=>R(e)!==6&&R(e)!==7,u=e=>{const t=a(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(R(e)){case 6:return a.utc(r).add(48,"hours").format(d);case 7:return a.utc(r).add(24,"hours").format(d);default:return e}},K=e=>{const t=a(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(R(e)){case 6:return a.utc(r).subtract(24,"hours").format(d);case 7:return a.utc(r).subtract(48,"hours").format(d);default:return e}},q=(e,t)=>{if(T(e)===!1)throw new Error("trekkUttaksdagerFraDato: Dato må være uttaksdag");let r=e,o=0,s=0;for(;s<Math.abs(t);){const n=a.utc(e).add(--o*24,"hours").format(d);T(n)&&(r=n,s++)}return r},y=e=>i(e)?e.overtakelsesdato:N(e)?e.termindato:e.fødselsdato,L=e=>{if(i(e))throw new Error("Kan ikke være adoptert");const t=y(e);return V(e)&&e.termindato&&a(t).isBefore(a(B(e.termindato)))?t:q(u(t),H*5)},z=(e,t,r,o=0)=>{const s=parseInt(o.toString(),10),n=Y(t).totaltAntallDager,g=U(s),f=U(n-s),D=I(t),E=W(t),p=x(t),F=y(r),l=i(r)||e.type===O.FAR_OG_FAR?u(F):L(r),A=e.type===O.FAR_OG_FAR?k(a(l).toDate()).leggTil(E+g.totaltAntallDager-1):k(a(l).toDate()).leggTil(D+E+g.totaltAntallDager-1),w=u(a(A).add(1,"day").format(d)),M=k(a(w).toDate()).leggTil(f.totaltAntallDager+p-1);return e.type===O.FAR_OG_FAR&&!i(r)?{familiehendelsedato:F,startdatoPeriode1:l,sluttdatoPeriode1:a(M).format(d),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}:{familiehendelsedato:F,startdatoPeriode1:l,startdatoPeriode2:w,sluttdatoPeriode1:a(A).format(d),sluttdatoPeriode2:a(M).format(d)}},C=(e,t,r,o)=>{const s=y(r);if(e.type===O.FAR_OG_FAR){const p=P(t),F=_(t),l=k(a(s).toDate()).leggTil(p+(i(r)?0:6*5-1)),A=i(r)?a(s).add(1,"day"):a(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:u(A.format(d)),sluttdatoPeriode1:K(a(l).format(d)),startdatoPeriode2:u(a(l).add(1,"day").format(d)),sluttdatoPeriode2:a(k(l).leggTil(F.totaltAntallDager)).format(d)}}if(o==="kunSøker2HarRett"&&(j(e)||S(e))){const p=P(t),F=_(t),l=k(a(s).toDate()).leggTil(p+(i(r)?0:6*5-1)),A=i(r)?a(s).add(1,"day"):a(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:u(A.format(d)),sluttdatoPeriode1:K(a(l).format(d)),startdatoPeriode2:u(a(l).add(1,"day").format(d)),sluttdatoPeriode2:a(k(l).leggTil(F.totaltAntallDager)).format(d)}}const n=_(t),g=P(t),f=I(t),D=i(r)||e.type===O.FAR?u(s):L(r),E=k(a(D).toDate()).leggTil(n.totaltAntallDager+g+f-1);return{familiehendelsedato:s,startdatoPeriode1:D,sluttdatoPeriode1:a(E).format(d),startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}},ae=(e,t,r,o,s)=>e==="beggeHarRett"||t.type===O.FAR_OG_FAR&&!i(o)?z(t,r,o,s):C(t,r,o,e),J=(e,t)=>{const o=parseInt(e.getTime()/864e5)-1,s=parseInt(t.getTime()/864e5);let n=s-o;const g=(s-o)/7,f=e.getDay(),D=t.getDay();return f==0?n--:f==6&&(n-=2),D==0?n-=2:D==6&&n--,n-=parseInt(g,10)*2,n},h=(e,t)=>{const r=J(a(e).toDate(),a(t).toDate()),o=Math.floor(r/5);return{uker:o,dager:r-o*5}},oe=e=>{const{startdatoPeriode1:t,sluttdatoPeriode1:r,startdatoPeriode2:o,sluttdatoPeriode2:s}=e,n=h(t,r);if(o&&s){const g=h(o,s);return{uker:n.uker+g.uker,dager:n.dager+g.dager}}return n};export{c as S,re as a,_ as b,oe as c,Y as d,h as e,ae as f,y as g,ee as h,te as i,U as j,b as k};
