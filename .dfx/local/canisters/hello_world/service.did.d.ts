import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'checkIfFarmerIsRegistered' : ActorMethod<[string], boolean>,
  'checkIfSensorTypeExists' : ActorMethod<[string, bigint], boolean>,
  'checkSoilMoistureLevel' : ActorMethod<[bigint, string], string>,
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
              'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
              'name' : string,
              'greenhouseId' : string,
              'typeOfSensor' : string,
              'condition' : string,
            }
          >,
          'isPumpOn' : boolean,
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
          'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
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
  'createSensor' : ActorMethod<
    [string, bigint, string, string, string, string],
    undefined
  >,
  'getAllFarmers' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'username' : string,
        'notifications' : Array<
          {
            'id' : bigint,
            'title' : string,
            'message' : string,
            'timestamp' : string,
          }
        >,
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
                'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
                'name' : string,
                'greenhouseId' : string,
                'typeOfSensor' : string,
                'condition' : string,
              }
            >,
            'isPumpOn' : boolean,
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
            'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
            'name' : string,
            'greenhouseId' : string,
            'typeOfSensor' : string,
            'condition' : string,
          }
        >,
        'isPumpOn' : boolean,
        'location' : string,
      }
    >
  >,
  'getFarmerById' : ActorMethod<
    [string],
    {
      'id' : string,
      'username' : string,
      'notifications' : Array<
        {
          'id' : bigint,
          'title' : string,
          'message' : string,
          'timestamp' : string,
        }
      >,
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
              'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
              'name' : string,
              'greenhouseId' : string,
              'typeOfSensor' : string,
              'condition' : string,
            }
          >,
          'isPumpOn' : boolean,
          'location' : string,
        }
      >,
    }
  >,
  'getFarmerByName' : ActorMethod<[string], boolean>,
  'getGreenHouseById' : ActorMethod<
    [bigint],
    {
      'id' : bigint,
      'moistureLevel' : number,
      'farmerId' : string,
      'name' : string,
      'sensors' : Array<
        {
          'id' : bigint,
          'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
          'name' : string,
          'greenhouseId' : string,
          'typeOfSensor' : string,
          'condition' : string,
        }
      >,
      'isPumpOn' : boolean,
      'location' : string,
    }
  >,
  'getGreenHouseByName' : ActorMethod<[string], boolean>,
  'getHistoricalData' : ActorMethod<
    [string, bigint],
    Array<{ 'data' : bigint, 'timestamp' : string }>
  >,
  'getIsPumpOn' : ActorMethod<[bigint], boolean>,
  'getSensorReadings' : ActorMethod<
    [string, bigint],
    { 'data' : bigint, 'timestamp' : string }
  >,
  'pushNotification' : ActorMethod<
    [
      string,
      {
        'id' : bigint,
        'title' : string,
        'message' : string,
        'timestamp' : string,
      },
    ],
    string
  >,
  'updateFarmerDetails' : ActorMethod<
    [string, string, string],
    {
      'id' : string,
      'username' : string,
      'notifications' : Array<
        {
          'id' : bigint,
          'title' : string,
          'message' : string,
          'timestamp' : string,
        }
      >,
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
              'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
              'name' : string,
              'greenhouseId' : string,
              'typeOfSensor' : string,
              'condition' : string,
            }
          >,
          'isPumpOn' : boolean,
          'location' : string,
        }
      >,
    }
  >,
  'updateGreenHouseDetails' : ActorMethod<
    [bigint, string, string],
    {
      'id' : bigint,
      'moistureLevel' : number,
      'farmerId' : string,
      'name' : string,
      'sensors' : Array<
        {
          'id' : bigint,
          'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
          'name' : string,
          'greenhouseId' : string,
          'typeOfSensor' : string,
          'condition' : string,
        }
      >,
      'isPumpOn' : boolean,
      'location' : string,
    }
  >,
  'updatePumpStatus' : ActorMethod<
    [bigint, boolean],
    {
      'id' : bigint,
      'moistureLevel' : number,
      'farmerId' : string,
      'name' : string,
      'sensors' : Array<
        {
          'id' : bigint,
          'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
          'name' : string,
          'greenhouseId' : string,
          'typeOfSensor' : string,
          'condition' : string,
        }
      >,
      'isPumpOn' : boolean,
      'location' : string,
    }
  >,
  'updateSensorCondition' : ActorMethod<
    [string, bigint, string],
    {
      'id' : bigint,
      'data' : Array<{ 'data' : bigint, 'timestamp' : string }>,
      'name' : string,
      'greenhouseId' : string,
      'typeOfSensor' : string,
      'condition' : string,
    }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
