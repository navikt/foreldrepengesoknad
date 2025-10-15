import{i as u,r as f,j as s}from"./iframe-IPxy5AoO.js";import{h as e,H as t}from"./index-IEsEscZs.js";import{a as d}from"./annenPartVedtak-Duv5T7Iz.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-DO9XfB7V.js";import{s as S}from"./saker-CTlmGYxq.js";import{S as A}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-BV8wrxLj.js";import{A as n,D as h}from"./api-Kzd94Isr.js";import{O as m}from"./routes-C7yRzVAD.js";import{S as _}from"./ForeldrepengeoversiktRoutes-CjsSPvR7.js";import{M as c,R as I,a as P}from"./chunk-TMI4QPZX-DUFL0ilV.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B8UDZKZC.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-FOpKJ8pQ.js";import"./useSelectedSak-CNz4Ug0g.js";import"./useQuery-DhBHTHVx.js";import"./sakerUtils-DeaY7r1u.js";import"./Snarveier-B9YlyHDp.js";import"./LenkePanel-BzCAW-AJ.js";import"./index-ev3G2xyA.js";import"./Dokument-CAO-GVg5.js";import"./dokumenterUtils-kKISzPh_.js";import"./Tag-BYDeYgMT.js";import"./GrupperteDokumenter-B8lpRcJ2.js";import"./guid-CsArkN6i.js";import"./Accordion-D27t2pT-.js";import"./Header-DgXHGPpF.js";import"./LayoutWrapper-Cq9cxWbL.js";import"./StatusTag-DtSmjKfw.js";import"./Stroller-DQOeFjYI.js";import"./NoeGikkGalt-DAQuMxd-.js";import"./MinidialogSkjema-BMUIoxEZ.js";import"./BekreftelseSendtSøknad-DlnHKnDx.js";import"./KontonummerInfo-oDM86Cb-.js";import"./HarIkkeSaker-5qIU1556.js";import"./SøkelenkerPanel-CLeF-Pb_.js";import"./HarSaker-DtDVvaHR.js";import"./SakLink-CYORaTBM.js";import"./ContentSection-D4VAwH4L.js";import"./Svangerskapspenger-DAah62lP.js";import"./DinPlan-BSk2jnee.js";import"./Oppgaver-CYQXnUKs.js";import"./OppgaveLenkepanel-BZGVrEqJ.js";import"./KontaktOss-Dg-ngFe4.js";const fe={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>{const R=f.useRef(!1);return s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(c,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(I,{children:s.jsx(P,{element:s.jsx(_,{...j,isFirstRender:R}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})}},r={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json(S)),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(n.tidslinje,()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(n.manglendeVedlegg,()=>t.json()),e.get(n.erOppdatert,()=>t.json(!0)),e.get(n.satser,()=>t.json(h))]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[A]})),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)), http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
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
      } satisfies Saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json([{
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
      }])), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json()), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))]
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
      })), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)), http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))]
    }
  },
  args: {
    saksnummer: '202',
    søkerinfo: søkerinfo
  }
}`,...o.parameters?.docs?.source}}};const Se=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{a as Engangsstønad,r as Foreldrepenger,o as Svangerskapspenger,Se as __namedExportsOrder,fe as default};
