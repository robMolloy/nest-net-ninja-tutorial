import { Injectable } from '@nestjs/common';
import { TNinja } from './ninjas.types';

type Ninjas = {
  id: string;
  name: string;
  type: string;
}[];

const allNinjas: Ninjas = [
  { id: 'id1', name: 'rob', type: 'strong' },
  { id: 'id2', name: 'lizzie', type: 'strong' },
  { id: 'id2', name: 'mark', type: 'french' },
];

@Injectable()
export class NinjasService {
  private ninjas = allNinjas;

  getAllNinjas() {
    return this.ninjas;
  }

  getFilteredNinjas(initProps: Partial<TNinja>) {
    const props = {} as Partial<TNinja>;
    for (const k in initProps) {
      const key = k as keyof TNinja;
      if (initProps[key] !== undefined) props[key] = initProps[key];
    }

    const keys = Object.keys(props) as (keyof typeof props)[];

    return keys.length === 0
      ? this.ninjas
      : this.ninjas.filter((ninja) => {
          return keys.every((k) => ninja[k] === props[k]);
        });
  }
}
