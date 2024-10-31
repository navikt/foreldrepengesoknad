import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k}from"./useQuery-D15qCwmj.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{O as s}from"./routes-D6j-qr5i.js";import{E as o}from"./ForeldrepengeoversiktRoutes-C_SB0Dq4.js";import{M as f,R as h,a as v}from"./index-DROl5W8_.js";import{Q as E}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-BgBSX5Ao.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-CiXCA4Ns.js";import"./stringUtils-BhrNUKGk.js";import"./Header-CMEcAqiQ.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./sakerUtils-BOg5fKiE.js";import"./_baseIteratee-ALi5R95-.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-3QwXMUql.js";import"./index-C5XzlRgs.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-DiBLqlFv.js";import"./BekreftelseSendtSøknad-BtLmJ4Ps.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-CWDDNYO0.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./Snarveier-DkLbkLcZ.js";import"./Dokument-FVZgvp-N.js";import"./GrupperteDokumenter-eMS6vmJA.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-Cjem9k3q.js";import"./MinidialogSkjema-CxYrAQyl.js";import"./skjemanummer-CsrY1khI.js";import"./VeiviserPage-C1Pd5DoI.js";import"./index-BRV0Se7Z.js";import"./HarIkkeSaker-BHvGwmx3.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-Col-njWt.js";import"./SakLink-TKXvHa9B.js";import"./Oppgaver-BGh42VVj.js";import"./OppgaveLenkepanel-VXq7XbKp.js";import"./KontaktOss-CFX05IuY.js";const S=new E({defaultOptions:{queries:{retry:!1}}}),Nt={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:S,children:t.jsx(f,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(h,{children:t.jsx(v,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:e.args};var n,p,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
