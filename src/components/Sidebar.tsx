import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-500 p-4">
      <nav className="flex flex-col gap-4">
        <Link className="text-lg hover:underline" href="/">
          Home
        </Link>
        <Link className="text-lg hover:underline" href="/inbox">
          Messagerie
        </Link>
        <Link className="text-lg hover:underline" href="/patients">
          Patients
        </Link>
        <Link className="text-lg hover:underline" href="/calendar">
          Calendrier
        </Link>
        <Link className="text-lg hover:underline" href="/billing">
          Facturation
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
