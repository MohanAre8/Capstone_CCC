"use client";

import { useState } from "react";

export default function Home() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState(""); 
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCarData(null);

    try {
      const response = await fetch(
        `/api/getCarData?year=${year}&make=${make}&model=${model}&trim=${trim}&city=${city}&state=${state}`
      );
      const data = await response.json();
      if (response.ok) {
        setCarData(data);
      } else {
        setError(data.message || "Error fetching data");
      }
    } catch (err) {
      setError("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Car Sales Statistics
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-black"
            >
              Year
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="make"
              className="block text-sm font-medium text-black"
            >
              Make
            </label>
            <input
              type="text"
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-black"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="trim"
              className="block text-sm font-medium text-black"
            >
              Trim
            </label>
            <input
              type="text"
              id="trim"
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-black"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-black"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Sales Statistics
          </button>
        </form>

        {loading && <p className="mt-4 text-blue-600">Loading...</p>}

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {carData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-black">
              Car Sales Data:
            </h2>
            <p>
              <strong>Make:</strong> {carData.make}
            </p>
            <p>
              <strong>Model:</strong> {carData.model}
            </p>
            <p>
              <strong>Year:</strong> {carData.year}
            </p>
            <p>
              <strong>Trim:</strong> {carData.trim}
            </p>
            <p>
              <strong>City:</strong> {carData.city}
            </p>
            <p>
              <strong>State:</strong> {carData.state}
            </p>
            <p>
              <strong>Number of Cars Sold:</strong> {carData.count}
            </p>
            <p>
              <strong>CPO Cars Sold:</strong> {carData.cpo}
            </p>
            <p>
              <strong>Non-CPO Cars Sold:</strong> {carData.non_cpo}
            </p>

            <h3 className="mt-4 text-lg font-medium text-black">
              Price Stats:
            </h3>
            <p>
              <strong>Average Price:</strong> ${carData.price_stats.mean}
            </p>
            <p>
              <strong>Min Price:</strong> ${carData.price_stats.min}
            </p>
            <p>
              <strong>Max Price:</strong> ${carData.price_stats.max}
            </p>
            <p>
              <strong>Median Price:</strong> ${carData.price_stats.median}
            </p>

            <h3 className="mt-4 text-lg font-medium text-black">
              Miles Stats:
            </h3>
            <p>
              <strong>Average Miles:</strong> {carData.miles_stats.mean} miles
            </p>
            <p>
              <strong>Min Miles:</strong> {carData.miles_stats.min} miles
            </p>
            <p>
              <strong>Max Miles:</strong> {carData.miles_stats.max} miles
            </p>
            <p>
              <strong>Median Miles:</strong> {carData.miles_stats.median} miles
            </p>

            <h3 className="mt-4 text-lg font-medium text-black">
              Days on Market Stats:
            </h3>
            <p>
              <strong>Average Days on Market:</strong> {carData.dom_stats.mean}
            </p>
            <p>
              <strong>Min Days:</strong> {carData.dom_stats.min}
            </p>
            <p>
              <strong>Max Days:</strong> {carData.dom_stats.max}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
