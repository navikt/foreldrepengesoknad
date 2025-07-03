import{i as E,j as t}from"./iframe-CrL3Ypy-.js";import{h as d,H as u}from"./index-CNTqNSA1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-d0So1a2j.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-CZhkTeAi.js";import"./useBackgroundColor-CHFtoeT0.js";import"./useSelectedSak-DoBTZ9DJ.js";import"./useQuery-Dqt3d12g.js";import"./api-DBpJss1J.js";import"./sakerUtils-BZ9Omgr1.js";import"./Snarveier-B019-heO.js";import"./LenkePanel-Ds1G-tGg.js";import"./Dokument-D1gb5adX.js";import"./dokumenterUtils-B6p9CfrP.js";import"./Tag-P2T02cq9.js";import"./GrupperteDokumenter-jDZ_Zd9y.js";import"./guid-CsArkN6i.js";import"./Header-CioW1ulI.js";import"./LayoutWrapper-Dv05frGX.js";import"./StatusTag-lsvVl_BG.js";import"./Stroller-EDxwlhfb.js";import"./NoeGikkGalt-B5iVquac.js";import"./MinidialogSkjema-BhAeh0mC.js";import"./skjemanummer-YDzzj7t7.js";import"./BekreftelseSendtSøknad-CAVngVvt.js";import"./KontonummerInfo-X3zn2mT9.js";import"./HarIkkeSaker-BzgUJwbx.js";import"./SøkelenkerPanel-xMnfpMY1.js";import"./HarSaker-G1bVx-kS.js";import"./SakLink-pAgmrBMY.js";import"./ContentSection-DDMQNslg.js";import"./Svangerskapspenger-DibhvOFh.js";import"./DinPlan-MC93xYVq.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BvgD4IaS.js";import"./OppgaveLenkepanel-Br4lPYZI.js";import"./KontaktOss-wJh9U4HO.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
