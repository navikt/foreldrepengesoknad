import{j as n}from"./jsx-runtime-CLpGMVip.js";import{h as k,H as g}from"./index-B-Pz4-0B.js";import{s as y}from"./saker-8XUfCwXd.js";import{S as e,F as r}from"./stønadskontoType-l1GAnwlP.js";import"./dates-C5Vjd-yy.js";import{O as F,U as v}from"./UttaksplanKalender-D9E9Z6qS.js";import{w as u}from"./withQueryClient-D8gqxQ_c.js";import{O as s}from"./routes-C7yRzVAD.js";import{D as a}from"./DinPlan-D-Q5_g2b.js";import{M as S,R as h,a as E}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./decorators-DIzpaN6C.js";import"./RettighetType-BD_oerVS.js";import"./index-CR__hKHy.js";import"./index-3B3qaQUl.js";import"./iframe-Cm-MZYtj.js";import"./dateFormValidation-B_FVzQTI.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-Ds5beYJE.js";import"./VStack-BZkCtxmu.js";import"./message-BHI3Qds1.js";import"./Alert-CDkKqNcv.js";import"./Button-0HoN0soU.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./UttaksdagenString-DgzxJ_GZ.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-HAqS6-7H.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./QueryClientProvider-XbgLbB-5.js";import"./index-46qmyZAO.js";import"./useSelectedSak-CBUXu06m.js";import"./useQuery-B2xbgnn4.js";import"./api-CV6oBBCk.js";import"./sakerUtils-RVZHnfb5.js";const Te={title:"DinPlan",component:a,decorators:[u],render:T=>n.jsx(S,{initialEntries:[`/${s.DIN_PLAN}/352011079`],children:n.jsx(h,{children:n.jsx(E,{element:n.jsx(a,{...T}),path:`/${s.DIN_PLAN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>g.json(y))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},t={parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>g.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:e.Mødrekvote,overføringÅrsak:F.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:e.ForeldrepengerFørFødsel,forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Mødrekvote,forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:e.Mødrekvote,forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:e.Fellesperiode,forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:e.Fellesperiode,forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:v.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:e.Fellesperiode,forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};var m,d,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  },
  args: {
    annenPartsPerioder: [{
      fom: '2022-10-14',
      tom: '2022-12-21',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttak: 50
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var i,l,f;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json({
        foreldrepenger: [{
          oppdatertTidspunkt: '2024-02-28T21:19:08.911',
          saksnummer: '352011079',
          sakAvsluttet: false,
          kanSøkeOmEndring: true,
          sakTilhørerMor: false,
          gjelderAdopsjon: false,
          morUføretrygd: false,
          harAnnenForelderTilsvarendeRettEØS: false,
          ønskerJustertUttakVedFødsel: false,
          rettighetType: 'BEGGE_RETT',
          annenPart: {
            fnr: '03506715317'
          },
          familiehendelse: {
            fødselsdato: '2024-10-01',
            termindato: '2024-10-01',
            antallBarn: 1
          },
          gjeldendeVedtak: {
            perioder: [{
              fom: '2024-10-01',
              tom: '2024-10-14',
              kontoType: StønadskontoType.Fedrekvote,
              forelder: Forelder.farMedmor,
              samtidigUttak: 100
            }, {
              fom: '2025-01-01',
              tom: '2025-02-04',
              forelder: Forelder.farMedmor,
              kontoType: StønadskontoType.Mødrekvote,
              overføringÅrsak: OverføringÅrsakType.institusjonsoppholdAnnenForelder
            }]
          },
          barn: [{
            fnr: '01472254177'
          }],
          dekningsgrad: 'HUNDRE'
        }],
        engangsstønad: [],
        svangerskapspenger: []
      }))]
    }
  },
  args: {
    annenPartsPerioder: [{
      fom: '2024-09-10',
      tom: '2024-09-30',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      fom: '2024-10-01',
      tom: '2024-10-14',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttak: 100
    }, {
      fom: '2024-10-15',
      tom: '2024-12-09',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }, {
      fom: '2024-12-10',
      tom: '2024-12-31',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor
    }, {
      fom: '2025-02-05',
      tom: '2025-03-11',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: UttakArbeidType.FRILANS
        }
      }
    }, {
      fom: '2025-03-19',
      tom: '2025-04-22',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...(f=(l=t.parameters)==null?void 0:l.docs)==null?void 0:f.source}}};const ye=["Default","FarSøker"];export{o as Default,t as FarSøker,ye as __namedExportsOrder,Te as default};
