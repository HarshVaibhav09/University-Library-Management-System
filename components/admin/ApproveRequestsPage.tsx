"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { approveBorrowRequest, rejectBorrowRequest } from "@/lib/actions/book";
import { toast } from "@/hooks/use-toast";

interface Request {
  requestId: string;
  bookTitle: string;
  userName: string;
  requestDate: Date;
}

interface Props {
  pendingRequests: Request[];
  approvedRequests: Request[];
  rejectedRequests: Request[];
}

const ApproveRequestsPage = ({
  pendingRequests,
  approvedRequests,
  rejectedRequests,
}: Props) => {
  const [requests, setRequests] = useState(pendingRequests);
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (formData: FormData) => {
    setLoading(formData.get("requestId") as string);
    const result = await approveBorrowRequest(formData.get("requestId") as string);
    if (result.success) {
      toast({ title: "Success", description: result.message });
      setRequests((prev) => prev.filter((req) => req.requestId !== formData.get("requestId")));
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setLoading(null);
  };

  const handleReject = async (formData: FormData) => {
    setLoading(formData.get("requestId") as string);
    const result = await rejectBorrowRequest(formData.get("requestId") as string);
    if (result.success) {
      toast({ title: "Rejected", description: result.message });
      setRequests((prev) => prev.filter((req) => req.requestId !== formData.get("requestId")));
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setLoading(null);
  };

  return (
    <section className="w-full p-7 min-h-screen bg-gradient-to-r from-purple-700 via-pink-500 to-red-500">
      <h3 className="text-3xl font-bold text-yellow-300 mb-6">Pending Borrow Requests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.requestId}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 border border-yellow-400"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{req.bookTitle}</h3>
              <p className="text-gray-600 mb-2">Requested by: <span className="font-medium">{req.userName}</span></p>
              <p className="text-gray-600 mb-4">Requested on: {new Date(req.requestDate).toLocaleDateString()}</p>
              <div className="flex justify-between">
                <form action={handleApprove}>
                  <input type="hidden" name="requestId" value={req.requestId} />
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg" type="submit" disabled={loading === req.requestId}>
                    {loading === req.requestId ? "Approving..." : "Approve"}
                  </Button>
                </form>
                <form action={handleReject}>
                  <input type="hidden" name="requestId" value={req.requestId} />
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg" type="submit" disabled={loading === req.requestId}>
                    {loading === req.requestId ? "Rejecting..." : "Reject"}
                  </Button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-white">All borrow requests have been processed. 🎉</p>
        )}
      </div>

      <h3 className="text-3xl font-bold text-green-300 mb-4">Approved Requests</h3>
      <ul className="bg-green-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
        {approvedRequests.length > 0 ? approvedRequests.map((req) => (
          <li key={req.requestId} className="py-3 border-b border-green-400 last:border-b-0 hover:bg-green-300 rounded transition">
            ✅ {req.bookTitle} - Approved for <span className="italic">{req.userName}</span> on {new Date(req.requestDate).toLocaleDateString()}
          </li>
        )) : <p className="text-gray-700">No approved requests yet.</p>}
      </ul>

      <h3 className="text-3xl font-bold text-red-300 mt-8 mb-4">Rejected Requests</h3>
      <ul className="bg-red-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
        {rejectedRequests.length > 0 ? rejectedRequests.map((req) => (
          <li key={req.requestId} className="py-3 border-b border-red-400 last:border-b-0 hover:bg-red-300 rounded transition">
            ❌ {req.bookTitle} - Rejected for <span className="italic">{req.userName}</span> on {new Date(req.requestDate).toLocaleDateString()}
          </li>
        )) : <p className="text-gray-700">No rejected requests yet.</p>}
      </ul>
    </section>
  );
};

export default ApproveRequestsPage;
