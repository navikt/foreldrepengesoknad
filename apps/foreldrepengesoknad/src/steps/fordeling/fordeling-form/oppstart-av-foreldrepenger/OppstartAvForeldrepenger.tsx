import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useFormContext } from 'react-hook-form';
import { Fordeling, OppstartValg } from 'types/Fordeling';
import { getErAleneOmOmsorg } from 'utils/annenForelderUtils';

import { VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { OppstartDatoInput } from './OppstartDatoInput';
import { OppstartDatoMorFødsel } from './OppstartDatoMorFødsel';
import { OppstartValgInput } from './OppstartValgInput';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    førsteDagEtterAnnenForelder: string | undefined;
    oppstartsvalg: OppstartValg[];
}

export const OppstartAvForeldrepenger = ({
    navnPåForeldre,
    erFarEllerMedmor,
    førsteDagEtterAnnenForelder,
    oppstartsvalg,
}: Props) => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const { watch } = useFormContext<Fordeling>();
    const erAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const erMorFødsel = søkersituasjon.situasjon === 'fødsel' && !erFarEllerMedmor;
    const oppstartValg = watch('oppstartAvForeldrepengerValg');

    const visOppstartsDatoInput =
        oppstartsvalg.length <= 1 || (oppstartValg && OppstartValg.ANNEN_DATO === oppstartValg);
    return (
        <VStack gap="space-20">
            <OppstartValgInput
                oppstartsvalg={oppstartsvalg}
                erFarEllerMedmor={erFarEllerMedmor}
                erAleneOmOmsorg={erAleneOmOmsorg}
                navnPåForeldre={navnPåForeldre}
                førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
            />
            {visOppstartsDatoInput && erMorFødsel && <OppstartDatoMorFødsel oppstartValg={oppstartValg} />}
            {visOppstartsDatoInput && !erMorFødsel && <OppstartDatoInput oppstartValg={oppstartValg} />}
        </VStack>
    );
};
