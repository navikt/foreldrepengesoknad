import React, { useCallback } from 'react';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VeilederProps } from '@navikt/fp-common/lib/components/veileder/Veileder';
import { bemUtils, Block, LanguageToggle, Locale, Sidebanner } from '@navikt/fp-common';
import { Hovedknapp } from 'nav-frontend-knapper';
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
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    språkkode?: Locale;
    setLanguage?: (languageCode: string) => void;
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
                                    <Lenke href={illustrasjon.lenke.url}>{illustrasjon.lenke.tekst}</Lenke>
                                )}
                            </>
                        ),
                    }}
                />
            )}
            <div id={containerId} className={bem.block}>
                <Block padBottom="l">
                    <Innholdstittel>{tittel}</Innholdstittel>
                </Block>
                <Block padBottom="l">
                    <Normaltekst>{ingress}</Normaltekst>
                </Block>
                {søkerinfo !== undefined && (
                    <div className={bem.element('avbrytKnapp')}>
                        <Hovedknapp onClick={avbrytSøknadHandler}>Start søknaden på nytt</Hovedknapp>
                    </div>
                )}
            </div>
        </>
    );
};

export default Feilside;
