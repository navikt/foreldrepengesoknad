import{i as g,j as t}from"./iframe-uM6vJfA6.js";import{h as o,H as p}from"./index-DZSHuZoY.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-UDIsv6Fb.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-BeRQQPJ5.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Cv3uj3CK.js";import"./useSelectedSak-CtxnF49c.js";import"./useQuery-tOuE658y.js";import"./api-BJinRP0h.js";import"./sakerUtils-D60G7nO8.js";import"./Snarveier-CzInRrzR.js";import"./LenkePanel-ImHSmEuY.js";import"./index-Rm7DJmPB.js";import"./Dokument-BgwEfrWw.js";import"./dokumenterUtils-AQGuBYyu.js";import"./Tag-Da-sr-Y2.js";import"./GrupperteDokumenter-CCC4YnY1.js";import"./guid-CsArkN6i.js";import"./Accordion-DAADNL1k.js";import"./Header-Bdza4IFt.js";import"./LayoutWrapper-MeXoeUw0.js";import"./StatusTag-D0HqwbZ_.js";import"./Stroller-DITvvaeU.js";import"./NoeGikkGalt-DCNKUl5x.js";import"./MinidialogSkjema-f0dDyCO1.js";import"./skjemanummer-BLaCV31j.js";import"./BekreftelseSendtSøknad-4uXD-kNT.js";import"./KontonummerInfo-Bsh36t5c.js";import"./HarIkkeSaker-VmQufTLS.js";import"./SøkelenkerPanel-D7qXbqfJ.js";import"./HarSaker-DacJfvmv.js";import"./SakLink-CbCW_ed_.js";import"./ContentSection-z6OG9lCa.js";import"./Svangerskapspenger-DIjLqTid.js";import"./DinPlan-CCXLhFCT.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BROPtWQn.js";import"./OppgaveLenkepanel-BVWcusKi.js";import"./KontaktOss-nMSooysW.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
