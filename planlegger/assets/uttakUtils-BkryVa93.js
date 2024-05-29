import{d as o}from"./dayjs.min-a42Le6oL.js";import{i as h}from"./isoWeek-tto3dG8J.js";import{S as m,c as K,d as L}from"./HvemPlanleggerUtils-CHTffTZd.js";import{I as a,t as G}from"./dateUtils-C_C2kvi-.js";import"./index-Dl6G-zuu.js";import{b as c,a as I,e as T}from"./barnetUtils-Dtg6gkcN.js";var F=(e=>(e.Mødrekvote="MØDREKVOTE",e.Fedrekvote="FEDREKVOTE",e.Fellesperiode="FELLESPERIODE",e.Foreldrepenger="FORELDREPENGER",e.ForeldrepengerFørFødsel="FORELDREPENGER_FØR_FØDSEL",e.AktivitetsfriKvote="AKTIVITETSFRI_KVOTE",e))(F||{});const S=e=>Object.values(e.kontoer).reduce((t,r)=>t+r.dager/5,0),U=(e,t)=>{const r=e.kontoer.find(d=>d.konto===t);return r?r.dager/5:0},y=e=>U(e,F.ForeldrepengerFørFødsel),B=e=>U(e,F.Mødrekvote),N=e=>U(e,F.Fedrekvote),V=e=>U(e,F.Fellesperiode),D=e=>U(e,F.Foreldrepenger),_=e=>U(e,F.AktivitetsfriKvote);o.extend(h);const j=3,p=e=>o(e).isoWeekday(),O=e=>p(e)!==6&&p(e)!==7,k=e=>{switch(p(e)){case 6:return o.utc(e).add(48,"hours").format(a);case 7:return o.utc(e).add(24,"hours").format(a);default:return e}},u=e=>{const t=o(e).toDate(),r=e&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);switch(p(e)){case 6:return o.utc(r).subtract(24,"hours").format(a);case 7:return o.utc(r).subtract(48,"hours").format(a);default:return e}},W=(e,t)=>{if(O(e)===!1)throw new Error("trekkUttaksdagerFraDato: Dato må være uttaksdag");let r=e,d=0,s=0;for(;s<Math.abs(t);){const i=o.utc(e).add(--d*24,"hours").format(a);O(i)&&(r=i,s++)}return r},P=e=>c(e)?e.overtakelsesdato:I(e)?e.termindato:e.fødselsdato,M=e=>{if(c(e))throw new Error("Kan ikke være adoptert");const t=P(e);return T(e)&&e.termindato&&o(t).isBefore(o(G(e.termindato)))?t:W(k(t),j*5)},x=(e,t,r,d=0)=>{const i=V(t)-d,g=y(t),w=B(t),R=N(t),E=P(r),l=c(r)||e.type===m.FAR_OG_FAR?k(E):M(r),f=e.type===m.FAR_OG_FAR?u(o(l).add(w,"weeks").add(d,"weeks").subtract(1,"day").format(a)):u(o(l).add(g,"weeks").add(w,"weeks").add(d,"weeks").subtract(1,"day").format(a)),n=k(o(f).add(1,"day").format(a)),A=u(o(n).add(i,"weeks").add(R,"weeks").subtract(1,"day").format(a));return e.type===m.FAR_OG_FAR&&!c(r)?{familiehendelsedato:E,startdatoPeriode1:l,sluttdatoPeriode1:A,startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}:{familiehendelsedato:E,startdatoPeriode1:l,startdatoPeriode2:n,sluttdatoPeriode1:f,sluttdatoPeriode2:A}},H=(e,t,r,d)=>{const s=P(r);if(e.type===m.FAR_OG_FAR){const l=_(t),f=D(t),n=o(s).add(l,"weeks").add(c(r)?0:6,"weeks").subtract(1,"day"),A=c(r)?o(s).add(1,"day"):o(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:k(A.format(a)),sluttdatoPeriode1:u(n.format(a)),startdatoPeriode2:k(o(n).add(1,"day").format(a)),sluttdatoPeriode2:u(o(n).add(f,"weeks").format(a))}}if(d==="kunSøker2HarRett"&&(K(e)||L(e))){const l=_(t),f=D(t),n=o(s).add(l,"weeks").add(c(r)?0:6,"weeks").subtract(1,"day"),A=c(r)?o(s).add(1,"day"):o(s).add(6,"weeks");return{familiehendelsedato:s,startdatoPeriode1:k(A.format(a)),sluttdatoPeriode1:u(n.format(a)),startdatoPeriode2:k(o(n).add(1,"day").format(a)),sluttdatoPeriode2:u(o(n).add(f,"weeks").format(a))}}const i=D(t),g=_(t),w=y(t),R=c(r)||e.type===m.FAR?k(s):M(r),E=u(o(R).add(i,"weeks").add(g,"weeks").add(w,"weeks").subtract(1,"day").format(a));return{familiehendelsedato:s,startdatoPeriode1:R,sluttdatoPeriode1:E,startdatoPeriode2:void 0,sluttdatoPeriode2:void 0}},X=(e,t,r,d,s)=>e==="beggeHarRett"||t.type===m.FAR_OG_FAR&&!c(d)?x(t,r,d,s):H(t,r,d,e),v=(e,t)=>{const r=o(e).toDate(),d=o(t).toDate(),s=7*24*60*60*1e3,i=Math.abs(r.getTime()-d.getTime());return Math.round(i/s)},Z=e=>{const{startdatoPeriode1:t,sluttdatoPeriode1:r,startdatoPeriode2:d,sluttdatoPeriode2:s}=e;let i=v(r,t);return d&&s&&(i+=v(s,d)),i};export{F as S,_ as a,D as b,Z as c,V as d,S as e,X as f,P as g,y as h};
