import HeaderCard from "../components/HeaderCard";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS */}
        <div className="md:col-span-2">
          {/* Welcome Card */}
          <div className="glass card">
            <h2 className="text-2xl font-semibold">Welcome to GitHub Profile Viewer</h2>
            <p className="small-muted mt-2">
              Search any GitHub username to view profiles, repositories, followers, and stats.
            </p>

            <div className="mt-4">
              <SearchBox onSearch={(u) => nav(`/user/${u}`)} />
            </div>
          </div>

          {/* Quick Start Buttons */}
          <div className="mt-6 glass card">
            <h3 className="font-semibold">Quick starts</h3>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => nav("/user/gaearon")}
                className="btn-primary rounded"
              >
                gaearon
              </button>

              <button
                onClick={() => nav("/user/torvalds")}
                className="btn-primary rounded"
              >
                torvalds
              </button>

              <button
                onClick={() => nav("/compare")}
                className="px-3 py-2 rounded-xl border"
              >
                Compare users
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <HeaderCard />
        </div>
      </div>
    </div>
  );
}
