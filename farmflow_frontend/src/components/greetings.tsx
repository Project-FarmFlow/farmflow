import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

// Define the IDL for your Azle canister
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    getMessage: IDL.Func([], [IDL.Text], []),
    setMessage: IDL.Func([IDL.Text], [], []),
  });
};

const canisterId = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");

const Greeting: React.FC = () => {
  const [message, setMessageState] = useState<string>("Nothing here yet");
  const [inputMessage, setInputMessage] = useState<string>("");

  const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey();
  }

  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  const getMessage = async () => {
    try {
      const messageFromCanister = (await actor.getMessage()) as string;
      setMessageState(messageFromCanister);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };
  const setMessage = async () => {
    try {
      console.log("Setting message...");
      await actor.setMessage(inputMessage);
      setInputMessage("");
      getMessage();
    } catch (error) {
      console.error("Error setting message:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Message: {message}</h1>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={setMessage} className="bg-rose-200 p-4 rounded-md mt-4">
        Set Message
      </button>
    </div>
  );
};

export default Greeting;
