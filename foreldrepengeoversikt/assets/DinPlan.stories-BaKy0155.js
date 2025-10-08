import{i,F as e,S as r,aI as f,j as n,aJ as k}from"./iframe-BGOG44DK.js";import{h as d,H as m}from"./index-B4Zy9ehy.js";import{s as g}from"./saker-DWfdw2la.js";import{A as l}from"./api-CnpsdBLC.js";import{O as a}from"./routes-C7yRzVAD.js";import{D as s}from"./DinPlan-BPzKKye2.js";import{M as T,R as F,a as y}from"./chunk-TMI4QPZX-QwzuWtG2.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useSelectedSak-CCMmAbnx.js";import"./useQuery-DT5RNUV5.js";import"./sakerUtils-DK21Rf3m.js";const _={title:"DinPlan",component:s,decorators:[i],render:p=>n.jsx(T,{initialEntries:[`/${a.DIN_PLAN}/352011079`],children:n.jsx(F,{children:n.jsx(y,{element:n.jsx(s,{...p}),path:`/${a.DIN_PLAN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[d.get(l.saker,()=>m.json(g))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},t={parameters:{msw:{handlers:[d.get(l.saker,()=>m.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:e.farMedmor,kontoType:r.Mødrekvote,overføringÅrsak:k.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:r.Mødrekvote,forelder:e.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:r.Mødrekvote,forelder:e.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:r.Fellesperiode,forelder:e.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:r.Fellesperiode,forelder:e.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:f.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:r.Fellesperiode,forelder:e.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker))]
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
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json({
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
}`,...t.parameters?.docs?.source}}};const H=["Default","FarSøker"];export{o as Default,t as FarSøker,H as __namedExportsOrder,_ as default};
