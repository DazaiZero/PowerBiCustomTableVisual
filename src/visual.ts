"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataViewSingle = powerbi.DataViewSingle;
import { VisualSettings, VisualSettingsParser } from "./settings";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactTable, initialState, progressState } from "./component";

import "./../style/visual.less";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private settings: VisualSettingsParser;
    private visualSettings: VisualSettings;
    private formattingSettingsService: FormattingSettingsService;
    private host: IVisualHost;
    private flag: "all";
    private Planned: any[];
    private UnPlanned: any[];
    private FinalData: any[];
    private progress: number;
    private OldCols: any;
    private isDataTransforming: boolean = false;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        this.reactRoot = React.createElement(ReactTable, {});
        this.target = options.element;
        this.host = options.host;
        this.progress = 0;
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        const viewPortWidth = options.viewport.width;
        const viewPortHeight = options.viewport.height;

        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            const columns: any[] = dataView.table.columns.map(col => {
                return col.displayName;
            });
            const rows: any[] = dataView.table.rows.map(row => {
                return row.map(item => item);
            });

            debugger;
            ReactTable.update({
                rows: rows,
                columns: columns,
                sortBy: '',
                sortOrder: 'asc',
                progress: 100,
                page: 0,
                rowsPerPage: 10
            });
            
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactTable.update({
            ...initialState,
            ...progressState
        });
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.visualSettings);
    }

    private static parseSettings(dataView: powerbi.DataView): VisualSettingsParser {
        return VisualSettingsParser.parse(dataView) as VisualSettingsParser;
    }

    public enumerateObjectInstances(options: powerbi.EnumerateVisualObjectInstancesOptions): powerbi.VisualObjectInstance[] | powerbi.VisualObjectInstanceEnumerationObject {
        return VisualSettingsParser.enumerateObjectInstances(this.settings || VisualSettingsParser.getDefault(), options);
    }

}