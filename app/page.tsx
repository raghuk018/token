export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">🏥 Hospital Que Token System</h1>
      <p className="mt-4">Choose your portal</p>
      <div className="mt-6 space-x-4">
        <a href="/receptionist" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-200">
          Receptionist
        </a>
        <a href="/patient" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-200">
          Patient stetus
        </a>
      </div>
    </div>
  );
}
