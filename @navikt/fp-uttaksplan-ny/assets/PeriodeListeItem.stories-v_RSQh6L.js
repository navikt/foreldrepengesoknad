import{o as n}from"./index-pZ3K1Nid.js";import{P as h,F as e,a as r,S as o,b as R,U as v,c as m,A as x}from"./PeriodeListeItem-CQue9K0Z.js";import"./index-DJO9vBfz.js";var E=(t=>(t.arbeidstaker="ARBEIDSTAKER",t.frilans="FRILANS",t.selvstendignæringsdrivende="SELVSTENDIG_NÆRINGSDRIVENDE",t))(E||{});const T=t=>n.jsx(v,{initialState:{[m.ER_FAR_ELLER_MEDMOR]:!0,[m.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:n.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:n.jsx(x,{children:n.jsx(h,{...t})})})}),N={title:"components/PeriodeListeItem",component:h,render:T},d={args:{familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-30")},forelder:e.mor,konto:o.Mødrekvote}]}}},i={args:{familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode}]}}},a={args:{familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-29"),tom:new Date("2024-08-23")},forelder:e.mor,konto:o.Fellesperiode,gradert:!0,arbeidsformer:[E.arbeidstaker],stillingsprosent:"50"}]}}},s={args:{familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.farMedmor,konto:o.Fedrekvote}]}}},p={args:{familiehendelsedato:"2024-06-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Hull,tidsperiode:{fom:new Date("2024-08-01"),tom:new Date("2024-08-31")},årsak:R.fridag}]}}};var l,f,k;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-30'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-30')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote
      }]
    }
  }
}`,...(k=(f=d.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var c,D,y;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-28')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-07-01'),
          tom: new Date('2024-07-26')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode
      }]
    }
  }
}`,...(y=(D=i.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var U,w,u;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-28')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-07-01'),
          tom: new Date('2024-07-26')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-07-29'),
          tom: new Date('2024-08-23')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
        gradert: true,
        arbeidsformer: [Arbeidsform.arbeidstaker],
        stillingsprosent: '50'
      }]
    }
  }
}`,...(u=(w=a.parameters)==null?void 0:w.docs)==null?void 0:u.source}}};var F,g,P;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-28'
      },
      forelder: Forelder.farMedmor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-28')
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote
      }]
    }
  }
}`,...(P=(g=s.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};var M,S,j;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      erPeriodeUtenUttak: true,
      tidsperiode: {
        fom: '2024-08-01',
        tom: '2024-08-31'
      },
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Hull,
        tidsperiode: {
          fom: new Date('2024-08-01'),
          tom: new Date('2024-08-31')
        },
        årsak: PeriodeHullÅrsak.fridag
      }]
    }
  }
}`,...(j=(S=p.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};const A=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{p as PeriodeUtenUttak,s as UttaksperiodeFar,d as UttaksperiodeMor,i as UttaksperiodeMorFlerePerioder,a as UttaksperiodeMorFlerePerioderInkludererGradering,A as __namedExportsOrder,N as default};
