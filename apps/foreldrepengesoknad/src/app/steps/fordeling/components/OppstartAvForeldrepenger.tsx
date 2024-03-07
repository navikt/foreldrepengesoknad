import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import Fordeling, { OppstartValg } from 'app/context/types/Fordeling';
import { getFamiliehendelsedatoDate } from 'app/utils/barnUtils';

import OppstartDatoInput from './OppstartDatoInput';
import OppstartValgInput, { getRadioOptionsForSituasjon } from './OppstartValgInput';
import OppstartDatoMorFødsel from './oppstarsdato-mor-fødsel/OppstartDatoMorFødsel';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    førsteDagEtterAnnenForelder: Date | undefined;
}

const OppstartAvForeldrepenger: React.FunctionComponent<Props> = ({
    erFarEllerMedmor,
    navnPåForeldre,
    førsteDagEtterAnnenForelder,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkerData = notEmpty(useContextGetData(ContextDataType.SØKER_DATA));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const { watch } = useFormContext<Fordeling>();
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const erMorFødsel = søkersituasjon.situasjon === 'fødsel' && !erFarEllerMedmor;
    const deltUttak = getIsDeltUttak(annenForelder);
    const oppstartValg = watch('oppstartAvForeldrepengerValg');
    const oppstartsValgOptions = getRadioOptionsForSituasjon(
        søkersituasjon,
        barn,
        navnAnnenForelder,
        intl,
        deltUttak,
        førsteDagEtterAnnenForelder,
    );
    const visOppstartsDatoInput =
        oppstartsValgOptions &&
        (oppstartsValgOptions.length <= 1 || (oppstartValg && OppstartValg.ANNEN_DATO === oppstartValg));
    const erAleneOmOmsorg = søkerData.erAleneOmOmsorg;
    return (
        <VStack gap="5">
            <OppstartValgInput
                oppstartsValgOptions={oppstartsValgOptions}
                erFarEllerMedmor={erFarEllerMedmor}
                familiehendelsesdato={familiehendelsesdato}
                erAleneOmOmsorg={erAleneOmOmsorg}
            />
            {visOppstartsDatoInput && erMorFødsel && <OppstartDatoMorFødsel />}
            {visOppstartsDatoInput && !erMorFødsel && <OppstartDatoInput />}
        </VStack>
    );
};

export default OppstartAvForeldrepenger;
