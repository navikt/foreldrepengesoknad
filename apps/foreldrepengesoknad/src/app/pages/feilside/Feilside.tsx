import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { LocaleNo } from '@navikt/fp-types';
import { bemUtils, Block, LanguageToggle, Sidebanner, Søkerinfo, useDocumentTitle } from '@navikt/fp-common';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import { useFpStateResetFn } from 'app/context/FpDataContext';

import './feilside.less';

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
    språkkode?: LocaleNo;
    setLanguage?: (languageCode: string) => void;
    søkerInfo?: Søkerinfo;
}

const Feilside: React.FunctionComponent<FeilsideProps> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    skalKunneGåTilbakeTilSøknad,
    språkkode,
    setLanguage,
    søkerInfo,
}) => {
    const bem = bemUtils('feilside');
    const reset = useFpStateResetFn();

    const avbrytSøknadHandler = async () => {
        if (!søkerInfo) {
            return;
        }

        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();
        await Api.deleteMellomlagretSøknad(søkerInfo.person.fnr);
        //TODO (TOR) Slett vedlegg. Men vent til Andreas har fått inn vedleggsendringa si

        window.location.href = 'https://nav.no';
    };

    const gåTilbakeTilSøknadenHandler = () => {
        window.location.reload();
    };

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
                {søkerInfo !== undefined && !skalKunneGåTilbakeTilSøknad && (
                    <div className={bem.element('avbrytKnapp')}>
                        <Button variant="primary" onClick={avbrytSøknadHandler}>
                            Start søknaden på nytt
                        </Button>
                    </div>
                )}
                {søkerInfo !== undefined && skalKunneGåTilbakeTilSøknad && (
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
