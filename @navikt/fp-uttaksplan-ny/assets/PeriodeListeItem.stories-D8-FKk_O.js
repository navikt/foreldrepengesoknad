import{j as o}from"./jsx-runtime-CLpGMVip.js";import{P as U,B as n,F as e,S as r,a as v,U as I,b as t,A as h}from"./PeriodeListeItem-CYdtjJPD.js";import{U as _,A as x}from"./UttakArbeidType-QEIA8E0B.js";import"./index-9yPe82QC.js";import"./index-DyQ0M4Ou.js";const N=({erFarEllerMedmor:S,erFamiliehendelse:D,permisjonsperiode:B,familiehendelsedato:b,barn:R})=>o.jsx(I,{initialState:{[t.ER_FAR_ELLER_MEDMOR]:S,[t.BARN]:R,[t.FAMILIEHENDELSEDATO]:b,[t.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:o.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:o.jsx(h,{children:o.jsx(U,{erFamiliehendelse:D,permisjonsperiode:B})})})}),J={title:"components/PeriodeListeItem",component:U,render:N},a={args:{barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:e.mor,kontoType:r.Mødrekvote,gjelderAnnenPart:!1}]}}},d={args:{barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.mor,kontoType:r.Mødrekvote,gjelderAnnenPart:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,gjelderAnnenPart:!1}]}}},s={args:{barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:r.Mødrekvote,gjelderAnnenPart:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:e.mor,kontoType:r.Fellesperiode,gjelderAnnenPart:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:e.mor,kontoType:r.Fellesperiode,gradering:{aktivitet:{type:_.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:x.ORGANISASJON}},arbeidstidprosent:50},gjelderAnnenPart:!1}]}}},l={args:{barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:n.FØDT,termindato:"2024-06-01"},erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:e.farMedmor,kontoType:r.Fedrekvote,gjelderAnnenPart:!1}]}}},i={args:{barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:n.FØDT,termindato:"2024-08-01"},erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",gjelderAnnenPart:!1,periodeHullÅrsak:v.PERIODE_UTEN_UTTAK}]}}};var m,p,f;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
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
        gjelderAnnenPart: false
      }]
    }
  }
}`,...(f=(p=a.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var T,k,y;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
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
        gjelderAnnenPart: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        gjelderAnnenPart: false
      }]
    }
  }
}`,...(y=(k=d.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var F,c,g;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
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
        gjelderAnnenPart: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        gjelderAnnenPart: false
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
        gjelderAnnenPart: false
      }]
    }
  }
}`,...(g=(c=s.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var A,E,j;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
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
        gjelderAnnenPart: false
      }]
    }
  }
}`,...(j=(E=l.parameters)==null?void 0:E.docs)==null?void 0:j.source}}};var P,M,u;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
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
        gjelderAnnenPart: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK
      }]
    }
  }
}`,...(u=(M=i.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};const K=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{i as PeriodeUtenUttak,l as UttaksperiodeFar,a as UttaksperiodeMor,d as UttaksperiodeMorFlerePerioder,s as UttaksperiodeMorFlerePerioderInkludererGradering,K as __namedExportsOrder,J as default};
