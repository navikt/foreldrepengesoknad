import{j as o}from"./jsx-runtime-DwRxq3ZX.js";import{Q as y}from"./useQuery-Bp3Xrv1y.js";import{h as g,H as T}from"./index-B-Pz4-0B.js";import{s as v}from"./saker-HDhfepFG.js";import{S as e,F as r}from"./stønadskontoType-l1GAnwlP.js";import"./dates-TdbGqddN.js";import{O as E}from"./UttaksplanKalender-BOzZls0G.js";import{O as a}from"./routes-D6j-qr5i.js";import{D as m}from"./DinPlan-CX1Kl1K8.js";import{M as u,R,a as S}from"./index-ByI1_y3g.js";import{Q as N}from"./queryClient-wSud2sxq.js";import"./index-BX3iQpgp.js";import"./decorators-DIzpaN6C.js";import"./RettighetType-BD_oerVS.js";import"./index-A4VDgvRX.js";import"./iframe-hP4VhS0e.js";import"../sb-preview/runtime.js";import"./dateFormValidation-CpTlqkG5.js";import"./links-Cq4ifjPA.js";import"./VStack-DCI-IWy0.js";import"./Label-sdGPuzAK.js";import"./useId-CmSpHSni.js";import"./message-8h7m8LF5.js";import"./Alert-DYj8gWus.js";import"./Button-CZavV0iI.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-6pYp3TYt.js";import"./File-B657A67O.js";import"./UttaksdagenString-Dd6xBUPd.js";import"./HGrid-VFl1Qdht.js";import"./index-B1dLepta.js";import"./_getTag-CkXgi8rB.js";import"./stringUtils-grKZaQiI.js";import"./index-ImNsV_cY.js";import"./Responsive-DPQNueAS.js";import"./Accordion-Cnxh7RR0.js";import"./ChevronDown-4_HeHalp.js";import"./useSelectedSak-Ru4Q7hqO.js";import"./api-CuYAbk1P.js";import"./sakerUtils-B3gbHCJi.js";import"./Ytelse-7td-ciMh.js";import"./useClientLayoutEffect-CDS5ZwQf.js";var F=(n=>(n.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",n.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",n.FRILANS="FRILANS",n.ANNET="ANNET",n))(F||{});const c=new N,ke={title:"DinPlan",component:m,render:n=>o.jsx(y,{client:c,children:o.jsx(u,{initialEntries:[`/${a.DIN_PLAN}/352011079`],children:o.jsx(R,{children:o.jsx(S,{element:o.jsx(m,{...n}),path:`/${a.DIN_PLAN}/:saksnummer`})})})})},t={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json(v))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},s={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:e.Mødrekvote,overføringÅrsak:E.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:e.ForeldrepengerFørFødsel,forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Mødrekvote,forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:e.Mødrekvote,forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:e.Fellesperiode,forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:e.Fellesperiode,forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:F.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:e.Fellesperiode,forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};var d,p,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
