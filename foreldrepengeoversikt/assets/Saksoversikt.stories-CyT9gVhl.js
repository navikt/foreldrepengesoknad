import{k as u,j as t}from"./iframe-GMCrZPMT.js";import{h as e,H as n}from"./index-DlA5Dgwv.js";import{a as d}from"./annenPartVedtak-CubWeil6.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-16zBp5TP.js";import{s as R}from"./saker-D6DZJrGh.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-B9MQWW0w.js";import{A as s}from"./queries-D7hysrC7.js";import{O as m}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-BlM_R4sv.js";import{M as h,R as A,a as c}from"./chunk-4WY6JWTD-B9rjn__f.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DJurKVsj.js";import"./useBackgroundColor-5heR_nnq.js";import"./useSelectedSak-CUOZ-6He.js";import"./useQuery-BiY6XMdz.js";import"./sakerUtils-C6wXDww1.js";import"./Snarveier-CX34pwWZ.js";import"./LenkePanel-rGKf6Mfz.js";import"./index-BO5Y3oSX.js";import"./Header-DpjsnFYe.js";import"./LayoutWrapper-CzB3Cc9e.js";import"./StatusTag-JMLfObSF.js";import"./Tag-CllHDSoK.js";import"./Stroller-DoHtygTr.js";import"./NoeGikkGalt-OH1SYDZr.js";import"./MinidialogSkjema-OEzf77GQ.js";import"./HarIkkeSaker-BzP_HrH3.js";import"./SøkelenkerPanel-CRzmCMCD.js";import"./HarSaker-CffD9CrB.js";import"./SakLink-HDA4CQ8b.js";import"./guid-CsArkN6i.js";import"./ContentSection-Z-GBennl.js";import"./BekreftelseSendtSøknad-PbfKR_-I.js";import"./KontonummerInfo-B24IeY-n.js";import"./Accordion-B6GP9jD0.js";import"./Svangerskapspenger-BgqhrmUS.js";import"./DinPlan-BQGnUhBP.js";import"./Oppgaver-wbXDS51Z.js";import"./OppgaveLenkepanel-CvzCp6bM.js";import"./KontaktOss-BTWA662w.js";const ie={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>t.jsx("div",{className:"bg-ax-brand-blue-100",children:t.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:t.jsx(A,{children:t.jsx(c,{element:t.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json(R)),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(s.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(s.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(s.dokumenter,()=>n.json(i)),e.get(s.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(s.tidslinje,()=>n.json(g)),e.get(s.manglendeVedlegg,()=>n.json(l)),e.post(s.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '1'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [],
        engangsstønad: [{
          saksnummer: '352011079',
          sakAvsluttet: false,
          gjelderAdopsjon: false,
          familiehendelse: {
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
            antallBarn: 1
          },
          åpenBehandling: {
            tilstand: 'UNDER_BEHANDLING'
          },
          oppdatertTidspunkt: '2024-02-28T21:19:08.911'
        }],
        svangerskapspenger: []
      } satisfies Saker_fpoversikt)), http.get(API_URLS.tidslinje, () => HttpResponse.json([{
        type: 'søknad',
        opprettet: '2023-01-31T09:06:46.541655',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [{
          type: 'INNGÅENDE_DOKUMENT',
          mottatt: '2023-01-31T09:06:48',
          saksnummer: '352011079',
          tittel: 'Søknad om foreldrepenger ved fødsel',
          journalpostId: '598115874',
          dokumentId: '624862989'
        }],
        manglendeVedlegg: []
      }])), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json())]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '352011079'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json({
        foreldrepenger: [],
        engangsstønad: [],
        svangerskapspenger: [SAK_1]
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const ge=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ge as __namedExportsOrder,ie as default};
