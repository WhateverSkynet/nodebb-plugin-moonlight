///<reference path="../../node_modules/redux/index.d.ts" />
interface Window { 
    ajaxify: {
        data: {
            bodyClass: string;
            loggedIn: boolean;
            relative_path: string;
            url: string;
        }
        loadData: (path:string, callback:(error: Error, data:any) => void) => void;
        go: (path: string) => void;
    };
    devToolsExtension: any;
}

interface EventTarget {
    value: any;
}



