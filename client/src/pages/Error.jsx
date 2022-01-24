import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="bg-hibye-10 py-24">
      <div className="text-hibye-100 text-8xl mb-7 text-center">404</div>
      <div className="text-gray-600 text-2xl mb-7 text-center">Sorry, we couldn't find the page you're looking for.</div>
      <Link to="/" className="bg-hibye-100 rounded-lg text-hibye-10 text-1xl px-4 py-2 text-center block w-max m-auto hover:bg-hibye-80">
        Go to Home
      </Link>
    </div>
  );
}
