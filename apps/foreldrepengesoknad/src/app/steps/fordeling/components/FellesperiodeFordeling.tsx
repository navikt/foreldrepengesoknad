import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Radio, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, getVarighetString } from '@navikt/fp-common';
import { RadioGroup, TextField } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { validateNumber } from 'app/steps/inntektsinformasjon/components/egen-næring/modal/validation/egenNæringValidation';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

import { validateAntallUkerFellesperiode } from '../fordelingFormUtils';
import FellesperiodeValgVisning from './fellesperiode-valg-visning.tsx/FellesperiodeValgVisning';

const getAntallUkerFellesperiodeTilSøker = (
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: number | undefined,
): number | undefined => {
    if (!valgtFordeling) {
        return undefined;
    }
    if (valgtFordeling === FellesperiodeFordelingValg.LIKT) {
        return antallDagerFellesperiode / 2;
    }
    const antallUkerMedFellesperiodeTotalt = antallDagerFellesperiode / 5;
    const antallUkerInputErHeltall = antallUkerFellesperiodeTilSøker && antallUkerFellesperiodeTilSøker % 1 === 0;

    if (
        valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE &&
        antallUkerInputErHeltall &&
        antallUkerFellesperiodeTilSøker >= 0 &&
        antallUkerFellesperiodeTilSøker <= antallUkerMedFellesperiodeTotalt
    ) {
        return antallUkerFellesperiodeTilSøker * 5;
    }
    return undefined;
};

export const getValgtFellesperiodeFordeling = (
    erFarEllerMedmor: boolean,
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: number | undefined,
): FordelingDager[] | undefined => {
    if (!valgtFordeling) {
        return undefined;
    }
    const fargekodeSøker = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.SØKER_MOR;
    const fordeling = [];
    const dagerTilSøker = getAntallUkerFellesperiodeTilSøker(
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
    const { watch } = useFormContext<Fordeling>();
    const valgtFordeling = watch('fordelingValg');
    const antallUkerFellesperiodeTilSøker = watch('antallUkerFellesperiodeTilSøker');
    const likFordeling = getVarighetString(dagerMedFellesperiode / 2, intl);
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const fordelingsdager = getValgtFellesperiodeFordeling(
        erFarEllerMedmor,
        dagerMedFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
    );
    console.log('fordelingsdager', fordelingsdager);
    return (
        <VStack gap="5">
            <RadioGroup
                name="fordelingValg"
                label={<FormattedMessage id="fordeling.fordelingvalg.spørsmål" />}
                description={<FormattedMessage id="fordeling.description.kanEndresSenere" />}
                validate={[isRequired(intl.formatMessage({ id: 'fordeling.fordelingsvalg.måOppgis' }))]}
            >
                <Radio
                    value={FellesperiodeFordelingValg.LIKT}
                    description={intl.formatMessage(
                        {
                            id: 'fordeling.fordelingsvalg.option.likt.description',
                        },
                        {
                            ukerDeg: likFordeling,
                            ukerAnnenForelder: likFordeling,
                            navnAnnenForelder: navnAnnenForelder,
                        },
                    )}
                >
                    <FormattedMessage id="fordeling.fordelingsvalg.option.likt" />
                </Radio>
                <Radio
                    value={FellesperiodeFordelingValg.VIL_VELGE}
                    description={intl.formatMessage({ id: 'fordeling.fordelingsvalg.option.valgfritt.description' })}
                >
                    <FormattedMessage id="fordeling.fordelingsvalg.option.valgfritt" />
                </Radio>
                <Radio value={FellesperiodeFordelingValg.VIL_IKKE_FORDELE_NÅ}>
                    <FormattedMessage id="fordeling.fordelingsvalg.option.senere" />
                </Radio>
            </RadioGroup>
            {valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && (
                <TextField
                    name="antallUkerFellesperiodeTilSøker"
                    label={<FormattedMessage id="fordeling.antallUker.spørsmål" />}
                    description={intl.formatMessage({ id: 'fordeling.antallUker.description' }, { navnAnnenForelder })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'fordeling.antallUker.måOppgis' })),
                        validateNumber(intl, 'fordeling.antallUker.ugyldigFormat'),
                        validateAntallUkerFellesperiode(intl, dagerMedFellesperiode),
                    ]}
                ></TextField>
            )}
            {valgtFordeling === FellesperiodeFordelingValg.VIL_IKKE_FORDELE_NÅ && (
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
