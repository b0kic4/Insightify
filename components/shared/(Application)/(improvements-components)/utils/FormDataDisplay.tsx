import { FormValues } from "@/lib";
import { FaInfoCircle } from "react-icons/fa";

export const FormDataDisplay = ({ formData }: { formData: FormValues }) => (
  <div className="bg-gray-50 dark:bg-gray-800 flex-col max-h-96 overflow-y-scroll max-w-full w-full rounded-lg shadow-lg p-6 border border-gray-300 dark:border-gray-700 mt-4">
    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
      <FaInfoCircle className="text-blue-500" />
      Provided Form Data
    </h2>
    <div className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div
          key={key}
          className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md flex items-start gap-4"
        >
          <div className="text-blue-500 flex-shrink-0">
            <FaInfoCircle />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </h3>
            <p className="text-gray-600 dark:text-gray-400 break-words text-sm">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
