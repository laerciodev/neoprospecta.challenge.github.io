import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {

    constructor() {
        super();
        this.itemsPerPageLabel = 'Itens por página: ';
        this.nextPageLabel = 'Próxima página';
        this.previousPageLabel = 'Página anterior';
        this.getRangeLabel = portugueseRangeLabel;
    }
}

const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length} itens`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length} itens`;
};
