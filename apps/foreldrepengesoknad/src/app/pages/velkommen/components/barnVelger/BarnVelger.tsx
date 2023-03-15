import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../../velkommenFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import SøknadStatusEtikett from '../SøknadStatus';
import { Normaltekst } from 'nav-frontend-typografi';
import { validateHarValgtEtBarn } from '../../validation/velkommenValidation';
import './barnVelger.less';
import { formaterFødselsdatoerPåBarn, formaterNavnPåFlereBarn as formaterNavnPåBarn } from 'app/utils/barnUtils';
import { Sak } from 'app/types/Sak';
import { RegistrertAnnenForelder } from 'app/types/Person';

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
    type: SelectableBarnType;
    antallBarn: number;
    sortableDato: Date;
    fnr?: string[];
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    etternavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
    annenForelder?: RegistrertAnnenForelder;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
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
            <>
                <b> {intlUtils(intl, 'omBarnet.gjelderAnnetBarn')}</b>
            </>
        ),
        value: SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN,
        className: 'radioGroupButton',
    };
};

const getSakstatus = (sakErFerdigbehandlet: boolean) => {
    return <SøknadStatusEtikett sakErFerdigbehandlet={sakErFerdigbehandlet}></SøknadStatusEtikett>;
};

const getTittelForUfødtBarn = (antallBarn: number, termindato: Date, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.ettBarn', {
            termin: formatDate(termindato),
        });
    } else if (antallBarn === 2) {
        return intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.tvillinger', {
            termin: formatDate(termindato),
        });
    } else if (antallBarn === 3) {
        return intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.trillinger', {
            termin: formatDate(termindato),
        });
    } else {
        return intlUtils(intl, 'velkommen.barnVelger.ufødtBarn.flerlinger', {
            termin: formatDate(termindato),
        });
    }
};

const getRadioForUfødtBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const tittel = getTittelForUfødtBarn(barn.antallBarn, barn.termindato!, intl);
    const saksStatus = barn.sak !== undefined ? getSakstatus(barn.sak.åpenBehandling === undefined) : undefined;
    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const harSak = barn.sak !== undefined;

    return {
        label: (
            <>
                <b> {tittel}</b>
                {harSak && (
                    <div>
                        <p>{saksnummerTekst}</p>
                        {saksStatus}
                    </div>
                )}
            </>
        ),
        value: barn.id,
        className: 'radioGroupButton',
    };
};

const getRadioForFødtEllerAdoptertBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const navnTekstEllerBarnMedUkjentNavnTekst = formaterNavnPåBarn(
        barn.fornavn,
        barn.etternavn,
        barn.fødselsdatoer,
        barn.omsorgsovertagelse,
        barn.alleBarnaLever,
        barn.antallBarn,
        intl
    );
    const fødselsdatoerTekst = formaterFødselsdatoerPåBarn(barn.fødselsdatoer);
    const fødtAdoptertDatoTekst =
        barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
            ? fødselsdatoerTekst
            : formatDate(barn.omsorgsovertagelse!);
    const situasjonTekst =
        barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
            ? intlUtils(intl, 'velkommen.barnVelger.født')
            : intlUtils(intl, 'velkommen.barnVelger.adopsjon');

    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const saksStatus = barn.sak !== undefined ? getSakstatus(barn.sak.åpenBehandling === undefined) : undefined;
    return {
        label: (
            <>
                <b>{navnTekstEllerBarnMedUkjentNavnTekst}</b>
                {barn.alleBarnaLever && (
                    <p>
                        {situasjonTekst} {fødtAdoptertDatoTekst}
                    </p>
                )}
                <p>{saksnummerTekst}</p>
                {saksStatus !== undefined && saksStatus}
            </>
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
                    validate={validateHarValgtEtBarn(intl)}
                    radios={props.selectableBarn
                        .map((barnet) => getCheckboxForBarn(barnet, intl))
                        .concat([getRadioForNyttBarn(intl)])}
                />
            </Block>
        </Block>
    );
};

export default BarnVelger;
