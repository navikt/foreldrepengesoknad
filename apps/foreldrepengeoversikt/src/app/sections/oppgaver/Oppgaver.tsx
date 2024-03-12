import { AxiosError } from 'axios';
import { useIntl } from 'react-intl';

import { BodyShort, Loader, VStack } from '@navikt/ds-react';

import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { guid } from 'app/utils/guid';

import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saksnummer: string;
}
const Oppgaver: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError }) => {
    const intl = useIntl();
    if (minidialogerError) {
        return <BodyShort>{intl.formatMessage({ id: 'oppgaver.feilVedHentingAvOppgaver' })}</BodyShort>;
    }

    if (!minidialogerData) {
        return <Loader size="large" aria-label="Henter status for dine oppgaver" />;
    }

    return (
        <VStack gap="2">
            {minidialogerData.map((minidialog) => (
                <OppgaveLenkepanel
                    key={guid()}
                    tittel={intl.formatMessage({ id: 'oppgaver.tittel.tilbakebetaling' })}
                    minidialogInnslag={minidialog}
                />
            ))}
        </VStack>
    );
};

export default Oppgaver;
