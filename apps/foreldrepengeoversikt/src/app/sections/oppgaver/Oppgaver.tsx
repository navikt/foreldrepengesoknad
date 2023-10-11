import { BodyShort, Loader } from '@navikt/ds-react';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { AxiosError } from 'axios';

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
            {minidialogerData.map((minidialog) => (
                <OppgaveLenkepanel
                    key={guid()}
                    tittel={intlUtils(intl, 'oppgaver.tittel.tilbakebetaling')}
                    minidialogInnslag={minidialog}
                />
            ))}
        </div>
    );
};

export default Oppgaver;
