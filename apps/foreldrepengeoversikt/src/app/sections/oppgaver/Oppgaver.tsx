import { BodyLong, BodyShort, Loader } from '@navikt/ds-react';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { AxiosError } from 'axios';
import React from 'react';
import { useIntl } from 'react-intl';
import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';
import './oppgaver.css';
interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saksnummer: string;
}
const Oppgaver: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError }) => {
    const bem = bemUtils('oppgaver');
    const intl = useIntl();
    if (minidialogerError) {
        return <BodyShort>{intlUtils(intl, 'oppgaver.feilVedHentingAvOppgaver')}</BodyShort>;
    }

    if (!minidialogerData) {
        return <Loader size="large" aria-label="Henter status for dine oppgaver" />;
    }

    return (
        <div className={bem.block}>
            <div className={bem.element('header')}>
                <div>
                    <BodyLong>{intlUtils(intl, 'oppgaver.informasjonTilBruker')}</BodyLong>
                </div>
            </div>
            <>
                {minidialogerData.map((minidialog) => (
                    <OppgaveLenkepanel
                        key={guid()}
                        tittel={intlUtils(intl, 'oppgaver.tittel.tilbakebetaling')}
                        minidialogInnslag={minidialog}
                    />
                ))}
            </>
        </div>
    );
};

export default Oppgaver;
