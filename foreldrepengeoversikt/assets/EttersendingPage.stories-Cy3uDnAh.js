import{i as g,j as t}from"./iframe-DvzGygoK.js";import{h as o,H as p}from"./index-dzY3NwD1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DbO6HQRq.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-qu0-WlJh.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Bkj0QhaB.js";import"./useSelectedSak-zAbv9mM6.js";import"./useQuery-CQgD-OfA.js";import"./api-Bz5MeNYb.js";import"./sakerUtils-EgfJ183k.js";import"./Snarveier-58p2iEeY.js";import"./LenkePanel-DK2eF7_f.js";import"./index-CbaHxspZ.js";import"./Dokument-yu75eQeC.js";import"./dokumenterUtils-UVzRy7Gf.js";import"./Tag-CrPj95JE.js";import"./GrupperteDokumenter-C1wIDAZM.js";import"./guid-CsArkN6i.js";import"./Accordion-BQQabRcc.js";import"./Header-DdyXebds.js";import"./LayoutWrapper-Big5nS7G.js";import"./StatusTag-CkugoVUB.js";import"./Stroller-Dfu0sIcw.js";import"./NoeGikkGalt-A9Gc2nAt.js";import"./MinidialogSkjema-C6ptEWbD.js";import"./skjemanummer-B811Hda9.js";import"./BekreftelseSendtSøknad-BIdCIOXL.js";import"./KontonummerInfo-teVxxp2X.js";import"./HarIkkeSaker-z3sT2rx8.js";import"./SøkelenkerPanel-BbSGYexO.js";import"./HarSaker-K5OUVzvc.js";import"./SakLink-P8z6cu-h.js";import"./ContentSection-Ce_Q-DjI.js";import"./Svangerskapspenger-FV5NMIjE.js";import"./DinPlan-DdVTmQ-E.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B6asP7rX.js";import"./OppgaveLenkepanel-CbTL9vpD.js";import"./KontaktOss-D_8sJ4oW.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
