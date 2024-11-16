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
  'getMessage' : ActorMethod<[], string>,
  'setMessage' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
