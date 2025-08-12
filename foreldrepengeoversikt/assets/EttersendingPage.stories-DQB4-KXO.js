import{i as g,j as t}from"./iframe-CVJxq6nd.js";import{h as o,H as p}from"./index-DavAMg65.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BE8c3Taa.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-C1Sl-UXJ.js";import"./useBackgroundColor-DawnG9zm.js";import"./useSelectedSak-BDup-0Qg.js";import"./useQuery-DWD67aDM.js";import"./api-BWxlLsd1.js";import"./sakerUtils-0dozdSkk.js";import"./Snarveier-BOuiC-5X.js";import"./LenkePanel-go1nKhq5.js";import"./Dokument-zWcBuhcb.js";import"./dokumenterUtils-eGIdvI-o.js";import"./Tag-bcieYNOb.js";import"./GrupperteDokumenter-CxGtwrcl.js";import"./guid-CsArkN6i.js";import"./Header-DlkmJHB7.js";import"./LayoutWrapper-SMeqrwvp.js";import"./StatusTag-BPCOPoio.js";import"./Stroller-C35HKvkG.js";import"./NoeGikkGalt-C6bNd30L.js";import"./MinidialogSkjema-NIDQm9xR.js";import"./skjemanummer-L5E10xYZ.js";import"./BekreftelseSendtSøknad-Dx1kFbT8.js";import"./KontonummerInfo-CFCEZA9R.js";import"./HarIkkeSaker-BSAo6iCl.js";import"./SøkelenkerPanel-CFk_xLyW.js";import"./HarSaker-BnBHKc1u.js";import"./SakLink-vMchpF7V.js";import"./ContentSection-COOLhF8T.js";import"./Svangerskapspenger-DOw2Uahw.js";import"./DinPlan-C05as18t.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B6Ycibwv.js";import"./OppgaveLenkepanel-aCRRoy2J.js";import"./KontaktOss-Cw4Wzmsl.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
