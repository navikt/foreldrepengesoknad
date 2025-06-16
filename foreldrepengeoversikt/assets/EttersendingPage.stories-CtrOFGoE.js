import{i as E,j as t}from"./iframe-C-KoTMfU.js";import{h as d,H as u}from"./index-QOGovpQC.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DKM15ckK.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-DuW7kf3y.js";import"./useBackgroundColor-BEknrgQy.js";import"./useSelectedSak-CEb_H5Wg.js";import"./useQuery-BlLOHK6a.js";import"./api-BrOSQk1Z.js";import"./sakerUtils-BcCrBXv1.js";import"./Snarveier-CFHeDe12.js";import"./LenkePanel-DrT4Rqhu.js";import"./Dokument-Bx_ULSjE.js";import"./dokumenterUtils-BrL9LuJZ.js";import"./Tag-BNxbDHnG.js";import"./GrupperteDokumenter-BK_xDBEQ.js";import"./guid-CsArkN6i.js";import"./Header-B3Pr99jN.js";import"./LayoutWrapper-DjOM9FKP.js";import"./StatusTag-DgsLyUJ4.js";import"./Stroller-DtdO5A-G.js";import"./NoeGikkGalt-DECC-h_6.js";import"./MinidialogSkjema-C9eHlnTj.js";import"./skjemanummer-Ch-0KA3D.js";import"./BekreftelseSendtSøknad-RRZHiSj9.js";import"./KontonummerInfo-CFuFXEXU.js";import"./HarIkkeSaker-o9YhxBC3.js";import"./SøkelenkerPanel-B47jP7f6.js";import"./HarSaker-BbC-RVZw.js";import"./SakLink-5-7X-jue.js";import"./ContentSection-CaqlGW8j.js";import"./Svangerskapspenger-D-i50wGn.js";import"./DinPlan-DhGcTDCk.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-D5TAXUEI.js";import"./OppgaveLenkepanel-DFA1TXAI.js";import"./KontaktOss-DTdEMxxO.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
