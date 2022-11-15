import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { formateFødselsdatoerPåFlereBarn, formaterNavnPåFlereBarn } from 'app/utils/personUtils';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../../velkommenFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import './barnVelger.less';
import SøknadStatusEtikett from '../SøknadStatus';
import { erSakFerdigbehandlet } from 'app/utils/sakerUtils';
import Sak from 'app/types/Sak';
import { Normaltekst } from 'nav-frontend-typografi';
import { AnnenPartV2 } from 'app/types/AnnenPart';

export enum SelectableBarnType {
    FØDT = 'født',
    UFØDT = 'ufødt',
    ADOPTERT = 'adoptert',
    IKKE_UTFYLT = 'ikkeUtfylt',
}

export enum SelectableBarnOptions {
    SØKNAD_GJELDER_NYTT_BARN = 'søknad_gjeder_nytt_barn',
}

export interface SelectableBarn {
    id: string;
    fnr: string[];
    type: SelectableBarnType;
    antallBarn: number;
    sortableDato: Date;
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    etternavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
    annenForelder?: AnnenPartV2;
    familiehendelsesdato?: Date;
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
        value: SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN,
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
            termin: formatDate(barn.termindato!),
        });
    } else if (barn.antallBarn === 2) {
        labelTekst = intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.tvillinger', {
            termin: formatDate(barn.termindato!),
        });
    } else {
        labelTekst = intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.flerlinger', {
            termin: formatDate(barn.termindato!),
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
    const fødselsdatoerTekst = formateFødselsdatoerPåFlereBarn(barn.fødselsdatoer);
    const fødtAdoptertDatoTekst =
        barn.type === SelectableBarnType.FØDT || SelectableBarnType.IKKE_UTFYLT
            ? fødselsdatoerTekst
            : formatDate(barn.omsorgsovertagelse!);
    const situasjonTekst =
        barn.type === SelectableBarnType.FØDT || SelectableBarnType.IKKE_UTFYLT
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
                    {situasjonTekst} {fødtAdoptertDatoTekst}
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
        case SelectableBarnType.FØDT:
        case SelectableBarnType.ADOPTERT:
        case SelectableBarnType.IKKE_UTFYLT:
            return getRadioForFødtEllerAdoptertBarn(barn, intl);
        case SelectableBarnType.UFØDT:
            return getRadioForUfødtBarn(barn, intl);
        default:
            return undefined;
    }
};

const BarnVelger: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();

    return (
        <Block visible={props.visibility.isVisible(VelkommenFormField.valgteBarn)}>
            <Block padBottom="l">
                <Normaltekst>{intlUtils(intl, 'velkommen.intro.harSaker.barnVelger.info')}</Normaltekst>
            </Block>
            <Block padBottom="l">
                <VelkommenFormComponents.RadioGroup
                    name={VelkommenFormField.valgteBarn}
                    radios={props.selectableBarn
                        .map((barnet) => getCheckboxForBarn(barnet, intl))
                        .concat([getRadioForNyttBarn(intl)])}
                />
            </Block>
        </Block>
    );
};

export default BarnVelger;
