import{p as f,o as m}from"./index-BQP58g6b.js";import{T as z,f as s,i as G,d as Q,e as X,g as Z,h as $,j as ee,k as te,A as re,P as v,l as oe,m as P,a as r,S as a,F as d,b as ne,U as de,c as T}from"./PeriodeListeItem-Cqmkcuy3.js";import"./index-DJO9vBfz.js";var C=(e=>(e.FØDT="født",e.UFØDT="ufødt",e.ADOPTERT_STEBARN="adoptertStebarn",e.ADOPTERT_ANNET_BARN="adoptertAnnetBarn",e.IKKE_UTFYLT="ikkeUtfylt",e))(C||{});const ae=e=>e.type==="ufødt",ie=e=>e.type==="adoptertStebarn"||e.type==="adoptertAnnetBarn";var Y=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SYKDOM",e.InstitusjonSøker="INSTITUSJONSOPPHOLD_SØKER",e.InstitusjonBarnet="INSTITUSJONSOPPHOLD_BARNET",e.HvØvelse="HV_OVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(Y||{});const se=(e,i,n)=>!i||!e?!1:!!(f(e.tidsperiode.tom).isBefore(n)&&f(i.tidsperiode.tom).isBefore(n)),me=(e,i,n)=>!i||!e?!1:!!(f(e.tidsperiode.fom).isSameOrAfter(n)&&f(i.tidsperiode.fom).isSameOrAfter(n)),pe=(e,i,n)=>me(e,i,n)||se(e,i,n),le=(e,i)=>{const n=[];if(e.length===0)return n;let o,p,l=!1;return e.forEach((t,w)=>{const S=w+1;let k;if(l){l=!1;return}S<e.length?k=e[S]:k=void 0;const W=pe(o,t,i);if(k!==void 0&&(l=z(t.tidsperiode).erLik(k.tidsperiode)),l&&k!==void 0){o={perioder:[{...t},{...k}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},samtidigUttak:!0},n.push(o),o=void 0,p=void 0,l=!0;return}if(G(t)||Q(t)||X(t)||Z(t)){const M=t.forelder;o?p===t.forelder&&W?(o.perioder=[...o.perioder,{...t}],o.tidsperiode.tom=s(t.tidsperiode.tom)):o={forelder:M,perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)}}:o={forelder:M,perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)}},n.includes(o)||n.push(o),p=t.forelder;return}$(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erPeriodeUtenUttak:!0},n.push(o),p=void 0,o=void 0),ee(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erUtsettelse:!0},n.push(o),p=void 0,o=void 0),te(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erHull:!0},n.push(o),p=void 0,o=void 0)}),n},ke=(e,i)=>e.findIndex(n=>oe(n.tidsperiode)&&f(n.tidsperiode.fom).isSameOrAfter(i,"d")),fe=e=>ae(e)?P.TERM:ie(e)?P.ADOPSJON:P.FØDSEL,c=({perioder:e,familiehendelsedato:i,barn:n})=>{const o=le(e,i),p=ke(o,i),l=fe(n);return m.jsx("div",{children:m.jsx(re,{children:o.map((t,w)=>m.jsxs(m.Fragment,{children:[p===w?m.jsx(v,{permisjonsperiode:t,familiehendelsedato:i,erFamiliehendelse:!0,familiehendelseType:l}):null,m.jsx(v,{permisjonsperiode:t,familiehendelsedato:i})]}))})})};c.__docgenInfo={description:"",methods:[],displayName:"PeriodeListe",props:{perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},familiehendelsedato:{required:!0,tsType:{name:"string"},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""}}};const Fe=({perioder:e,familiehendelsedato:i})=>m.jsx(de,{initialState:{[T.ER_FAR_ELLER_MEDMOR]:!0,[T.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:m.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:m.jsx(c,{perioder:e,familiehendelsedato:i,barn:{type:C.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]}})})}),ge={title:"components/PeriodeListe",component:c,render:Fe},F={name:"Mor søker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-10")},type:r.PeriodeUtenUttak},{id:"4",tidsperiode:{fom:new Date("2024-06-11"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Fellesperiode,forelder:d.mor,ønskerSamtidigUttak:!0,samtidigUttakProsent:"50"},{id:"5",tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-02")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.mor},{id:"6",tidsperiode:{fom:new Date("2024-07-03"),tom:new Date("2024-07-10")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,gradert:!0,stillingsprosent:"20"}]}},U={name:"Mor og far med samtidig uttak",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-03")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,samtidigUttakProsent:"100"},{id:"3",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-03")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor,samtidigUttakProsent:"100"},{id:"4",tidsperiode:{fom:new Date("2024-05-06"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor},{id:"5",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor},{id:"6",tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-08")},type:r.Uttak,konto:a.Fellesperiode,forelder:d.farMedmor}]}},D={name:"Far søker og mor har ikke rett",args:{familiehendelsedato:"2024-05-01",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-05-01"),tom:new Date("2024-08-21")},type:r.Uttak,konto:a.Foreldrepenger,forelder:d.farMedmor},{id:"2",tidsperiode:{fom:new Date("2024-08-22"),tom:new Date("2024-08-29")},type:r.Uttak,konto:a.AktivitetsfriKvote,forelder:d.farMedmor},{id:"2",tidsperiode:{fom:new Date("2024-08-30"),tom:new Date("2024-09-13")},type:r.PeriodeUtenUttak},{id:"2",tidsperiode:{fom:new Date("2024-09-16"),tom:new Date("2024-09-23")},type:r.Uttak,konto:a.Foreldrepenger,forelder:d.farMedmor,gradert:!0,stillingsprosent:"80"}]}},y={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,ønskerFlerbarnsdager:!0,samtidigUttakProsent:"100"},{id:"3",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor,ønskerFlerbarnsdager:!0,samtidigUttakProsent:"100"}]}},g={name:"Mor har ikke lagt inn uttak første seks uker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Hull,årsak:ne.fridag},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor}]}},u={name:"Mor er innlagt første seks uker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Utsettelse,årsak:Y.InstitusjonSøker,erArbeidstaker:!0,forelder:d.mor},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor}]}};var A,h,I;F.parameters={...F.parameters,docs:{...(A=F.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-10')
      },
      type: Periodetype.PeriodeUtenUttak
    }, {
      id: '4',
      tidsperiode: {
        fom: new Date('2024-06-11'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      ønskerSamtidigUttak: true,
      samtidigUttakProsent: '50'
    }, {
      id: '5',
      tidsperiode: {
        fom: new Date('2024-07-01'),
        tom: new Date('2024-07-02')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.mor
    }, {
      id: '6',
      tidsperiode: {
        fom: new Date('2024-07-03'),
        tom: new Date('2024-07-10')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gradert: true,
      stillingsprosent: '20'
    }]
  }
}`,...(I=(h=F.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var E,O,B;U.parameters={...U.parameters,docs:{...(E=U.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-03')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttakProsent: '100'
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-03')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttakProsent: '100'
    }, {
      id: '4',
      tidsperiode: {
        fom: new Date('2024-05-06'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }, {
      id: '5',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor
    }, {
      id: '6',
      tidsperiode: {
        fom: new Date('2024-07-01'),
        tom: new Date('2024-07-08')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fellesperiode,
      forelder: Forelder.farMedmor
    }]
  }
}`,...(B=(O=U.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var _,b,x;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    familiehendelsedato: '2024-05-01',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-05-01'),
        tom: new Date('2024-08-21')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-08-22'),
        tom: new Date('2024-08-29')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.AktivitetsfriKvote,
      forelder: Forelder.farMedmor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-08-30'),
        tom: new Date('2024-09-13')
      },
      type: Periodetype.PeriodeUtenUttak
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-09-16'),
        tom: new Date('2024-09-23')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gradert: true,
      stillingsprosent: '80'
    }]
  }
}`,...(x=(b=D.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var R,j,L;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      ønskerFlerbarnsdager: true,
      samtidigUttakProsent: '100'
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      ønskerFlerbarnsdager: true,
      samtidigUttakProsent: '100'
    }]
  }
}`,...(L=(j=y.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var N,H,K;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Hull,
      årsak: PeriodeHullÅrsak.fridag
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }]
  }
}`,...(K=(H=g.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var V,q,J;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Utsettelse,
      årsak: UtsettelseÅrsakType.InstitusjonSøker,
      erArbeidstaker: true,
      forelder: Forelder.mor
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }]
  }
}`,...(J=(q=u.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const ue=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{D as UttaksperioderFarMorIkkeRett,F as UttaksperioderMor,g as UttaksperioderMorIkkeSøktFørsteSeksUker,u as UttaksperioderMorInnlagtFørsteSeksUker,U as UttaksperioderMorOgFar,y as UttaksperioderMorOgFarFlerbarnsdager,ue as __namedExportsOrder,ge as default};
