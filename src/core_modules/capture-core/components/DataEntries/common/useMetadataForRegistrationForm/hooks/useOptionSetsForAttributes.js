// @flow
import { getOptionSets } from '../getFunctions/getOptionSets';
import { useIndexedDBQuery } from '../../../../../utils/reactQueryHelpers';
import type { TrackedEntityAttribute } from '../../../../WidgetProfile/DataEntry/FormFoundation/types';

type Props = {
    selectedScopeId: string,
    attributes: ?Array<TrackedEntityAttribute>,
};

export const useOptionSetsForAttributes = ({ attributes, selectedScopeId }: Props) => {
    const { data: cachedOptionSets } = useIndexedDBQuery(
        ['optionSets', selectedScopeId],
        () => getOptionSets(attributes
            ?.reduce((acc, attribute) => {
                if (attribute.optionSet) {
                    acc.push(attribute.optionSet.id);
                }
                return acc;
            }, []) ?? []),
        {
            enabled: !!attributes,
        });

    return {
        optionSets: cachedOptionSets,
    };
};
