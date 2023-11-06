import { FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect as formConnect, FieldArray } from 'formik';
import get from 'lodash/get';

import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import List from 'common/components/list/List';
import OppholdListElement from './OppholdListElement';
import Oppholdsvalg from './Oppholdsvalg';
import { Button, Modal } from '@navikt/ds-react';

interface OwnProps {
    name: string;
    land: string;
    type: Oppholdstype;
    legend: string;
    infoboksTekst: string;
    labels: {
        ja: string;
        nei: string;
    };
}

type OuterProps = OwnProps;
type Props = OuterProps & FormikProps;

const Oppholdsspørsmål: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { formik, name, land, legend, labels, type, infoboksTekst } = props;
    const visLandvelger = get(formik.values, name) === false;

    const alleOpphold: Utenlandsopphold[] = get(formik.values, land);

    const [modalIsOpen, toggleModal] = useState(false);
    const [currentIndex, selectIndex] = useState(alleOpphold.length);
    const [endreLand, toggleEndring] = useState(false);

    const openModalForAdding = () => {
        toggleEndring(false);
        toggleModal(true);
    };

    const openModalForEditing = (index: number) => () => {
        selectIndex(index);
        toggleEndring(true);
        toggleModal(true);
    };

    const attributter = name.split('.');
    const verdi = (formik.values as any)[attributter[0]][attributter[1]];
    useEffect(() => {
        if (verdi === true) {
            formik.setFieldValue(land, []);
        }
    }, [verdi, formik, land]);

    return (
        <>
            <Block margin="xs">
                <JaNeiSpørsmål name={name} legend={legend} labels={labels} description={infoboksTekst} />
            </Block>
            <FieldArray
                name={land}
                render={({ push, replace, remove }) => {
                    return (
                        <>
                            <Block margin="xs" visible={alleOpphold.length > 0}>
                                <List
                                    data={alleOpphold}
                                    renderElement={(oppholdToRender: Utenlandsopphold, index: number) => (
                                        <OppholdListElement
                                            key={oppholdToRender.land + index}
                                            opphold={oppholdToRender}
                                            onEdit={openModalForEditing(index)}
                                            onDelete={() => {
                                                remove(index);
                                            }}
                                        />
                                    )}
                                />
                            </Block>
                            <Modal
                                closeButton={true}
                                open={modalIsOpen}
                                aria-label={getMessage(intl, `utenlandsopphold.modal.ariaLabel`)}
                                shouldCloseOnOverlayClick={false}
                                onClose={() => toggleModal(false)}
                            >
                                <Modal.Content>
                                    <Oppholdsvalg
                                        type={type}
                                        endre={endreLand}
                                        opphold={endreLand ? alleOpphold[currentIndex] : undefined}
                                        onCancel={() => toggleModal(false)}
                                        onAdd={(opphold: any) => {
                                            endreLand ? replace(currentIndex, opphold) : push(opphold);
                                            toggleModal(false);
                                        }}
                                    />
                                </Modal.Content>
                            </Modal>
                        </>
                    );
                }}
            />
            <Block visible={visLandvelger}>
                <Button variant="secondary" onClick={openModalForAdding} type="button">
                    <FormattedMessage id="utenlandsopphold.leggTilLand" />
                </Button>
            </Block>
        </>
    );
};

export default formConnect<OuterProps, UferdigSøknad>(Oppholdsspørsmål);
