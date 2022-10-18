import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { formaterNavnPåFlereBarn } from 'app/utils/personUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { BarnType } from 'app/context/types/Barn';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../../velkommenFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { guid } from 'nav-frontend-js-utils';

export interface SelectableBarn {
    id: string;
    key: string;
    type: BarnType;
    antallBarn: number;
    familiehendelsesdato: Date; //Hvis flere barn sett til eldste barnet
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    mellomnavn?: string[];
    etternavn?: string;
    fnr?: string[];
    saksnummer?: string;
    kanSøkeOmEndring?: boolean;
}

interface Props {
    selectableBarn: SelectableBarn[];
    visibility: QuestionVisibility<VelkommenFormField>;
    formValues: VelkommenFormData;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const getUfødtBarnCheckbox = (barn: SelectableBarn, gjelderAnnetBarnErTrue: boolean): any => {
    let labelTekst;
    const terminTekst = formatDate(barn.familiehendelsesdato);
    if (barn.antallBarn === 1) {
        labelTekst = `Barn med termindato ${terminTekst}`;
    } else if (barn.antallBarn === 2) {
        labelTekst = `Tvillinger med termindato ${terminTekst}`;
    } else {
        labelTekst = `Flerlinger med termindato ${terminTekst}`;
    }
    return {
        key: guid(),
        label: <b> {labelTekst}</b>,
        value: barn, //TODO: Hva skal brukes her? Det eneste barna vil ha til felles er det? Eller heller lage id på alle barna?
        subtext: barn.saksnummer ? `Saksnummer: ${barn.saksnummer}` : '',
        autoComplete: 'off',
        disabled: gjelderAnnetBarnErTrue,
    };
};

const getFødtAdoptertBarnCheckbox = (barn: SelectableBarn, gjelderAnnetBarnErTrue: boolean): any => {
    const navnTekst = formaterNavnPåFlereBarn(barn.fornavn!, barn.etternavn!, barn.antallBarn);
    const fødtDatoTekst = formatDate(barn.familiehendelsesdato);
    const situasjonTekst = barn.type === BarnType.FØDT ? 'Født: ' : 'Omsorgsovertagelse: ';
    const saksnummerTekst = barn.saksnummer ? `Saksnummer: ${barn.saksnummer}` : '';
    return {
        key: guid(),
        label: <b> {navnTekst}</b>,
        value: barn, //TODO: Hva skal brukes her? Det eneste barna vil ha til felles er det?
        subtext: (
            <React.Fragment>
                <p>
                    {situasjonTekst} {fødtDatoTekst}
                </p>
                <p>{saksnummerTekst}</p>
            </React.Fragment>
        ),
        autoComplete: 'off',
        disabled: gjelderAnnetBarnErTrue,
    };
};

const getCheckboxForBarn = (barn: SelectableBarn, gjelderAnnetBarnErTrue: boolean): any => {
    const barnType = barn.type;
    switch (barnType) {
        case BarnType.FØDT:
        case BarnType.ADOPTERT_ANNET_BARN:
        case BarnType.ADOPTERT_STEBARN:
            return getFødtAdoptertBarnCheckbox(barn, gjelderAnnetBarnErTrue);
        case BarnType.UFØDT:
            return getUfødtBarnCheckbox(barn, gjelderAnnetBarnErTrue);
        default:
            return undefined;
    }
};

const BarnVelger: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();

    return (
        <Block>
            <Block padBottom="l" visible={props.visibility.isVisible(VelkommenFormField.valgteBarn)}>
                {/* <VelkommenFormComponents.CheckboxPanelGroup */}
                <VelkommenFormComponents.RadioPanelGroup
                    name={VelkommenFormField.valgteBarn}
                    legend={intlUtils(intl, 'omBarnet.barnRegistrert')}
                    radios={props.selectableBarn.map((barnet) =>
                        getCheckboxForBarn(barnet, props.formValues.gjelderAnnetBarn)
                    )}
                    description={intlUtils(intl, 'velkommen.intro.harSak.del2')}
                />
            </Block>
            <Block padBottom="l" visible={props.visibility.isVisible(VelkommenFormField.gjelderAnnetBarn)}>
                <VelkommenFormComponents.Checkbox
                    name={VelkommenFormField.gjelderAnnetBarn}
                    label={intlUtils(intl, 'omBarnet.gjelderAnnetBarn')}
                    onClick={() => {
                        if (!props.formValues.gjelderAnnetBarn) {
                            props.setFieldValue(VelkommenFormField.valgteBarn, []);
                        }
                    }}
                />
            </Block>
        </Block>
    );
};

export default BarnVelger;
