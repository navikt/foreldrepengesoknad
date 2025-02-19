import{j as o}from"./jsx-runtime-CLpGMVip.js";import{P as O,B as n,F as e,S as r,U as j,a as I,b as _,c as d,A as x}from"./PeriodeListeItem-Ck9QGCo4.js";import{A as N}from"./ArbeidsgiverInfoType-An3cd7W6.js";import"./index-CR__hKHy.js";import"./index-DVv2q3CG.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";const L=({erFarEllerMedmor:g,erFamiliehendelse:S,permisjonsperiode:A,familiehendelsedato:B,handleUpdatePeriode:b,handleDeletePeriode:R,barn:v})=>o.jsx(_,{initialState:{[d.ER_FAR_ELLER_MEDMOR]:g,[d.BARN]:v,[d.FAMILIEHENDELSEDATO]:B,[d.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:o.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:o.jsx(x,{children:o.jsx(O,{handleUpdatePeriode:b,handleDeletePeriode:R,erFamiliehendelse:S,permisjonsperiode:A})})})}),W={title:"components/PeriodeListeItem",component:O,render:L},a={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:e.mor,kontoType:r.Mødrekvote,readOnly:!1}]}}},t={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.mor,kontoType:r.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,readOnly:!1}]}}},l={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:r.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:e.mor,kontoType:r.Fellesperiode,gradering:{aktivitet:{type:j.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:N.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},s={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.farMedmor,kontoType:r.Fedrekvote,readOnly:!1}]}}},i={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:n.FØDT,termindato:"2024-08-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:I.PERIODE_UTEN_UTTAK}]}}};var m,p,f;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-30'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-30',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }]
    }
  }
}`,...(f=(p=a.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var y,T,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false
      }]
    }
  }
}`,...(k=(T=t.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var F,u,c;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-29',
        tom: '2024-08-23',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        gradering: {
          aktivitet: {
            type: UttakArbeidType.ORDINÆRT_ARBEID,
            arbeidsgiver: {
              id: '1',
              navn: 'TESTY TEST',
              type: ArbeidsgiverInfoType.ORGANISASJON
            }
          },
          arbeidstidprosent: 50
        },
        readOnly: false
      }]
    }
  }
}`,...(c=(u=l.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var P,U,h;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-28'
      },
      forelder: Forelder.farMedmor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.Fedrekvote,
        readOnly: false
      }]
    }
  }
}`,...(h=(U=s.parameters)==null?void 0:U.docs)==null?void 0:h.source}}};var E,D,M;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-08-01'],
      type: BarnType.FØDT,
      termindato: '2024-08-01'
    },
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-08-01',
    permisjonsperiode: {
      erPeriodeUtenUttak: true,
      tidsperiode: {
        fom: '2024-08-01',
        tom: '2024-08-31'
      },
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-08-01',
        tom: '2024-08-31',
        readOnly: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK
      }]
    }
  }
}`,...(M=(D=i.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const q=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{i as PeriodeUtenUttak,s as UttaksperiodeFar,a as UttaksperiodeMor,t as UttaksperiodeMorFlerePerioder,l as UttaksperiodeMorFlerePerioderInkludererGradering,q as __namedExportsOrder,W as default};
