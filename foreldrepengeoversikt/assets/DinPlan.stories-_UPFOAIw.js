import{i as T,F as r,A as n,aK as d,z as l,j as t,aL as u}from"./iframe-BL1fXp3Z.js";import{h as k,H as m}from"./index-CtMjQgvb.js";import{s as E}from"./saker-eujSxlJW.js";import{A as g}from"./api-QlxCNsBs.js";import{O as p}from"./routes-C7yRzVAD.js";import{D as f}from"./DinPlan-DjDyWJ4x.js";import{M as R,R as y,a as F}from"./chunk-TMI4QPZX-B017oIpK.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useSelectedSak-CgHp6Zaz.js";import"./useQuery-DRSe34mH.js";import"./sakerUtils-CWhnQUyi.js";var i=(e=>(e.Arbeid="ARBEID",e.Utdanning="UTDANNING",e.ArbeidOgUtdanning="ARBEID_OG_UTDANNING",e.TrengerHjelp="TRENGER_HJELP",e.Innlagt="INNLAGT",e.Kvalifiseringsprogrammet="KVALPROG",e.Introduksjonsprogrammet="INTROPROG",e.Uføre="UFØRE",e.IkkeOppgitt="IKKE_OPPGITT",e))(i||{});const _={title:"DinPlan",component:f,decorators:[T],render:e=>t.jsx(R,{initialEntries:[`/${p.DIN_PLAN}/1`],children:t.jsx(y,{children:t.jsx(F,{element:t.jsx(f,{...e}),path:`/${p.DIN_PLAN}/:saksnummer`})})})},a={parameters:{msw:{handlers:[k.get(g.saker,()=>m.json(E))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:n.Fedrekvote,forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},o={parameters:{msw:{handlers:[k.get(g.saker,()=>m.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:n.Fedrekvote,forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:n.Mødrekvote,overføringÅrsak:u.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:n.ForeldrepengerFørFødsel,forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:n.Mødrekvote,forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:n.Mødrekvote,forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:n.Fellesperiode,forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:n.Fellesperiode,forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:d.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:n.Fellesperiode,forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},s={name:"Mor og far søker - far graderer",parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>m.json({foreldrepenger:[{saksnummer:"1",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!0,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"29459848930"},familiehendelse:{fødselsdato:"2025-03-25",termindato:"2025-03-25",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2025-03-04",tom:"2025-03-24",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-03-25",tom:"2025-07-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-07-08",tom:"2025-09-01",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],perioderAnnenpartEøs:[]},barn:[{fnr:"22442356029"}],dekningsgrad:"HUNDRE",oppdatertTidspunkt:"2025-09-16T14:09:43.208",forelder:"MOR"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2025-09-23",tom:"2025-11-17",kontoType:n.Fellesperiode,resultat:{innvilget:!1,trekkerMinsterett:!1,trekkerDager:!1,årsak:l.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:d.ORDINÆRT_ARBEID}},morsAktivitet:i.Arbeid,flerbarnsdager:!1,forelder:r.farMedmor},{fom:"2025-11-18",tom:"2026-01-12",kontoType:n.Fellesperiode,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:l.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:d.ORDINÆRT_ARBEID}},morsAktivitet:i.Arbeid,flerbarnsdager:!1,forelder:r.farMedmor},{fom:"2026-03-17",tom:"2026-10-12",kontoType:n.Fedrekvote,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:l.ANNET},gradering:{arbeidstidprosent:50,aktivitet:{type:d.ORDINÆRT_ARBEID}},flerbarnsdager:!1,forelder:r.farMedmor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far søker - far graderer',
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json({
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
      kontoType: StønadskontoType.Fellesperiode,
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
      kontoType: StønadskontoType.Fellesperiode,
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
      kontoType: StønadskontoType.Fedrekvote,
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
}`,...s.parameters?.docs?.source}}};const j=["Default","FarSøker","MorOgFarOgFarGraderer"];export{a as Default,o as FarSøker,s as MorOgFarOgFarGraderer,j as __namedExportsOrder,_ as default};
