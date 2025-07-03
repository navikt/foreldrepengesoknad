import{i as E,j as t}from"./iframe-DaECt3Z8.js";import{h as d,H as u}from"./index-DNqndl6Q.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Ox7cOBK_.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-kgsSJYlP.js";import"./useBackgroundColor-vPVfVYRK.js";import"./useSelectedSak-DZyfiPgh.js";import"./useQuery-BX72ev6N.js";import"./api-mnR8y_Mt.js";import"./sakerUtils-BB_sZ5KJ.js";import"./Snarveier-C_8nWk9u.js";import"./LenkePanel-_DCG2xIr.js";import"./Dokument-B4MoYlQN.js";import"./dokumenterUtils-Bvaz38Jo.js";import"./Tag-CDdW2xhx.js";import"./GrupperteDokumenter-DNebOBbg.js";import"./guid-CsArkN6i.js";import"./Header-CtEOOVJh.js";import"./LayoutWrapper-DTHDRAVX.js";import"./StatusTag-CYejGbN6.js";import"./Stroller-BmUTCjIc.js";import"./NoeGikkGalt-CmI243lx.js";import"./MinidialogSkjema-BofcKN95.js";import"./skjemanummer-CxI1uXZD.js";import"./BekreftelseSendtSøknad-DO6Vbtqh.js";import"./KontonummerInfo-D8aE_SJ-.js";import"./HarIkkeSaker-CcMkED9c.js";import"./SøkelenkerPanel-D4kYRUlF.js";import"./HarSaker-ysf-cX85.js";import"./SakLink-B0k0U_Ea.js";import"./ContentSection-DmMNn25R.js";import"./Svangerskapspenger-BUAiWXfW.js";import"./DinPlan-C_Qg4xI2.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B5LJm_tZ.js";import"./OppgaveLenkepanel-C6DtnLD7.js";import"./KontaktOss-C57j8cU9.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
