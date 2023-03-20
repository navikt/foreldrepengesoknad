import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import BEMHelper from 'common/util/bem';
import moment from 'moment';

import { FetchStatus } from 'app/types/FetchState';
import { CustomFormikProps } from 'app/types/Formik';
import { mergeSøknadsgrunnlagIntoTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { State } from 'app/redux/store';
import ArbeidsforholdType from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import VelgSøknadsgrunnlag from 'app/formik/wrappers/VelgSøknadsgrunnlag';
import Arbeidsforholdseksjon from './ArbeidSeksjon/ArbeidSeksjon';
import SelvstendigNæringsdrivende from './SelvstendigNæringsdrivende/SelvstendigNæringsdrivende';
import AndreInntekter from './AndreInntekter/AndreInntekter';
import FrilansSpørsmål from './Frilans/FrilansSpørsmål';

import FormikStep from 'app/components/formik-step/FormikStep';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { StepProps } from 'app/components/step/Step';
import { getSøknadStepPath } from 'app/utils/stepUtils';

import SelvstendigListElement from './SelvstendigNæringsdrivende/SelvstendigListElement';
import AndreInntekterListElement from './AndreInntekter/AnnenInntektListElement';
import { cleanupSøker } from './utils/cleanup';
import { mapArbeidsforholdToSøknadsgrunnlagOptions } from './utils/søknadsgrunnlagMapper';
import Søker from 'app/types/Søker';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import { Arbeidsforholdstype, UferdigTilrettelegging } from 'app/types/Tilrettelegging';
import { AnnenInntektType } from '../../types/AnnenInntekt';

import './arbeidsforhold.less';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import InfoTilFiskere from 'app/components/info-til-fiskere/InfoTilFiskere';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { BodyShort, Link } from '@navikt/ds-react';

const cls = BEMHelper('arbeidsforhold');

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

interface ConnectProps {
    arbeidsforhold: ArbeidsforholdType[];
}

type Props = OwnProps & StepProps & ConnectProps;

const Arbeidsforhold: FunctionComponent<Props> = (props: Props) => {
    const { step, formikProps, arbeidsforhold } = props;
    const { values, setFieldValue } = formikProps;
    const { søker, søknadsgrunnlag, barn } = values;
    const intl = useIntl();

    const harValgtMinstEttGrunnlag: boolean = søknadsgrunnlag.length > 0;

    const {
        harJobbetSomFrilansSiste10Mnd,
        frilansInformasjon,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        selvstendigNæringsdrivendeInformasjon,
        harHattAnnenInntektSiste10Mnd,
        andreInntekterSiste10Mnd = [],
    } = cleanupSøker(søker);

    const søknadsgrunnlagOptions = mapArbeidsforholdToSøknadsgrunnlagOptions(
        cleanupSøker(values.søker) as Søker,
        arbeidsforhold,
        barn.termindato!
    );

    const harLagtTilFørstegangstjeneste = søker.andreInntekterSiste10Mnd
        ? søker.andreInntekterSiste10Mnd.some((i) => i.type === AnnenInntektType.MILITÆRTJENESTE)
        : false;

    const visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon =
        harJobbetSomFrilansSiste10Mnd === false ||
        (frilansInformasjon !== undefined &&
            (frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd === false ||
                (frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd === true &&
                    frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd !== undefined &&
                    frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd.length > 0)) &&
            frilansInformasjon.driverFosterhjem !== undefined);

    const visharHattAnnenInntektSiste10MndSeksjon =
        (visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon &&
            ((selvstendigNæringsdrivendeInformasjon && selvstendigNæringsdrivendeInformasjon.length) || 0) > 0) ||
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false ||
        harHattAnnenInntektSiste10Mnd !== undefined;

    const visSøknadsgrunnlagValg =
        visharHattAnnenInntektSiste10MndSeksjon &&
        ((harHattAnnenInntektSiste10Mnd === true && andreInntekterSiste10Mnd.length! > 0) ||
            harHattAnnenInntektSiste10Mnd === false) &&
        søknadsgrunnlagOptions.length > 0;

    const visIngenArbeidsforholdVeileder =
        arbeidsforhold.length === 0 &&
        harJobbetSomFrilansSiste10Mnd === false &&
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false &&
        harHattAnnenInntektSiste10Mnd === false;

    const skalViseVeilederinfo = values.søknadsgrunnlag.some(
        (s: Søknadsgrunnlag) => s.type === Arbeidsforholdstype.VIRKSOMHET
    );

    let tilrettelegging = mergeSøknadsgrunnlagIntoTilrettelegging(values.søknadsgrunnlag, values.tilrettelegging);
    const prepareTilrettelegging = () => {
        if (frilansInformasjon === undefined) {
            tilrettelegging = tilrettelegging.filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Fiks
                (til: UferdigTilrettelegging) => til.arbeidsforhold.type !== Arbeidsforholdstype.FRILANSER
            );
        }

        if (selvstendigNæringsdrivendeInformasjon === undefined) {
            tilrettelegging = tilrettelegging.filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Fiks
                (til: UferdigTilrettelegging) => til.arbeidsforhold.type !== Arbeidsforholdstype.SELVSTENDIG
            );
        }

        setFieldValue('tilrettelegging', tilrettelegging);
    };

    const cleanupArbeidsforhold = () => {
        setFieldValue('søker', cleanupSøker(søker));
    };

    const navigateTo = useNavigate();

    const navigate = () => {
        cleanupArbeidsforhold();
        prepareTilrettelegging();
        const pathToFirstTilrettelegging = getSøknadStepPath(StepID.TILRETTELEGGING, tilrettelegging[0].id);
        navigateTo(pathToFirstTilrettelegging);
    };

    return (
        <Applikasjonsside visTittel={true}>
            <FormikStep
                step={step}
                className={cls.block}
                formikProps={formikProps}
                showNesteknapp={harValgtMinstEttGrunnlag}
                onValidFormSubmit={navigate}
            >
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.label'),
                    }}
                >
                    <BodyShort>{getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.text')}</BodyShort>
                </Block>

                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.label'),
                        info: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.infotekst'),
                    }}
                >
                    <InformasjonOmArbeidsforholdWrapper
                        arbeidsforhold={getAktiveArbeidsforhold(
                            arbeidsforhold,
                            dayjs(formikProps.values.barn.termindato).toDate()
                        )}
                    />
                </Block>

                <Block margin="xs">
                    <InfoTilFiskere />
                </Block>

                <FrilansSpørsmål formikProps={formikProps} />

                <Block visible={visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon} margin="xs">
                    <Arbeidsforholdseksjon
                        name="søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
                        listName="søker.selvstendigNæringsdrivendeInformasjon"
                        legend={getMessage(intl, 'arbeidsforhold.selvstendig.erSelvstendigNæringsdrivende')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        infoboksTekst={
                            <FormattedMessage
                                id="arbeidsforhold.selvstendig.infoboxTekst"
                                values={{
                                    a: (msg: any) => (
                                        <a
                                            className="lenke"
                                            rel="noopener noreferrer"
                                            href="https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/er-jeg-naringsdrivende/"
                                        >
                                            {msg}
                                        </a>
                                    ),
                                }}
                            />
                        }
                        summaryListTitle={{ title: getMessage(intl, 'arbeidsforhold.selvstendig.listetittel') }}
                        summaryListElementComponent={SelvstendigListElement}
                        renderForm={(formProps: any) => <SelvstendigNæringsdrivende {...formProps} />}
                    />
                </Block>
                <Block visible={visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon} margin="xs">
                    <Link
                        target="_blank"
                        href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/er-jeg-selvstendig-naeringsdrivende-frilanser-eller-arbeidstaker"
                    >
                        <FormattedMessage id="arbeidsforhold.erJegNæringsdrivendeFrilansEllerArbeidstaker" />
                    </Link>
                </Block>

                <Block visible={visharHattAnnenInntektSiste10MndSeksjon}>
                    <Arbeidsforholdseksjon
                        name="søker.harHattAnnenInntektSiste10Mnd"
                        listName="søker.andreInntekterSiste10Mnd"
                        legend={getMessage(intl, 'arbeidsforhold.andreInntekter')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        infoboksTekst={<AnnenInntektSiste10MndHjelpeTekst />}
                        summaryListTitle={{ title: getMessage(intl, 'arbeidsforhold.andreInntekter.listetittel') }}
                        summaryListElementComponent={AndreInntekterListElement}
                        renderForm={(formProps: any) => (
                            <AndreInntekter {...formProps} skjulFørstegangstjeneste={harLagtTilFørstegangstjeneste} />
                        )}
                    />
                </Block>

                <Block visible={visSøknadsgrunnlagValg} margin="l">
                    <VelgSøknadsgrunnlag
                        name="søknadsgrunnlag"
                        label={getMessage(intl, 'arbeidsforhold.grunnlag.label')}
                        options={søknadsgrunnlagOptions}
                    />
                </Block>

                <Block visible={skalViseVeilederinfo} margin="s">
                    <Veilederinfo type="info" stil="kompakt">
                        {getMessage(intl, 'arbeidsforhold.veileder.inntektsmelding', {
                            // TODO: Hva er riktig dato her?
                            datoTidligst: moment().format('DD.MM.YYYY'),
                        })}
                    </Veilederinfo>
                </Block>

                <Block visible={visIngenArbeidsforholdVeileder}>
                    <Veilederinfo type="advarsel">
                        <FormattedMessage
                            id="arbeidsforhold.veileder.ingenArbeidsforhold"
                            values={{
                                b: (msg: any) => <b>{msg}</b>,
                                a: (msg: any) => (
                                    <a
                                        className="lenke"
                                        rel="noopener noreferrer"
                                        href="https://familie.nav.no/om-svangerskapspenger"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                        <FormattedMessage
                            id="arbeidsforhold.veileder.ingenArbeidsforhold.forsettelse"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        className="lenke"
                                        rel="noopener noreferrer"
                                        href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/chat-med-oss-om-foreldrepenger"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </Veilederinfo>
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const { søkerinfo } = state.api;

    return {
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : [],
    };
};

export default connect(mapStateToProps)(Arbeidsforhold);

const AnnenInntektSiste10MndHjelpeTekst = () => {
    const intl = useIntl();
    return (
        <div>
            <div>{getMessage(intl, 'annenInntekt.infoboksTekst.overskrift')}</div>
            <ul>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktEn')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTo')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTre')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFire')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFem')}</li>
            </ul>
        </div>
    );
};
