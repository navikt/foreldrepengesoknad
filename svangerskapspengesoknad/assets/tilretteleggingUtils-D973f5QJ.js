import{f as m,I as h}from"./ByttBrowserModal-DW9RJtJ2.js";import"./index-CTjT7uj6.js";import{c as f,T as a,d as c,e as d}from"./useSvpNavigator-Bls0EsrP.js";const E=e=>e.replace(/,/g,".").replace(/\s/g,"").replace(/%/g,""),b=RegExp(/^[-]?[0-9,.\s]*$/),p=e=>{if(e!=null&&e.length>0&&b.test(e)){const r=E(e);return(r.match(/\./g)||[]).length>1?void 0:parseFloat(r)}},T=(e,r,o,i,n)=>({type:r,behovForTilretteleggingFom:e.behovForTilretteleggingFom,arbeidsforhold:e.arbeidsforhold,fom:i,tom:n,stillingsprosent:o,risikofaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}),P=(e,r,o)=>({type:d.HEL,behovForTilretteleggingFom:e.behovForTilretteleggingFom,fom:m(e.tom).add(1,"d").format(h),tom:r,arbeidsforhold:e.arbeidsforhold,risikofaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak,stillingsprosent:o}),y=(e,r,o)=>{const i=[],n=e.type===a.DELVIS?p(e.enPeriodeMedTilretteleggingStillingsprosent):0,l=e.enPeriodeMedTilretteleggingFom,g=e.enPeriodeMedTilretteleggingTomType===c.VALGFRI_DATO?m(e.enPeriodeMedTilretteleggingTilbakeIJobbDato).subtract(1,"day").toString():r,t=e.type===a.DELVIS&&n&&n>0?d.DELVIS:d.INGEN,s=T(e,t,n,l,g);return i.push(s),m(s.tom).isSame(r,"day")||i.push(P(s,r,o)),i},S=(e,r,o)=>{const i=e.varierendePerioder.map(l=>{const g=p(l.stillingsprosent);let t=l.type===a.DELVIS?d.DELVIS:d.INGEN;g===0?t=d.INGEN:o===0&&g===100?t=d.HEL:g===o&&(t=d.HEL);const s=l.tomType===c.SISTE_DAG_MED_SVP?r:l.tom;return T(e,t,g,l.fom,s)}),n=i[i.length-1];return m(n.tom).isSame(r,"day")||i.push(P(n,r,o)),i},u=(e,r)=>m(e.fom).isBefore(r.fom,"day")||m(e.fom).isSame(r.fom,"day")&&m(e.tom).isBefore(r.tom,"day")?-1:1,k=(e,r)=>{const o=e.filter(t=>!t.varierendePerioder||t.varierendePerioder.length===0),i=e.filter(t=>t.varierendePerioder&&t.varierendePerioder.length>0),n=o.map(t=>{const s=f(t.arbeidsforhold.stillinger,t.enPeriodeMedTilretteleggingFom);return y(t,r,s)}),l=i.map(t=>{const s=M(t.varierendePerioder,t.arbeidsforhold.stillinger);return S(t,r,s)});return[...[...n.flat(1),...l.flat(1)]].sort(u)},M=(e,r)=>{const o=e?[...e].sort(u):void 0,i=o&&o.length>0?o[0].fom:void 0;return i?f(r,i):100};export{M as g,k as m};
