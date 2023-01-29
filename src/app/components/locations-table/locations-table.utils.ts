import { PointLocation } from 'src/app/models/api.models';

export enum LocationTableColumns {
  NANE = 'name',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  ACTIONS = 'actions',
}

const sorterKeys: Record<string, (value: PointLocation) => string | number> = {
  latitude: ({ coordinates: [lat] }: PointLocation) => lat!,
  longitude: ({ coordinates: [_, lng] }: PointLocation) => lng!,
  name: ({ name }: PointLocation) => name,
};

export const locationSortingDataAccessor = (
  item: PointLocation,
  property: string
) => (property in sorterKeys ? sorterKeys[property](item) : '');
