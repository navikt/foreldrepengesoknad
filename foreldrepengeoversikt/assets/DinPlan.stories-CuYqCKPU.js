import{j as o}from"./jsx-runtime-CLpGMVip.js";import{Q as y}from"./useQuery-D4bRZ7iC.js";import{h as g,H as T}from"./index-B-Pz4-0B.js";import{s as v}from"./saker-CxK6yga4.js";import{S as e,F as r}from"./stønadskontoType-l1GAnwlP.js";import"./dates-Cs9kK9kw.js";import{O as E}from"./UttaksplanKalender-DIZ4xJYn.js";import{O as a}from"./routes-D6j-qr5i.js";import{D as m}from"./DinPlan-BNZUPKzv.js";import{Q as u}from"./queryClient-DpQYMfvj.js";import{M as R,R as S,a as N}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./RettighetType-BD_oerVS.js";import"./index-DjWdgH6H.js";import"./iframe-D-kPgM7o.js";import"./dateFormValidation-D4jJDG9R.js";import"./links-Cq4ifjPA.js";import"./VStack-BsKxbgho.js";import"./Label-uxnjPK_2.js";import"./useId-BsEbCovs.js";import"./message-CzTHpKKo.js";import"./Alert-hCvJm8fG.js";import"./Button-CuqaSHIm.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-DCG3SZwE.js";import"./File-BESBbXzH.js";import"./UttaksdagenString-BBcnJY7-.js";import"./HGrid-BRpZMx9b.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-grKZaQiI.js";import"./index-BDNcHBiq.js";import"./Responsive-CRGGdtE5.js";import"./Accordion-DPk-3nib.js";import"./ChevronDown-Dkzsn-l9.js";import"./useSelectedSak-pSqoZpdh.js";import"./api-Diwr6d0n.js";import"./sakerUtils-ebWDps5B.js";import"./Ytelse-7td-ciMh.js";import"./useClientLayoutEffect-MhY06XyY.js";var F=(n=>(n.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",n.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",n.FRILANS="FRILANS",n.ANNET="ANNET",n))(F||{});const c=new u,ke={title:"DinPlan",component:m,render:n=>o.jsx(y,{client:c,children:o.jsx(R,{initialEntries:[`/${a.DIN_PLAN}/352011079`],children:o.jsx(S,{children:o.jsx(N,{element:o.jsx(m,{...n}),path:`/${a.DIN_PLAN}/:saksnummer`})})})})},t={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json(v))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},s={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:e.Mødrekvote,overføringÅrsak:E.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:e.ForeldrepengerFørFødsel,forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Mødrekvote,forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:e.Mødrekvote,forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:e.Fellesperiode,forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:e.Fellesperiode,forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:F.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:e.Fellesperiode,forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};var d,p,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(i=(p=t.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var l,f,k;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(k=(f=s.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const ge=["Default","FarSøker"];export{t as Default,s as FarSøker,ge as __namedExportsOrder,ke as default};
