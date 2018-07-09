import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Spørsmål, { SpørsmålProps } from '../Spørsmål';

const renderSpørsmål = (props: SpørsmålProps): ShallowWrapper =>
    shallow(<Spørsmål {...props} />);

describe('Spørsmål component', () => {
    let shallowSpørsmål: ShallowWrapper;
    const children: JSX.Element = <p>Test Content</p>;

    it('should be defined', () => {
        expect(Spørsmål).toBeDefined();
    });

    describe('defaults', () => {
        beforeEach(() => {
            shallowSpørsmål = renderSpørsmål({ render: () => children });
        });

        it('should render spørsmål-content specified by render-prop', () => {
            const spørsmål = shallowSpørsmål.find('.sporsmal');
            expect(spørsmål.exists()).toBe(true);
            expect(spørsmål.contains(children)).toBe(true);
        });

        it('should render spørsmål with collapse- and expand-functionality', () => {
            const spørsmål = shallowSpørsmål.find('.sporsmal');
            expect(spørsmål.exists()).toBe(true);
        });
    });

    describe('synlig=false', () => {
        beforeEach(() => {
            shallowSpørsmål = renderSpørsmål({
                render: () => children,
                synlig: false
            });
        });

        it('should not render content when synlig=false', () => {
            const collapse = shallowSpørsmål.find('.sporsmal__collapse');
            expect(collapse.exists()).toBe(true);
            expect(shallowSpørsmål.find('.sporsmal').exists()).toBe(false);
        });
    });

    describe('animert=false', () => {
        beforeEach(() => {
            shallowSpørsmål = renderSpørsmål({
                render: () => children,
                animert: false
            });
        });

        it('should not render spørsmål with collapse- or expand-functionality', () => {
            const collapse = shallowSpørsmål.find('.sporsmal__collapse');
            expect(collapse.exists()).toBe(false);
            expect(shallowSpørsmål.find('.sporsmal').exists()).toBe(true);
        });
    });
});
