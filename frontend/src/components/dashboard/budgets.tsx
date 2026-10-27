import { useEffect, useState } from "react";
import { expenses } from "../../constants";
import type { Category } from "../../types/shared";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addBudget, deleteBudget } from "../../api/budgets";
import type { ApiError } from "../../lib/api";
import type { action } from "../../pages/Dashboard";
import { getBudgets, type Budget } from "../../api/budgets/getBudgets";
import DeleteBudgetConfirmation from "./delete-budget";

interface Props {
  action: action;
}

interface CreateBudgetForm {
  title: string;
  startDate: string;
  endDate: string;
  budget: {
    category: Category;
    amountBudgeted: number;
  }[];
}

const initial: CreateBudgetForm = {
  title: "",
  startDate: "",
  endDate: "",
  budget: [
    {
      category: "food",
      amountBudgeted: 0,
    },
  ],
};

export default function Budgets({ action }: Props) {
  const [newBudget, setNewBudget] = useState<CreateBudgetForm>(initial);
  const [isCreatingBudget, setIsCreatingBudget] = useState<boolean>(false);
  const [myBudgets, setMyBudgets] = useState<Budget[]>([]);
  const [isFetchingBudgets, setIsFetchingBudgets] = useState<boolean>(false);
  const [fetchBgErr, setFetchBgErr] = useState<boolean>(false);
  const [showDelMod, setShowDelMod] = useState<boolean>(false);
  const [selId, setSelId] = useState<number>();
  const [isDelBudg, setIsDelBudg] = useState<boolean>(false);

  const recentBudget: Budget = myBudgets[myBudgets.length - 1];

  const handleAddBudgetItem = () => {
    setNewBudget((prev) => ({
      ...prev,
      budget: [
        ...prev.budget,
        {
          category: "food",
          amountBudgeted: 0,
        },
      ],
    }));
  };

  const handleUpdateBudgetItem = (
    index: number,
    field: "category" | "amountBudgeted",
    value: string,
  ) => {
    setNewBudget((prev) => {
      const updatedBudget = [...prev.budget];
      updatedBudget[index] = {
        ...updatedBudget[index],
        [field]: field === "amountBudgeted" ? Number(value) : value,
      };
      return {
        ...prev,
        budget: updatedBudget,
      };
    });
  };

  const handleRemoveBudgetItem = (index: number) => {
    setNewBudget((prev) => ({
      ...prev,
      budget: prev.budget.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, budget } = newBudget;
    if (!title.trim()) return toast.error("Budget title is necessary");
    if (budget.length <= 0)
      return toast.error("Add at least 1 (one) budget item");
    //call endpoint
    setIsCreatingBudget(true);
    await addBudget(newBudget)
      .then(() => {
        toast.success("Budget created successfully");
        setNewBudget(initial);
        fetchBudgets();
      })
      .catch((e: ApiError) => toast.error(e.message))
      .finally(() => setIsCreatingBudget(false));
  };

  const fetchBudgets = async () => {
    await getBudgets()
      .then((res) => (setMyBudgets(res), console.log("Budgets: ", res)))
      .catch(() => setFetchBgErr(true))
      .finally(() => setIsFetchingBudgets(false));
  };

  const closeModal = () => {
    setSelId(undefined);
    setShowDelMod(false);
  };

  const deleteMyBudget = async () => {
    if (!selId) return;
    setIsDelBudg(true);
    await deleteBudget(selId)
      .then(() => {
        toast.success("Budget deleted successfully");
        closeModal();
        fetchBudgets();
      })
      .catch((e: ApiError) => toast.error(e.message))
      .finally(() => setIsDelBudg(false));
  };

  useEffect(() => {
    if (action !== "budgets") return;
    fetchBudgets();
  }, [action]);

  return (
    <div className="space-y-7 mt-4">
      {/* create a budget form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-secondary bg-white p-5 md:p-6 space-y-5"
      >
        {/* heading */}
        <div className="space-y-1">
          <h2 className="font-display text-lg font-semibold text-primary">
            Create a Budget
          </h2>
          <p className="text-sm text-muted-foreground">
            Set a monthly limit for a category of your choice. You'll be flagged
            the moment spending crosses the line. You can only have one budget
            at a time.
          </p>
        </div>
        {/* title */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label>Budget title *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="text"
            placeholder="Budget for October 2026"
            name="note"
            value={newBudget.title}
            onChange={(e) => {
              setNewBudget((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
        {/* start date */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">start period *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="date"
            //   min={new Date().toISOString().split("T")[0]}
            //   max={new Date().toISOString().split("T")[0]}
            placeholder="Select Start Date"
            name="date"
            value={newBudget.startDate}
            onChange={(e) => {
              setNewBudget((prev) => ({ ...prev, startDate: e.target.value }));
            }}
          />
        </div>
        {/* end date */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">end period *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="date"
            min={newBudget.startDate}
            //   max={new Date().toISOString().split("T")[0]}
            placeholder="Select End Date"
            name="date"
            value={newBudget.endDate}
            onChange={(e) => {
              setNewBudget((prev) => ({ ...prev, endDate: e.target.value }));
            }}
          />
        </div>

        {/* budget items */}
        <div className="flex flex-col gap-y-3 text-sm">
          <div className="items-center justify-between w-full flex">
            <label className="capitalize font-semibold">Budget items</label>
            <span
              onClick={handleAddBudgetItem}
              className="rounded-full border border-border px-3 py-1.5 text-sm flex items-center gap-x-2 font-medium text-foreground transition-colors hover:bg-secondary capitalize cursor-pointer"
            >
              + Budget Item
            </span>
          </div>
          {newBudget.budget.map((budget, index) => {
            return (
              <div
                key={index}
                className="grid items-end grid-cols-[1fr_1fr_auto] sm:grid-cols-2 gap-3"
              >
                {/* category */}
                <div className="flex flex-col gap-y-1.5 text-sm">
                  <label className="capitalize">category</label>
                  <select
                    onChange={(e) =>
                      handleUpdateBudgetItem(index, "category", e.target.value)
                    }
                    name="category"
                    value={budget.category}
                    className="appearance-none border-secondary capitalize h-9.5 rounded-lg border px-3 focus:outline-none"
                  >
                    {expenses.map((utility, index) => {
                      return (
                        <option key={index} value={utility}>
                          {utility}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* amount */}
                <div className="flex flex-col gap-y-1.5 text-sm">
                  <label className="capitalize">amount</label>
                  <input
                    className="h-9.5 rounded-lg border border-secondary px-3 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    placeholder="0.00"
                    name="amountBudgeted"
                    value={budget.amountBudgeted}
                    onChange={(e) =>
                      handleUpdateBudgetItem(
                        index,
                        "amountBudgeted",
                        e.target.value,
                      )
                    }
                  />
                </div>
                {newBudget.budget.length > 1 && (
                  <div
                    onClick={() => handleRemoveBudgetItem(index)}
                    className="border border-secondary h-9.5 w-9.5 rounded-lg text-sm flex items-center justify-center gap-x-2 font-medium text-foreground transition-colors hover:bg-red-600 hover:text-white capitalize cursor-pointer"
                  >
                    <X />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* submit btn */}
        <button
          disabled={
            !newBudget.title.trim() ||
            !newBudget.startDate ||
            !newBudget.endDate ||
            isCreatingBudget
          }
          type="submit"
          className="h-9.5 bg-primary text-white font-medium rounded-lg w-full cursor-pointer mt-1 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCreatingBudget ? "Creating budget..." : "Create budget"}
        </button>
      </form>
      {isFetchingBudgets ? (
        <section className="h-20 flex items-center justify-center">
          <h1 className="text-center">Getting your budgets...</h1>
        </section>
      ) : fetchBgErr ? (
        <section className="h-20 flex items-center justify-center">
          <h1 className="text-center">Failed to fetch budget.</h1>
        </section>
      ) : myBudgets.length === 0 ? (
        <section className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
          <h1 className="text-center">
            Create your first budget using the form above.
          </h1>
        </section>
      ) : (
        <section className="space-y-5">
          {/* overview */}
          <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold text-primary">
              Budgets
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set a monthly limit for a category of your choice. You'll be
              flagged the moment spending crosses the line.
            </p>
            <div className="mt-4 flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
              <p className="text-sm font-medium text-primary">
                Total budgeted: ₦
                {recentBudget?.totalBudgeted?.toLocaleString() ?? 0}.00
              </p>
              <p className="text-sm font-semibold tabular-nums text-green-700">
                ₦{recentBudget?.totalSpent ?? 0}.00 spent
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex w-full justify-between items-center">
              <h2 className="font-display text-lg font-semibold min-w-35">
                Recent Budget
              </h2>
              <button
                title="Delete Budget"
                onClick={() => {
                  setSelId(recentBudget.id);
                  setShowDelMod(true);
                }}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600/80 capitalize cursor-pointer"
              >
                delete budget
              </button>
            </div>
            <hr className="w-full border-none h-px bg-secondary" />
          </div>
          {/* budgets */}
          <div className="rounded-2xl border border-secondary bg-white">
            <h2 className="font-display text-lg font-semibold text-primary pt-5 px-5">
              {recentBudget?.title ?? ""}
            </h2>
            <ul className="divide-y divide-secondary">
              {recentBudget.budget.map((item, index) => {
                return (
                  <li key={index} className="px-5 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold capitalize">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <p className="font-semibold">
                          ₦{item.amountBudgeted.toLocaleString()}.00{" "}
                          {item.status === "over" && (
                            <span className="text-red-600">
                              (-₦
                              {item.amountRemaining.toLocaleString().slice(1)}
                              .00)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
                        <div
                          className={`h-full rounded-full bg-primary transition-all ${item.status === "over" && "bg-red-600"}`}
                          style={{ width: `${item.percentageUsed}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground tabular-nums">
                          ₦{item.amountUsed}.00 of ₦{item.amountBudgeted}.00 (
                          {item.percentageUsed}%)
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${item.status === "on-track" ? "bg-green-700/10 text-green-700" : "bg-red-600/10 text-red-600"}`}
                        >
                          {item.status === "on-track" ? "On track" : "Over"}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
      {showDelMod && (
        <DeleteBudgetConfirmation
          closeModal={closeModal}
          isDelBudg={isDelBudg}
          deleteMyBudget={deleteMyBudget}
        />
      )}
    </div>
  );
}
