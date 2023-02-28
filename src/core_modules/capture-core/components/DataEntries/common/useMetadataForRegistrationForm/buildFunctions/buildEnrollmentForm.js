// @flow
import { EnrollmentFactory } from '../../../../../metaDataMemoryStoreBuilders/programs/factory/enrollment';
import type {
    OptionSet,
    TrackedEntityAttribute,
} from '../../../../WidgetProfile/DataEntry/FormFoundation/types';
import type { CachedProgram, CachedTrackedEntityType } from '../../../../../storageControllers/cache.types';
import type { TrackedEntityType } from '../../../../../metaData';

type Props = {|
    cachedOptionSets: OptionSet[],
    cachedTrackedEntityType: CachedTrackedEntityType,
    trackedEntityTypeCollection: TrackedEntityType,
    cachedProgram: CachedProgram,
    cachedTrackedEntityAttributes: TrackedEntityAttribute[],
    locale: string,
|}

export const buildEnrollmentForm = async ({
    cachedOptionSets,
    cachedTrackedEntityType,
    trackedEntityTypeCollection,
    cachedProgram,
    cachedTrackedEntityAttributes,
    locale,
}: Props) => {
    const enrollmentFactory = new EnrollmentFactory({
        cachedTrackedEntityAttributes: new Map(cachedTrackedEntityAttributes.map(tea => [tea.id, tea])),
        cachedOptionSets: new Map(cachedOptionSets.map(optionSet => [optionSet.id, optionSet])),
        cachedTrackedEntityTypes: new Map([[cachedTrackedEntityType.id, cachedTrackedEntityType]]),
        trackedEntityTypeCollection: new Map([[trackedEntityTypeCollection.id, trackedEntityTypeCollection]]),
        locale,
    });

    return enrollmentFactory.build(cachedProgram);
};
