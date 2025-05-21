import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{h as k,H as g}from"./index-D5WPyhm7.js";import{s as y}from"./saker-Km-C6J1_.js";import{F as e,S as r}from"./stønadskontoType-l1GAnwlP.js";import"./dates-efjv5HSM.js";import{U as F,O as v}from"./UttaksplanKalender-Dm40j_tU.js";import{w as u}from"./withQueryClient-0RnYsr9w.js";import{O as s}from"./routes-C7yRzVAD.js";import{D as a}from"./DinPlan-Jhpa49Na.js";import{M as S,R as h,a as E}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./RettighetType-BD_oerVS.js";import"./index-DQLiH3RP.js";import"./index-ClyUrrHr.js";import"./iframe-Dlc5oPWL.js";import"./dateFormValidation-DqO1zL53.js";import"./Label-DalfrUzn.js";import"./useId-B11Gq5wf.js";import"./links-DDVAVa71.js";import"./VStack-C9FgvL9l.js";import"./message-DohILNTk.js";import"./Alert-CUjC6X8h.js";import"./Button-D10r1vdM.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./File-Do6CElhQ.js";import"./UttaksdagenString-DRcuPL2E.js";import"./HGrid-DUtYApPK.js";import"./HeartFill-DIEwTxty.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./_baseIsEqual-NirykxYQ.js";import"./stringUtils-DGs1tyYX.js";import"./ChevronDown-w7HrHItv.js";import"./Responsive-CFBBoqxs.js";import"./ArrowRight-DYaJDYv5.js";import"./index-CC-COn1g.js";import"./lodash-DhqVAF6S.js";import"./Accordion-C2gXj9Z6.js";import"./Checkmark-BSY2UjC4.js";import"./QueryClientProvider-DTI5uWLr.js";import"./index-Ctu3BZYE.js";import"./useSelectedSak-CTG7R_6C.js";import"./useQuery-Km81jHJP.js";import"./api-By2d6bGs.js";import"./sakerUtils-DmFzd43B.js";const ye={title:"DinPlan",component:a,decorators:[u],render:T=>n.jsx(S,{initialEntries:[`/${s.DIN_PLAN}/352011079`],children:n.jsx(h,{children:n.jsx(E,{element:n.jsx(a,{...T}),path:`/${s.DIN_PLAN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>g.json(y))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},t={parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>g.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:e.farMedmor,kontoType:r.Mødrekvote,overføringÅrsak:v.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:r.Mødrekvote,forelder:e.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:r.Mødrekvote,forelder:e.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:r.Fellesperiode,forelder:e.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:r.Fellesperiode,forelder:e.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:F.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:r.Fellesperiode,forelder:e.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};var m,d,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(f=(l=t.parameters)==null?void 0:l.docs)==null?void 0:f.source}}};const Fe=["Default","FarSøker"];export{o as Default,t as FarSøker,Fe as __namedExportsOrder,ye as default};
