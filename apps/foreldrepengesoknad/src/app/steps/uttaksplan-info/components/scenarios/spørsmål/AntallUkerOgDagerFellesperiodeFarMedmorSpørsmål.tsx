import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { Label, ReadMore } from '@navikt/ds-react';
import { getNumberFromNumberInputValue, TypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import RangeIcon from '../../fordelingFellesperiode/range-input/RangeIcon';
import Sirkelknapp from '../../fordelingFellesperiode/range-input/sirkelknapp/Sirkelknapp';

import './antallUkerOgDagerFellesperiodeFarMedmorSpørsmål.less';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    ukerFieldName: string;
    dagerFieldName: string;
    antallUker: string;
    antallDager: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    ukerMedFellesperiode: number;
}

const getNumberFromStringInput = (input: string): number | undefined => {
    return input === undefined || input.trim().length === 0 ? 0 : getNumberFromNumberInputValue(input);
};

const leggTil = (currentAntall: string, max: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number + 1 > max) {
        return max.toString();
    }

    return (number + 1).toString();
};

const trekkFra = (currentAntall: string, min: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || number === 0 || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number - 1 < min) {
        return min.toString();
    }

    return (number - 1).toString();
};

const AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål: FunctionComponent<Props> = ({
    FormComponents,
    ukerFieldName,
    dagerFieldName,
    antallDager,
    antallUker,
    setFieldValue,
    ukerMedFellesperiode,
}) => {
    const bem = bemUtils('antallUkerOgDagerFellesperiodeFarMedmorSpørsmål');
    const intl = useIntl();

    return (
        <>
            <legend>
                <Label>
                    <FormattedMessage id="uttaksplaninfo.fellesperiode.tittel" />
                </Label>
            </legend>
            <div className={bem.block}>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall uker med en uke"
                            ikon={<RangeIcon type="minus" />}
                            disabled={
                                antallUker === undefined ||
                                parseInt(antallUker, 10) === 0 ||
                                antallUker.trim().length === 0
                                    ? true
                                    : false
                            }
                            onClick={() => setFieldValue(ukerFieldName, trekkFra(antallUker, 0))}
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={ukerFieldName}
                        label={intlUtils(intl, 'uker.fellesperiode')}
                        width="xs"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall uker med en uke"
                            ikon={<RangeIcon type="plus" />}
                            disabled={parseInt(antallUker, 10) >= ukerMedFellesperiode ? true : false}
                            onClick={() => setFieldValue(ukerFieldName, leggTil(antallUker, ukerMedFellesperiode))}
                        />
                    </div>
                </div>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall dager med en dag"
                            ikon={<RangeIcon type="minus" />}
                            onClick={() => setFieldValue(dagerFieldName, trekkFra(antallDager, 0))}
                            disabled={
                                antallDager === undefined ||
                                parseInt(antallDager, 10) === 0 ||
                                antallDager.trim().length === 0
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={dagerFieldName}
                        label={intlUtils(intl, 'dager.fellesperiode')}
                        width="xs"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall dager med en dag"
                            ikon={<RangeIcon type="plus" />}
                            onClick={() => setFieldValue(dagerFieldName, leggTil(antallDager, 4))}
                            disabled={parseInt(antallDager, 10) === 4 ? true : false}
                        />
                    </div>
                </div>
            </div>
            <Block margin="m">
                <ReadMore header={intlUtils(intl, 'uttaksplaninfo.fellesperiode.apneLabel')}>
                    <FormattedMessage id="uttaksplaninfo.fellesperiode.lesMerInfo" />
                </ReadMore>
            </Block>
        </>
    );
};

export default AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål;
