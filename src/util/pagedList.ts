import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PagedList } from '../@types/PagedList';

export const pagedList = async <T = any>(
  queryBuilder: Repository<T> | any,
  options: IPaginationOptions
): Promise<T[]> => {
  const paged = await paginate<T>(queryBuilder, options);

  return paged.items;
};
