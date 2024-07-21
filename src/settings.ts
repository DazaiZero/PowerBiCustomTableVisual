"use strict";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

export class VisualSettingsParser extends DataViewObjectsParser { }

export class HeaderSettings extends FormattingSettingsCard {
    public headerColor = new formattingSettings.ColorPicker({
        name: "headerColor",
        displayName: "Color",
        value: { value: "#3498db" },
        visible: true
    });

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Font size",
        value: 5,
        visible: true
    });

    public name: string = "headerSettings";
    public displayName: string = "HeaderSettings";
    public show: boolean = true;
    public slices: FormattingSettingsSlice[] = [this.headerColor, this.fontSize];
}

export class DataSettings extends FormattingSettingsCard {
    public cellColor = new formattingSettings.ColorPicker({
        name: "cellColor",
        displayName: "Color",
        value: { value: "#01B8AA" },
        visible: true
    });

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Font size",
        value: 5,
        visible: true
    });


    public name: string = "dataSettings";
    public displayName: string = "DataSettings";
    public show: boolean = true;
    public slices: FormattingSettingsSlice[] = [this.cellColor, this.fontSize];
}

export class TableSettings extends FormattingSettingsCard {
    public tableBorderColor = new formattingSettings.ColorPicker({
        name: "tableBorderColor",
        displayName: "Table Border Color",
        value: { value: "#3498db" },
        visible: true
    });

    public tableWidth = new formattingSettings.NumUpDown({
        name: "tableWidth",
        displayName: "Table Width",
        value: 5,
        visible: true
    });
    public name: string = "tableSettings";
    public displayName: string = "TableSettings";
    public show: boolean = true;
    public slices: FormattingSettingsSlice[] = [this.tableBorderColor, this.tableWidth];
}



export class VisualSettings extends FormattingSettingsModel {
    public headerSettings: HeaderSettings = new HeaderSettings();
    public dataSettings: DataSettings = new DataSettings();
    public tableSettings: TableSettings = new TableSettings();
    public cards: FormattingSettingsCard[] = [this.headerSettings,this.dataSettings];
}