// components/Button.js
import Link from 'next/link';

const Button = ({ href, label }) => {
  return (
    <Link href={href}>
      <button className="bg-yellow-500 text-gray-900 py-3 px-6 rounded-full text-lg hover:bg-yellow-400">
        {label}
      </button>
    </Link>
  );
}

export default Button;
