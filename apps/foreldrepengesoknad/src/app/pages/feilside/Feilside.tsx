import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { Block, LanguageToggle, Sidebanner, bemUtils } from '@navikt/fp-common';
import { LocaleNo, Person } from '@navikt/fp-types';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import { useContextReset } from 'app/context/FpDataContext';

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
    person?: Person;
}

const Feilside: React.FunctionComponent<FeilsideProps> = ({
    containerId,
    illustrasjon,
    tittel,
    ingress,
    skalKunneGåTilbakeTilSøknad,
    språkkode,
    setLanguage,
    person,
}) => {
    const bem = bemUtils('feilside');
    const reset = useContextReset();

    const avbrytSøknadHandler = async () => {
        if (!person) {
            return;
        }

        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();

        try {
            await Api.deleteMellomlagretSøknad(person.fnr);
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        window.location.href = 'https://nav.no';
    };

    const gåTilbakeTilSøknadenHandler = () => {
        window.location.reload();
    };

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
                    <Heading size="large" level="2">
                        {tittel}
                    </Heading>
                </Block>
                <Block padBottom="l">
                    <BodyShort>{ingress}</BodyShort>
                </Block>
                {person !== undefined && !skalKunneGåTilbakeTilSøknad && (
                    <div className={bem.element('avbrytKnapp')}>
                        <Button variant="primary" onClick={avbrytSøknadHandler}>
                            Start søknaden på nytt
                        </Button>
                    </div>
                )}
                {person !== undefined && skalKunneGåTilbakeTilSøknad && (
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
