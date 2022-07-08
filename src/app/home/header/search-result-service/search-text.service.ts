import { Injectable, ViewChild } from "@angular/core";
import { SearchResultService } from "./search-result.service";

@Injectable({
    providedIn: 'root'
})

export class SearchTextService {

    @ViewChild('item') item: any;
    $_SEARCH_TEXT = ''

    constructor(private searchResult: SearchResultService) {}

    filterSearchText($_SEARCH_TEXT: string) {

        let searchResults: string[]

        console.log(this.searchResult.$_CURRENT_TEXT);

        if (this.searchResult.$_CURRENT_TEXT == '')
            this.searchResult.$_CURRENT_TEXT = String(sessionStorage.getItem('CURRENT_TEXT'));

        if (!this.searchResult.$_SEARCH_FINISHED)
            searchResults = String($_SEARCH_TEXT).split(' ')
            else searchResults = String(this.searchResult.$_CURRENT_TEXT).split(' ')

        for (let i = 0; i < searchResults.length; i++)
            if (searchResults[i] == ' ' || searchResults[i] == '')
                searchResults.splice(i, 1)
                
        return searchResults
    }
}