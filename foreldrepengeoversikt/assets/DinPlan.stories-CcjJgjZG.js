import{k as i,j as t}from"./iframe-CX80ZlCu.js";import{h as e,H as r}from"./index-CdrpohTV.js";import{s as R}from"./saker-thaWTfcA.js";import{A as n}from"./queries-APlx939T.js";import{O as d}from"./routes-C7yRzVAD.js";import{D as E}from"./DinPlan-B1K0HuBN.js";import{M as f,R as m,a as g}from"./chunk-4WY6JWTD-BwT1iJWl.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-Cmh8ni-t.js";import"./useSelectedSak-DacUPGe6.js";import"./sakerUtils-CEOVIOLD.js";const p={80:{kontoer:[{konto:"FELLESPERIODE",dager:90},{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},100:{kontoer:[{konto:"FELLESPERIODE",dager:80},{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}},l={80:{kontoer:[{konto:"FELLESPERIODE",dager:101},{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:0}},100:{kontoer:[{konto:"FELLESPERIODE",dager:80},{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:0}}},S={title:"DinPlan",component:E,decorators:[i],render:k=>t.jsx(f,{initialEntries:[`/${d.DIN_PLAN}/1`],children:t.jsx(m,{children:t.jsx(g,{element:t.jsx(E,{...k}),path:`/${d.DIN_PLAN}/:saksnummer`})})})},a={parameters:{msw:{handlers:[e.get(n.saker,()=>r.json(R)),e.post(n.konto,()=>r.json(p))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},o={parameters:{msw:{handlers:[e.post(n.konto,()=>r.json(l)),e.get(n.saker,()=>r.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:"FAR_MEDMOR",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER"}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR"},{fom:"2024-10-01",tom:"2024-10-14",kontoType:"MØDREKVOTE",forelder:"MOR",samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:"MØDREKVOTE",forelder:"MOR"},{fom:"2024-12-10",tom:"2024-12-31",kontoType:"FELLESPERIODE",forelder:"MOR"},{fom:"2025-02-05",tom:"2025-03-11",kontoType:"FELLESPERIODE",forelder:"MOR",gradering:{arbeidstidprosent:50,aktivitet:{type:"FRILANS"}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:"FELLESPERIODE",forelder:"MOR"}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},s={name:"Mor og far søker - far graderer",parameters:{msw:{handlers:[e.post(n.konto,()=>r.json(l)),e.get(n.saker,()=>r.json({foreldrepenger:[{saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!0,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"29459848930"},familiehendelse:{fødselsdato:"2025-03-25",termindato:"2025-03-25",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2025-03-04",tom:"2025-03-24",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-03-25",tom:"2025-07-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-07-08",tom:"2025-09-01",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],perioderAnnenpartEøs:[]},barn:[{fnr:"22442356029"}],dekningsgrad:"HUNDRE",oppdatertTidspunkt:"2025-09-16T14:09:43.208",forelder:"MOR"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2025-09-23",tom:"2025-11-17",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!1,trekkerDager:!1,årsak:"ANNET"},gradering:{arbeidstidprosent:50,aktivitet:{type:"ORDINÆRT_ARBEID"}},morsAktivitet:"ARBEID",flerbarnsdager:!1,forelder:"FAR_MEDMOR"},{fom:"2025-11-18",tom:"2026-01-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},gradering:{arbeidstidprosent:50,aktivitet:{type:"ORDINÆRT_ARBEID"}},morsAktivitet:"ARBEID",flerbarnsdager:!1,forelder:"FAR_MEDMOR"},{fom:"2026-03-17",tom:"2026-10-12",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},gradering:{arbeidstidprosent:50,aktivitet:{type:"ORDINÆRT_ARBEID"}},flerbarnsdager:!1,forelder:"FAR_MEDMOR"}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer1))]
    }
  },
  args: {
    annenPartsPerioder: [{
      fom: '2022-10-14',
      tom: '2022-12-21',
      kontoType: 'FEDREKVOTE',
      forelder: 'FAR_MEDMOR',
      samtidigUttak: 50
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer2)), http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [{
          oppdatertTidspunkt: '2024-02-28T21:19:08.911',
          saksnummer: '1',
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
              kontoType: 'FEDREKVOTE',
              forelder: 'FAR_MEDMOR',
              samtidigUttak: 100
            }, {
              fom: '2025-01-01',
              tom: '2025-02-04',
              forelder: 'FAR_MEDMOR',
              kontoType: 'MØDREKVOTE',
              overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      forelder: 'MOR'
    }, {
      fom: '2024-10-01',
      tom: '2024-10-14',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      samtidigUttak: 100
    }, {
      fom: '2024-10-15',
      tom: '2024-12-09',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR'
    }, {
      fom: '2024-12-10',
      tom: '2024-12-31',
      kontoType: 'FELLESPERIODE',
      forelder: 'MOR'
    }, {
      fom: '2025-02-05',
      tom: '2025-03-11',
      kontoType: 'FELLESPERIODE',
      forelder: 'MOR',
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: 'FRILANS'
        }
      }
    }, {
      fom: '2025-03-19',
      tom: '2025-04-22',
      kontoType: 'FELLESPERIODE',
      forelder: 'MOR'
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far søker - far graderer',
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer2)), http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [{
          saksnummer: '1',
          sakAvsluttet: false,
          kanSøkeOmEndring: true,
          sakTilhørerMor: true,
          gjelderAdopsjon: false,
          morUføretrygd: false,
          harAnnenForelderTilsvarendeRettEØS: false,
          ønskerJustertUttakVedFødsel: false,
          rettighetType: 'BEGGE_RETT',
          annenPart: {
            fnr: '29459848930'
          },
          familiehendelse: {
            fødselsdato: '2025-03-25',
            termindato: '2025-03-25',
            antallBarn: 1
          },
          gjeldendeVedtak: {
            perioder: [{
              fom: '2025-03-04',
              tom: '2025-03-24',
              kontoType: 'FORELDREPENGER_FØR_FØDSEL',
              resultat: {
                innvilget: true,
                trekkerMinsterett: true,
                trekkerDager: true,
                årsak: 'ANNET'
              },
              flerbarnsdager: false,
              forelder: 'MOR'
            }, {
              fom: '2025-03-25',
              tom: '2025-07-07',
              kontoType: 'MØDREKVOTE',
              resultat: {
                innvilget: true,
                trekkerMinsterett: true,
                trekkerDager: true,
                årsak: 'ANNET'
              },
              flerbarnsdager: false,
              forelder: 'MOR'
            }, {
              fom: '2025-07-08',
              tom: '2025-09-01',
              kontoType: 'FELLESPERIODE',
              resultat: {
                innvilget: true,
                trekkerMinsterett: true,
                trekkerDager: true,
                årsak: 'ANNET'
              },
              flerbarnsdager: false,
              forelder: 'MOR'
            }],
            perioderAnnenpartEøs: []
          },
          barn: [{
            fnr: '22442356029'
          }],
          dekningsgrad: 'HUNDRE',
          oppdatertTidspunkt: '2025-09-16T14:09:43.208',
          forelder: 'MOR'
        }],
        engangsstønad: [],
        svangerskapspenger: []
      }))]
    }
  },
  args: {
    annenPartsPerioder: [{
      fom: '2025-09-23',
      tom: '2025-11-17',
      kontoType: 'FELLESPERIODE',
      resultat: {
        innvilget: false,
        trekkerMinsterett: false,
        trekkerDager: false,
        årsak: 'ANNET'
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: 'ORDINÆRT_ARBEID'
        }
      },
      morsAktivitet: 'ARBEID',
      flerbarnsdager: false,
      forelder: 'FAR_MEDMOR'
    }, {
      fom: '2025-11-18',
      tom: '2026-01-12',
      kontoType: 'FELLESPERIODE',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: 'ORDINÆRT_ARBEID'
        }
      },
      morsAktivitet: 'ARBEID',
      flerbarnsdager: false,
      forelder: 'FAR_MEDMOR'
    }, {
      fom: '2026-03-17',
      tom: '2026-10-12',
      kontoType: 'FEDREKVOTE',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: 'ORDINÆRT_ARBEID'
        }
      },
      flerbarnsdager: false,
      forelder: 'FAR_MEDMOR'
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...s.parameters?.docs?.source}}};const y=["Default","FarSøker","MorOgFarOgFarGraderer"];export{a as Default,o as FarSøker,s as MorOgFarOgFarGraderer,y as __namedExportsOrder,S as default};
