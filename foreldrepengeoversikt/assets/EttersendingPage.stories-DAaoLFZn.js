import{i as E,j as t}from"./iframe-DxFZ06qT.js";import{h as d,H as u}from"./index-C0bCjlV-.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BetCRH--.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-Bv0nc5V8.js";import"./useBackgroundColor-CZm4J5G_.js";import"./useSelectedSak-BAnUAxww.js";import"./useQuery-DmBVe2Fh.js";import"./api-zY496WjV.js";import"./sakerUtils-CbR7RypM.js";import"./Snarveier-lN9v1tX1.js";import"./LenkePanel-BOdGdlFA.js";import"./Dokument-BFHvuCdT.js";import"./dokumenterUtils-akszLnDs.js";import"./Tag-C9EE2pKT.js";import"./GrupperteDokumenter-CWIfX9iC.js";import"./guid-CsArkN6i.js";import"./Header-DWLusS9M.js";import"./LayoutWrapper-DsqGyM4u.js";import"./StatusTag-DqoiGpBL.js";import"./Stroller-BgxBzA0I.js";import"./NoeGikkGalt-BiiJlLML.js";import"./MinidialogSkjema-18j67Yvd.js";import"./skjemanummer-DLpcJKlO.js";import"./BekreftelseSendtSøknad-D46PicrE.js";import"./KontonummerInfo-r3SZjWUo.js";import"./HarIkkeSaker-DrWzlRnK.js";import"./SøkelenkerPanel-BkZIVWFg.js";import"./HarSaker-B3fQhHSx.js";import"./SakLink-DKhWcMZ7.js";import"./ContentSection-DkcmiNG9.js";import"./Svangerskapspenger-C_TQ3UzE.js";import"./DinPlan-Bml8oxKc.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BtPnuISb.js";import"./OppgaveLenkepanel-BtCa4_hR.js";import"./KontaktOss-DB6G22cj.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var i,l,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ae=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ae as __namedExportsOrder,ne as default};
