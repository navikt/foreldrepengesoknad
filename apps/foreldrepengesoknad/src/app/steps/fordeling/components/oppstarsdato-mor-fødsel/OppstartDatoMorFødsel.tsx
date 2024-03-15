import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Alert, HStack, VStack } from '@navikt/ds-react';

import { ISOStringToDate, Uttaksdagen } from '@navikt/fp-common';
import { isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import Fordeling from 'app/context/types/Fordeling';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import OppstartDatoInput from '../OppstartDatoInput';
import MorOppstartInformasjon from '../mor-oppstart-informasjon/MorOppstartInformasjon';

const OppstartDatoMorFødsel = () => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const { watch } = useFormContext<Fordeling>();
    const oppstartDato = watch('oppstartDato');
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen(familiehendelsesdato!).denneEllerNeste();
    const visInformasjon =
        oppstartDato &&
        isValidDate(oppstartDato) &&
        dayjs(oppstartDato).isSameOrBefore(førsteUttaksdagPåEllerEtterFamHendelse);

    return (
        <div>
            <VStack gap="3">
                <HStack gap="1">
                    <OppstartDatoInput />
                    {visInformasjon && <MorOppstartInformasjon oppstartDato={oppstartDato} />}
                </HStack>
                <Alert variant="info">
                    <FormattedMessage id="fordeling.oppstartValg.morFødsel.info" />
                </Alert>
            </VStack>
        </div>
    );
};

export default OppstartDatoMorFødsel;
