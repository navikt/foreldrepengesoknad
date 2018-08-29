import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Block, { BlockProps } from 'common/components/block/Block';

const renderBlock = (props: BlockProps): ShallowWrapper => shallow(<Block {...props} />);

describe('Block component', () => {
    let shallowBlock: ShallowWrapper;
    const children: JSX.Element = <p>Test Content</p>;

    it('should be defined', () => {
        expect(Block).toBeDefined();
    });

    describe('defaults', () => {
        beforeEach(() => {
            shallowBlock = renderBlock({ children });
        });

        it('should render block-content specified by render-prop', () => {
            const block = shallowBlock.find('.block');
            expect(block.exists()).toBe(true);
            expect(block.contains(children)).toBe(true);
        });

        it('should render block with collapse- and expand-functionality', () => {
            const block = shallowBlock.find('.block');
            expect(block.exists()).toBe(true);
        });
    });

    describe('visible=false', () => {
        beforeEach(() => {
            shallowBlock = renderBlock({
                children,
                visible: false,
                animated: false
            });
        });

        it('should not render content when visible=false && animated === false', () => {
            const collapse = shallowBlock.find('.block__collapse');
            expect(collapse.exists()).toBe(false);
        });
    });

    describe('animert=false', () => {
        beforeEach(() => {
            shallowBlock = renderBlock({
                children,
                animated: false
            });
        });

        it('should not render block with collapse- or expand-functionality', () => {
            const collapse = shallowBlock.find('.block__collapse');
            expect(collapse.exists()).toBe(false);
            expect(shallowBlock.find('.block').exists()).toBe(true);
        });
    });
});
