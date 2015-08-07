//infonote.d.ts
/// <reference path="./infodata.d.ts" />
//
declare module "infodata" {
	//
	export interface IEventItem {
		name: string;
		count: number;
		has_count: boolean;
		add: (genre: string) => void;
	}
    //
    export interface INoteItem {
        name: string;
        route: string;
        has_route?: boolean;
        has_not_route?: boolean;
        refer: string;
        note: number;
        coefficient: number;
        count: number;
        //
        reset: () => void;
        add: (name: number, c?: number) => void;
    }// interface INoteItem
	//
	export interface INoteItemMap {
		name: string;
		route: string;
		add: (item: string, n: number, c?: number, xref?: string) => void;
		get_values: () => INoteItem[];
	}
    //
    export interface IEtudiantDesc {
        personid: string;
        lastname: string;
        firstname: string;
        avatarid: string;
        url: string;
        has_url: boolean;
		//
		events: IEventItem[];
		//
		check_url: (service: IDatabaseManager) => Promise<IEtudiantDesc>;
    }
}// module infonote