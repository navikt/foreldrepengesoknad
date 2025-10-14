import{i as u,r as f,j as s}from"./iframe-_ObgTIvO.js";import{h as e,H as t}from"./index-DGt0Llg0.js";import{a as d}from"./annenPartVedtak-Ch48gtqJ.js";import{d as i}from"./dokumenter-DG3eZWEY.js";import{t as g,m as l}from"./tidslinjeHendelser-DTBoOdgc.js";import{s as S}from"./saker-BMtZ55O6.js";import{S as A}from"./svpsaker-B6NBfo4-.js";import{s as p}from"./sokerinfo-1p1VFyRk.js";import{A as n,D as h}from"./api-BLmyi74k.js";import{O as m}from"./routes-C7yRzVAD.js";import{S as _}from"./ForeldrepengeoversiktRoutes-DDmKcUAk.js";import{M as c,R as I,a as P}from"./chunk-TMI4QPZX-B4DqY82Q.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DnkMUdAG.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CLdPYyJY.js";import"./useSelectedSak-Dn03gsY9.js";import"./useQuery-DgkBNIex.js";import"./sakerUtils-BBJUz6cp.js";import"./Snarveier-CCo_Vx-x.js";import"./LenkePanel-B4_sTc2J.js";import"./index-B0iFlWDP.js";import"./Dokument-DGw-kGE9.js";import"./dokumenterUtils-C4xiCv8T.js";import"./Tag-0eVjUN-W.js";import"./GrupperteDokumenter-B5Yl2f2Y.js";import"./guid-CsArkN6i.js";import"./Accordion-lZ-PMbtQ.js";import"./Header-BCY7uCG3.js";import"./LayoutWrapper-Bkbbo96p.js";import"./StatusTag-BrVfGjyA.js";import"./Stroller-B3hU8Oan.js";import"./NoeGikkGalt-FTYMzGr9.js";import"./MinidialogSkjema-vOPBBUCJ.js";import"./BekreftelseSendtSøknad-CsWF3rQi.js";import"./KontonummerInfo-VhLMjAja.js";import"./HarIkkeSaker-BWghkiQq.js";import"./SøkelenkerPanel-Ds4uxRmH.js";import"./HarSaker-Cv-roMZc.js";import"./SakLink-e1I9A0_c.js";import"./ContentSection-Bszpd5R7.js";import"./Svangerskapspenger-BC886n4H.js";import"./DinPlan-pU3t6BFf.js";import"./Oppgaver-8X-_cpCu.js";import"./OppgaveLenkepanel-s0Zvpho9.js";import"./KontaktOss-DbtOpFFg.js";const fe={title:"Saksoversikt",decorators:[u],render:({saksnummer:k,...j})=>{const R=f.useRef(!1);return s.jsx("div",{className:"bg-ax-brand-blue-100",children:s.jsx(c,{initialEntries:[`/${m.DIN_PLAN}/${k}`],children:s.jsx(I,{children:s.jsx(P,{element:s.jsx(_,{...j,isFirstRender:R}),path:`/${m.DIN_PLAN}/:saksnummer`})})})})}},r={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json(S)),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{søkerinfo:p,saksnummer:"1"}},a={parameters:{msw:{handlers:[e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(n.tidslinje,()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(n.manglendeVedlegg,()=>t.json()),e.get(n.erOppdatert,()=>t.json(!0)),e.get(n.satser,()=>t.json(h))]}},args:{søkerinfo:p,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(n.dokumenter,()=>t.json(i)),e.get(n.saker,()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[A]})),e.get(n.tidslinje,()=>t.json(g)),e.get(n.manglendeVedlegg,()=>t.json(l)),e.get(n.erOppdatert,()=>t.json(!0)),e.post(n.annenPartVedtak,()=>t.json(d))]}},args:{saksnummer:"202",søkerinfo:p}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
