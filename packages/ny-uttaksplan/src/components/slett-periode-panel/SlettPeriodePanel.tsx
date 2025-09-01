import { TrashIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';

const ARIA_LABEL_ID = 'slett-periode-panel-heading';

interface Props {
    closePanel: () => void | undefined;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    permisjonsperiode: Permisjonsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

interface FormValues {
    perioder: string[];
}

export const SlettPeriodePanel = ({
    closePanel,
    handleDeletePeriode,
    handleDeletePerioder,
    permisjonsperiode,
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();
    const { perioder } = permisjonsperiode;

    const formMethods = useForm<FormValues>({
        defaultValues: {
            perioder: [],
        },
    });

    const onSubmit = (values: FormValues) => {
        if (values.perioder.length === 1) {
            const periode = perioder.find((p) => p.id === values.perioder[0]);

            if (periode) {
                handleDeletePeriode(periode);
            }
        } else {
            const slettedePerioder: Planperiode[] = [];

            values.perioder?.map((id) => {
                const periode = perioder.find((p) => p.id === id);

                if (periode) {
                    slettedePerioder.push(periode);
                }
            });

            handleDeletePerioder(slettedePerioder);
        }
        closePanel();
    };

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="slett-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <TrashIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.slettPeriode.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                        </Heading>
                        <RhfCheckboxGroup
                            name="perioder"
                            control={formMethods.control}
                            validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                            label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
                        >
                            {perioder.map((p, index) => {
                                return (
                                    <Checkbox key={p.id} name={p.id} value={p.id} autoFocus={index === 0}>
                                        {`${formatDate(p.fom)} - ${formatDate(p.tom)} -
                                        ${getStønadskontoNavn(intl, p.kontoType!, navnPåForeldre, erFarEllerMedmor)}`}
                                    </Checkbox>
                                );
                            })}
                        </RhfCheckboxGroup>
                        <HStack justify="space-between">
                            <Button type="button" variant="secondary" onClick={closePanel}>
                                <FormattedMessage id="uttaksplan.avbryt" />
                            </Button>
                            <Button>
                                <FormattedMessage id="uttaksplan.slettValgte" />
                            </Button>
                        </HStack>
                    </VStack>
                </RhfForm>
            </div>
        </div>
    );
};
