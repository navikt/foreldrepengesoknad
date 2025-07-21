import{i as g,j as t}from"./iframe-gzxcU_QU.js";import{h as o,H as p}from"./index-C7NVZGxv.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Ce6PvXLp.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-XdFoIY5j.js";import"./useBackgroundColor-B_OovWjH.js";import"./useSelectedSak-DevZo2T-.js";import"./useQuery-DUc9WJSJ.js";import"./api-CnbKW-es.js";import"./sakerUtils-Cp6uqLYw.js";import"./Snarveier-BPnZgimU.js";import"./LenkePanel-BdWPkRlF.js";import"./Dokument-Bi57XsK7.js";import"./dokumenterUtils-BPr3-Kps.js";import"./Tag-DnnEkj5k.js";import"./GrupperteDokumenter-BYgttWk1.js";import"./guid-CsArkN6i.js";import"./Header-B29KgrTf.js";import"./LayoutWrapper-ZZOPnXBr.js";import"./StatusTag-CECNz74N.js";import"./Stroller-D6uEvxcr.js";import"./NoeGikkGalt-CJBAGig4.js";import"./MinidialogSkjema-BKouql2I.js";import"./skjemanummer-DPdZCFti.js";import"./BekreftelseSendtSøknad-BUSlI0QE.js";import"./KontonummerInfo-DUDiZnjn.js";import"./HarIkkeSaker-D-4YJ8ni.js";import"./SøkelenkerPanel-BYEqFMzG.js";import"./HarSaker-BydPZ_YI.js";import"./SakLink-kWLCjCs5.js";import"./ContentSection-CfkUuY22.js";import"./Svangerskapspenger-Cj4x6355.js";import"./DinPlan-DoFbhRHC.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-D37kOtcA.js";import"./OppgaveLenkepanel-CdIMqcGl.js";import"./KontaktOss-DZ7AY-Ah.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
