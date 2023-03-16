import React from 'react';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { Språkkode } from 'intl/types';
import { VeilederProps } from '@navikt/fp-common/lib/components/veileder/Veileder';
import { Locale, bemUtils, Block, LanguageToggle, Sidebanner } from '@navikt/fp-common';

import './feilside.less';

export interface Props {
    containerId?: string;
    dokumenttittel: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    språkkode?: Språkkode;
    setLanguage?: (languageCode: Locale) => void;
}

const Feilside: React.FunctionComponent<Props> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    språkkode,
    setLanguage,
}) => {
    const bem = bemUtils('feilside');

    return (
        <>
            <DocumentTitle title={dokumenttittel} />
            {setLanguage && språkkode && (
                <LanguageToggle locale={språkkode} availableLocales={['en', 'nb', 'nn']} toggle={setLanguage} />
            )}
            {illustrasjon && (
                <Sidebanner
                    veileder={illustrasjon.veileder}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <>
                                <Block padBottom="m">{illustrasjon.tekst}</Block>
                                {illustrasjon.lenke && (
                                    <Lenke className="intro-snakkelenke" href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </>
                        ),
                    }}
                />
            )}
            <div id={containerId} className={bem.block}>
                <div className="responsiveContainer">
                    <div className="blokk-s">
                        <Innholdstittel>{tittel}</Innholdstittel>
                    </div>
                    <div className="blokk-l">
                        <Ingress>{ingress}</Ingress>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feilside;
