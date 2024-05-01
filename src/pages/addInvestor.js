import { Link, useParams } from "react-router-dom";

export default function AddInvestor() {
  const { expoId } = useParams();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-8 ">
          <Link to={`/expos/${expoId}/expo-stores/addExisting`} className="group text-xl text-center">
            <div className="aspect-w-3 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 ">
              <h2 className="pt-10 mt-10 font-medium text-gray-900">
                Add Existing
              </h2>
            </div>
          </Link>
          <Link to={`/expos/${expoId}/createInvestor`} className="group text-xl text-center">
            <div className="aspect-w-3 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
              <h3 className=" pt-10 mt-10 font-medium text-gray-900">
                Create New
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
