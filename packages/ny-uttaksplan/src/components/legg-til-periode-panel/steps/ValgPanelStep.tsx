import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { PanelData } from '../LeggTilPeriodePanel';

interface Props {
    panelData: PanelData;
    setPanelData: (data: PanelData) => void;
    closePanel: () => void;
}

export enum HvaVilDuGjøre {
    LEGG_TIL_PERIODE = 'leggTilPeriode',
    LEGG_TIL_OPPHOLD = 'leggTilOpphold',
}

interface FormValues {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
}

export const ValgPanelStep = ({ panelData, setPanelData, closePanel }: Props) => {
    const intl = useIntl();

    const formMethods = useForm<FormValues>({
        defaultValues: {
            hvaVilDuGjøre: panelData.hvaVilDuGjøre,
        },
    });

    const onSubmit = (values: FormValues) => {
        setPanelData({
            ...panelData,
            hvaVilDuGjøre: values.hvaVilDuGjøre,
            currentStep: 'step2',
        });
    };

    return (
        <div className="p-4">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.valgModal.tittel" />
            </Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="space-16">
                    <RhfRadioGroup
                        name="hvaVilDuGjøre"
                        control={formMethods.control}
                        validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
                    >
                        <Radio value={HvaVilDuGjøre.LEGG_TIL_PERIODE}>
                            <FormattedMessage id="uttaksplan.valgModal.leggTilPeriode" />
                        </Radio>
                        <Radio value={HvaVilDuGjøre.LEGG_TIL_OPPHOLD}>
                            <FormattedMessage id="uttaksplan.valgModal.leggTilFerieEllerOpphold" />
                        </Radio>
                    </RhfRadioGroup>
                    <ModalButtons onCancel={closePanel} isFinalStep={false} />
                </VStack>
            </RhfForm>
        </div>
    );
};
