import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,a as c}from"./useQuery-Debqw60O.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as n}from"./ForeldrepengeoversiktRoutes-DGoEDpuX.js";import{M as h,R as v,a as E}from"./index-DROl5W8_.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./dates-JCHAmx_r.js";import"./UttaksdagenString-CJKc9JwL.js";import"./index-CCQ3W5xA.js";import"./useBackgroundColor-DZK0wgKA.js";import"./Snarveier-DR-oOiEh.js";import"./index-BXlQ-FBc.js";import"./links-XBeNlE0K.js";import"./api-BZH2QUWM.js";import"./sakerUtils-W94h4UHL.js";import"./_baseIteratee-ALi5R95-.js";import"./LenkePanel-VksUmbN3.js";import"./index-bqFtOaxG.js";import"./index-vZN_Bsf0.js";import"./VStack-BUk9K807.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./HGrid-DG8Yyt2e.js";import"./Dokument-qZeEaFxi.js";import"./dokumenterUtils-Cz38hjDH.js";import"./Responsive-o0xE1PD6.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./Tag-DNMWbfh9.js";import"./GrupperteDokumenter-DBfJzAxA.js";import"./guid-CsArkN6i.js";import"./Accordion-b1_l-2oY.js";import"./ChevronDown-CyMHwesb.js";import"./composeEventHandlers-DeH74NdU.js";import"./Header-BfuT1MSq.js";import"./StatusTag-Dz76bBNV.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Stroller-B-9_9B1W.js";import"./NoeGikkGalt-D7SXoYtn.js";import"./Alert-BR4lzIiq.js";import"./Button-DsdktBMU.js";import"./MinidialogSkjema-CBDlKL05.js";import"./skjemanummer-CsrY1khI.js";import"./VeiviserPage-yRsW2E6i.js";import"./bemUtils-DmNyTjfb.js";import"./message-Cw_mD2SY.js";import"./index-BRV0Se7Z.js";import"./BekreftelseSendtSøknad-CEYelF1I.js";import"./stringUtils-avxv7LF_.js";import"./KontonummerInfo-oYsnyG1L.js";import"./HarIkkeSaker-Da8qothy.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-CkaRV3L6.js";import"./SakLink-CyHDwt0D.js";import"./Oppgaver-8P3EgAdX.js";import"./OppgaveLenkepanel-CozTgHKZ.js";import"./KontaktOss-Chm6ZiLq.js";const S=new k({defaultOptions:{queries:{retry:!1}}}),At={title:"EttersendingPage",component:n,render:u=>t.jsx(c,{client:S,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(v,{children:t.jsx(E,{element:t.jsx(n,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:e.args};var o,p,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
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
}`,...(a=(p=e.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var i,m,l;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const Nt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Nt as __namedExportsOrder,At as default};
