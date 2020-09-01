import * as React from 'react'
interface IMenuConfType {
  name: string;
  icon: string;
}

interface IRouteConfType {
  path: string;
  component: string;
  hidden: boolean;
  exact: boolean;
  menu: IMenuConfType;
}

export interface IRoutesType extends IRouteConfType {
  routes?: Array<IRouteConfType>
}
