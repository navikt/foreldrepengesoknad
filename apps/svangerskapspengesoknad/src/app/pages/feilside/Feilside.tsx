import { useCallback } from 'react';
import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { bemUtils, Block, LanguageToggle, Sidebanner, useDocumentTitle } from '@navikt/fp-common';
import './feilside.css';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import actionCreator from 'app/context/action/actionCreator';
import { LocaleNo } from '@navikt/fp-types';
export interface FeilsideProps {
    containerId?: string;
    dokumenttittel: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    skalKunneGåTilbakeTilSøknad: boolean;
    skalKunneStartePåNytt: boolean;
    språkkode?: LocaleNo;
    setLanguage?: (languageCode: string) => void;
}

const Feilside: React.FunctionComponent<FeilsideProps> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    skalKunneGåTilbakeTilSøknad,
    skalKunneStartePåNytt,
    språkkode,
    setLanguage,
}) => {
    const bem = bemUtils('feilside');
    const { dispatch, state } = useSvangerskapspengerContext();
    const { søkerinfo } = state;

    const avbrytSøknadHandler = useCallback(async () => {
        if (!søkerinfo) {
            return;
        }

        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        dispatch(actionCreator.avbrytSøknad());

        window.location.href = 'https://nav.no';
    }, [dispatch, søkerinfo]);

    const gåTilbakeTilSøknadenHandler = useCallback(() => {
        window.location.reload();
    }, []);

    useDocumentTitle(dokumenttittel);

    return (
        <>
            {setLanguage && språkkode && (
                <LanguageToggle locale={språkkode} availableLocales={['en', 'nb', 'nn']} toggle={setLanguage} />
            )}
            {illustrasjon && (
                <Sidebanner
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <>
                                <Block padBottom="m">{illustrasjon.tekst}</Block>
                                {illustrasjon.lenke && (
                                    <Link href={illustrasjon.lenke.url}>{illustrasjon.lenke.tekst}</Link>
                                )}
                            </>
                        ),
                    }}
                />
            )}
            <div id={containerId} className={bem.block}>
                <Block padBottom="l">
                    <Heading size="large">{tittel}</Heading>
                </Block>
                <Block padBottom="l">
                    <BodyShort>{ingress}</BodyShort>
                </Block>
                {søkerinfo !== undefined && skalKunneStartePåNytt && (
                    <div className={bem.element('avbrytKnapp')}>
                        <Button variant="primary" onClick={avbrytSøknadHandler}>
                            Start søknaden på nytt
                        </Button>
                    </div>
                )}
                {søkerinfo !== undefined && skalKunneGåTilbakeTilSøknad && (
                    <div className={bem.element('avbrytKnapp')}>
                        <Button variant="primary" onClick={gåTilbakeTilSøknadenHandler}>
                            Gå tilbake til søknaden
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Feilside;
