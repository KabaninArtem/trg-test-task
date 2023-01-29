import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { PointLocation } from 'src/app/models/api.models';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  locationSortingDataAccessor,
  LocationTableColumns,
} from './locations-table.utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WindowToken } from 'src/app/providers/window.provider';

@Component({
  selector: 'app-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.css'],
})
export class LocationsTableComponent implements AfterViewInit {
  @Input() set locations(value: PointLocation[]) {
    if (this.dataSource) {
      this.dataSource.data = value;
    } else {
      this.dataSource = new MatTableDataSource<PointLocation>(value);
    }
  }

  @Output() editClicked: EventEmitter<PointLocation> = new EventEmitter();

  @ViewChild(MatTable) table: MatTable<PointLocation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: readonly LocationTableColumns[] = [
    LocationTableColumns.NANE,
    LocationTableColumns.LATITUDE,
    LocationTableColumns.LONGITUDE,
    LocationTableColumns.ACTIONS,
  ];

  readonly pageSizeOptions: readonly number[] = [5, 10];

  dataSource: MatTableDataSource<PointLocation>;
  pageSize: number = 10;

  constructor(
    @Inject(WindowToken) private window: Window,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setPageSize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.setPageSize();
  }

  ngAfterViewInit(): void {
    this.initTableActions();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditClick(value: PointLocation): void {
    this.editClicked.emit(value);
  }

  trackName(index: number, { name }: PointLocation): string {
    return name;
  }

  private initTableActions(): void {
    this.initPaginator();
    this.initSorter();
  }

  private initPaginator(): void {
    this.dataSource.paginator = this.paginator;
  }

  private initSorter(): void {
    this.dataSource.sortingDataAccessor = locationSortingDataAccessor;
    this.dataSource.sort = this.sort;
  }

  private setPageSize(): void {
    this.pageSize = this.window.innerHeight < 750 ? 5 : 10;
  }
}
