import { FunctionComponent, ReactNode } from 'react';
import DocumentTitle from 'react-document-title';
import { LinkIcon } from '@navikt/aksel-icons';
import { VeilederProps } from '@navikt/fp-common/lib/components/veileder/Veileder';
import { BodyShort, Heading, Ingress, VStack } from '@navikt/ds-react';
import { Locale, LanguageToggle, Sidebanner } from '@navikt/fp-common';
import { Språkkode } from 'intl/types';

import ContentWrapper from '../ContentWrapper';

export interface Props {
    dokumenttittel: string;
    illustrasjon?: {
        tittel: string;
        tekst: ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
        veileder?: VeilederProps;
    };
    tittel: ReactNode;
    ingress: ReactNode;
    språkkode?: Språkkode;
    setLanguage?: (languageCode: Locale) => void;
}

const Feilside: FunctionComponent<Props> = ({
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    språkkode,
    setLanguage,
}) => {
    return (
        <>
            <DocumentTitle title={dokumenttittel} />
            {setLanguage && språkkode && (
                <LanguageToggle locale={språkkode} availableLocales={['en', 'nb', 'nn']} toggle={setLanguage} />
            )}
            {illustrasjon && (
                <Sidebanner
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <VStack gap="4">
                                <div>
                                    <BodyShort>{illustrasjon.tekst}</BodyShort>
                                    {illustrasjon.lenke && (
                                        <LinkIcon href={illustrasjon.lenke.url}>{illustrasjon.lenke.tekst}</LinkIcon>
                                    )}
                                </div>
                            </VStack>
                        ),
                    }}
                />
            )}
            <ContentWrapper>
                <VStack gap="2">
                    <Heading size="large">{tittel}</Heading>
                    <Ingress>{ingress}</Ingress>
                </VStack>
            </ContentWrapper>
        </>
    );
};

export default Feilside;
