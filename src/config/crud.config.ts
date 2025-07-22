import { CrudConfigService, CrudGlobalConfig } from '@dataui/crud';

export const crudConfig: CrudGlobalConfig = {
  query: {
    limit: 100,
    cache: false,
    alwaysPaginate: true,
  },
  routes: {
    deleteOneBase: {
      returnDeleted: false,
    },
  },
};

CrudConfigService.load(crudConfig);
