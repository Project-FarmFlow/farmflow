import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createFarmer' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      Array<
        {
          'id' : bigint,
          'moistureLevel' : number,
          'farmerId' : string,
          'name' : string,
          'sensors' : Array<
            {
              'id' : bigint,
              'name' : string,
              'greenhouseId' : string,
              'typeOfSensor' : string,
              'condition' : string,
            }
          >,
          'location' : string,
        }
      >,
    ],
    undefined
  >,
  'createGreenHouse' : ActorMethod<
    [
      bigint,
      string,
      string,
      string,
      Array<
        {
          'id' : bigint,
          'name' : string,
          'greenhouseId' : string,
          'typeOfSensor' : string,
          'condition' : string,
        }
      >,
      number,
    ],
    undefined
  >,
  'getAllFarmers' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'username' : string,
        'subscription' : string,
        'password' : string,
        'email' : string,
        'phone' : string,
        'location' : string,
        'greenhouses' : Array<
          {
            'id' : bigint,
            'moistureLevel' : number,
            'farmerId' : string,
            'name' : string,
            'sensors' : Array<
              {
                'id' : bigint,
                'name' : string,
                'greenhouseId' : string,
                'typeOfSensor' : string,
                'condition' : string,
              }
            >,
            'location' : string,
          }
        >,
      }
    >
  >,
  'getAllGreenHouses' : ActorMethod<
    [],
    Array<
      {
        'id' : bigint,
        'moistureLevel' : number,
        'farmerId' : string,
        'name' : string,
        'sensors' : Array<
          {
            'id' : bigint,
            'name' : string,
            'greenhouseId' : string,
            'typeOfSensor' : string,
            'condition' : string,
          }
        >,
        'location' : string,
      }
    >
  >,
  'getGreenHouseByName' : ActorMethod<[string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
