import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { formaterNavnPåFlereBarn } from 'app/utils/personUtils';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { BarnType } from 'app/context/types/Barn';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../../velkommenFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import './barnVelger.less';
import SøknadStatusEtikett from '../SøknadStatus';
import { erSakFerdigbehandlet } from 'app/utils/sakerUtils';
import Sak from 'app/types/Sak';

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
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
}

interface Props {
    selectableBarn: SelectableBarn[];
    visibility: QuestionVisibility<VelkommenFormField>;
    formValues: VelkommenFormData;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const getRadioForNyttBarn = (intl: IntlShape): any => {
    return {
        label: (
            <React.Fragment>
                <b> {intlUtils(intl, 'omBarnet.gjelderAnnetBarn')}</b>
            </React.Fragment>
        ),
        value: '0',
        className: 'radioGroupButton',
    };
};

const getSakstatus = (sakErFerdigbehandlet: boolean) => {
    return <SøknadStatusEtikett sakErFerdigbehandlet={sakErFerdigbehandlet}></SøknadStatusEtikett>;
};

const getRadioForUfødtBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    let labelTekst;
    const sakErFerdigbehandlet = erSakFerdigbehandlet(barn.sak);
    const saksStatus = barn.sak !== undefined ? getSakstatus(sakErFerdigbehandlet) : undefined;
    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const harSak = barn.sak !== undefined;
    if (barn.antallBarn === 1) {
        labelTekst = intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.ettBarn', {
            termin: formatDate(barn.familiehendelsesdato),
        });
    } else if (barn.antallBarn === 2) {
        labelTekst = intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.tvillinger', {
            termin: formatDate(barn.familiehendelsesdato),
        });
    } else {
        labelTekst = intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.flerlinger', {
            termin: formatDate(barn.familiehendelsesdato),
        });
    }
    return {
        label: (
            <React.Fragment>
                <b> {labelTekst}</b>
                {harSak && (
                    <div>
                        <p>{saksnummerTekst}</p>
                        {saksStatus}
                    </div>
                )}
            </React.Fragment>
        ),
        value: barn.id,
        className: 'radioGroupButton',
    };
};

const getRadioForFødtEllerAdoptertBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const navnTekst = formaterNavnPåFlereBarn(barn.fornavn!, barn.etternavn!, barn.antallBarn);
    const fødtDatoTekst = formatDate(barn.familiehendelsesdato);
    const situasjonTekst =
        barn.type === BarnType.FØDT
            ? intlUtils(intl, 'velkommen.barnVelger.født')
            : intlUtils(intl, 'velkommen.barnVelger.adopsjon');
    const sakErFerdigbehandlet = erSakFerdigbehandlet(barn.sak);
    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const saksStatus = barn.sak !== undefined ? getSakstatus(sakErFerdigbehandlet) : undefined;
    return {
        label: (
            <React.Fragment>
                <b>{navnTekst}</b>
                <p>
                    {situasjonTekst} {fødtDatoTekst}
                </p>
                <p>{saksnummerTekst}</p>
                {saksStatus !== undefined && saksStatus}
            </React.Fragment>
        ),
        value: barn.id,
        name: VelkommenFormField.valgteBarn,
        className: 'radioGroupButton',
    };
};

const getCheckboxForBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const barnType = barn.type;
    switch (barnType) {
        case BarnType.FØDT:
        case BarnType.ADOPTERT_ANNET_BARN:
        case BarnType.ADOPTERT_STEBARN:
            return getRadioForFødtEllerAdoptertBarn(barn, intl);
        case BarnType.UFØDT:
            return getRadioForUfødtBarn(barn, intl);
        default:
            return undefined;
    }
};

const BarnVelger: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();

    return (
        <Block>
            <Block padBottom="l" visible={props.visibility.isVisible(VelkommenFormField.valgteBarn)}>
                <VelkommenFormComponents.RadioGroup
                    name={VelkommenFormField.valgteBarn}
                    radios={props.selectableBarn
                        .map((barnet) => getCheckboxForBarn(barnet, intl))
                        .concat([getRadioForNyttBarn(intl)])}
                    description={intlUtils(intl, 'velkommen.intro.harSaker.barnVelger.info')}
                />
            </Block>
        </Block>
    );
};

export default BarnVelger;
