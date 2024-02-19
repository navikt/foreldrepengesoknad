import { VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { useIntl } from 'react-intl';
import FordelingFormValues, { OppstartValg } from 'app/steps/fordeling/FordelingFormValues';
import { useFormContext } from 'react-hook-form';
import { NavnPåForeldre } from '@navikt/fp-common';
import OppstartValgInput, { getRadioOptionsForSituasjon } from './OppstartValgInput';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import OppstartDatoMorFødsel from './OppstartDatoMorFødsel';
import OppstartDatoInput from './OppstartDatoInput';

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
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const { watch } = useFormContext<FordelingFormValues>();
    const erMorFødsel = søkersituasjon.situasjon === 'fødsel' && !erFarEllerMedmor;
    const oppstartValg = watch('oppstartAvForeldrepengerValg');
    const oppstartsValgOptions = getRadioOptionsForSituasjon(
        søkersituasjon,
        barn,
        navnAnnenForelder,
        intl,
        førsteDagEtterAnnenForelder,
    );
    const visOppstartsDatoInput =
        oppstartsValgOptions &&
        (oppstartsValgOptions.length === 1 ||
            (oppstartValg && [OppstartValg.ANNEN_DATO, OppstartValg.RUNDT_FØDSEL].includes(oppstartValg)));
    return (
        <VStack gap="5">
            <OppstartValgInput oppstartsValgOptions={oppstartsValgOptions} />
            {visOppstartsDatoInput && erMorFødsel && <OppstartDatoMorFødsel />}
            {visOppstartsDatoInput && !erMorFødsel && <OppstartDatoInput />}
        </VStack>
    );
};

export default OppstartAvForeldrepenger;
