import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Fordeling, OppstartValg } from 'types/Fordeling';
import { getFamiliehendelsedato } from 'utils/barnUtils';

import { InlineMessage, VStack } from '@navikt/ds-react';

import { Uttaksdagen, erUttaksdag } from '@navikt/fp-utils';
import { isValidDateString as isValidDate, notEmpty } from '@navikt/fp-validation';

import { MorOppstartInformasjon } from './MorOppstartInformasjon';
import { OppstartDatoInput } from './OppstartDatoInput';

interface Props {
    oppstartValg: OppstartValg | undefined;
}

export const OppstartDatoMorFødsel = ({ oppstartValg }: Props) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const { watch } = useFormContext<Fordeling>();
    const oppstartDato = watch('oppstartDato');
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato();
    const visInformasjon =
        oppstartDato &&
        isValidDate(oppstartDato) &&
        erUttaksdag(oppstartDato) &&
        dayjs(oppstartDato).isSameOrBefore(førsteUttaksdagPåEllerEtterFamHendelse);
    return (
        <div>
            <VStack gap="space-12">
                <OppstartDatoInput oppstartValg={oppstartValg} />
                {visInformasjon && <MorOppstartInformasjon oppstartDato={oppstartDato} />}
                <InlineMessage status="info">
                    <FormattedMessage id="fordeling.oppstartValg.morFødsel.info" />
                </InlineMessage>
            </VStack>
        </div>
    );
};
