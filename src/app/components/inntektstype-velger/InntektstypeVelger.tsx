import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ValidSelect from 'common/lib/validation/ValidSelect';
import { Feil } from 'common/components/skjema-input-element/types';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import InjectedIntl = ReactIntl.InjectedIntl;
import getMessage from 'common/util/i18nUtils';

interface InntektstypeVelgerProps {
    defaultValue?: string;
    label: React.ReactNode;
    feil?: Feil;
    validators?: any;
    name?: string;
    onChange: (
        value: string,
        event?: React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

interface InntektstypeOptions {
    [key: string]: string;
}

const getOptions = (intl: InjectedIntl): InntektstypeOptions => ({
    [AnnenInntektType.JOBB_I_UTLANDET]: getMessage(
        intl,
        'inntektstype.jobbIUtlandet'
    ),
    [AnnenInntektType.MILITÆRTJENESTE]: getMessage(
        intl,
        'inntektstype.militæret'
    ),
    [AnnenInntektType.LØNN_VED_VIDEREUTDANNING]: getMessage(
        intl,
        'inntektstype.videreutdanning'
    ),
    [AnnenInntektType.VENTELØNN]: getMessage(intl, 'inntektstype.ventelønn'),
    [AnnenInntektType.SLUTTPAKKE]: getMessage(
        intl,
        'inntektstype.sluttvederlag'
    )
});

class InntektstypeVelger extends React.Component<
    InntektstypeVelgerProps & InjectedIntlProps
> {
    renderInntektstypeOptions() {
        return Object.entries(getOptions(this.props.intl)).map(
            (value: string[]) => {
                return (
                    <option key={value[0]} value={value[0]}>
                        {value[1]}
                    </option>
                );
            }
        );
    }

    render() {
        const { validators, onChange, ...restProps } = this.props;
        const SelectComponent =
            validators && validators.length > 0 ? ValidSelect : Select;
        return (
            <SelectComponent
                {...restProps}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onChange(e.target.value, e)
                }
                validators={validators}>
                <option value="" />
                {this.renderInntektstypeOptions()}
            </SelectComponent>
        );
    }
}

export default injectIntl(InntektstypeVelger);
