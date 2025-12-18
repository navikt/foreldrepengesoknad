import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfSelect } from '@navikt/fp-form-hooks';
import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { LeggTilPeriodePanelFormValues } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

type Props = {
    autoFocus?: boolean;
};

const ikkeVisAktivitetskravSpørsmål = (
    forelder: BrukerRolleSak_fpoversikt | undefined,
    aleneOmOmsorg: boolean,
    kontoType: KontoTypeUttak | undefined,
) => {
    const erFarMedmorUtenAleneomsorg =
        !aleneOmOmsorg && (kontoType === 'FORELDREPENGER' || kontoType === 'FELLESPERIODE');
    const forelderIkkeBesvartEnda = forelder === undefined && kontoType === 'FELLESPERIODE';
    if (forelder === 'MOR' || !erFarMedmorUtenAleneomsorg || !kontoType || forelderIkkeBesvartEnda) {
        return true;
    }

    return false;
};

export const AktivitetskravSpørsmål = ({ autoFocus }: Props) => {
    const intl = useIntl();

    const { control, watch } = useFormContext<LeggTilPeriodePanelFormValues>();
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const forelder = watch('forelder');
    const kontoType = watch('kontoType');

    if (ikkeVisAktivitetskravSpørsmål(forelder, rettighetType === 'ALENEOMSORG', kontoType)) {
        return null;
    }

    return (
        <VStack gap="space-16">
            <RhfSelect
                name="morsAktivitet"
                autofocusWhenEmpty={autoFocus}
                label={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Label' })}
                control={control}
                validate={[isRequired(intl.formatMessage({ id: 'AktivitetskravSpørsmål.Påkrevd' }))]}
                description={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Description' })}
            >
                <option value="ARBEID">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Arbeid'} />
                </option>
                <option value="UTDANNING">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Utdanning'} />
                </option>
                <option value="KVALPROG">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Kvalprog'} />
                </option>
                <option value="INTROPROG">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Introprog'} />
                </option>
                <option value="TRENGER_HJELP">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Trenger_hjelp'} />
                </option>
                <option value="INNLAGT">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Innlagt'} />
                </option>
                <option value="ARBEID_OG_UTDANNING">
                    <FormattedMessage id={'AktivitetskravSpørsmål.Arbeid_og_utdanning'} />
                </option>
            </RhfSelect>
        </VStack>
    );
};
