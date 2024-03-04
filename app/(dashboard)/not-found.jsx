import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div>
        <h2 className="text-3xl">There was a problem.</h2>
        <p>We could not find the page you were looking for.</p>
      </div>
    </div>
  );
}
