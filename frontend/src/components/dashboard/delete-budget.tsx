import { toast } from "sonner";

interface Props {
  deleteMyBudget: () => Promise<void>;
  closeModal: () => void;
  isDelBudg: boolean;
}

export default function DeleteBudgetConfirmation({
  deleteMyBudget,
  closeModal,
  isDelBudg,
}: Props) {
  return (
    <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 z-20">
      <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center right-0 bg-[#000000]/70 backdrop-blur-md">
        <div className="bg-white py-6 px-5 rounded-lg w-[90%] space-y-3 lg:max-w-145 lg:p-8">
          <h1 className="font-grotesk text-xl capitalize text-start font-semibold lg:text-2xl">
            Delete Budget
          </h1>
          <p className="text-[#8a7d8f] text-sm lg:text-base">
            Are you sure you want to delete this budget? Your trackings so far
            will be lost.
          </p>
          <div className="flex items-center h-10 gap-x-2 mt-5 md:w-70 md:place-self-end">
            <div
              onClick={() => {
                if (isDelBudg) return;
                closeModal();
              }}
              className="h-full w-full px-5 flex items-center justify-center border rounded-xl border-gray-200 capitalize hover:bg-[#2A9290]/10 transition ease-in-out delay-100 cursor-pointer font-medium md:w-1/2"
            >
              cancel
            </div>
            <button
              onClick={deleteMyBudget}
              // onClick={()=>toast.success("clicked!")}
              disabled={isDelBudg}
              className="w-full capitalize h-full rounded-xl bg-[#DC2828] hover:bg-[#c72424] text-white focus:outline-none cursor-pointer transition ease-in-out delay-100 disabled:bg-gray-300 disabled:cursor-not-allowed md:w-1/2"
            >
              {isDelBudg ? "deleting..." : "delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
