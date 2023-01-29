import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PointLocation } from 'src/app/models/api.models';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  locationSortingDataAccessor,
  LocationTableColumns,
} from './locations-table.utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.css'],
})
export class LocationsTableComponent implements AfterViewInit {
  @Input() set locations(value: PointLocation[]) {
    this.dataSource = new MatTableDataSource<PointLocation>(value);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: readonly LocationTableColumns[] = [
    LocationTableColumns.NANE,
    LocationTableColumns.LATITUDE,
    LocationTableColumns.LONGITUDE,
  ];

  dataSource: MatTableDataSource<PointLocation>;

  ngAfterViewInit(): void {
    this.initPaginator();
    this.initSorter();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initPaginator(): void {
    this.dataSource.paginator = this.paginator;
  }

  private initSorter(): void {
    this.dataSource.sortingDataAccessor = locationSortingDataAccessor;
    this.dataSource.sort = this.sort;
  }
}
