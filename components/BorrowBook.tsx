"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { checkBookRequest, borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({ userId, bookId, borrowingEligibility: { isEligible, message } }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const [requestStatus, setRequestStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Fetch request status when component loads
  useEffect(() => {
    const fetchRequestStatus = async () => {
      setLoading(true);
      try {
        const alreadyRequested = await checkBookRequest(userId, bookId);
        setRequestStatus(alreadyRequested);
      } catch (error) {
        console.error("Error checking book request status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestStatus();
  }, [userId, bookId]);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({ title: "Error", description: message, variant: "destructive" });
      return;
    }

    if (requestStatus) {
      toast({ title: "Info", description: "You already requested this book." });
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({ title: "Success", description: "Book request sent successfully!" });
        setRequestStatus(true);
        router.push("/");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while borrowing the book.", variant: "destructive" });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing || requestStatus || loading}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {loading ? "Checking..." : requestStatus ? "Borrow Request Sent" : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
