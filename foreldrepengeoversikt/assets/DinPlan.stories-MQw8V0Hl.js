import{i as p,F as r,aJ as s,z as d,j as n,aK as g}from"./iframe-mJ--PAC2.js";import{h as i,H as m}from"./index-CxtF_tCw.js";import{s as R}from"./saker-DufbqqUG.js";import{A as f}from"./api-Bhf7waFA.js";import{O as k}from"./routes-C7yRzVAD.js";import{D as E}from"./DinPlan-CUwEximr.js";import{M as T,R as u,a as D}from"./chunk-TMI4QPZX--7RizPfj.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useSelectedSak-Cd2X_s-G.js";import"./useQuery-xooj_pZC.js";import"./sakerUtils-BNMhmreY.js";var l=(e=>(e.Arbeid="ARBEID",e.Utdanning="UTDANNING",e.ArbeidOgUtdanning="ARBEID_OG_UTDANNING",e.TrengerHjelp="TRENGER_HJELP",e.Innlagt="INNLAGT",e.Kvalifiseringsprogrammet="KVALPROG",e.Introduksjonsprogrammet="INTROPROG",e.Uføre="UFØRE",e.IkkeOppgitt="IKKE_OPPGITT",e))(l||{});const h={title:"DinPlan",component:E,decorators:[p],render:e=>n.jsx(T,{initialEntries:[`/${k.DIN_PLAN}/1`],children:n.jsx(u,{children:n.jsx(D,{element:n.jsx(E,{...e}),path:`/${k.DIN_PLAN}/:saksnummer`})})})},t={parameters:{msw:{handlers:[i.get(f.saker,()=>m.json(R))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:"FEDREKVOTE",forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},a={parameters:{msw:{handlers:[i.get(f.saker,()=>m.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:"FEDREKVOTE",forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:"MØDREKVOTE",overføringÅrsak:g.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:"MØDREKVOTE",forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:"MØDREKVOTE",forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:"FELLESPERIODE",forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:"FELLESPERIODE",forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:s.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:"FELLESPERIODE",forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},o={name:"Mor og far søker - far graderer",parameters:{msw:{handlers:[i.get(f.saker,()=>m.json({foreldrepenger:[{saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!0,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"29459848930"},familiehendelse:{fødselsdato:"2025-03-25",termindato:"2025-03-25",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2025-03-04",tom:"2025-03-24",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-03-25",tom:"2025-07-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-07-08",tom:"2025-09-01",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],perioderAnnenpartEøs:[]},barn:[{fnr:"22442356029"}],dekningsgrad:"HUNDRE",oppdatertTidspunkt:"2025-09-16T14:09:43.208",forelder:"MOR"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2025-09-23",tom:"2025-11-17",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!1,trekkerDager:!1,årsak:d.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:s.ORDINÆRT_ARBEID}},morsAktivitet:l.Arbeid,flerbarnsdager:!1,forelder:r.farMedmor},{fom:"2025-11-18",tom:"2026-01-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:d.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:s.ORDINÆRT_ARBEID}},morsAktivitet:l.Arbeid,flerbarnsdager:!1,forelder:r.farMedmor},{fom:"2026-03-17",tom:"2026-10-12",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:d.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:s.ORDINÆRT_ARBEID}},flerbarnsdager:!1,forelder:r.farMedmor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker))]
    }
  },
  args: {
    annenPartsPerioder: [{
      fom: '2022-10-14',
      tom: '2022-12-21',
      kontoType: 'FEDREKVOTE',
      forelder: Forelder.farMedmor,
      samtidigUttak: 50
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json({
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
              forelder: Forelder.farMedmor,
              samtidigUttak: 100
            }, {
              fom: '2025-01-01',
              tom: '2025-02-04',
              forelder: Forelder.farMedmor,
              kontoType: 'MØDREKVOTE',
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      forelder: Forelder.mor
    }, {
      fom: '2024-10-01',
      tom: '2024-10-14',
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      samtidigUttak: 100
    }, {
      fom: '2024-10-15',
      tom: '2024-12-09',
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor
    }, {
      fom: '2024-12-10',
      tom: '2024-12-31',
      kontoType: 'FELLESPERIODE',
      forelder: Forelder.mor
    }, {
      fom: '2025-02-05',
      tom: '2025-03-11',
      kontoType: 'FELLESPERIODE',
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
      kontoType: 'FELLESPERIODE',
      forelder: Forelder.mor
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far søker - far graderer',
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json({
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
        årsak: PeriodeResultatÅrsak.ANNET
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID
        }
      },
      morsAktivitet: MorsAktivitet.Arbeid,
      flerbarnsdager: false,
      forelder: Forelder.farMedmor
    }, {
      fom: '2025-11-18',
      tom: '2026-01-12',
      kontoType: 'FELLESPERIODE',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: PeriodeResultatÅrsak.ANNET
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID
        }
      },
      morsAktivitet: MorsAktivitet.Arbeid,
      flerbarnsdager: false,
      forelder: Forelder.farMedmor
    }, {
      fom: '2026-03-17',
      tom: '2026-10-12',
      kontoType: 'FEDREKVOTE',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: PeriodeResultatÅrsak.ANNET
      },
      gradering: {
        arbeidstidprosent: 50,
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID
        }
      },
      flerbarnsdager: false,
      forelder: Forelder.farMedmor
    }],
    navnPåForeldre: {
      mor: 'Helga',
      farMedmor: 'Espen'
    }
  }
}`,...o.parameters?.docs?.source}}};const U=["Default","FarSøker","MorOgFarOgFarGraderer"];export{t as Default,a as FarSøker,o as MorOgFarOgFarGraderer,U as __namedExportsOrder,h as default};
