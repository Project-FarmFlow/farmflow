export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createFarmer' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'moistureLevel' : IDL.Float64,
              'farmerId' : IDL.Text,
              'name' : IDL.Text,
              'sensors' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'name' : IDL.Text,
                  'greenhouseId' : IDL.Text,
                  'typeOfSensor' : IDL.Text,
                  'condition' : IDL.Text,
                })
              ),
              'location' : IDL.Text,
            })
          ),
        ],
        [],
        [],
      ),
    'getAllFarmers' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'username' : IDL.Text,
              'subscription' : IDL.Text,
              'password' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
              'location' : IDL.Text,
              'greenhouses' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'moistureLevel' : IDL.Float64,
                  'farmerId' : IDL.Text,
                  'name' : IDL.Text,
                  'sensors' : IDL.Vec(
                    IDL.Record({
                      'id' : IDL.Nat,
                      'name' : IDL.Text,
                      'greenhouseId' : IDL.Text,
                      'typeOfSensor' : IDL.Text,
                      'condition' : IDL.Text,
                    })
                  ),
                  'location' : IDL.Text,
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'getMessage' : IDL.Func([], [IDL.Text], ['query']),
    'setMessage' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
