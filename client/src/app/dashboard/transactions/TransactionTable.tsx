"use client";

import { Transaction } from "./transactionTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  return (
    <>
      <Table>
        <TableCaption>Latest Transaction List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient/Sender</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Transaction Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>No transactions found.</TableCell>
            </TableRow>
          )}
          {transactions.map((txn) => {
            const {
              id,
              recipient_sender,
              category,
              transaction_date,
              transaction_type,
              amount_cents,
            } = txn;
            return (
              <TableRow key={id}>
                <TableCell>{recipient_sender}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{transaction_date}</TableCell>
                <TableCell>
                  {transaction_type === "expense" ? "-" : "+"}
                  {amount_cents}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  );
}
