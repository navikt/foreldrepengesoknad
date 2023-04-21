import { useCallback } from 'react';
import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { bemUtils, Block, LanguageToggle, Locale, Sidebanner, useDocumentTitle } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import actionCreator from 'app/context/action/actionCreator';
import Api from 'app/api/api';
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
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    skalKunneGåTilbakeTilSøknad: boolean;
    språkkode?: Locale;
    setLanguage?: (languageCode: string) => void;
}

const Feilside: React.FunctionComponent<Props> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    skalKunneGåTilbakeTilSøknad,
    språkkode,
    setLanguage,
}) => {
    const bem = bemUtils('feilside');
    const { dispatch, state } = useForeldrepengesøknadContext();
    const { søkerinfo } = state;

    const avbrytSøknadHandler = useCallback(async () => {
        if (!søkerinfo) {
            return;
        }

        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        dispatch(actionCreator.avbrytSøknad());
        await Api.deleteStoredAppState(søkerinfo.person.fnr);
        window.location.href = 'http://localhost:8080';
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
                {søkerinfo !== undefined && !skalKunneGåTilbakeTilSøknad && (
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
