import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Fordeling, OppstartValg } from 'types/Fordeling';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'utils/barnUtils';
import { ISOStringToDate } from 'utils/dateUtils';

import { Alert, HStack, VStack } from '@navikt/ds-react';

import { isFødtBarn } from '@navikt/fp-common';
import { Uttaksdagen, erUttaksdag, isValidDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { MorOppstartInformasjon } from './MorOppstartInformasjon';
import { OppstartDatoInput } from './OppstartDatoInput';
import { getErBarnetFødtInnenTreUkerFørTermin } from './OppstartValgInput';

interface Props {
    oppstartValg: OppstartValg | undefined;
}

export const OppstartDatoMorFødsel = ({ oppstartValg }: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const erBarnetFødt = isFødtBarn(barn);
    const termindato = getTermindato(barn);
    const fødselsdato = getFødselsdato(barn);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const { watch } = useFormContext<Fordeling>();
    const oppstartDato = watch('oppstartDato');
    const førsteUttaksdagPåEllerEtterFamHendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const visInformasjon =
        oppstartDato &&
        isValidDate(oppstartDato) &&
        erUttaksdag(ISOStringToDate(oppstartDato)!) &&
        dayjs(oppstartDato).isSameOrBefore(førsteUttaksdagPåEllerEtterFamHendelse);
    const fødselEllerTermindato = getErBarnetFødtInnenTreUkerFørTermin(erBarnetFødt, termindato, fødselsdato)
        ? intl.formatMessage({ id: 'fødselsdato' })
        : intl.formatMessage({ id: 'termindato' });
    return (
        <div>
            <VStack gap="space-12">
                <HStack gap="space-4">
                    <OppstartDatoInput oppstartValg={oppstartValg} />
                    {visInformasjon && <MorOppstartInformasjon oppstartDato={oppstartDato} />}
                </HStack>
                <Alert variant="info">
                    <FormattedMessage id="fordeling.oppstartValg.morFødsel.info" values={{ fødselEllerTermindato }} />
                </Alert>
            </VStack>
        </div>
    );
};
