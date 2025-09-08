import{i as g,j as t}from"./iframe-DqYsnEnB.js";import{h as o,H as p}from"./index-md76Z-Y7.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-2MY0sRYP.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-By06e2eO.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-clP1J7vy.js";import"./useSelectedSak-qVpfCZze.js";import"./useQuery-B_E6v8l_.js";import"./api-B2G0MWey.js";import"./sakerUtils-BTKdORNo.js";import"./Snarveier-B94lT8bI.js";import"./LenkePanel-DIzA5O_F.js";import"./index-CyoqsWOn.js";import"./Dokument-Cbzw1uj2.js";import"./dokumenterUtils-B3_q2EWV.js";import"./Tag-BRq6W16p.js";import"./GrupperteDokumenter-B8hrhdAp.js";import"./guid-CsArkN6i.js";import"./Accordion-BhBDAzyO.js";import"./Header-Cqhy_UJT.js";import"./LayoutWrapper-BwDpqrGY.js";import"./StatusTag-DkNz2Yza.js";import"./Stroller-2OawaaZm.js";import"./NoeGikkGalt-B4Cxx3Lo.js";import"./MinidialogSkjema-D47C-zv2.js";import"./skjemanummer-jwZpTz2Y.js";import"./BekreftelseSendtSøknad-O_ZVpnbT.js";import"./KontonummerInfo-DD86AF2h.js";import"./HarIkkeSaker-q2cNbk5x.js";import"./SøkelenkerPanel-BVlaU57L.js";import"./HarSaker-D1e3lckm.js";import"./SakLink-HOHbrb-q.js";import"./ContentSection-DP-YOFoP.js";import"./Svangerskapspenger-CQ1l_kUQ.js";import"./DinPlan-j6_HvjOv.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-QIqeoIt1.js";import"./OppgaveLenkepanel-w_JnV8dH.js";import"./KontaktOss-hVbnr1YL.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: 'ENGANGSSTØNAD',
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const re=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,re as __namedExportsOrder,te as default};
