import { RadioGroup, TextField } from '@navikt/fp-form-hooks';
import { Alert, Radio, VStack } from '@navikt/ds-react';

import { isRequired } from '@navikt/fp-validation';
import { FormattedMessage, useIntl } from 'react-intl';
import FordelingFormValues, { FellesperiodeFordelingValg } from 'app/steps/fordeling/FordelingFormValues';
import { useFormContext } from 'react-hook-form';
import { NavnPåForeldre, getVarighetString } from '@navikt/fp-common';

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
    const valgtAntallUkerFellesperiode = watch('antallUkerFellesperiodeTilSøker');
    const liktFordeling = getVarighetString(dagerMedFellesperiode / 2, intl);
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
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
                            ukerMor: liktFordeling,
                            ukerFar: liktFordeling,
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
            <TextField
                name="antallUkerFellesperiodeTilSøker"
                label={<FormattedMessage id="fordeling.antallUker.spørsmål" />}
                description={intl.formatMessage({ id: 'fordeling.antallUker.description' }, { navnAnnenForelder })}
                validate={[isRequired(intl.formatMessage({ id: 'fordeling.antallUker.måOppgis' }))]}
            ></TextField>
            {valgtFordeling === FellesperiodeFordelingValg.LIKT && <p>Du valgte å fordele likt- Visning TODO </p>}
            {valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && valgtAntallUkerFellesperiode && (
                <p>Du valgte å fordele ulikt- Visning TODO </p>
            )}
            {valgtFordeling === FellesperiodeFordelingValg.VIL_IKKE_FORDELE_NÅ && (
                <Alert variant="info">
                    <FormattedMessage id="fordeling.fordelingsvalg.senere.info" />
                </Alert>
            )}
        </VStack>
    );
};

export default FellesperiodeFordeling;
