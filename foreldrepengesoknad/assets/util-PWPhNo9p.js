import{i as n,j as _,k as I,l as g,m as O,n as R,o as N,p as D,q as L,r as M,t as S,v as T,w as K,x as A,y as l,z as a}from"./FpDataContext-BW_0HfWx.js";import"./dateFormValidation-DXkRFCUV.js";import"./Uttaksdagen-DrQ0Oxxl.js";import"./index-BP8_t0zE.js";var r=(e=>(e.DEPRECATED_TERMINBEKREFTELSE="I000062",e.TERMINBEKREFTELSE="I000141",e.OMSORGSOVERTAKELSE="I000042",e.DEPRECATED_BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM="I000051",e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM="I000133",e.BEKREFTELSE_FRA_ARBEIDSGIVER="I000065",e.BEKREFTELSE_FRA_STUDIESTED="I000061",e.BEKREFTELSE_PÅ_AVTALT_FERIE="I000036",e.DOK_AV_ALENEOMSORG="I000110",e.DEPRECATED_DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID="I000111",e.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID="I000118",e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET="I000112",e.DOK_INNLEGGELSE="I000037",e.DOK_INNLEGGELSE_BARN="I000124",e.DOK_INNLEGGELSE_MOR="I000120",e.DOK_INNLEGGELSE_FAR="I000122",e.DOK_SYKDOM_MOR="I000121",e.DOK_SYKDOM_FAR="I000123",e.DOK_UTDANNING_OG_ARBEID_MOR="I000130",e.DOK_UTDANNING_MOR="I000131",e.DOK_ARBEID_MOR="I000132",e.DOK_MILITÆR_SILVIL_TJENESTE="I000039",e.DOK_MORS_UTDANNING_ARBEID_SYKDOM="I000038",e.DOK_OVERFØRING_FOR_SYK="I000023",e.ETTERLØNN_ELLER_SLUTTVEDERLAG="I000044",e.FØDSELSATTEST="I000063",e.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG="I000007",e.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING="I000109",e.DEPRECATED_TILBAKEBETALING="I000114",e.TILBAKEBETALING="I000119",e.HV_ØVELSE="I000116",e.NAV_TILTAK="I000117",e.RESULTATREGNSKAP="I000032",e.DEPRECATED_KOPI_SKATTEMELDING="I000066",e.SKATTEMELDING="I000140",e.ANNET="I000060",e))(r||{}),o=(e=>(e.SEND_SENERE="SEND_SENERE",e))(o||{});const F=e=>e.skjemanummer===r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,c=e=>e.skjemanummer===r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,b=e=>n(e)||_(e)||I(e)||g(e)||O(e),u=e=>R(e)||N(e)||D(e)||L(e),B=e=>M(e),P=e=>S(e),J=e=>T(e),U=e=>K(e),f=e=>A(e),y=e=>l(e),k=e=>a(e),p=e=>e.skjemanummer===r.OMSORGSOVERTAKELSE,Y=e=>e[r.OMSORGSOVERTAKELSE]?e[r.OMSORGSOVERTAKELSE]:[],v=e=>e.skjemanummer===r.DOK_AV_ALENEOMSORG,h=e=>e[r.DOK_AV_ALENEOMSORG]?e[r.DOK_AV_ALENEOMSORG]:[],C=e=>e.skjemanummer===r.TERMINBEKREFTELSE,x=e=>e[r.TERMINBEKREFTELSE]?e[r.TERMINBEKREFTELSE]:[],q=e=>{const E=[],s=e[r.DOK_MILITÆR_SILVIL_TJENESTE],t=e[r.ETTERLØNN_ELLER_SLUTTVEDERLAG];return s&&E.push(...s),t&&E.push(...t),E},w=e=>e.skjemanummer===r.DOK_MILITÆR_SILVIL_TJENESTE,z=e=>e.skjemanummer===r.ETTERLØNN_ELLER_SLUTTVEDERLAG,H=e=>e.skjemanummer===r.DOK_INNLEGGELSE_MOR,Q=e=>e.skjemanummer===r.DOK_SYKDOM_MOR,W=e=>e.skjemanummer===r.DOK_INNLEGGELSE_FAR,X=e=>e.skjemanummer===r.DOK_SYKDOM_FAR,Z=e=>e.skjemanummer===r.DOK_INNLEGGELSE_BARN,$=e=>e.skjemanummer===r.DOK_UTDANNING_MOR,m=e=>e.skjemanummer===r.DOK_ARBEID_MOR,j=e=>e.skjemanummer===r.DOK_UTDANNING_OG_ARBEID_MOR,ee=e=>e[r.DOK_INNLEGGELSE_MOR]?e[r.DOK_INNLEGGELSE_MOR]:[],re=e=>e[r.DOK_SYKDOM_MOR]?e[r.DOK_SYKDOM_MOR]:[],Ee=e=>e[r.DOK_INNLEGGELSE_FAR]?e[r.DOK_INNLEGGELSE_FAR]:[],se=e=>e[r.DOK_SYKDOM_FAR]?e[r.DOK_SYKDOM_FAR]:[],te=e=>e[r.DOK_INNLEGGELSE_BARN]?e[r.DOK_INNLEGGELSE_BARN]:[],oe=e=>e[r.DOK_UTDANNING_MOR]?e[r.DOK_UTDANNING_MOR]:[],ne=e=>e[r.DOK_ARBEID_MOR]?e[r.DOK_ARBEID_MOR]:[],_e=e=>e[r.DOK_UTDANNING_OG_ARBEID_MOR]?e[r.DOK_UTDANNING_OG_ARBEID_MOR]:[],Ie=e=>e[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],ge=e=>e[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],Oe=e=>e.innsendingsType===o.SEND_SENERE,Re=e=>{let E=!0;return e===void 0||Object.keys(e).forEach(s=>{e[s]!==void 0&&e[s].length>0&&(E=!1)}),E},Ne=(e,E,s)=>s&&E!==void 0?E:e;export{c as A,F as B,H as C,Z as D,W as E,Q as F,X as G,m as H,o as I,$ as J,j as K,q as L,Y as M,h as N,x as O,Re as P,r as S,ee as a,re as b,Ee as c,se as d,te as e,oe as f,Ne as g,ne as h,_e as i,Ie as j,ge as k,b as l,P as m,B as n,u as o,y as p,U as q,f as r,k as s,J as t,Oe as u,z as v,w,p as x,v as y,C as z};
