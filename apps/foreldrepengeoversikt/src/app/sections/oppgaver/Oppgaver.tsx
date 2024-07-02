import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { minidialogOptions } from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import { guid } from 'app/utils/guid';

import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';

interface Props {
    saksnummer: string;
}
const Oppgaver: React.FunctionComponent<Props> = ({ saksnummer }) => {
    const aktiveMinidialogerForSakenQuery = useQuery({
        ...minidialogOptions(),
        select: (data) => data.filter(({ saksnr }) => saksnr === saksnummer),
    });

    const intl = useIntl();
    if (aktiveMinidialogerForSakenQuery.isError) {
        return (
            <ContentSection heading={intl.formatMessage({ id: 'saksoversikt.oppgaver' })} backgroundColor={'yellow'}>
                <BodyShort>{intl.formatMessage({ id: 'oppgaver.feilVedHentingAvOppgaver' })}</BodyShort>
            </ContentSection>
        );
    }

    const aktiveMinidialogerForSaken = aktiveMinidialogerForSakenQuery.data ?? [];
    if ((aktiveMinidialogerForSaken ?? []).length === 0) {
        return null;
    }
    // TODO: såvidt jeg kan forstå ville denne aldri trigge, siden fra utsiden ble ikke komponenten vist hvis ingen saker
    // if (aktiveMinidialogerForSaken.isPending) {
    //     return <Loader size="large" aria-label="Henter status for dine oppgaver" />;
    // }

    return (
        <VStack gap="2">
            {aktiveMinidialogerForSaken.map((minidialog) => (
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
