import ApproveRequestsPage from "@/components/admin/ApproveRequestsPage";
import { db } from "@/database/drizzle";
import { borrowRequests, books, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

const ApproveRequests = async () => {
  const pendingRequests = await db
      .select({
        requestId: borrowRequests.id,
        bookTitle: books.title,
        userName: users.fullName,
        requestDate: borrowRequests.requestDate,
      })
      .from(borrowRequests)
      .innerJoin(books, eq(borrowRequests.bookId, books.id))
      .innerJoin(users, eq(borrowRequests.userId, users.id))
      .where(eq(borrowRequests.status, "PENDING"))
      .orderBy(desc(borrowRequests.requestDate));

    const approvedRequests = await db
      .select({
        requestId: borrowRequests.id,
        bookTitle: books.title,
        userName: users.fullName,
        requestDate: borrowRequests.requestDate,
      })
      .from(borrowRequests)
      .innerJoin(books, eq(borrowRequests.bookId, books.id))
      .innerJoin(users, eq(borrowRequests.userId, users.id))
      .where(eq(borrowRequests.status, "APPROVED"))
      .orderBy(desc(borrowRequests.requestDate));

    const rejectedRequests = await db
      .select({
        requestId: borrowRequests.id,
        bookTitle: books.title,
        userName: users.fullName,
        requestDate: borrowRequests.requestDate,
      })
      .from(borrowRequests)
      .innerJoin(books, eq(borrowRequests.bookId, books.id))
      .innerJoin(users, eq(borrowRequests.userId, users.id))
      .where(eq(borrowRequests.status, "REJECTED"))
      .orderBy(desc(borrowRequests.requestDate));

  return (
    <ApproveRequestsPage
      pendingRequests={pendingRequests}
      approvedRequests={approvedRequests}
      rejectedRequests={rejectedRequests}
    />
  );
};

export default ApproveRequests;
