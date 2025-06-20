import{i as E,j as t}from"./iframe-BJOrK8-u.js";import{h as d,H as u}from"./index-CLvwcM3t.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D_3K1CLp.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-Cne6DSfx.js";import"./useBackgroundColor-BENKqGfq.js";import"./useSelectedSak-C2rzVa9X.js";import"./useQuery-qwHCOTra.js";import"./api-B_xs-BIG.js";import"./sakerUtils-cU-6GnH2.js";import"./Snarveier-CYwXTp5M.js";import"./LenkePanel-DP-yx1ji.js";import"./Dokument-C-oU9tKH.js";import"./dokumenterUtils-zK5_CNJB.js";import"./Tag-DZvb3DJv.js";import"./GrupperteDokumenter-CDMVn5zp.js";import"./guid-CsArkN6i.js";import"./Header-CJZxsj5r.js";import"./LayoutWrapper-DiLiBCQY.js";import"./StatusTag-CVJ7ZIIE.js";import"./Stroller-BCDc_win.js";import"./NoeGikkGalt-6BfPGkt5.js";import"./MinidialogSkjema-CtuLEHFi.js";import"./skjemanummer-Cs-WVIsw.js";import"./BekreftelseSendtSøknad-BmdJqkQC.js";import"./KontonummerInfo-Dz7lSHTY.js";import"./HarIkkeSaker-BYlHJm4N.js";import"./SøkelenkerPanel-Ba-F0uF_.js";import"./HarSaker-DH-2Z6Ds.js";import"./SakLink-Bo2onosa.js";import"./ContentSection-C-_4XQ1t.js";import"./Svangerskapspenger-Cpz9khrP.js";import"./DinPlan-kII7WsVF.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-D4A5_bh9.js";import"./OppgaveLenkepanel-DqVdwwQm.js";import"./KontaktOss-SFF0nuqa.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
