import { CalendarIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Uttaksdata } from 'utils/uttakHjelper';

import { BodyLong } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

interface Props {
    uttaksdata: Uttaksdata;
    fornavnPart1: string;
    fornavnPart2?: string;
}

const FordelingsdetaljerPanel: FunctionComponent<Props> = ({ uttaksdata, fornavnPart1, fornavnPart2 }) => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const antallBarn = barnet.antallBarn;

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2 } = uttaksdata;

    return (
        <Infobox
            header={<FormattedMessage id="FordelingsdetaljerPanel.InfoboksTittel" />}
            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
        >
            <BodyLong>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                    values={{
                        hvem: fornavnPart1,
                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                    values={{
                        hvem: fornavnPart1,
                        dag: dayjs(sluttdatoSøker1).format('DD.MM.YY'),
                    }}
                />
            </BodyLong>
            {fornavnPart2 && sluttdatoSøker2 && (
                <>
                    <BodyLong>
                        <FormattedMessage
                            id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                            values={{
                                hvem: fornavnPart2,
                                dag: dayjs(startdatoSøker2).format('DD.MM.YY'),
                            }}
                        />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                            values={{
                                hvem: fornavnPart2,
                                dag: dayjs(sluttdatoSøker2).format('DD.MM.YY'),
                            }}
                        />
                    </BodyLong>
                </>
            )}
            <BodyLong size="small">
                <FormattedMessage id="FordelingsdetaljerPanel.InfoboksTekst.Hvis" values={{ antallBarn }} />
            </BodyLong>
        </Infobox>
    );
};
export default FordelingsdetaljerPanel;
