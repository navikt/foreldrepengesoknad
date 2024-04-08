import { CalendarIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong } from '@navikt/ds-react';

interface Props {
    fornavnPart1: string;
    startdatoPart1: string;
    sluttdatoPart1: string;
    fornavnPart2?: string;
    startdatoPart2: string;
    sluttdatoPart2?: string;
}

const FordelingsdetaljerPanel: FunctionComponent<Props> = ({
    fornavnPart1,
    startdatoPart1,
    sluttdatoPart1,
    fornavnPart2,
    startdatoPart2,
    sluttdatoPart2,
}) => (
    <Infobox
        header={<FormattedMessage id="FordelingsdetaljerPanel.InfoboksTittel" />}
        icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
    >
        <BodyLong>
            <FormattedMessage
                id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                values={{
                    hvem: fornavnPart1,
                    dag: dayjs(startdatoPart1).format('DD.MM.YY'),
                }}
            />
        </BodyLong>
        <BodyLong spacing>
            <FormattedMessage
                id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                values={{
                    hvem: fornavnPart1,
                    dag: dayjs(sluttdatoPart1).format('DD.MM.YY'),
                }}
            />
        </BodyLong>
        {fornavnPart2 && sluttdatoPart2 && (
            <>
                <BodyLong>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                        values={{
                            hvem: fornavnPart2,
                            dag: dayjs(startdatoPart2).add(1, 'day').format('DD.MM.YY'),
                        }}
                    />
                </BodyLong>
                <BodyLong spacing>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                        values={{
                            hvem: fornavnPart2,
                            dag: dayjs(sluttdatoPart2).format('DD.MM.YY'),
                        }}
                    />
                </BodyLong>
            </>
        )}
        <BodyLong size="small">
            <FormattedMessage id="FordelingsdetaljerPanel.InfoboksTekst.Hvis" />
        </BodyLong>
    </Infobox>
);

export default FordelingsdetaljerPanel;
