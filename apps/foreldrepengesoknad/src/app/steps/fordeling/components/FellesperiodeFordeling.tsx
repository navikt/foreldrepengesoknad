import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Radio, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, getVarighetString } from '@navikt/fp-common';
import { RadioGroup, TextField } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import FordelingFormValues, { FellesperiodeFordelingValg } from 'app/steps/fordeling/FordelingFormValues';
import { validateNumber } from 'app/steps/inntektsinformasjon/components/egen-næring/modal/validation/egenNæringValidation';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

import { validateAntallUkerFellesperiode } from '../fordelingFormUtils';
import FellesperiodeValgVisning from './fellesperiode-valg-visning.tsx/FellesperiodeValgVisning';

const getValgtFellesperiodeFordeling = (
    erFarEllerMedmor: boolean,
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: number | undefined,
): FordelingDager[] | undefined => {
    if (!valgtFordeling) {
        return undefined;
    }
    const fargekodeSøker = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.SØKER_MOR;
    if (valgtFordeling === FellesperiodeFordelingValg.LIKT) {
        return [
            {
                antallDager: antallDagerFellesperiode / 2,
                fargekode: fargekodeSøker,
            },
            {
                antallDager: antallDagerFellesperiode / 2,
                fargekode: FordelingFargekode.IKKE_TILDELT,
            },
        ];
    }

    if (valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && antallUkerFellesperiodeTilSøker) {
        const fordeling = [];
        const dagerTilSøker = antallUkerFellesperiodeTilSøker * 5;
        if (dagerTilSøker > 0) {
            fordeling.push({
                antallDager: dagerTilSøker,
                fargekode: fargekodeSøker,
            });
        }
        const dagerIgjen = antallDagerFellesperiode - dagerTilSøker;
        if (dagerIgjen > 0) {
            fordeling.push({
                antallDager: dagerIgjen,
                fargekode: FordelingFargekode.IKKE_TILDELT,
            });
        }
        return fordeling;
    }

    return undefined;
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
    const { watch } = useFormContext<FordelingFormValues>();
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
    return (
        <VStack gap="5">
            <RadioGroup
                name="fordelingValg"
                label={<FormattedMessage id="fordeling.fordelingvalg.spørsmål" />}
                description={<FormattedMessage id="fordeling.fordelingvalg.description" />}
                validate={[isRequired(intl.formatMessage({ id: 'fordeling.fordelingsvalg.måOppgis' }))]}
            >
                <Radio
                    value={FellesperiodeFordelingValg.LIKT}
                    description={intl.formatMessage(
                        {
                            id: 'fordeling.fordelingsvalg.option.likt.description',
                        },
                        {
                            ukerMor: likFordeling,
                            ukerFar: likFordeling,
                            navnMor: navnPåForeldre.mor,
                            navnFar: navnPåForeldre.farMedmor,
                        },
                    )}
                >
                    <FormattedMessage id="fordeling.fordelingsvalg.option.likt" />
                </Radio>
                <Radio
                    value={FellesperiodeFordelingValg.VIL_VELGE}
                    description={intl.formatMessage(
                        { id: 'fordeling.fordelingsvalg.option.valgfritt.description' },
                        { navnAnnenForelder },
                    )}
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
