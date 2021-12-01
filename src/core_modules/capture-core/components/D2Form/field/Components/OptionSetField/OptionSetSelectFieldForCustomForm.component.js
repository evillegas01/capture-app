// @flow
import {
    VirtualizedSelectField,
    withSelectTranslations,
    withGotoInterface,
    withHideCompatibility,
    withDefaultShouldUpdateInterface,
    withFocusSaver,
    withCalculateMessages,
    withDisplayMessages,
} from '../../../../FormFields/New';
import {
    withRequiredFieldCalculation,
    withDisabledFieldCalculation,
    withCustomElementContainer,
} from '../internal';
import customFormStyles from './optionSetSelectFieldForCustomForm.module.css';
import { withOptionsIconElement } from './withOptionsIconElement';
import { withRulesOptionVisibilityHandler } from './withRulesOptionVisibilityHandler';

const getContainerClass = () => customFormStyles.defaultCustomContainer;

export const OptionSetSelectFieldForCustomForm = withGotoInterface()(
    withHideCompatibility()(
        withDefaultShouldUpdateInterface()(
            withDisabledFieldCalculation()(
                withRequiredFieldCalculation()(
                    withFocusSaver()(
                        withCalculateMessages()(
                            withDisplayMessages()(
                                withSelectTranslations()(
                                    withCustomElementContainer(getContainerClass)(
                                        withOptionsIconElement()(
                                            withRulesOptionVisibilityHandler()(
                                                VirtualizedSelectField,
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
);
