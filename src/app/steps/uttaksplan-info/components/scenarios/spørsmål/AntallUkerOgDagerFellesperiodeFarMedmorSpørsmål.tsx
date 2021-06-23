import { bemUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { getNumberFromNumberInputValue, TypedFormComponents } from '@navikt/sif-common-formik/lib';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
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
}

const getAntallUker = (currentAntall: string, max: number): string => {
    const number = getNumberFromNumberInputValue(currentAntall);

    if (!number || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number + 1 > max) {
        return max.toString();
    }

    return (number + 1).toString();
};

const AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål: FunctionComponent<Props> = ({
    FormComponents,
    ukerFieldName,
    dagerFieldName,
    antallDager,
    antallUker,
    setFieldValue,
}) => {
    const bem = bemUtils('antallUkerOgDagerFellesperiodeFarMedmorSpørsmål');

    return (
        <SkjemaGruppe
            legend={<Element>Hvor mye fellesperiode skal du ha?</Element>}
            description={
                <UtvidetInformasjon apneLabel="Les mer om fellesperioden">
                    Fellesperioden er ukene med foreldrepenger som dere kan dele.
                </UtvidetInformasjon>
            }
        >
            <div className={bem.block}>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall uker med en uke"
                            ikon={<RangeIcon type="minus" />}
                            disabled={parseInt(antallUker, 10) === 0 ? true : false}
                            onClick={() => setFieldValue(ukerFieldName, getAntallUker(antallUker, 16))}
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={ukerFieldName}
                        label="Uker"
                        bredde="XS"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall uker med en uke"
                            ikon={<RangeIcon type="plus" />}
                            onClick={() => null}
                        />
                    </div>
                </div>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall dager med en dag"
                            ikon={<RangeIcon type="minus" />}
                            onClick={() => null}
                            disabled={parseInt(antallDager, 10) === 0 ? true : false}
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={dagerFieldName}
                        label="Dager"
                        bredde="XS"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall dager med en dag"
                            ikon={<RangeIcon type="plus" />}
                            onClick={() => null}
                        />
                    </div>
                </div>
            </div>
        </SkjemaGruppe>
    );
};

export default AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål;
