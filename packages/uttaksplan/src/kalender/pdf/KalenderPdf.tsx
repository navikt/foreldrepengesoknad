import { DownloadIcon } from '@navikt/aksel-icons';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Dialog, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { Calendar, CalendarPeriod } from '@navikt/fp-ui';

import { UttaksplanLegend } from '../legend/UttaksplanLegend';
import { genererKalenderPdf } from './genererKalenderPdf';

interface Props {
    perioderForKalendervisning: CalendarPeriod[];
    førsteDatoIKalender: string;
    sisteDatoIKalender: string;
    barnehagestartdato: string | undefined;
}

export const KalenderPdf = ({
    perioderForKalendervisning,
    førsteDatoIKalender,
    sisteDatoIKalender,
    barnehagestartdato,
}: Props) => {
    const intl = useIntl();

    const [isCreatingPdf, setIsCreatingPdf] = useState(false);
    const [antallKolonner, setAntallKolonner] = useState<1 | 2 | 3>(2);

    const legendRef = useRef<HTMLDivElement>(null);
    const kalenderRef = useRef<HTMLDivElement>(null);

    const lastNedPdf = async () => {
        const legendElement = legendRef.current;
        const kalenderElement = kalenderRef.current;
        if (!legendElement || !kalenderElement) {
            return;
        }

        setIsCreatingPdf(true);
        try {
            await genererKalenderPdf({
                legendElement,
                kalenderElement,
                antallKolonner,
                filename: 'Min foreldrepengeplan.pdf',
            });
        } finally {
            setIsCreatingPdf(false);
        }
    };

    return (
        <Dialog>
            <Dialog.Trigger>
                <Button variant="tertiary" icon={<DownloadIcon aria-hidden />} type="button">
                    <FormattedMessage id="kalender.lastNedSomPdf" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="kalender.lastNedSomPdf" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap="space-48">
                        <VStack gap="space-16">
                            <RadioGroup
                                legend={intl.formatMessage({ id: 'kalender.antallKolonner' })}
                                onChange={setAntallKolonner}
                                value={antallKolonner}
                            >
                                <HStack gap="space-16">
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                    <Radio value={3}>3</Radio>
                                </HStack>
                            </RadioGroup>

                            <HStack gap="space-8">
                                <Button
                                    variant="primary"
                                    icon={<DownloadIcon aria-hidden />}
                                    loading={isCreatingPdf}
                                    onClick={() => void lastNedPdf()}
                                    type="button"
                                >
                                    <FormattedMessage id="kalender.lastNed" />
                                </Button>
                                <Dialog.CloseTrigger>
                                    <Button variant="tertiary" type="button">
                                        <FormattedMessage id="kalender.avbryt" />
                                    </Button>
                                </Dialog.CloseTrigger>
                            </HStack>
                        </VStack>
                        <VStack gap="space-24">
                            <div ref={legendRef}>
                                <UttaksplanLegend
                                    perioderForKalendervisning={perioderForKalendervisning}
                                    readOnly
                                    barnehagestartdato={barnehagestartdato}
                                />
                            </div>
                            <div ref={kalenderRef}>
                                <Calendar
                                    periods={perioderForKalendervisning}
                                    nrOfColumns={antallKolonner}
                                    firstDateInCalendar={førsteDatoIKalender}
                                    lastDateInCalendar={sisteDatoIKalender}
                                />
                            </div>
                        </VStack>
                    </VStack>
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};
