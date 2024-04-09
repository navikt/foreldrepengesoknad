import { useFormContext } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import Fordeling, { OppstartValg } from 'app/context/types/Fordeling';
import { getErAleneOmOmsorg } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedatoDate } from 'app/utils/barnUtils';

import OppstartDatoInput from './OppstartDatoInput';
import OppstartDatoMorFødsel from './OppstartDatoMorFødsel';
import OppstartValgInput from './OppstartValgInput';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    førsteDagEtterAnnenForelder: Date | undefined;
    oppstartsvalg: OppstartValg[];
}

const OppstartAvForeldrepenger: React.FunctionComponent<Props> = ({
    navnPåForeldre,
    erFarEllerMedmor,
    førsteDagEtterAnnenForelder,
    oppstartsvalg,
}) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const { watch } = useFormContext<Fordeling>();
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const erAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const erMorFødsel = søkersituasjon.situasjon === 'fødsel' && !erFarEllerMedmor;
    const oppstartValg = watch('oppstartAvForeldrepengerValg');

    const visOppstartsDatoInput =
        oppstartsvalg.length <= 1 || (oppstartValg && OppstartValg.ANNEN_DATO === oppstartValg);
    return (
        <VStack gap="5">
            <OppstartValgInput
                oppstartsvalg={oppstartsvalg}
                erFarEllerMedmor={erFarEllerMedmor}
                familiehendelsesdato={familiehendelsesdato}
                erAleneOmOmsorg={erAleneOmOmsorg}
                navnPåForeldre={navnPåForeldre}
                førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
            />
            {visOppstartsDatoInput && erMorFødsel && <OppstartDatoMorFødsel oppstartValg={oppstartValg} />}
            {visOppstartsDatoInput && !erMorFødsel && <OppstartDatoInput oppstartValg={oppstartValg} />}
        </VStack>
    );
};

export default OppstartAvForeldrepenger;
