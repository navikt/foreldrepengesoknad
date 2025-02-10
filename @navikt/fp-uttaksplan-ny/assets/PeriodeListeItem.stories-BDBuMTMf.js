import{j as n}from"./jsx-runtime-CLpGMVip.js";import{P as h,B as o,F as e,S as r,U as v,a as j,b as I,c as d,A as _}from"./PeriodeListeItem-DIJdZX3j.js";import{A as x}from"./ArbeidsgiverInfoType-An3cd7W6.js";import"./index-CR__hKHy.js";import"./index-DVv2q3CG.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";const N=({erFarEllerMedmor:S,erFamiliehendelse:D,permisjonsperiode:A,familiehendelsedato:B,handleUpdatePeriode:b,barn:R})=>n.jsx(I,{initialState:{[d.ER_FAR_ELLER_MEDMOR]:S,[d.BARN]:R,[d.FAMILIEHENDELSEDATO]:B,[d.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:n.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:n.jsx(_,{children:n.jsx(h,{handleUpdatePeriode:b,erFamiliehendelse:D,permisjonsperiode:A})})})}),V={title:"components/PeriodeListeItem",component:h,render:N},a={args:{handleUpdatePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:o.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:e.mor,kontoType:r.Mødrekvote,readOnly:!1}]}}},t={args:{handleUpdatePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:o.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.mor,kontoType:r.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,readOnly:!1}]}}},l={args:{handleUpdatePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:o.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:r.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:e.mor,kontoType:r.Fellesperiode,gradering:{aktivitet:{type:v.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:x.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},s={args:{handleUpdatePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:o.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.farMedmor,kontoType:r.Fedrekvote,readOnly:!1}]}}},i={args:{handleUpdatePeriode:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:o.FØDT,termindato:"2024-08-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:j.PERIODE_UTEN_UTTAK}]}}};var m,p,f;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
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
}`,...(k=(T=t.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var F,c,u;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
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
}`,...(u=(c=l.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var U,E,M;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
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
}`,...(M=(E=s.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var O,g,P;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    handleUpdatePeriode: () => null,
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
}`,...(P=(g=i.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};const W=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{i as PeriodeUtenUttak,s as UttaksperiodeFar,a as UttaksperiodeMor,t as UttaksperiodeMorFlerePerioder,l as UttaksperiodeMorFlerePerioderInkludererGradering,W as __namedExportsOrder,V as default};
