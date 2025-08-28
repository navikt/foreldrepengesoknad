import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Heading, Radio } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
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
    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));

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
        <>
            <Heading size="medium">Hvilken periode vil du endre?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
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
                    {perioder.map((p) => {
                        return (
                            <Radio key={p.id} value={p.id}>
                                {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ${getStønadskontoNavn(intl, p.kontoType!, navnPåForeldre, erFarEllerMedmor)}`}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '1rem 0',
                    }}
                >
                    <div>
                        <Button type="button" variant="secondary" onClick={closePanel}>
                            <FormattedMessage id="uttaksplan.avbryt" />
                        </Button>
                    </div>
                    <div>
                        <Button>
                            <FormattedMessage id="uttaksplan.gåVidere" />
                        </Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
