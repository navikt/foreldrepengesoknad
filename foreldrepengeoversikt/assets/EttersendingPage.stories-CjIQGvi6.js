import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,a as c}from"./useQuery-Debqw60O.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as n}from"./ForeldrepengeoversiktRoutes-DY2CRhG3.js";import{M as h,R as v,a as E}from"./index-DROl5W8_.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./dates-JCHAmx_r.js";import"./UttaksdagenString-CJKc9JwL.js";import"./index-CCQ3W5xA.js";import"./useBackgroundColor-DZK0wgKA.js";import"./Snarveier-5rM0Yjz8.js";import"./index-BXlQ-FBc.js";import"./links-XBeNlE0K.js";import"./api-BZH2QUWM.js";import"./sakerUtils-W94h4UHL.js";import"./_baseIteratee-ALi5R95-.js";import"./LenkePanel-B8uZuE7v.js";import"./index-bqFtOaxG.js";import"./index-vZN_Bsf0.js";import"./VStack-B3VpK05-.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./HGrid-Cd8ONxVt.js";import"./Dokument-Csq-IktG.js";import"./dokumenterUtils-CA77vD9Y.js";import"./useId-BHtrcvnP.js";import"./Responsive-O2610eic.js";import"./Link-gwHVuC8x.js";import"./Tag-DNMWbfh9.js";import"./GrupperteDokumenter-i7KmLadk.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./Header-DkYUlARw.js";import"./StatusTag-Dz76bBNV.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Stroller-JY-nL-ik.js";import"./NoeGikkGalt-XWFCEAOS.js";import"./Alert-BDHNIHRQ.js";import"./Button-DnTWC_fD.js";import"./MinidialogSkjema-DTnFv478.js";import"./skjemanummer-CsrY1khI.js";import"./VeiviserPage-BPT3nQWN.js";import"./bemUtils-DmNyTjfb.js";import"./message-Cw_mD2SY.js";import"./index-BRV0Se7Z.js";import"./BekreftelseSendtSøknad-_0QVQn9U.js";import"./stringUtils-avxv7LF_.js";import"./KontonummerInfo-D1w5cgIm.js";import"./HarIkkeSaker-DsCMofZl.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-DRKMWL9g.js";import"./SakLink-4yYUrcj0.js";import"./Oppgaver-R49X9nyM.js";import"./OppgaveLenkepanel-Dkj9_E2O.js";import"./KontaktOss-C8FfzSX_.js";const S=new k({defaultOptions:{queries:{retry:!1}}}),Nt={title:"EttersendingPage",component:n,render:u=>t.jsx(c,{client:S,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(v,{children:t.jsx(E,{element:t.jsx(n,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:e.args};var o,p,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const yt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,yt as __namedExportsOrder,Nt as default};
