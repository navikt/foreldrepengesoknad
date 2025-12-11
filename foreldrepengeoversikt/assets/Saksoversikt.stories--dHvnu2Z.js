import{k as u,j as s}from"./iframe-GxllekYB.js";import{h as e,H as n}from"./index-CGMFkHgn.js";import{a as d}from"./annenPartVedtak-CubWeil6.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-xeN4qrND.js";import{s as R}from"./saker-thaWTfcA.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-tYYAzqvY.js";import{A as t}from"./queries-BChmSeD1.js";import{O as m}from"./routes-BgSQQwXh.js";import{S}from"./ForeldrepengeoversiktRoutes-Cqz1x0cW.js";import{M as h,R as A,a as c}from"./chunk-WWGJGFF6-DytR9U5C.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-DFgqw4Ai.js";import"./useBackgroundColor-CenlDiMk.js";import"./useSelectedSak-SFPcf27I.js";import"./useQuery-Bw0ApQ6C.js";import"./sakerUtils-CJnfgtA2.js";import"./Snarveier-DBYmg36s.js";import"./LenkePanel-CYjkigtj.js";import"./index-C7Q_IgF1.js";import"./Header-56FNSbi0.js";import"./LayoutWrapper-B9v12AcT.js";import"./StatusTag-CNGaDhRR.js";import"./Tag-D3itlNxi.js";import"./Stroller-DPYm6HHE.js";import"./BabyWrapped-CbyjBFWw.js";import"./NoeGikkGalt-y8Wj-KaV.js";import"./MinidialogSkjema-laBhWxKs.js";import"./HarIkkeSaker-CkGu7df3.js";import"./SøkelenkerPanel-CG74Fdgm.js";import"./HarSaker-DaWlwf9T.js";import"./SakLink-BQZoWiao.js";import"./guid-CsArkN6i.js";import"./ContentSection-Ck2C2EsH.js";import"./BekreftelseSendtSøknad-6sOo1zX7.js";import"./tidslinjeUtils-BHv-zdWS.js";import"./KontonummerInfo-XYmgH86Q.js";import"./Accordion-BEZ-dZRe.js";import"./Svangerskapspenger-9GiImH6z.js";import"./DinPlan-CaxTltfz.js";import"./Oppgaver-CaHgAToZ.js";import"./OppgaveLenkepanel-C6aSPSYa.js";import"./Tidslinje-CPyq2QYQ.js";import"./Paperplane-BMDD7gfh.js";import"./KontaktOss-BrUzCZfT.js";const je={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(h,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(A,{children:s.jsx(c,{element:s.jsx(S,{...j}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json(R)),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(t.tidslinje,()=>n.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(t.manglendeVedlegg,()=>n.json())]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(t.dokumenter,()=>n.json(i)),e.get(t.saker,()=>n.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(t.tidslinje,()=>n.json(g)),e.get(t.manglendeVedlegg,()=>n.json(l)),e.post(t.annenPartVedtak,()=>n.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
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
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const ue=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,ue as __namedExportsOrder,je as default};
