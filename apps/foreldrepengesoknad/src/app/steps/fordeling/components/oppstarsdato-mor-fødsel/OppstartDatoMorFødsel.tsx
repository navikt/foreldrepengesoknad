import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, HStack, VStack } from '@navikt/ds-react';

import { ISOStringToDate, Uttaksdagen, intlUtils } from '@navikt/fp-common';
import { isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import Fordeling from 'app/context/types/Fordeling';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import OppstartDatoInput from '../OppstartDatoInput';
import { getErBarnetFødtFørEllerPåTermin } from '../OppstartValgInput';
import MorOppstartInformasjon from '../mor-oppstart-informasjon/MorOppstartInformasjon';

const OppstartDatoMorFødsel = () => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const { watch } = useFormContext<Fordeling>();
    const oppstartDato = watch('oppstartDato');
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const visInformasjon =
        oppstartDato &&
        isValidDate(oppstartDato) &&
        dayjs(oppstartDato).isSameOrBefore(førsteUttaksdagPåEllerEtterFamHendelse);
    const fødselEllerTermindato = getErBarnetFødtFørEllerPåTermin(barn)
        ? intlUtils(intl, 'fødselsdato')
        : intlUtils(intl, 'termindato');
    return (
        <div>
            <VStack gap="3">
                <HStack gap="1">
                    <OppstartDatoInput />
                    {visInformasjon && <MorOppstartInformasjon oppstartDato={oppstartDato} />}
                </HStack>
                <Alert variant="info">
                    <FormattedMessage id="fordeling.oppstartValg.morFødsel.info" values={{ fødselEllerTermindato }} />
                </Alert>
            </VStack>
        </div>
    );
};

export default OppstartDatoMorFødsel;
