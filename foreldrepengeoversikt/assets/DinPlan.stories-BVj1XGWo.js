import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{Q as y}from"./useQuery-D15qCwmj.js";import{h as g,H as T}from"./index-Ey0twAil.js";import{s as v}from"./saker-o7_pVw-s.js";import{S as e,F as r}from"./stønadskontoType-l1GAnwlP.js";import"./dates-JCHAmx_r.js";import{O as E}from"./UttaksplanKalender-Djb9H04t.js";import{O as a}from"./routes-D6j-qr5i.js";import{D as m}from"./DinPlan-DeB1DbwK.js";import{M as u,R,a as S}from"./index-qfvvJAWu.js";import{Q as N}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./RettighetType-BD_oerVS.js";import"./index-BXq8hJNt.js";import"./iframe-DkGCMlyy.js";import"../sb-preview/runtime.js";import"./dateFormValidation-CT3TT2sQ.js";import"./links-Cq4ifjPA.js";import"./VStack-Cmqt2b2v.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./message-DyNkxP6Y.js";import"./Alert-CHcKNJcm.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Link-gwHVuC8x.js";import"./File-CBdzl0Ak.js";import"./index-BRV0Se7Z.js";import"./UttaksdagenString-DBxOpWvb.js";import"./HGrid-B_1P65QK.js";import"./index-BbmHap-z.js";import"./barnType-CnRI8jWg.js";import"./_getTag-BJIhF6Yf.js";import"./stringUtils-grKZaQiI.js";import"./index-CCQ3W5xA.js";import"./Responsive-DQW2dfVe.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./useSelectedSak-8U_0L6st.js";import"./api-C4E93qPC.js";import"./sakerUtils-D4fsp9GY.js";import"./_baseIteratee-C-3460IB.js";import"./Ytelse-7td-ciMh.js";var F=(n=>(n.ORDINÆRT_ARBEID="ORDINÆRT_ARBEID",n.SELVSTENDIG_NÆRINGSDRIVENDE="SELVSTENDIG_NÆRINGSDRIVENDE",n.FRILANS="FRILANS",n.ANNET="ANNET",n))(F||{});const c=new N,Te={title:"DinPlan",component:m,render:n=>o.jsx(y,{client:c,children:o.jsx(u,{initialEntries:[`/${a.DIN_PLAN}/352011079`],children:o.jsx(R,{children:o.jsx(S,{element:o.jsx(m,{...n}),path:`/${a.DIN_PLAN}/:saksnummer`})})})})},t={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json(v))]}},args:{annenPartsPerioder:[{fom:"2022-10-14",tom:"2022-12-21",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:50}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}},s={parameters:{msw:{handlers:[g.get(".//rest/innsyn/v2/saker",()=>T.json({foreldrepenger:[{oppdatertTidspunkt:"2024-02-28T21:19:08.911",saksnummer:"352011079",sakAvsluttet:!1,kanSøkeOmEndring:!0,sakTilhørerMor:!1,gjelderAdopsjon:!1,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{fnr:"03506715317"},familiehendelse:{fødselsdato:"2024-10-01",termindato:"2024-10-01",antallBarn:1},gjeldendeVedtak:{perioder:[{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Fedrekvote,forelder:r.farMedmor,samtidigUttak:100},{fom:"2025-01-01",tom:"2025-02-04",forelder:r.farMedmor,kontoType:e.Mødrekvote,overføringÅrsak:E.institusjonsoppholdAnnenForelder}]},barn:[{fnr:"01472254177"}],dekningsgrad:"HUNDRE"}],engangsstønad:[],svangerskapspenger:[]}))]}},args:{annenPartsPerioder:[{fom:"2024-09-10",tom:"2024-09-30",kontoType:e.ForeldrepengerFørFødsel,forelder:r.mor},{fom:"2024-10-01",tom:"2024-10-14",kontoType:e.Mødrekvote,forelder:r.mor,samtidigUttak:100},{fom:"2024-10-15",tom:"2024-12-09",kontoType:e.Mødrekvote,forelder:r.mor},{fom:"2024-12-10",tom:"2024-12-31",kontoType:e.Fellesperiode,forelder:r.mor},{fom:"2025-02-05",tom:"2025-03-11",kontoType:e.Fellesperiode,forelder:r.mor,gradering:{arbeidstidprosent:50,aktivitet:{type:F.FRILANS}}},{fom:"2025-03-19",tom:"2025-04-22",kontoType:e.Fellesperiode,forelder:r.mor}],navnPåForeldre:{mor:"Helga",farMedmor:"Espen"}}};var d,p,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(k=(f=s.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const Fe=["Default","FarSøker"];export{t as Default,s as FarSøker,Fe as __namedExportsOrder,Te as default};
