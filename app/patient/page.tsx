"use client";
import { useState } from "react";

interface Token {
  number: number;
  status: string;
}

interface Patient {
  name: string;
  phone: string;
  age: number;
  gender: string;
  token: Token;
}

export default function AppointmentForm() {
  const [phone, setPhone] = useState(""); // start empty
  const [error, setError] = useState("");
  const [data, setData] = useState<Patient | null>(null);
  const [waitTime, setWaitTime] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState<number | null>(null);
  const [currentToken, setCurrentToken] = useState<number | null>(null);

  const handleCheck = async () => {
    setError("");
    setData(null);
    setWaitTime(null);
    setNextToken(null);
    setCurrentToken(null);

    try {
      // ✅ "database" of patients
      const patients: Record<string, Patient> = {
        "8019114694": {
          name: "Raghu Varma",
          phone: "8019114694",
          age: 32,
          gender: "Male",
          token: { number: 15, status: "Waiting" },
        },
        "8499015901": {
          name: "Ravi Varma",
          phone: "8499015901",
          age: 45,
          gender: "Male",
          token: { number: 16, status: "Waiting" },
        },
        "9502823062": {
          name: "Ramesh",
          phone: "9502823062",
          age: 28,
          gender: "Male",
          
          token: { number: 17, status: "Waiting" },
        },
        "8185030727": {
          name: "Swaroopa",
          phone: "8185030727",
          age: 38,
          gender: "Female",
          token: { number: 18, status: "Pending" },
        },
      };

      const found = patients[phone];


      if (!found) {
        setError("❌ Patient not found. Please check the phone number.");
        return;
      }

      setData(found);

      // ✅ Simulated live token system
      const current = 14; // imagine hospital is serving token 14 right now
      const patientToken = found.token.number;

      setCurrentToken(current);
      setNextToken(patientToken > current ? patientToken : current + 1);

      // ✅ Calculate wait time properly for each patient
      if (patientToken > current) {
        const remaining = patientToken - current;
        const minutes = remaining * 10; // each token = 10min
        setWaitTime(`~${minutes} minutes`);
      } else if (patientToken === current) {
        setWaitTime("It's your turn now!");
      } else {
        setWaitTime("Already served / skipped");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">🩺 Patient Dashboard</h1>

      <input
        type="text"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3 text-black"
      />

      <button
        onClick={handleCheck}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Check Status
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-6 space-y-4">
          {/* Current & Next Token Banner */}
          <div className="p-4 rounded-lg bg-gray-700 text-center text-white">
            <p className="text-lg font-semibold">
              🎟 Current Token: <span className="text-yellow-300">#{currentToken}</span>
            </p>
            <p className="text-lg">
              ➡️ Next Token: <span className="text-green-400">#{nextToken}</span>
            </p>
          </div>

          {/* Patient Details */}
          <div className="p-4 border rounded bg-gray-800 text-white">
            <p><b>✅ Patient Found</b></p>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Age:</b> {data.age}</p>
            <p><b>Gender:</b> {data.gender}</p>
            <p><b>Your Token:</b> #{data.token.number}</p>
            <p><b>Status:</b> {data.token.status}</p>
            {waitTime && <p><b>Estimated Wait:</b> {10}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
