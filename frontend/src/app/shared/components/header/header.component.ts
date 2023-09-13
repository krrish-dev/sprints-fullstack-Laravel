import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();
  searchQuery: string = '';

  search() {
    // Emit the search query to be handled by the parent component
    this.searchQueryChanged.emit(this.searchQuery);
  }
}
