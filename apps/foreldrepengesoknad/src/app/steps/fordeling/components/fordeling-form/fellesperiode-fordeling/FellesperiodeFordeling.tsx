import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { NumericField } from '@navikt/fp-form-hooks';
import { getNumberFromNumberInputValue } from '@navikt/fp-formik';
import { bemUtils } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

import { validateAntallUkerFellesperiode } from '../fordelingFormUtils';
import FellesperiodeValgVisning from './FellesperiodeValgVisning';
import FordelingValg from './FordelingValg';
import './fellesperiode-fordeling.css';

const getAntallDagerFellesperiodeTilSøker = (
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: string | undefined,
): number | undefined => {
    if (!valgtFordeling) {
        return undefined;
    }
    if (valgtFordeling === FellesperiodeFordelingValg.ALT) {
        return antallDagerFellesperiode;
    }
    const antallUkerFellesperiodeTilSøkerNumber = getNumberFromNumberInputValue(antallUkerFellesperiodeTilSøker)!;
    const antallUkerMedFellesperiodeTotalt = antallDagerFellesperiode / 5;
    const antallUkerInputErHeltall = antallUkerFellesperiodeTilSøker && antallUkerFellesperiodeTilSøkerNumber % 1 === 0;

    if (
        valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE &&
        antallUkerInputErHeltall &&
        antallUkerFellesperiodeTilSøkerNumber >= 0 &&
        antallUkerFellesperiodeTilSøkerNumber <= antallUkerMedFellesperiodeTotalt
    ) {
        return antallUkerFellesperiodeTilSøkerNumber * 5;
    }
    return undefined;
};

export const getValgtFellesperiodeFordeling = (
    erFarEllerMedmor: boolean,
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: string | undefined,
): FordelingDager[] | undefined => {
    if (
        !valgtFordeling ||
        (valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE &&
            (!antallUkerFellesperiodeTilSøker || antallUkerFellesperiodeTilSøker.trim() === '0'))
    ) {
        return [
            {
                antallDager: antallDagerFellesperiode,
                fargekode: FordelingFargekode.IKKE_TILDELT,
            },
        ];
    }
    const fargekodeSøker = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.SØKER_MOR;
    const fordeling = [];
    const dagerTilSøker = getAntallDagerFellesperiodeTilSøker(
        antallDagerFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
    );
    if (dagerTilSøker && dagerTilSøker > 0) {
        fordeling.push({
            antallDager: dagerTilSøker,
            fargekode: fargekodeSøker,
        });
    }
    const dagerIgjen = dagerTilSøker ? antallDagerFellesperiode - dagerTilSøker : undefined;
    if (dagerIgjen && dagerIgjen > 0) {
        fordeling.push({
            antallDager: dagerIgjen,
            fargekode: FordelingFargekode.IKKE_TILDELT,
        });
    }
    return fordeling.length > 0 ? fordeling : undefined;
};

interface Props {
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    erFarEllerMedmor: boolean;
}
const FellesperiodeFordeling: React.FunctionComponent<Props> = ({
    navnPåForeldre,
    dagerMedFellesperiode,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const bem = bemUtils('fellesperiodeFordeling');
    const { watch } = useFormContext<Fordeling>();
    const valgtFordeling = watch('fordelingValg');
    const antallUkerFellesperiodeTilSøker = watch('antallUkerFellesperiodeTilSøker');

    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const fordelingsdager = getValgtFellesperiodeFordeling(
        erFarEllerMedmor,
        dagerMedFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
    );

    return (
        <VStack gap="5">
            <FordelingValg dagerMedFellesperiode={dagerMedFellesperiode} />
            {valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && (
                <NumericField
                    className={bem.element('textInput')}
                    name="antallUkerFellesperiodeTilSøker"
                    label={<FormattedMessage id="fordeling.antallUker.spørsmål" />}
                    description={intl.formatMessage({ id: 'fordeling.antallUker.description' }, { navnAnnenForelder })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'fordeling.antallUker.måOppgis' })),
                        validateAntallUkerFellesperiode(intl, dagerMedFellesperiode),
                    ]}
                />
            )}
            {valgtFordeling === FellesperiodeFordelingValg.HOPP_OVER_FORDELING && (
                <Alert variant="info">
                    <FormattedMessage id="fordeling.fordelingsvalg.senere.info" />
                </Alert>
            )}
            {fordelingsdager && (
                <FellesperiodeValgVisning
                    fordelingsdager={fordelingsdager}
                    dagerMedFellesperiode={dagerMedFellesperiode}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            )}
        </VStack>
    );
};

export default FellesperiodeFordeling;
