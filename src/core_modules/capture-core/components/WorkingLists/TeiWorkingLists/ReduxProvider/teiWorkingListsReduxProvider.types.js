// @flow
import type { TrackerProgram } from '../../../../metaData';
import type {
    CancelLoadTemplates,
    CancelLoadView,
    CancelUpdateList,
    Categories,
    ChangePage,
    ChangeRowsPerPage,
    ClearFilter,
    ClearFilters,
    RemoveFilter,
    CustomMenuContents,
    CustomRowMenuContents,
    FiltersData,
    LoadedContext,
    LoadTemplates,
    LoadView,
    SelectRestMenuItem,
    SelectRow,
    SelectTemplate,
    SetColumnOrder,
    Sort,
    StickyFilters,
    UnloadingContext,
    UpdateFilter,
} from '../../WorkingListsBase';
import type {
    CustomColumnOrder,
    RecordsOrder,
    UpdateList,
    InitialViewConfig,
} from '../../WorkingListsCommon';
import type { TeiWorkingListsTemplates, TeiRecords } from '../types';

export type Props = $ReadOnly<{|
    storeId: string,
    programId: string,
    orgUnitId: string,
    selectedTemplateId?: string,
    onChangeTemplate?: (selectedTemplateId?: string) => void
|}>;

export type TeiWorkingListsReduxOutputProps = {|
    categories?: Categories,
    currentPage?: number,
    currentTemplateId?: string,
    currentViewHasTemplateChanges?: boolean,
    customColumnOrder?: CustomColumnOrder,
    customListViewMenuContents?: CustomMenuContents,
    customRowMenuContents?: CustomRowMenuContents,
    filters?: FiltersData,
    initialViewConfig?: InitialViewConfig,
    loadedContext?: LoadedContext,
    loading: boolean,
    loadViewError?: string,
    loadTemplatesError?: string,
    onCancelLoadView: CancelLoadView,
    onCancelLoadTemplates: CancelLoadTemplates,
    onCancelUpdateList: CancelUpdateList,
    onChangePage: ChangePage,
    onChangeRowsPerPage: ChangeRowsPerPage,
    onClearFilter: ClearFilter,
    onRemoveFilter: RemoveFilter,
    onClearFilters: ClearFilters,
    onLoadView: LoadView,
    onLoadTemplates: LoadTemplates,
    onSelectListRow: SelectRow,
    onSelectRestMenuItem: SelectRestMenuItem,
    onSelectTemplate: SelectTemplate,
    onSetListColumnOrder: SetColumnOrder,
    onSortList: Sort,
    onUnloadingContext?: UnloadingContext,
    onUpdateFilter: UpdateFilter,
    onUpdateList: UpdateList,
    orgUnitId: string,
    program: TrackerProgram,
    programStage?: string,
    records?: TeiRecords,
    recordsOrder?: RecordsOrder,
    rowsPerPage?: number,
    sortByDirection?: string,
    sortById?: string,
    stickyFilters?: StickyFilters,
    templates?: TeiWorkingListsTemplates,
    templatesLoading: boolean,
    updating: boolean,
    updatingWithDialog: boolean,
    viewPreloaded?: boolean,
|};
