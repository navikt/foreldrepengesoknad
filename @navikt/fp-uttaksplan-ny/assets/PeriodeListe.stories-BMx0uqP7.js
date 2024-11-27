import{p as g,o as i}from"./index-CaKEKxbl.js";import{T as w,f as s,i as W,e as z,g as Q,h as X,j as Z,k as ee,n as re,u as ne,c as k,d as oe,P as S,l as te,B as p,S as t,F as o,a as c,U as C,A as V,m as ae,b as de}from"./PeriodeListeItem-DJbLTdPn.js";import{r as se}from"./index-DJO9vBfz.js";const le=(a,d,r)=>!d||!a?!1:!!(g(a.tidsperiode.tom).isBefore(r)&&g(d.tom).isBefore(r)),ie=(a,d,r)=>!d||!a?!1:!!(g(a.tidsperiode.fom).isSameOrAfter(r)&&g(d.fom).isSameOrAfter(r)),me=(a,d,r)=>ie(a,d,r)||le(a,d,r),fe=(a,d)=>{const r=[];if(a.length===0)return r;let n,l,m=!1;return a.forEach((e,$)=>{const E=$+1;let f;if(m){m=!1;return}E<a.length?f=a[E]:f=void 0;const q=me(n,e,d);if(f!==void 0&&(m=w({fom:e.fom,tom:e.tom}).erLik({fom:f.fom,tom:f.tom})),m&&f!==void 0){n={perioder:[{...e},{...f}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)},samtidigUttak:!0},r.push(n),n=void 0,l=void 0,m=!0;return}if(W(e)||z(e)||Q(e)){const j=e.forelder;n?l===e.forelder&&q?(n.perioder=[...n.perioder,{...e}],n.tidsperiode.tom=s(e.tom)):n={forelder:j,perioder:[{...e}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)}}:n={forelder:j,perioder:[{...e}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)},samtidigUttak:!!e.samtidigUttak},r.includes(n)||r.push(n),l=e.forelder;return}X(e)&&(n={perioder:[{...e}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)},erPeriodeUtenUttak:!0},r.push(n),l=void 0,n=void 0),Z(e)&&(n={perioder:[{...e}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)},erUtsettelse:!0},r.push(n),l=void 0,n=void 0),ee(e)&&(n={perioder:[{...e}],tidsperiode:{fom:s(e.fom),tom:s(e.tom)},erHull:!0},r.push(n),l=void 0,n=void 0)}),r},pe=(a,d)=>a.findIndex(r=>te(r.tidsperiode)&&g(r.tidsperiode.fom).isSameOrAfter(d,"d")),M=({perioder:a})=>{const d=re(ne(k.FAMILIEHENDELSEDATO)),r=fe(a,d),n=pe(r,d);return i.jsx("div",{children:i.jsx(oe,{children:r.map((l,m)=>i.jsxs(se.Fragment,{children:[n===m?i.jsx(S,{permisjonsperiode:l,erFamiliehendelse:!0}):null,i.jsx(S,{permisjonsperiode:l})]},`${l.tidsperiode.fom}-${l.tidsperiode.tom}`))})})};M.__docgenInfo={description:"",methods:[],displayName:"PeriodeListe",props:{perioder:{required:!0,tsType:{name:"Array",elements:[{name:"Planperiode"}],raw:"Planperiode[]"},description:""}}};const ke=({perioder:a,familiehendelsedato:d,barn:r,erFarEllerMedmor:n})=>i.jsx(de,{initialState:{[k.ER_FAR_ELLER_MEDMOR]:n,[k.FAMILIEHENDELSEDATO]:d,[k.BARN]:r,[k.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:i.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:i.jsx(M,{perioder:a})})}),ye={title:"components/PeriodeListe",component:M,render:ke},T={name:"Mor søker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:t.ForeldrepengerFørFødsel,forelder:o.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:t.Mødrekvote,forelder:o.mor,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:c.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:t.Fellesperiode,forelder:o.mor,samtidigUttak:50,gjelderAnnenPart:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:t.Fedrekvote,forelder:o.mor,gjelderAnnenPart:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:t.Mødrekvote,forelder:o.mor,gradering:{aktivitet:{type:C.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:V.ORGANISASJON}},arbeidstidprosent:20},gjelderAnnenPart:!1}]}},F={name:"Mor og far med samtidig uttak",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:t.ForeldrepengerFørFødsel,forelder:o.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:t.Mødrekvote,forelder:o.mor,samtidigUttak:100,gjelderAnnenPart:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:t.Fedrekvote,forelder:o.farMedmor,samtidigUttak:100,gjelderAnnenPart:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:t.Mødrekvote,forelder:o.mor,gjelderAnnenPart:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:t.Fedrekvote,forelder:o.farMedmor,gjelderAnnenPart:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:t.Fellesperiode,forelder:o.farMedmor,gjelderAnnenPart:!0}]}},y={name:"Far søker og mor har ikke rett",args:{erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:t.Foreldrepenger,forelder:o.farMedmor,gjelderAnnenPart:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:t.AktivitetsfriKvote,forelder:o.farMedmor,gjelderAnnenPart:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:c.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:t.Foreldrepenger,forelder:o.farMedmor,gjelderAnnenPart:!1,gradering:{aktivitet:{type:C.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:V.ORGANISASJON}},arbeidstidprosent:80}}]}},u={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:t.ForeldrepengerFørFødsel,forelder:o.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:t.Mødrekvote,forelder:o.mor,flerbarnsdager:!0,samtidigUttak:100,gjelderAnnenPart:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:t.Fedrekvote,forelder:o.farMedmor,flerbarnsdager:!0,samtidigUttak:100,gjelderAnnenPart:!0}]}},A={name:"Mor har ikke lagt inn uttak første seks uker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:t.ForeldrepengerFørFødsel,forelder:o.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:c.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:t.Mødrekvote,forelder:o.mor,gjelderAnnenPart:!1}]}},P={name:"Mor er innlagt første seks uker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:p.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:t.ForeldrepengerFørFødsel,forelder:o.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:ae.InstitusjonSøker,forelder:o.mor,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:t.Mødrekvote,forelder:o.mor,gjelderAnnenPart:!1}]}};var v,U,b;T.parameters={...T.parameters,docs:{...(v=T.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-10',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '4',
      fom: '2024-06-11',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      samtidigUttak: 50,
      gjelderAnnenPart: false
    }, {
      id: '5',
      fom: '2024-07-01',
      tom: '2024-07-02',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '6',
      fom: '2024-07-03',
      tom: '2024-07-10',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gradering: {
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID,
          arbeidsgiver: {
            id: '1',
            navn: 'TESTY TEST',
            type: ArbeidsgiverInfoType.ORGANISASJON
          }
        },
        arbeidstidprosent: 20
      },
      gjelderAnnenPart: false
    }]
  }
}`,...(b=(U=T.parameters)==null?void 0:U.docs)==null?void 0:b.source}}};var I,h,D;F.parameters={...F.parameters,docs:{...(I=F.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttak: 100,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttak: 100,
      gjelderAnnenPart: true
    }, {
      id: '4',
      fom: '2024-05-06',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '5',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: true
    }, {
      id: '6',
      fom: '2024-07-01',
      tom: '2024-07-08',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: true
    }]
  }
}`,...(D=(h=F.parameters)==null?void 0:h.docs)==null?void 0:D.source}}};var O,R,_;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-05-01',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-05-01',
      tom: '2024-08-21',
      kontoType: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-08-22',
      tom: '2024-08-29',
      kontoType: StønadskontoType.AktivitetsfriKvote,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-08-30',
      tom: '2024-09-13',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-09-16',
      tom: '2024-09-23',
      kontoType: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false,
      gradering: {
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID,
          arbeidsgiver: {
            id: '1',
            navn: 'TESTY TEST',
            type: ArbeidsgiverInfoType.ORGANISASJON
          }
        },
        arbeidstidprosent: 80
      }
    }]
  }
}`,...(_=(R=y.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var B,N,x;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      gjelderAnnenPart: true
    }]
  }
}`,...(x=(N=u.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};var H,L,K;A.parameters={...A.parameters,docs:{...(H=A.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }]
  }
}`,...(K=(L=A.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};var G,J,Y;P.parameters={...P.parameters,docs:{...(G=P.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }]
  }
}`,...(Y=(J=P.parameters)==null?void 0:J.docs)==null?void 0:Y.source}}};const ue=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{y as UttaksperioderFarMorIkkeRett,T as UttaksperioderMor,A as UttaksperioderMorIkkeSøktFørsteSeksUker,P as UttaksperioderMorInnlagtFørsteSeksUker,F as UttaksperioderMorOgFar,u as UttaksperioderMorOgFarFlerbarnsdager,ue as __namedExportsOrder,ye as default};
