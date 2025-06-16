import{i as E,j as t}from"./iframe-DuB7cK7M.js";import{h as d,H as u}from"./index-D9NeUst1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bt5z_2PD.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-BcrTknNP.js";import"./useBackgroundColor-CjsBB-Wz.js";import"./useSelectedSak-9pdoRTez.js";import"./useQuery-Bx3zZXaq.js";import"./api-C2huO7jD.js";import"./sakerUtils-C58szazY.js";import"./Snarveier-DEHz-q3g.js";import"./LenkePanel-BJeWclXV.js";import"./Dokument-DkF-Npxb.js";import"./dokumenterUtils-6YqZsPUb.js";import"./Tag-CXdECPZQ.js";import"./GrupperteDokumenter-DwBifmw5.js";import"./guid-CsArkN6i.js";import"./Header-BBlQwpMk.js";import"./LayoutWrapper-Csns50ld.js";import"./StatusTag-CnRILs7g.js";import"./Stroller-CorakKgU.js";import"./NoeGikkGalt-BjY6b1Pu.js";import"./MinidialogSkjema-a7iupdhO.js";import"./skjemanummer-BhnnU_TV.js";import"./BekreftelseSendtSøknad-OxbzJVmp.js";import"./KontonummerInfo-CFI8cmtj.js";import"./HarIkkeSaker-BHRm3piV.js";import"./SøkelenkerPanel-BirATrJm.js";import"./HarSaker-D2-3-rfK.js";import"./SakLink-Dc8AzRPX.js";import"./ContentSection-Dxc1NxOm.js";import"./Svangerskapspenger-DLYSjCBG.js";import"./DinPlan-BR28sMXm.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Dj0KrNm_.js";import"./OppgaveLenkepanel-DEK1H25h.js";import"./KontaktOss-BKbPN7tS.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
