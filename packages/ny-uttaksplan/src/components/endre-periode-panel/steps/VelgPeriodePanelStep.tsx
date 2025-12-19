import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { formatDate } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';
import { PanelData } from '../EndrePeriodePanel';

interface Props {
    perioder: Planperiode[];
    panelData: PanelData;
    setPanelData: (data: PanelData) => void;
    closePanel: () => void;
}

interface FormValues {
    periodeId: string | undefined;
}

export const VelgPeriodePanelStep = ({ perioder, panelData, setPanelData, closePanel }: Props) => {
    const intl = useIntl();
    const {
        foreldreInfo: { søker, navnPåForeldre },
    } = useUttaksplanData();

    const formMethods = useForm<FormValues>({
        defaultValues: {
            periodeId: panelData.valgtPeriode?.id,
        },
    });

    const onSubmit = (values: FormValues) => {
        const valgtPeriode = perioder.find((p) => p.id === values.periodeId);

        setPanelData({
            ...panelData,
            valgtPeriode,
            currentStep: 'step2',
        });
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.hvilkeperiode" />
                </Heading>
                <RhfRadioGroup
                    name="periodeId"
                    control={formMethods.control}
                    validate={[
                        (value) => {
                            if (!value) {
                                return 'Du må velge hvilken periode du vil endre';
                            }

                            return undefined;
                        },
                    ]}
                >
                    {perioder.map((p, index) => {
                        const morsAktivitet = !p.erAnnenPartEøs && p.morsAktivitet ? p.morsAktivitet : undefined;
                        return (
                            <Radio key={p.id} value={p.id} autoFocus={index === 0}>
                                {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ` +
                                    `${getStønadskontoNavn(intl, p.kontoType!, navnPåForeldre, søker === 'FAR_ELLER_MEDMOR', morsAktivitet)}`}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                <HStack justify="space-between">
                    <Button type="button" variant="secondary" onClick={closePanel}>
                        <FormattedMessage id="uttaksplan.avbryt" />
                    </Button>
                    <Button>
                        <FormattedMessage id="uttaksplan.gåVidere" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
