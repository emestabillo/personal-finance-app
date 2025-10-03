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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  return (
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
        {transactions.map((transaction) => {
          const {
            id,
            recipient_or_sender,
            category,
            transaction_date,
            transaction_type,
            amount_dollars,
          } = transaction;
          return (
            <TableRow key={id}>
              <TableCell>{recipient_or_sender}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{transaction_date}</TableCell>
              <TableCell
                className={transaction_type === "income" ? "green" : ""}
              >
                {transaction_type === "expense" ? "-" : "+"}
                {formatter.format(amount_dollars)}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
